from server.bo.Person import Person
from server.db.Mapper import Mapper



class PersonMapper (Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """"Ausgeben aller Personen"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from person")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id) in tuples:
            person = Person()
            person.set_id(id)
            person.set_letzte_aenderung(letzte_aenderung)
            person.set_vor_name(vor_name)
            person.set_nach_name(nach_name)
            person.set_email(email)
            person.set_benutzer_name(benutzer_name)
            person.set_google_user_id(google_user_id)
            person.set_arbeitszeitkonto_id(arbeitszeitkonto_id)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_id(self, id):
        """Suchen eines Benutzers mit vorgegebener Person ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Personen-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """



        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id FROM person WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_letzte_aenderung(letzte_aenderung)
            person.set_vor_name(vor_name)
            person.set_nach_name(nach_name)
            person.set_email(email)
            person.set_benutzer_name(benutzer_name)
            person.set_google_user_id(google_user_id)
            person.set_arbeitszeitkonto_id(arbeitszeitkonto_id)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            person = None

        self._cnx.commit()
        cursor.close()

        return person

    def find_by_google_user_id(self, google_user_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """


        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id  FROM person WHERE google_user_id='{}'".format(google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_letzte_aenderung(letzte_aenderung)
            person.set_vor_name(vor_name)
            person.set_nach_name(nach_name)
            person.set_email(email)
            person.set_benutzer_name(benutzer_name)
            person.set_google_user_id(google_user_id)
            person.set_arbeitszeitkonto_id(arbeitszeitkonto_id)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            person = None

        self._cnx.commit()
        cursor.close()

        return person

    def find_by_arbeitszeitkonto_id(self, arbeitszeitkonto_id):
        """Suchen eines Benutzers mit vorgegebener Arbeitszeitkonto ID.

        :param arbeitszeitkonto_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Arbeitszeitkonto ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """


        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id  FROM person WHERE arbeitszeitkonto_id='{}'".format(arbeitszeitkonto_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_letzte_aenderung(letzte_aenderung)
            person.set_vor_name(vor_name)
            person.set_nach_name(nach_name)
            person.set_email(email)
            person.set_benutzer_name(benutzer_name)
            person.set_google_user_id(google_user_id)
            person.set_arbeitszeitkonto_id(arbeitszeitkonto_id)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            person = None

        self._cnx.commit()
        cursor.close()

        return person

    def insert(self, person, arbeitszeitkonto_id):

        """Einfügen eines Person-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param person
        :return das bereits übergebene Objekt, mit aktualisierten Daten.
        """

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0] + 1)


        command = "INSERT INTO person (id, letzte_aenderung, vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (

            person.get_id(),
            person.get_letzte_aenderung(),
            person.get_vor_name(),
            person.get_nach_name(),
            person.get_email(),
            person.get_benutzer_name(),
            person.get_google_user_id(),
            arbeitszeitkonto_id,
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param person das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE person " + "SET letzte_aenderung=%s, vor_name=%s, nach_name=%s, email=%s, benutzer_name=%s WHERE id=%s"
        data = (
            person.get_letzte_aenderung(),
            person.get_vor_name(),
            person.get_nach_name(),
            person.get_email(),
            person.get_benutzer_name(),
            person.get_id(),)

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, id):
        """Löschen der Daten eines Personen-Objekts aus der Datenbank 
    
        :param id
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE id={}".format(id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete_person_projekt(self, person_id):
        """Löschen der Daten eines Personen-Objekts aus der Datenbank 
    
        :param id
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM projekt_person WHERE person_id={}".format(person_id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

