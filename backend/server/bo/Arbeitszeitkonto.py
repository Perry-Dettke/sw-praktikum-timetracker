#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo

class Arbeitszeitkonto(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
        super().__init__()
        self._arbeitsleistung = 0.0

    def get_arbeitsleistung(self):
        # Ausgeben der Arbeitsleistung
        return self._arbeitsleistung
    
    def set_arbeitsleistung(self, arbeitsleistung):
        # Setzen der Arbeitsleistung
        self._arbeitsleistung = arbeitsleistung

        
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Arbeitszeitkonto: {self.get_arbeitsleistung()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Arbeitszeitkonto().
        obj = Arbeitszeitkonto()
        obj.set_arbeitsleistung(dictionary["arbeitsleistung"])
        return obj