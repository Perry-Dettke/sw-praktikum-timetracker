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
    def create_aktivitaet(self, letzte_aenderung, bezeichnung, kapazitaet):
        """Eine Aktivitaet anlegen"""
        aktivitaet = Aktivitaet()
        aktivitaet.set_letzte_aenderung(letzte_aenderung)
        aktivitaet.set_bezeichnung(bezeichnung)
        aktivitaet.set_bezeichnung(kapazitaet)
        aktivitaet.set_id(1)

        with AktivitaetMapper() as mapper:
            return mapper.insert(aktivitaet)

    def get_aktivitaet_by_id(self, id):
        """Die Aktivitaet mit der gegebenen ID auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_by_id(id)

    def get_aktivitaet_by_projekt_id(self, projekt_id):
        """Die Aktivitaet mit der gegebenen Projekt ID auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_by_projekt_id(projekt_id)

    def get_aktivitaet_by_kapazitaet(self, kapazitaet):
        """Die Aktivitaet mit der gegebenen kapazitaet auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_by_kapazitaet(kapazitaet)            # muss noch im Mapper geschrieben werden falls benötigt wird

    def get_all_aktivitaet(self):
        """Alle Aktivitaeten auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_all()

    def save_aktivitaet(self, aktivitaet):
        """Die gegebenen Aktivitaet speichern."""
        with AktivitaetMapper() as mapper:
            mapper.update(aktivitaet)

    def delete_aktvitaet(self, aktivitaet):
        """Die gegebenene Aktivitaet aus unserem System löschen."""
        with AktivitaetMapper() as mapper:
            mapper.delete(aktivitaet)


    """
    Arbeitszeitkonto-spezifische Methoden
    """
    def create_arbeitszeitkonto(self, letzte_aenderung, arbeitsleistung, buchung_id):
        """Ein Arbeitszeitkonto anlegen"""
        arbeitszeitkonto = Arbeitszeitkonto()
        arbeitszeitkonto.set_letzte_aenderung(letzte_aenderung)
        arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
        arbeitszeitkonto.set_buchung_id(buchung_id)
        arbeitszeitkonto.set_id(1)

        with ArbeitszeitkontoMapper() as mapper:
            return mapper.insert(arbeitsleistung)

    def get_arbeitszeitkonto_by_id(self, id):
        """Das Arbeitszeitkonto mit der gegebenen ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_by_id(id)

    def get_arbeitszeitkonto_by_buchung_id(self, buchung_id):
        """Das Arbeitszeitkonto mit der gegebenen Buchungs ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_by_buchung_id(buchung_id)

    def get_all_arbeitszeitkonto(self):
        """Alle Arbeitszeitkonto auslesen."""
        with Arbeitszeitkonto() as mapper:
            return mapper.find_all()

    def save_arbeitszeitkonto(self, arbeitszeitkonto):
        """Das gegebenen Arbeitszeitkonto speichern."""
        with ArbeitszeitkontoMapper() as mapper:
            mapper.update(arbeitszeitkonto)

    def delete_arbeitszeitkonto(self, arbeitszeitkonto):
        """Das gegebenene Arbeitszeitkonto aus unserem System löschen."""
        with Arbeitszeitkonto() as mapper:
            mapper.delete(arbeitszeitkonto)



    """
    Buchung-spezifische Methoden
    """
    def create_buchung(self, letzte_aenderung, erstellt_von):
        """Eine Buchung anlegen"""
        buchung = Buchung()
        buchung.set_letzte_aenderung(letzte_aenderung)
        buchung.set_erstellt_von(erstellt_von)
        buchung.set_id(1)

        with BuchungMapper() as mapper:
            return mapper.insert(buchung)

    def get_buchung_by_id(self, id):
        """Die Buchung mit der gegebenen ID auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_by_id(id)

    def get_buchung_by_erstellt_von(self, erstellt_von):       
        """Die Buchung mit der gegebenen Person, die die Buchung erstellt hat auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_by_erstellt_von(erstellt_von)                #muss noch im Mapper geschrieben werden

    def get_all_buchung(self):
        """Alle Buchungen auslesen."""
        with BuchungMapper() as mapper:
            return mapper.find_all()

    def save_buchung(self, buchung):
        """Die gegebenen Buchung speichern."""
        with BuchungMapper() as mapper:
            mapper.update(buchung)

    def delete_buchung(self, buchung):
        """Die gegebenene Buchung aus unserem System löschen."""
        with BuchungMapper() as mapper:
            mapper.delete(buchung)


    """
    Ereignis-spezifische Methoden
    """
    def create_ereignis(self, letzte_aenderung, erstellungs_zeitpunkt):
        """Ein Ereignis anlegen"""
        ereignis = Ereignis()
        ereignis.set_letzte_aenderung(letzte_aenderung)
        ereignis.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
        ereignis.set_id(1)

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
    def create_person(self, letzte_aenderung, vor_name, nach_name, email, benutzer_name, arbeitszeitkonto_id, projekt_id, google_user_id):
        """Einen Benutzer anlegen"""
        person = Person()
        person.set_letzte_aenderung(letzte_aenderung)
        person.set_vor_name(vor_name)
        person.set_nach_name(nach_name)
        person.set_email(email)
        person.set_benutzer_name(benutzer_name)
        person.set_arbeitszeitkonto_id(arbeitszeitkonto_id)
        person.set_projekt_id(projekt_id)
        person.set_google_user_id(google_user_id)
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_vor_name(self, vor_name):
        """Alle Personen mit Vornamen name auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_vor_name(vor_name)

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

    def delete_person(self, person):
        """Die gegebenene Person aus unserem System löschen."""
        with PersonMapper() as mapper:
            mapper.delete(person)

    def add_person_google_user_id(self,google_user_id):
        with PersonMapper() as mapper:
            mapper.insert_firebase(google_user_id)      #fehlt noch im Mapper
    """
    Projekt-spezifische Methoden
    """
    def create_projekt(self, letzte_aenderung, bezeichnung, auftraggeber):
        """Ein Projekt anlegen"""
        projekt = Projekt()
        projekt.set_letzte_aenderung(letzte_aenderung)
        projekt.set_bezeichnung(bezeichnung)
        projekt.set_auftraggeber(auftraggeber)
        projekt.set_id(1)

        with ProjektMapper() as mapper:
            return mapper.insert(projekt)

    def get_projekt_by_id(self, id):
        """Das Projekt mit der gegebenen ID auslesen."""
        with ProjektMapper() as mapper:
            return mapper.find_by_id(id)            #fehlt noch im Mapper

    def get_projekt_by_auftraggeber(self, auftraggeber):       
        """Das Projekt mit dem gegebenen Auftraggeber auslesen."""
        with ProjektMapper() as mapper:
            return mapper.find_by_auftraggeber(auftraggeber)     

    def get_all_projekt(self):
        """Alle Projekt auslesen."""
        with ProjektMapper() as mapper:
            return mapper.find_all()

    def save_projekt(self, projekt):
        """Das gegebenen Projekt speichern."""
        with ProjektMapper() as mapper:
            mapper.update(projekt)

    def delete_projekt(self, projekt):
        """Das gegebenene Projekt aus unserem System löschen."""
        with ProjektMapper() as mapper:
            mapper.delete(projekt)

    """
    Zeitintervall-spezifische Methoden
    """
    def create_zeitintervall(self, letzte_aenderung, start, ende):
        """Ein Zeintervall anlegen"""
        zeitintervall = Zeitintervall()
        zeitintervall.set_letzte_aenderung(letzte_aenderung)
        zeitintervall.set_start(start)
        zeitintervall.set_ende(ende)
        zeitintervall.set_id(1)

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
