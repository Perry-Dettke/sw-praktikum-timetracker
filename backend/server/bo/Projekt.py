#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo

class Projekt(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Ereignis.
    def __init__(self):
        # Definieren der Attribute, der Klasse Projekt.
        super().__init__()
        self._bezeichnung = ""
        self._auftraggeber = ""
        self.startzeitraum = ""
        self.endzeitraum = ""
        self._projektersteller_id = 0
        
    def get_bezeichnung(self):
        # Ausgeben der Bezeichnung.
        return self._bezeichnung
    
    def set_bezeichnung(self, bezeichnung):
        # Setzen der Bezeichnung.
        self._bezeichnung = bezeichnung
    
    def get_auftraggeber(self):
        # Ausgeben des Auftraggebers.
        return self._auftraggeber
    
    def set_auftraggeber(self, auftraggeber):
        # Setzen des Auftragebers.
        self._auftraggeber = auftraggeber

    def get_startzeitraum(self):
        # Ausgeben des Startzeitraum.
        return self._startzeitraum
    
    def set_startzeitraum(self, startzeitraum):
        # Setzen des Startzeitraum.
        self._startzeitraum = startzeitraum
    
    def get_endzeitraum(self):
        # Ausgeben des Endzeitraum.
        return self._endzeitraum
    
    def set_endzeitraum(self, endzeitraum):
        # Setzen des Endzeitraum.
        self._endzeitraum = endzeitraum

    def get_projektersteller_id(self):
        # Ausgeben der Projektersteller ID.
        return self._projektersteller_id
    
    def set_projektersteller_id(self, projektersteller_id):
        # Setzen der Projektersteller ID.
        self._projektersteller_id = projektersteller_id





    def __str__(self):
        # Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.
        return f'Projekt: {self.get_bezeichnung()}, {self.get_auftraggeber()}, {self.get_projektersteller_id()}, {self.get_startzeitraum()}, {self.get_endzeitraum()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        # Umwandeln eines Python dict() in ein Projekt().
        obj = Projekt()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_auftraggeber(dictionary["auftraggeber"])
        obj.set_startzeitraum(dictionary["startzeitraum"])
        obj.set_endzeitraum(dictionary["endzeitraum"])
        obj.set_projektersteller_id(dictionary["projektersteller_id"])
        return obj