from server.bo.Buchung import Buchung
from server.db.Mapper import Mapper

class BuchungMapper(Mapper):
    """
    Mapper-Klasse die Buchungs Objekte auf der relationalen Datenbank abbildet.
    Die Klasse er,öglicht die Umwandlung von Objekten in Datenstrukturen und umgekehrt.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Auslesen aller Buchungen aus der Datenbank
        :return Alle Buchung-Objekte im System
        """
        result = []

        cursor = self._cnx.cursor()

        command = "SELECT id, letzte_aenderung, person_id, arbeitszeitkonto_id FROM Buchung"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, person_id, arbeitszeitkonto_id) in tuples:
            buchung = Buchung()
            buchung.set_id(id)
            buchung.set_letzte_aenderung(letzte_aenderung)
            buchung.set_person_id(person_id)
            buchung.set_arbeitszeitkonto_id(arbeitszeitkonto_id)

            result.append(buchung)

        self.connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        Suche eine Buchung nach der gegeben id

        :param id Primärschlüsselattribut einer Buchung aus der Datenbanl
        :return Buchung-Objekt, welche mit der ID übereinstimmt
        """

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, person_id, arbeitszeitkonto_id FROM Buchung WHERE id ='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, person_id, arbeitszeitkonto_id) = tuples[0]
            buchung = Buchung()
            buchung.set_id(id)
            buchung.set_letzte_aenderung(letzte_aenderung)
            buchung.set_person_id(person_id)
            buchung.set_arbeitszeitkonto_id(arbeitszeitkonto_id)

            result = buchung
        except indexError:
            """
            Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt.
            """
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_person_id(self, person_id):
        """
        suchen einer Person nach der Personen ID
        :param Person_id
        """

        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, letzte_aenderung, person_id, arbeitszeitkonto_id FROM Buchung WHERE person_id='{}'".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, person_id, arbeitszeitkonto_id)  = tuples[0]
            buchung = Buchung()
            buchung.set_id(id)
            buchung.set_letzte_aenderung(letzte_aenderung)
            buchung.set_person_id(person_id)
            buchung.set_arbeitszeitkonto_id(arbeitszeitkonto_id)
            result = Buchung

        except IndexError:
            """
            Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt.
            """
            result = None

        result = result


    def find_by_arbeitszeitkonto_id(self, arbeitszeitkonto_id):

        """
        Suchen einer Person nach der übergebenen ID.

        :param id Primärschlüsselattribut eines Arbeitszeitkontos aus der Datenbank
        :return Arbeitszeitkonto-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, person_id, arbeitszeitkonto_id FROM Buchung WHERE arbeitszeitkonto_id='{}'".format(arbeitszeitkonto_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, person_id, arbeitszeitkonto_id) = tuples[0]
            buchung = Buchung()
            buchung.set_id(id)
            buchung.set_letzte_aenderung(letzte_aenderung)
            buchung.set_person_id(person_id)
            buchung.set_arbeitszeitkonto_id(arbeitszeitkonto_id)
            result = Buchung

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, Buchung):
        """
        Einfügen eineS buchung-Objekts in die DB

        """

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Buchung")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:

                Buchung.set_id(maxid[0]+ 1)

            else:
                Buchung.set_id(1)

        command = "INSERT INTO Buchung (id, letzte_aenderung, person_id, arbeitszeitkonto_id) VALUES (%s,%s,%s,%s)"
        data = (Buchung.get_id(), Buchung.get_person_id(), Buchung.get_arbeitszeitkonto_id(), Buchung.get_letzte_aenderung())
        cursor.execute(command,data)

        self._connection.commit()
        cursor.close()

        return Buchung

    def update(self, Buchung):

        """
        Überschreiben/ Aktualisieren einer Buchung_Objektes in der DB
        """

        cursor = self._cnx.cursor()

        command = "UPDATE Buchung" + "SET letzte_aenderung=% WHERE arbeitszeitkonto_id" #nicht sicher ob richtig?
        data = (Buchung.get_letzte_aenderung())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update_by_id(self, Buchung):
        """Überschreiben / Aktualisieren eines Buchung-Objekts in der DB

        :param Buchung -> Buchung-Objekt
        :return aktualisiertes Buchung-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE Buchung " + "SET letzte_aenderung=%s WHERE id=%s"
        data = (Buchung.get_letzte_aenderung())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        def delete(self, Buchung):
            """Löschen der Daten einer Buchung aus der Datenbank

            :param Buchung -> Buchung-Objekt
            """
            cursor = self._connection.cursor()

            command = "DELETE FROM Buchung WHERE id={}".format(Buchung.get_id())
            cursor.execute(command)

            self._connection.commit()
            cursor.close()

    '''Only for testing purpose'''

    if (__name__ == "__main__"):
        with BuchungMapper() as mapper:
            result = mapper.find_all()
            for Buchung in result:
                print(Buchung)






