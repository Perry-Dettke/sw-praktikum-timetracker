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


    def insert(self, zeitintervall):
        """Einfügen eines Zeitintervall-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param zeitintervall das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Zeitintervall ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Zeitintervall-Objekt zu."""
                zeitintervall.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                zeitintervall.set_id(1)

        command = "INSERT INTO Zeitintervall (id, letzte_aenderung, start, ende) VALUES (%s,%s,%s,%s,)"
        data = (
            zeitintervall.get_id(),
            zeitintervall.get_letzte_aenderung,
            zeitintervall.get_start,
            zeitintervall.get_ende())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitintervall

    def update(self, zeitintervall):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervall das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Zeitintervall " + "SET start=%s, ende=%s WHERE id=%s"
        data = (
            zeitintervall.get_start(),
            zeitintervall.get_ende(),
            zeitintervall.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, zeitintervall):
        """Löschen der Daten eines Zeitintervall-Objekts aus der Datenbank.

        :param zeitintervall das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Zeitintervall WHERE id={}".format(zeitintervall.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ZeitintervallMapper() as mapper:
        result = mapper.find_all()
        for zeitintervall in result:
            print(zeitintervall)