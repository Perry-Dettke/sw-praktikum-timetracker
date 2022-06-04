#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo

class Arbeitszeitkonto(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
        super().__init__()
        self._gesamtstunden = 0.0


    def get_gesamtstunden(self):
        # Ausgeben der Gesamtstunden
        return self._gesamtstunden
    
    def set_gesamtstunden(self, gesamtstunden):
        # Setzen der Gesamtstunden
        self._gesamtstunden = gesamtstunden


        
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Arbeitszeitkonto: {self.get_gesamtstunden()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Arbeitszeitkonto().
        obj = Arbeitszeitkonto()
        obj.set_gesamtstunden(dictionary["gesamtstunden"])
        return obj