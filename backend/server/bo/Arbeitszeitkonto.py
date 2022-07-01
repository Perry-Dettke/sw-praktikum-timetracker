#import BusinessObjekt as bo
import server.bo.BusinessObjekt as bo
import datetime

class Arbeitszeitkonto(bo.BusinessObjekt):
    # Die Klasse BusinessObjekt dient als Basisklasse für alle Objekte in der Klasse Arbeitszeitkonto
    def __init__(self):
        # Definieren der Attribute, der Klasse Arbeitszeitkonto
        super().__init__()
        self._gesamtstunden = 0.0
        self._urlaubstage = round(((13- int(datetime.datetime.now().strftime("%m"))) * 2.5),0)
        self._krankheitstage = 0


    def get_gesamtstunden(self):
        # Ausgeben der Gesamtstunden
        return self._gesamtstunden
    
    def set_gesamtstunden(self, gesamtstunden):
        # Setzen der Gesamtstunden
        self._gesamtstunden = gesamtstunden

    def get_urlaubstage(self):
        # Ausgeben der Uralubstage
        return self._urlaubstage
    
    def set_urlaubstage(self, urlaubstage):
        # Setzen der Gesamtstunden
        self._urlaubstage = urlaubstage

    def get_krankheitstage(self):
        # Ausgeben der Uralubstage
        return self._krankheitstage
    
    def set_krankheitstage(self, krankheitstage):
        # Setzen der Gesamtstunden
        self._krankheitstage = krankheitstage


        
    def __str__(self):
        #Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz
        return f'Arbeitszeitkonto: {self.get_gesamtstunden()}, {self.get_urlaubstage()}, {self.get_krankheitstage()}'
    
    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in eine Arbeitszeitkonto().
        obj = Arbeitszeitkonto()
        obj.set_gesamtstunden(dictionary["gesamtstunden"])
        obj.set_urlaubstage(dictionary["urlaubstage"])
        obj.set_krankheitstage(dictionary["krankheitstage"])
        return obj