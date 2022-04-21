import BusinessObjekt as bo

class Zeitintervall(bo):
    """ Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Ereignis. """
    def __init__(self):
        """ Definieren der Attribute, der Klasse Ereignis. """
        super().__init__()
        self._start = 0.0
	    self._ende = 0.0
        
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
    
    def __str__(self):
        """ Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. """
        return f'Zeitintervall: {self.get_start()}, {self.get_ende()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Zeitintervall(). """
        obj = Zeitintervall()
        obj.set_start(dictionary["start"])
        obj.set_ende(dictionary["ende"])
        return obj

# erstellt von Rosalie Kripp