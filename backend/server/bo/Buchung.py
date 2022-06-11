#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo
import datetime


class Buchung(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Buchung
    def __init__(self):
        # Definieren der Attribute, der Klasse Buchung
        super().__init__()
        self._datum = datetime.date.today()
        self._stunden = 0.0
        self._ereignisbuchung = 0
        self._person_id = 0
        self.aktivitaet_id = 0

        
    def get_datum(self):
        # Ausgeben des Datums 
        return self._datum
    
    def set_datum(self, datum):
        # Setzen des Datums
        self._datum = datum

    def get_stunden(self):
        # Ausgeben der Stunden
        return self._stunden
    
    def set_stunden(self, stunden):
        # Setzen der Stunden 
        self._stunden = stunden

    def get_ereignisbuchung(self):
        # Ausgeben ob Ereignisbuchung Ja oder Nein
        return self._ereignisbuchung
    
    def set_ereignisbuchung(self, ereignisbuchung):
        # Setzen der Ereignisbuchung Ja oder Nein
        self._ereignisbuchung = ereignisbuchung
    
    def get_person_id(self):
        # Ausgeben der Person ID
        return self._person_id
    
    def set_person_id(self, person_id):
        # Setzen der Arbeitszeitkonto ID
        self._person_id = person_id

    def get_aktivitaet_id(self):
        # Ausgeben der Person ID
        return self._aktivitaet_id
    
    def set_aktivitaet_id(self, aktivitaet_id):
        # Setzen der Arbeitszeitkonto ID
        self._aktivitaet_id = aktivitaet_id



    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Buchung: {self.get_datum()},{self.get_stunden()},{self.get_ereignisbuchung()}{self.get_person_id()}{self.get_aktivitaet_id()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Buchung().
        obj = Buchung()
        obj.set_datum(dictionary["datum"])
        obj.set_stunden(dictionary["stunden"])
        obj.set_ereignisbuchung(dictionary["ereignisbuchung"])
        obj.set_person_id(dictionary["person_id"])
        obj.set_aktivitaet_id(dictionary["aktivitaet_id"])
        return obj