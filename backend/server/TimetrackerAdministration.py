from re import A
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
        person.set_user_id(google_user_id)
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_vor_name(self, vor_name):
        """Alle Personen mit Vornamen name auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_vor_name(vor_name)

    def get_person_by_id(self, key):
        """Den Personen mit der gegebenen ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_key(key)

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

    def get_aktivitaet_by_id(self, key):
        """Die Aktivitaet mit der gegebenen ID auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_by_key(key)

    def get_aktivitaet_by_kapazitaet(self, kapazitaet):
        """Die Aktivitaet mit der gegebenen kapazitaet auslesen."""
        with AktivitaetMapper() as mapper:
            return mapper.find_by_kapazitaet(kapazitaet)            # muss noch im Mapper geschrieben werden

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

    def get_arbeitszeitkonto_by_id(self, key):
        """Das Arbeitszeitkonto mit der gegebenen ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_by_key(key)

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