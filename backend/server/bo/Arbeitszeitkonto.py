import BusinessObjekt as bo

class Arbeitszeitkonto(bo):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
        super().__init__()
        self._arbeitsleistung = 0.0
        self._buchung = 0
        
    def get_arbeitsleistung(self):
        # Ausgeben der Arbeitsleistung
        return self._arbeitsleistung
    
    def set_arbeitsleistung(self, arbeitsleistung):
        # Setzen der Arbeitsleistung
        self._bezeichnung = arbeitsleistung
        
    def get_buchung(self):
        # Ausgeben der Buchung
        return self._buchung
    
    def set_buchung(self, buchung):
        # Setzen der Buchung
        self._buchung = buchung
        
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Arbeitszeitkonto: {self.get_arbeitsleistung()}, {self.get_buchung()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Arbeitszeitkonto().
        obj = Arbeitszeitkonto()
        obj.set_arbeitsleistung(dictionary["arbeitsleistung"])
        obj.set_buchung(dictionary["buchung"])
        return obj