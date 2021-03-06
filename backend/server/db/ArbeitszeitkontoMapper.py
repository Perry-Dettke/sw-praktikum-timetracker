from operator import ge
from server.bo.Arbeitszeitkonto import Arbeitszeitkonto
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

        cursor.execute("SELECT id, letzte_aenderung, gesamtstunden from arbeitszeitkonto")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, gesamtstunden) in tuples:
            arbeitszeitkonto = Arbeitszeitkonto()
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_letzte_aenderung(letzte_aenderung)
            arbeitszeitkonto.set_gesamtstunden(gesamtstunden)
            result.append(arbeitszeitkonto)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_id(self, id):
        """Suchen eines Benutzers mit vorgegebener Arbeitszeitkonto ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Personen-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        cursor = self._cnx.cursor()
        command = "SELECT * FROM arbeitszeitkonto WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, gesamtstunden, urlaubstage, krankheitstage ) = tuples[0]
            arbeitszeitkonto = Arbeitszeitkonto()
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_letzte_aenderung(letzte_aenderung)
            arbeitszeitkonto.set_gesamtstunden(gesamtstunden)
            arbeitszeitkonto.set_urlaubstage(urlaubstage)
            arbeitszeitkonto.set_krankheitstage(krankheitstage)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            arbeitszeitkonto = None

        self._cnx.commit()
        cursor.close()

        return arbeitszeitkonto




    def insert(self):
        """Einfügen eines Arbeitszeitkonto-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param arbeitszeitkonto das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM arbeitszeitkonto ")
        tuples = cursor.fetchall()

        arbeitszeitkonto = Arbeitszeitkonto()

        for (maxid) in tuples:
            arbeitszeitkonto.set_id(maxid[0] + 1)

        command = "INSERT INTO arbeitszeitkonto (id, letzte_aenderung, gesamtstunden, urlaubstage, krankheitstage) VALUES (%s,%s,%s,%s,%s)"
        data = (arbeitszeitkonto.get_id(),
                arbeitszeitkonto.get_letzte_aenderung(),
                arbeitszeitkonto.get_gesamtstunden(),
                arbeitszeitkonto.get_urlaubstage(),
                arbeitszeitkonto.get_krankheitstage(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return arbeitszeitkonto

    def update(self, arbeitszeitkonto):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param arbeitszeitkonto das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE arbeitszeitkonto " + "SET letzte_aenderung=%s, gesamtstunden=%s, urlaubstage=%s, krankheitstage=%s WHERE id=%s"
        data = (arbeitszeitkonto.get_letzte_aenderung(),
                arbeitszeitkonto.get_gesamtstunden(),
                arbeitszeitkonto.get_urlaubstage(),
                arbeitszeitkonto.get_krankheitstage(),
                arbeitszeitkonto.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, id):
        cursor = self._cnx.cursor()

        command = "DELETE FROM arbeitszeitkonto WHERE id={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
