#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo
import datetime

class Zeitintervall(bo.BusinessObjekt):
    """ Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Ereignis. """
    def __init__(self):
        """ Definieren der Attribute, der Klasse Ereignis. """
        super().__init__()
        self._start = ""
        self._ende = ""
        self._dauer = 0.0
        self._pausen_start = ""
        self._pausen_ende = ""
        self._pausen_dauer = 0.0
        self._person_id = 0
        
    def get_start(self):
        """ Ausgeben des Startzeitpunkts. """
        return self._start
    
    def set_start(self, start):
        """ Setzen des Startzeitpunkts. """
        self._start = start

    def get_ende(self):
        """ Ausgeben des Endezeitpunkts. """
        return self._ende
    
    def set_ende(self, ende):
        """ Setzen des Endezeitpunkts. """
        self._ende = ende

    def get_dauer(self):
        """ Ausgeben der Dauer. """
        return self._dauer
    
    def set_dauer(self, dauer):
        """ Setzen der Dauer. """
        self._dauer = dauer

    def get_pausen_start(self):
        """ Ausgeben des Startzeitpunkts der Pause. """
        return self._pausen_start
    
    def set_pausen_start(self, pausen_start):
        """ Setzen des Startzeitpunkts der Pause. """
        self._pausen_start = pausen_start

    def get_pausen_ende(self):
        """ Ausgeben des Endezeitpunkts der Pause. """
        return self._pausen_ende
    
    def set_pausen_ende(self, pausen_ende):
        """ Setzen des Endezeitpunkts der Pause. """
        self._pausen_ende = pausen_ende

    def get_pausen_dauer(self):
        """ Ausgeben der Dauer der Pause. """
        return self._pausen_dauer
    
    def set_pausen_dauer(self, pausen_dauer):
        """ Setzen der Dauer der Pause. """
        self._pausen_dauer = pausen_dauer

    def get_person_id(self):
        """ Ausgeben der Person ID. """
        return self._person_id
    
    def set_person_id(self, person_id):
        """ Setzen der Person ID. """
        self._person_id = person_id
    
    def __str__(self):
        """ Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. """
        return f'Zeitintervall: {self.get_start()}, {self.get_ende()}, {self.get_dauer()}, {self.get_pausen_start()}, {self.get_pausen_ende()}, {self.get_pausen_dauer()}, {self.get_person_id()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Zeitintervall(). """
        obj = Zeitintervall()
        obj.set_start(dictionary["start"])
        obj.set_ende(dictionary["ende"])
        obj.set_dauer(dictionary["dauer"])
        obj.set_pausen_start(dictionary["pausen_start"])
        obj.set_pausen_ende(dictionary["pausen_ende"])
        obj.set_pausen_dauer(dictionary["pausen_dauer"])
        obj.set_person_id(dictionary["person_id"])
        return obj

# erstellt von Rosalie Kripp