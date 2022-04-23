from abc import ABC

class BusinessObjekt(ABC):
    # Die abstrakte Klasse ABC dient als Basiskalsse für alle Objekte in der Klasse BusinessObjekt
    def __init__(self):
        self._id = 0
        self._letzte_aenderung = 0
        
    def get_id(self):
        #Auslesen der ID
        return self._id
    
    def set_id(self, id):
        #Setzen der ID
        self._id = id
        
    def get_letzte_aenderung(self):
        #Auslesen der letzten Aenderung
        return self._letzte_aenderung
    
    def set_letzte_aenderung(self, letzte_aenderung):
        #Setzen der letzten Änderung
        self._letzte_aenderung = letzte_aenderung
        
    