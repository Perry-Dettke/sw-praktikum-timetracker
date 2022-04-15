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

    def find_by_buchung_id(self, buchung_id):
        """Auslesen aller Buchungen eines durch Fremdschlüssel

        :param buchung_id Schlüssel der zugehörigen buchung.
        :return Eine Sammlung mit Buchung-Objekten.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, arbeitsleistung FROM arbeitszeitkonto WHERE buchung_id={}".format(
            buchung_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, arbeitsleistung, buchung_id ) in tuples:
            arbeitszeitkonto = Arbeitszeitkonto()
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_letzte_aenderung(letzte_aenderung)
            arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
            arbeitszeitkonto.set_buchung_id(buchung_id)
            result.append(arbeitszeitkonto)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener Arbeitszeitkonto ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Personen-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, arbeitsleistung,  buchung_id FROM person WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, arbeitsleistung, buchung_id) = tuples[0]
            arbeitszeitkonto = Arbeitszeitkonto()
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_letzte_aenderung(letzte_aenderung)
            arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
            arbeitszeitkonto.set_buchung_id(buchung_id)
            result.append(arbeitszeitkonto)
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result