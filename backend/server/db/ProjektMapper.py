from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper


class ProjektMapper (Mapper):
    """Mapper-Klasse, die Projekt-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekte unseres Systems.

        :return Eine Sammlung mit Projekt-Objekten.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from projekt")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, bezeichnung, auftraggeber, projektersteller_id) in tuples:
            projekt = Projekt()
            projekt.set_id(id)
            projekt.set_letzte_aenderung(letzte_aenderung)
            projekt.set_bezeichnung(bezeichnung)
            projekt.set_auftraggeber(auftraggeber)
            projekt.set_projektersteller_id(projektersteller_id)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        Suche eine Projekt nach der gegeben id

        :param id Primärschlüsselattribut einer Projekt aus der Datenbanl
        :return Projekt-Objekt, welche mit der ID übereinstimmt
        """

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, bezeichnung, auftraggeber, projektersteller_id FROM projekt WHERE id ='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, bezeichnung, auftraggeber, projektersteller_id) = tuples[0]
            projekt = Projekt()
            projekt.set_id(id)
            projekt.set_letzte_aenderung(letzte_aenderung)
            projekt.set_bezeichnung(bezeichnung)
            projekt.set_auftraggeber(auftraggeber)
            projekt.set_projektersteller_id(projektersteller_id)

            result = projekt
        except IndexError:
            """
            Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt.
            """
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_projektersteller_id(self, projektersteller_id):
        """Auslesen aller Projekte anhand der Projektersteller ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM projekt WHERE projektersteller_id={}".format(projektersteller_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for (id, letzte_aenderung, bezeichnung, auftraggeber, projektersteller_id) in tuples:
                projekt = Projekt()
                projekt.set_id(id)
                projekt.set_letzte_aenderung(letzte_aenderung)
                projekt.set_bezeichnung(bezeichnung)
                projekt.set_auftraggeber(auftraggeber)
                projekt.set_projektersteller_id(projektersteller_id)
                result.append(projekt)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            projekt = None

        self._cnx.commit()
        cursor.close()

        return result



    def insert(self, projekt):
        """Einfügen eines Projekt-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param projekt das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projekt ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Projekt-Objekt zu."""
                projekt.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                projekt.set_id(1)

        command = "INSERT INTO projekt (id, letzte_aenderung, bezeichnung, auftraggeber, projektersteller_id ) VALUES (%s,%s,%s,%s,%s)"
        data = (

            projekt.get_id(),
            projekt.get_letzte_aenderung(),
            projekt.get_bezeichnung(),
            projekt.get_auftraggeber(),
            projekt.get_projektersteller_id(),
        )

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

        return projekt

    def update(self, projekt):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param projekt das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE projekt " + "SET letzte_aenderung=%s, bezeichnung=%s, auftraggeber=%s, projektersteller_id=%s WHERE id=%s"
        data = (
            projekt.get_letzte_aenderung(),
            projekt.get_bezeichnung(),
            projekt.get_auftraggeber(),
            projekt.get_projektersteller_id(),
            projekt.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, id):
        """Löschen der Daten eines Projekt-Objekts aus der Datenbank.

        :param projekt das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM projekt WHERE id={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()





"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProjektMapper() as mapper:
        result = mapper.find_all()
        for projekt in result:
            print(projekt)
