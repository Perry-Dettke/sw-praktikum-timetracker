from server.bo.Aktivitaet import Aktivitaet
from server.db.Mapper import Mapper


class AktivitaetMapper (Mapper):
    """Mapper-Klasse, die Aktivitäten-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Aktivitäten.

        :return Eine Sammlung mit Aktivität-Objekten, die sämtliche Aktivitäten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, letzte_aenderung, bezeichnung, kapazitaet FROM Aktivitaet")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, bezeichnung, kapazitaet) in tuples:
            aktivitaet = Aktivitaet()
            aktivitaet.set_id(id)
            aktivitaet.set_letzte_aenderung(letzte_aenderung)
            aktivitaet.set_bezeichnung(bezeichnung)
            aktivitaet.set_kapazitaet(kapazitaet)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen aller Aktivitäten anhand der ID.

        :param id Primärschlüsselattribut aus der DB.
        :return Eine Sammlung mit Aktivität-Objekten, die sämtliche Aktivitäten
            mit der gewünschten ID enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, bezeichnung, kapazitaet FROM Aktivitaet WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, bezeichnung, kapazitaet) = tuples[0]
            aktivitaet = Aktivitaet()
            aktivitaet.set_id(id)
            aktivitaet.set_letzte_aenderung(letzte_aenderung)
            aktivitaet.set_bezeichnung(bezeichnung)
            aktivitaet.set_kapazitaet(kapazitaet)
            result.append(aktivitaet)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

        def insert(self, aktivitaet):

            """Einfügen eines Aktivitaet-Objekts in die Datenbank.

            Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
            berichtigt.

            :param aktivitaet
            :return das bereits übergebene Objekt, mit aktualisierten Daten.
            """

            cursor = self._cnx.cursor()
            cursor.execute("SELECT MAX(id) AS maxid FROM aktivitaet ")
            tuples = cursor.fetchall()

            for (maxid) in tuples:
                aktivitaet.set_id(maxid[0] + 1)

            command = "INSERT INTO aktivitaet (id, letzte_aenderung, bezeichnung, kapazitaet) VALUES (%s,%s,%s,%s)"
            data = (aktivitaet.get_id(),
                    aktivitaet.get_letzte_aenderung(),
                    aktivitaet.get_bezeichnug(),
                    aktivitaet.get_kapazitaet())
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()

            return aktivitaet

        def update(self, aktivitaet):
            """Wiederholtes Schreiben eines Objekts in die Datenbank.

            :param aktivitaet
            """
            cursor = self._cnx.cursor()

            command = "UPDATE aktivitaet " + "SET letzte_aenderung=%s, bezeichnung=%s, kapazitaet=%s WHERE id=%s"
            data = (aktivitaet.get_letzte_aenderung(),
                    aktivitaet.get_bezeichnug(),
                    aktivitaet.get_kapazitaet(),
                    aktivitaet.get_id())
            cursor.execute(command, data)
            self._cnx.commit()
            cursor.close()

        def delete(self, aktivitaet):
            """Löschen der Daten eines Aktivitaet-Objekts aus der Datenbank.

            :param aktivitaet
            """
            cursor = self._cnx.cursor()

            command = "DELETE FROM aktivitaet WHERE id={}".format(aktivitaet.get_id())
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()

    """Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
    um die grundsätzliche Funktion zu überprüfen.

    Anmerkung: Nicht professionell aber hilfreich..."""
    if (__name__ == "__main__"):
        with AktivitaetMapper() as mapper:
            result = mapper.find_all()
            for t in result:
                print(t)