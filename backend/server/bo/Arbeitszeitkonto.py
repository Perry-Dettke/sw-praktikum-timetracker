import BusinessObjekt as bo

class Arbeitszeitkonto(bo):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
        super().__init__()
        self._arbeitsleistung = 0.0
        self._buchung_id = 0
        
    def get_arbeitsleistung(self):
        # Ausgeben der Arbeitsleistung
        return self._arbeitsleistung
    
    def set_arbeitsleistung(self, arbeitsleistung):
        # Setzen der Arbeitsleistung
        self._bezeichnung = arbeitsleistung
        
    def get_buchung_id(self):
        # Ausgeben der Buchungs ID
        return self._buchung_id
    
    def set_buchung_id(self, buchung_id):
        # Setzen der Buchungs ID
        self._buchung_id = buchung_id
        
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Arbeitszeitkonto: {self.get_arbeitsleistung()}, {self.get_buchung_id()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Arbeitszeitkonto().
        obj = Arbeitszeitkonto()
        obj.set_arbeitsleistung(dictionary["arbeitsleistung"])
        obj.set_buchung_id(dictionary["buchung_id"])
        return obj