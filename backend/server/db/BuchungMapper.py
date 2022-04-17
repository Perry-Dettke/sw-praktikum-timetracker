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





