#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo
import datetime


class Buchung(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Buchung
    def __init__(self):
        # Definieren der Attribute, der Klasse Buchung
        super().__init__()
        self._datum = datetime.date.today()
        self._stunden = 0.0
        self._arbeitszeitkonto_id = 0

        
    def get_datum(self):
        # Ausgeben des Datums 
        return self._datum
    
    def set_datum(self, datum):
        # Setzen des Datums
        self._datum = datum

    def get_stunden(self):
        # Ausgeben der Stunden
        return self._stunden
    
    def set_stunden(self, stunden):
        # Setzen der Stunden 
        self._stunden = stunden
    
    def get_arbeitszeitkonto_id(self):
        # Ausgeben der Arbeitszeitkonto ID
        return self._arbeitszeitkonto_id
    
    def set_arbeitszeitkonto_id(self, arbeitszeitkonto_id):
        # Setzen der Arbeitszeitkonto ID
        self._arbeitszeitkonto_id = arbeitszeitkonto_id



    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Buchung: {self.get_datum()},{self.get_stunden()},{self.get_arbeitszeitkonto_id()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Buchung().
        obj = Buchung()
        obj.set_datum(dictionary["datum"])
        obj.set_stunden(dictionary["stunden"])
        obj.set_arbeitszeitkonto_id(dictionary["arbeitszeitkonto_id"])
        return obj