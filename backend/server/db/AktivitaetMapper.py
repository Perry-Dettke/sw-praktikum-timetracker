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
        cursor.execute("SELECT * FROM aktivitaet")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, bezeichnung, kapazitaet, projekt_id) in tuples:
            aktivitaet = Aktivitaet()
            aktivitaet.set_id(id)
            aktivitaet.set_letzte_aenderung(letzte_aenderung)
            aktivitaet.set_bezeichnung(bezeichnung)
            aktivitaet.set_kapazitaet(kapazitaet)
            aktivitaet.set_projekt_id(projekt_id)
            result.append(aktivitaet)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen aller Aktivitäten anhand der ID."""

        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, bezeichnung, kapazitaet, projekt_id FROM aktivitaet WHERE id={}".format(
            id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, bezeichnung,
             kapazitaet, projekt_id) = tuples[0]
            aktivitaet = Aktivitaet()
            aktivitaet.set_id(id)
            aktivitaet.set_letzte_aenderung(letzte_aenderung)
            aktivitaet.set_bezeichnung(bezeichnung)
            aktivitaet.set_kapazitaet(kapazitaet)
            aktivitaet.set_projekt_id(projekt_id)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            aktivitaet = None

        self._cnx.commit()
        cursor.close()

        return aktivitaet

    def find_by_projekt_id(self, projekt_id):
        """Auslesen aller Aktivitäten anhand der Projekt ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM aktivitaet WHERE projekt_id={}".format(
            projekt_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for (id, letzte_aenderung, bezeichnung, kapazitaet, projekt_id) in tuples:
                aktivitaet = Aktivitaet()
                aktivitaet.set_id(id)
                aktivitaet.set_letzte_aenderung(letzte_aenderung)
                aktivitaet.set_bezeichnung(bezeichnung)
                aktivitaet.set_kapazitaet(kapazitaet)
                aktivitaet.set_projekt_id(projekt_id)
                result.append(aktivitaet)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            aktivitaet = None

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_projekt_id_id(self, projekt_id):
        """Auslesen aller Aktivitäten anhand der Projekt ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id FROM aktivitaet WHERE projekt_id={}".format(
            projekt_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for (id) in tuples:
                result.append(id)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            aktivitaet = None

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

        command = "INSERT INTO aktivitaet (id, letzte_aenderung, bezeichnung, kapazitaet, projekt_id) VALUES (%s,%s,%s,%s,%s)"
        data = (aktivitaet.get_id(),
                aktivitaet.get_letzte_aenderung(),
                aktivitaet.get_bezeichnung(),
                aktivitaet.get_kapazitaet(),
                aktivitaet.get_projekt_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return aktivitaet

    def update(self, aktivitaet):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param aktivitaet
        """
        cursor = self._cnx.cursor()

        command = "UPDATE aktivitaet " + "SET letzte_aenderung=%s, bezeichnung=%s, kapazitaet=%s, projekt_id=%s WHERE id=%s"
        data = (aktivitaet.get_letzte_aenderung(),
                aktivitaet.get_bezeichnung(),
                aktivitaet.get_kapazitaet(),
                aktivitaet.get_projekt_id(),
                aktivitaet.get_id())

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

    def delete(self, id):
        """Löschen der Daten eines Aktivitaet-Objekts aus der Datenbank 
    
        :param id
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM aktivitaet WHERE id={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete_by_projekt_id(self, projekt_id):
        """Löschen der Daten eines Aktivitaet-Objekts aus der Datenbank 
    
        :param projekt_id
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM aktivitaet WHERE projekt_id={}".format(projekt_id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
