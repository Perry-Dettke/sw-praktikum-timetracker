#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo

class Arbeitszeitkonto(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
        super().__init__()
        self._person_id = 0
        self._aktivitaet_id = 0

    def get_person_id(self):
        # Ausgeben der Personen ID
        return self._person_id
    
    def set_person_id(self, person_id):
        # Setzen der Arbeitsleistung
        self._person_id = person_id

    def get_aktivitaet_id(self):
        # Ausgeben der Aktivität ID
        return self._aktivitaet_id
    
    def set_aktivitaet_id(self, aktivitaet_id):
        # Setzen der Arbeitsleistung
        self._aktivitaet_id = aktivitaet_id

        
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Arbeitszeitkonto: {self.get_person_id()}, {self.get_aktivitaet_id()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Arbeitszeitkonto().
        obj = Arbeitszeitkonto()
        obj.set_person_id(dictionary["person_id"])
        obj.set_aktivitaet_id(dictionary["aktivitaet_id"])
        return obj