#from bo import BusinessObjekt
import server.bo.BusinessObjekt as bo

class Person(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Person.
    def __init__(self):
        # Definieren der Attribute, der Klasse Person.
        super().__init__()
        self._vor_name = ""
        self._nach_name = ""
        self._email = ""
        self._benutzer_name = ""
        self._google_user_id = ""
        self._arbeitszeitkonto_id = 0
        self._stunden = 0.0



    def get_vor_name(self):
        # Ausgeben des Vornamens. 
        return self._vor_name
    
    def set_vor_name(self, vor_name):
        # Setzen des Vornamens. 
        self._vor_name = vor_name

    def get_nach_name(self):
        # Ausgeben des Nachnamens.
        return self._nach_name
    
    def set_nach_name(self, nach_name):
        # Setzen des Nachnamens.
        self._nach_name = nach_name

    def get_email(self):
        # Ausgeben der Email.
        return self._email
    
    def set_email(self, email):
        # Setzen der Email.
        self._email = email

    def get_benutzer_name(self):
        # Ausgeben des Benutzernamens.
        return self._benutzer_name
    
    def set_benutzer_name(self, benutzer_name):
        # Setzen des Benutzernamens.
        self._benutzer_name = benutzer_name

    def get_google_user_id(self):
        # Ausgeben der Google User ID.
        return self._google_user_id
    
    def set_google_user_id(self, google_user_id):
        # Setzen der Google User ID.
        self._google_user_id = google_user_id

    def get_arbeitszeitkonto_id(self):
        # Ausgeben der Arbeitszeitkonto ID.
        return self._arbeitszeitkonto_id
    
    def set_arbeitszeitkonto_id(self, arbeitszeitkonto_id):
        # Setzen der Arbeitszeitkonto ID.
        self._arbeitszeitkonto_id = arbeitszeitkonto_id
            
    def get_stunden(self):
        # Ausgeben der Stunden
        return self._stunden
    
    def set_stunden(self, stunden):
        # Setzen der Stunden 
        self._stunden = stunden




    
    def __str__(self):
        # Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.
        return f'Person: {self.get_vor_name()}, {self.get_nach_name()}, {self.get_email()}, {self.get_benutzer_name()}, {self.get_google_user_id()},{self.get_arbeitszeitkonto_id}, {self.get_stunden()} '
    
    @staticmethod
    def from_dict(dictionary=dict()):
        # Umwandeln eines Python dict() in eine Person().
        obj = Person()
        obj.set_vor_name(dictionary["vor_name"])
        obj.set_nach_name(dictionary["nach_name"])
        obj.set_email(dictionary["email"])
        obj.set_benutzer_name(dictionary["benutzer_name"])
        obj.set_stunden(dictionary["stunden"])
        obj.set_google_user_id(dictionary["google_user_id"])

        return obj
