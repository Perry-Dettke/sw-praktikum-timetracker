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
        cursor.execute("SELECT * from zeitintervall")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, start, ende, dauer, pausen_start, pausen_ende, pausen_dauer, person_id) in tuples:
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_letzte_aenderung(letzte_aenderung)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            zeitintervall.set_dauer(dauer)
            zeitintervall.set_start(pausen_start)
            zeitintervall.set_ende(pausen_ende)
            zeitintervall.set_dauer(pausen_dauer)
            zeitintervall.set_person_id(person_id)
            result.append(zeitintervall)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_id(self, id):
        """Suchen eines Benutzers mit vorgegebener Zeitintervall ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Zeitintervall-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """


        cursor = self._cnx.cursor()
        command = "SELECT * FROM zeitintervall WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, start, ende, dauer, pausen_start, pausen_ende, pausen_dauer, person_id) = tuples[0]
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_letzte_aenderung(letzte_aenderung)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            zeitintervall.set_dauer(dauer)
            zeitintervall.set_pausen_start(pausen_start)
            zeitintervall.set_pausen_ende(pausen_ende)
            zeitintervall.set_pausen_dauer(pausen_dauer)
            zeitintervall.set_person_id(person_id)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            zeitintervall = None

        self._cnx.commit()
        cursor.close()

        return zeitintervall


    def find_by_person_id(self, person_id):
        """Suchen eines Zeitintervall mit vorgegebener Person ID.

        :param id Primärschlüsselattribut (->DB)
        :return Zeitintervall-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """


        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM zeitintervall WHERE person_id={}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for (id, letzte_aenderung, start, ende, dauer, pausen_start, pausen_ende ,pausen_dauer, person_id) in tuples:
                zeitintervall = Zeitintervall()
                zeitintervall.set_id(id)
                zeitintervall.set_letzte_aenderung(letzte_aenderung)
                zeitintervall.set_start(start)
                zeitintervall.set_ende(ende)
                zeitintervall.set_dauer(dauer)
                zeitintervall.set_pausen_start(pausen_start)
                zeitintervall.set_pausen_ende(pausen_ende)
                zeitintervall.set_pausen_dauer(pausen_dauer)
                zeitintervall.set_person_id(person_id)
                result.append(zeitintervall)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            zeitintervall = None

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_max_id_and_person_id(self, person_id):
        """Suchen eines Zeitinterval anhand der MAX ID und Person ID.

        :param id Primärschlüsselattribut (->DB)
        :return Zeitintervall-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """



        cursor = self._cnx.cursor()
        command = "SELECT * FROM zeitintervall WHERE person_id={} AND id=(SELECT MAX(id) FROM zeitintervall)".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, start, ende, dauer, pausen_start, pausen_ende, pausen_dauer, person_id) = tuples[0]
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_letzte_aenderung(letzte_aenderung)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            zeitintervall.set_dauer(dauer)
            zeitintervall.set_pausen_start(pausen_start)
            zeitintervall.set_pausen_ende(pausen_ende)
            zeitintervall.set_pausen_dauer(pausen_dauer)
            zeitintervall.set_person_id(person_id)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            zeitintervall = None

        self._cnx.commit()
        cursor.close()

        return zeitintervall

    def find_by_person_id_and_datum(self, person_id, start, ende):
        """Auslesen aller Zeitintervalle einer Person im ausgewählten Zeitraum."""

        result = []
        cursor = self._cnx.cursor()
        command = f"SELECT * FROM zeitintervall WHERE person_id={person_id} AND start BETWEEN '{start}' AND '{ende}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, start, ende, dauer, pausen_start, pausen_ende, pausen_dauer, person_id) = tuples[0]
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_letzte_aenderung(letzte_aenderung)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            zeitintervall.set_dauer(dauer)
            zeitintervall.set_pausen_start(pausen_start)
            zeitintervall.set_pausen_ende(pausen_ende)
            zeitintervall.set_pausen_dauer(pausen_dauer)
            zeitintervall.set_person_id(person_id)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            zeitintervall = None

        self._cnx.commit()
        cursor.close()

        return result



    def insert(self, zeitintervall):
        """Einfügen eines Zeitintervall-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM zeitintervall ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem zeitintervall-Objekt zu."""
                zeitintervall.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                zeitintervall.set_id(1)

        command = "INSERT INTO zeitintervall (id, letzte_aenderung, start, dauer, pausen_dauer, person_id ) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (

            zeitintervall.get_id(),
            zeitintervall.get_letzte_aenderung(),
            zeitintervall.get_start(),
            zeitintervall.get_dauer(),
            zeitintervall.get_pausen_dauer(),
            zeitintervall.get_person_id(),
        )

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

        return zeitintervall

    def update(self, zeitintervall):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervall das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE zeitintervall " + "SET letzte_aenderung=%s, start=%s, ende=%s, dauer=%s, pausen_start=%s, pausen_ende=%s, pausen_dauer=%s, person_id=%s WHERE id=%s"
        data = (
            zeitintervall.get_letzte_aenderung(),
            zeitintervall.get_start(),
            zeitintervall.get_ende(),
            zeitintervall.get_dauer(),
            zeitintervall.get_pausen_start(),
            zeitintervall.get_pausen_ende(),
            zeitintervall.get_pausen_dauer(),
            zeitintervall.get_person_id(),
            zeitintervall.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, id):
        """Löschen der Daten eines Zeitintervall-Objekts aus der Datenbank.

        :param zeitintervall das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervall WHERE id={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete_by_person_id(self, person_id):
        """Löschen der Daten eines Zeitintervall aus der Datenbank

        :param person_id 
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervall WHERE person_id={}".format(person_id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
