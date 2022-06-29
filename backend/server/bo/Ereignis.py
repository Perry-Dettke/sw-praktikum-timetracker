#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo
import datetime

class Ereignis(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Ereignis.
    def __init__(self):
        # Definieren der Attribute, der Klasse Ereignis. 
        super().__init__()
        self._erstellungs_zeitpunkt = datetime.datetime.now()
        
    def get_erstellungs_zeitpunkt(self):
        # Ausgeben des Erstellungszeitpunkts.
        return self._erstellungs_zeitpunkt
    
    def set_erstellungs_zeitpunkt(self, erstellungs_zeitpunkt):
        # Setzen des Erstellungszeitpunkts.
        self._erstellungs_zeitpunkt = erstellungs_zeitpunkt
    
    def __str__(self):
        # Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.
        return f'Ereignis: {self.get_erstellungs_zeitpunkt()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        # Umwandeln eines Python dict() in ein Ereignis().
        obj = Ereignis()
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj

