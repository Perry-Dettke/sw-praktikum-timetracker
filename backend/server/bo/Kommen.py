#import BusinessObjekt as bo
import server.bo.Ereignis as bo

class Kommen(bo.Ereignis):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Akitivitaet
    def __init__(self):
        # Definieren der Attribute, der Klasse Aktivitaet
        super().__init__()


    def __str__(self):
        """ Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz. """
        return f'Kommen: '
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """ Umwandeln eines Python dict() in ein Kommen(). """
        obj = Kommen()
        return obj