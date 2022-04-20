from server.bo.Zeitintervall import Zeitintervall
from server.db.Mapper import Mapper


class ZeitintervallMapper (Mapper):
    """Mapper-Klasse, die Zeitintervall-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Zeintervalle unseres Systems.

        :return Eine Sammlung mit Zeitintervall-Objekten.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Zeitintervall")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, start, ende) in tuples:
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_letzte_aenderung(letzte_aenderung)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            result.append(zeitintervall)

        self._cnx.commit()
        cursor.close()

        return result