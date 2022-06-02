#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo

class Aktivitaet(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Akitivitaet
    def __init__(self):
        # Definieren der Attribute, der Klasse Aktivitaet
        super().__init__()
        self._bezeichnung = ''
        self._kapazitaet = 0.0
        self._projekt_id = 0
        
    def get_bezeichnung(self):
        # Ausgeben der Bezeichnung
        return self._bezeichnung
    
    def set_bezeichnung(self, bezeichnung):
        # Setzen der Bezeichnung
        self._bezeichnung = bezeichnung
        
    def get_kapazitaet(self):
        # Ausgeben der Kapazitaet
        return self._kapazitaet
    
    def set_kapazitaet(self, kapazitaet):
        # Setzen der Kapazitaet
        self._kapazitaet = kapazitaet

    def get_projekt_id(self):
        # Ausgeben der Projekt ID
        return self._projekt_id
    
    def set_projekt_id(self, projekt_id):
        # Setzen der Projekt ID
        self._projekt_id = projekt_id
    
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Aktivitaet: {self.get_bezeichnung()}, {self.get_kapazitaet()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Aktivitaet().
        obj = Aktivitaet()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_kapazitaet(dictionary["kapazitaet"])
        obj.set_projekt_id(dictionary["projekt_id"])
        return obj