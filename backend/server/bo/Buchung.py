import BusinessObjekt as bo

class Buchung(bo):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Buchung
    def __init__(self):
        # Definieren der Attribute, der Klasse Buchung
        self._erstellt_von = ''
        
    def get_erstellt_von(self):
        # Ausgeben von erstellt_von
        return self._erstellt_von
    
    def set_erstellt_von(self, erstellt_von):
        # Setzen von erstellt_von
        self._erstellt_von = erstellt_von
        