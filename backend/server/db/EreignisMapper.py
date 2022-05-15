from server.db.Mapper import Mapper
from server.bo.Ereignis import Ereignis


class EreignisMapper(Mapper):
    """Mapper-Klasse, die Ereignis Objekte auf der relationealen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Ereignisse aus der Datenbank

        :return Alle Ereignis-Objekte im System
        """
        result = []

        cursor = self._cnx.cursor()

        command = "SELECT id, letzte_aenderung, erstellungs_zeitpunkt FROM ereignis"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, erstellungs_zeitpunkt) in tuples:
            ereignis = Ereignis()
            ereignis.set_id(id)
            ereignis.set_letzte_aenderung(letzte_aenderung)
            ereignis.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result.append(ereignis)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen ein Ereignis nach der übergebenen ID.

        :param id Primärschlüsselattribut eines Ereignisses aus der Datenbank
        :return Ereignis-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, letzte_aenderung,erstellungs_zeitpunk FROM ereignis WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, erstellungs_zeitpunkt) = tuples[0]
            ereignis = Ereignis()
            ereignis.set_id(id)
            ereignis.set_letzte_aenderung(letzte_aenderung)
            ereignis.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)

            result = ereignis

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_letzte_aenderung(self, letzte_aenderung):
        """Suchen ein Ereignis nach letzte_aenderung.

        :param letzte_aenderung eines Ereignis aus der Datenbank
        :return Ereignis-Objekt
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, erstellungs_zeitpunkt, letzte_aenderung FROM ereignis WHERE id='{}'".format(
            letzte_aenderung)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, erstellungs_zeitpunkt, letzte_aenderung) = tuples[0]
            ereignis = Ereignis()
            ereignis.set_id(id)
            ereignis.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            ereignis.set_letzte_aenderung(letzte_aenderung)

            result = Ereignis

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None
        return result

    def insert(self, ereignis):
        '''
        Einfugen eines EreignisBO's in die DB
        '''

        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ereignis")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is None:
                ereignis.set_id(1)
            else:
                ereignis.set_id(maxid[0] + 1)

        command = "INSERT INTO ereignis (id, erstellungs_zeitpunkt, letzte_aenderung) VALUES (%s,%s,%s)"
        data = (
            ereignis.get_id(),
            ereignis.get_erstellungs_zeitpunkt(),
            ereignis.get_letzte_aenderung(),

        )
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return ereignis

    def delete(self, id):
        cursor = self._connection.cursor()

        command = "DELETE FROM ereignis WHERE id={}".format(id)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def update(self, ereignis):

        cursor = self._connection.cursor()

        command = "UPDATE ereignis SET letzte_aenderung=%s, erstellungs_zeitpunkt=%s,  WHERE id=%s"
        data = (ereignis.get_letzte_aenderung(), ereignis.get_erstellungs_zeitpunkt(), ereignis.get_id())

        result = ereignis
        cursor.execute(command, data)



        self._connection.commit()
        cursor.close()

        return result


if (__name__ == "__main__"):
    with EreignisMapper() as mapper:
        result = mapper.find_all()
        for ereignis in result:
            print(ereignis)

            print(type(ereignis))