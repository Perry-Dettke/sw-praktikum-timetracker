#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo

class Projekt(bo.BusinessObjekt):
    """ Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Ereignis. """
    def __init__(self):
        """ Definieren der Attribute, der Klasse Ereignis. """
        super().__init__()
        self._bezeichnung = ""
        self._auftraggeber = ""

        
    def get_bezeichnung(self):
        """ Ausgeben der Bezeichnung. """
        return self._bezeichnung
    
    def set_bezeichnung(self, bezeichnung):
        """ Setzen der Bezeichnung. """
        self._bezeichnung = bezeichnung
    
    def get_auftraggeber(self):
        """ Ausgeben des Auftraggebers. """
        return self._auftraggeber
    
    def set_auftraggeber(self, auftraggeber):
        """ Setzen des Auftragebers. """
        self._auftraggeber = auftraggeber



    def __str__(self):
        """ Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. """
        return f'Projekt: {self.get_bezeichnung()}, {self.get_auftraggeber()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Projekt(). """
        obj = Projekt()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_auftraggeber(dictionary["auftraggeber"])
        return obj

# erstellt von Rosalie Kripp