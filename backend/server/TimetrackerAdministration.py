from .bo.Aktivitaet import Aktivitaet
from .bo.Arbeitszeitkonto import Arbeitszeitkonto
from .bo.Buchung import Buchung
from .bo.Ereignis import Ereignis
from .bo.Person import Person
from .bo.Projekt import Projekt
from .bo.Zeitintervall import Zeitintervall

from .db.AktivitaetMapper import AktivitaetMapper
from .db.ArbeitszeitkontoMapper import ArbeitszeitkontoMapper
from .db.BuchungMapper import BuchungMapper
from .db.EreignisMapper import EreignisMapper
from .db.PersonMapper import PersonMapper
from .db.ProjektMapper import ProjektMapper
from .db.ZeitintervallMapper import ZeitintervallMapper


class TimetrackerAdministration (object):
   
    def __init__(self):
        pass

    """
    Aktivitaet-spezifische Methoden
    """
    def create_aktivitaet(self, aktivitaet): 
        """Aktivitaet anlegen"""
        with AktivitaetMapper() as mapper:
            return mapper.insert(aktivitaet)

    def get_aktivitaet_by_id(self, id):
        """Die Aktivitaet mit der gegebenen  ID auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_by_id(id)

    # def get_aktivitaet_by_projekt_id(self, projekt_id):
    #     """Die Aktivitaet mit der gegebenen Projekt ID auslesen."""
    #     with AktivitaetMapper() as mapper:
    #         return mapper.find_by_projekt_id(projekt_id)

### Stunden
    def get_aktivitaet_by_projekt_id(self, projekt_id):
        """Die Aktivitaet mit der gegebenen Projekt ID auslesen."""

        with AktivitaetMapper() as mapper:
            akitvitaetliste = mapper.find_by_projekt_id(projekt_id)
        with BuchungMapper() as mapper:
            
            
            for i in akitvitaetliste:

                buchungliste = mapper.find_by_aktivitaet_id(i.get_id())
                stunden = 0
                for a in buchungliste:
                    stunden += a.get_stunden()

                i.set_stunden(stunden)

        return akitvitaetliste



    def get_person_by_aktivitaet_id(self, aktivitaet_id):
        person_id_liste = []
        with BuchungMapper() as mapper:
            buchungliste = mapper.find_by_aktivitaet_id(aktivitaet_id)

            for i in buchungliste:
                if i.get_person_id() not in person_id_liste:
                    person_id_liste.append(i.get_person_id())


        with PersonMapper() as mapper:
            personliste = []

            for i in person_id_liste:
                personliste.append(mapper.find_by_id(i))
                
            
            with BuchungMapper() as mapper:
                for j in personliste:
                    buchungsliste = mapper.find_by_person_id(j.get_id())
                    stunden = 0
                    for a in buchungliste:
                        stunden += a.get_stunden()

                    j.set_stunden(stunden)

            return personliste








    def save_aktivitaet(self, aktivitaet):
        """Die gegebenen Aktivitaet speichern."""
        with AktivitaetMapper() as mapper:
            mapper.update(aktivitaet)

    def delete_aktivitaet(self, aktivitaet):
        """Die gegebenene Aktivitaet aus unserem System löschen."""
        with AktivitaetMapper() as mapper:
            mapper.delete(aktivitaet)
        with BuchungMapper() as mapper:
            mapper.delete_by_aktivitaet_id(aktivitaet)


    """
    Arbeitszeitkonto-spezifische Methoden
    """
    def create_arbeitszeitkonto(self, arbeitszeitkonto): 
        """Arbeitszeitkonto anlegen"""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.insert(arbeitszeitkonto)

    def get_arbeitszeitkonto_by_id(self, id):
        """Das Arbeitszeitkonto mit der gegebenen ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_arbeitszeitkonto(self):
        """Alle Arbeitszeitkonto auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_all()

    def save_arbeitszeitkonto(self, arbeitszeitkonto):
        """Das gegebenen Arbeitszeitkonto speichern."""
        with ArbeitszeitkontoMapper() as mapper:
            mapper.update(arbeitszeitkonto)

    def delete_arbeitszeitkonto(self, arbeitszeitkonto):
        """Das gegebenene Arbeitszeitkonto aus unserem System löschen."""
        with ArbeitszeitkontoMapper() as mapper:
            mapper.delete(arbeitszeitkonto)

    def get_arbeitszeitkonto_by_person_id(self, person_id):
        """Die Arbeitszeitkonten mit der gegebenen Personen ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_by_person_id(person_id)

    """
    Buchung-spezifische Methoden
    """
    def create_buchung(self, buchung): 
        """Buchung anlegen"""
        with BuchungMapper() as mapper:
            return mapper.insert(buchung)

    def get_buchung_by_id(self, id):
        """Die Buchung mit der gegebenen ID auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_by_id(id)

    def get_buchung_by_person_id(self, person_id):
        """Die Buchung mit der gegebenen Person ID auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_by_person_id(person_id)

    def get_buchung_by_aktivitaet_id(self, aktivitaet_id):
        """Die Buchung mit der gegebenen Aktivitaet ID auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_by_aktivitaet_id(aktivitaet_id)

    # def get_buchung_by_datum(self, aktivitaet_id, start, ende):
    #     """Die Buchung mit der gegebenen Aktivitaet ID auslesen."""
    #     with BuchungMapper() as mapper:
    #         return mapper.find_by_datum(aktivitaet_id, start, ende)

    def get_all_buchung(self):
        """Alle Buchungen auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_all()

    def save_buchung(self, buchung):
        """Die gegebenen Buchung speichern."""
        with BuchungMapper() as mapper:
            mapper.update(buchung)

    def delete_buchung(self, id):
        """Die gegebenene Buchung aus unserem System löschen."""
        with BuchungMapper() as mapper:
            mapper.delete(id)


    """
    Ereignis-spezifische Methoden
    """
    def create_ereignis(self, ereignis): 
        """Ereignis anlegen"""
        with EreignisMapper() as mapper:
            return mapper.insert(ereignis)

    def get_ereignis_by_id(self, id):
        """Das Ereignis mit der gegebenen ID auslesen."""
        with EreignisMapper() as mapper:
            return mapper.find_by_id(id)

    def get_ereignis_by_erstellungs_zeitpunkt(self, erstellungs_zeitpunkt):       
        """Das Ereignis mit dem gegebenen Erstellungszeitpunkt auslesen."""
        with EreignisMapper() as mapper:
            return mapper.find_by_erstellungs_zeitpunkt(erstellungs_zeitpunkt)     #muss noch im Mapper geschrieben werden
                                                                                    #falls benötigt wird

    def get_all_ereignis(self):
        """Alle Ereignise auslesen."""
        with EreignisMapper() as mapper:
            return mapper.find_all()

    def save_ereignis(self, ereignis):
        """Das gegebenen Ereignis speichern."""
        with EreignisMapper() as mapper:
            mapper.update(ereignis)

    def delete_ereignis(self, ereignis):
        """Das gegebenene Ereignis aus unserem System löschen."""
        with EreignisMapper() as mapper:
            mapper.delete(ereignis)


    """
    Person-spezifische Methoden
    """
    def create_person(self, person): 
        """Person anlegen"""
        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_id(self, id):
        """Den Personen mit der gegebenen ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_person_by_email(self, email):
        """Alle Personen mit gegebener E-Mail-Adresse auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_email(email)

    def get_person_by_google_user_id(self, id):
        """Den Personen mit der gegebenen Google ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_person(self):
        """Alle Personen auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_all()

    def save_person(self, person):
        """Die gegebenen Person speichern."""
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self, id):
        """Die gegebenene Person aus unserem System löschen."""
        with PersonMapper() as mapper:
            a = mapper.find_by_id(id)
        with ArbeitszeitkontoMapper() as mapper:
            mapper.delete(a.get_arbeitszeitkonto_id())
        with PersonMapper() as mapper:
            mapper.delete(id)
        with BuchungMapper() as mapper:
            mapper.delete_by_person_id(id)

    def add_person_google_user_id(self,google_user_id):
        with PersonMapper() as mapper:
            mapper.insert_firebase(google_user_id)      #fehlt noch im Mapper
    """
    Projekt-spezifische Methoden
    """
    def create_projekt(self, projekt): 
        """Projekt anlegen."""
        with ProjektMapper() as mapper:
            return mapper.insert(projekt)

    def get_projekt_by_id(self, id):
        """Das Projekt mit der gegebenen ID auslesen."""
        with ProjektMapper() as mapper:
            return mapper.find_by_id(id)          

    def get_projekt_by_projektersteller_id(self, projektersteller_id):       
        """Das Projekt mit dem gegebenen Projektersteller auslesen."""
        with ProjektMapper() as mapper:
            return mapper.find_by_projektersteller_id(projektersteller_id)     

    def get_all_projekt(self):
        """Alle Projekt auslesen."""
        with ProjektMapper() as mapper:
            return mapper.find_all()

    def save_projekt(self, projekt):
        """Das gegebenen Projekt speichern."""
        with ProjektMapper() as mapper:
            mapper.update(projekt)

    def delete_projekt(self, id):
        """Das gegebenene Projekt aus unserem System löschen."""
        with AktivitaetMapper() as mapper:
            akitivitaetliste = mapper.find_by_projekt_id(id)
        with BuchungMapper() as mapper:
            for i in akitivitaetliste:
                mapper.delete_by_aktivitaet_id(i.get_id())
        with AktivitaetMapper() as mapper:
            mapper.delete_by_projekt_id(id)
        with ProjektMapper() as mapper:
            mapper.delete_person_in_projekt(id)
            mapper.delete(id)

    def get_person_in_projekt(self, projekt_id):
        """Die Teilnehmer eines Projekts auslesen."""
        with ProjektMapper() as mapper:
            id_list = mapper.find_person_in_projekt(projekt_id)
        personen_list = []
        for id in id_list:
            with PersonMapper() as mapper:
                personen_list.append(mapper.find_by_id(id))
        return personen_list
  
    def get_projekt_by_person(self, person_id):
        """Die Projekte einer Person auslesen."""
        with ProjektMapper() as mapper:
            id_list = mapper.find_projekt_by_person(person_id)
        projekt_list = []
        for id in id_list:
            with ProjektMapper() as mapper:
                projekt_list.append(mapper.find_by_id(id))
        return projekt_list

    def create_person_in_projekt(self, projekt_id, person_id_list): 
        """Person in Projekt anlegen."""
        with ProjektMapper() as mapper:
            for person_id in person_id_list:
                mapper.insert_person_in_projekt(projekt_id, person_id)
            return mapper.find_by_id(projekt_id)
        
    def update_person_in_projekt(self, projekt_id, person_id_list): 
        """Person in Projekt bearbeiten."""
        self.delete_person_projekt(projekt_id)
        with ProjektMapper() as mapper:
            for person_id in person_id_list:
                mapper.insert_person_in_projekt(projekt_id, person_id)
            return mapper.find_by_id(projekt_id)

    def delete_person_projekt(self, projekt_id):
        """Eine Person aus dem gegebenenen Projekt aus unserem System löschen."""
        with ProjektMapper() as mapper:
            mapper.delete_person_in_projekt(projekt_id)
                
            

    """
    Zeitintervall-spezifische Methoden
    """
    def create_zeitintervall(self, zeitintervall): 
        """Zeitintervall anlegen"""
        with ZeitintervallMapper() as mapper:
            return mapper.insert(zeitintervall)

    def get_zeitintervall_by_id(self, id):
        """Das Zeitintervall mit der gegebenen ID auslesen."""
        with ZeitintervallMapper() as mapper:
            return mapper.find_by_id(id)
   
    def get_all_zeitintervall(self):
        """Alle Zeitintervalle auslesen."""
        with ZeitintervallMapper() as mapper:
            return mapper.find_all()

    def save_zeitintervall(self, zeitintervall):
        """Das gegebenen Zeitintervall speichern."""
        with ZeitintervallMapper() as mapper:
            mapper.update(zeitintervall)

    def delete_zeitintervall(self, zeitintervall):
        """Das gegebenene Zeitintervall aus unserem System löschen."""
        with ZeitintervallMapper() as mapper:
            mapper.delete(zeitintervall)

if (__name__ == "__main__"):
    with ZeitintervallMapper() as mapper:
        result = mapper.find_all()
        for zeitintervall in result:
            print(zeitintervall)


