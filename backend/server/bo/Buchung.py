#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo


class Buchung(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Buchung
    def __init__(self):
        # Definieren der Attribute, der Klasse Buchung
        super().__init__()
        self._erstellt_von = ''
        self._arbeitszeitkonto_id
        
    def get_erstellt_von(self):
        # Ausgeben von erstellt_von
        return self._erstellt_von
    
    def set_erstellt_von(self, erstellt_von):
        # Setzen von erstellt_von
        self._erstellt_von = erstellt_von
    
    def get_arbeitszeitkonto_id(self):
        # Ausgeben der Arbeitszeitkonto ID
        return self._arbeitszeitkonto_id
    
    def set_arbeitszeitkonto_id(self, arbeitszeitkonto_id):
        # Setzen der Arbeitszeitkonto ID
        self._arbeitszeitkonto_id = arbeitszeitkonto_id

    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Buchung: {self.get_erstellt_von()},{self.get_arbeitszeitkonto_id()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Buchung().
        obj = Buchung()
        obj.set_erstellt_von(dictionary["erstellt_von"])
        obj.set_arbeitszeitkonto_id(dictionary["arbeitszeitkonto_id"])
        return obj