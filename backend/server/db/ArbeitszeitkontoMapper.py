from server.bo.Transaction import Arbeitszeitkonto
from server.db.Mapper import Mapper


class ArbeitszeitkontoMapper (Mapper):
    """Mapper-Klasse, die Arbeitszeitkonto-Objekte auf eine relationale
    Datenbank abbildet.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Arbeitszeiten.

        :return Eine Sammlung mit Arbeitszeitkonto-Objekten, die sämtliche Arbeitszeiten
                der Person repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT id, letzte_aenderung, arbeitsleistung, buchung_id from Arbeitszeitkonto")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, arbeitsleistung, buchung_id) in tuples:
            arbeitszeitkonto = Arbeitszeitkonto()
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_letzte_aenderung(letzte_aenderung)
            arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
            arbeitszeitkonto.set_buchung_id(buchung_id)
            result.append(arbeitszeitkonto)

        self._cnx.commit()
        cursor.close()

        return result