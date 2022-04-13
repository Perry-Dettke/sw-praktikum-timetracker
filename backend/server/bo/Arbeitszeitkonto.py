import BusinessObjekt as bo

class Arbeitszeitkonto(bo):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
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