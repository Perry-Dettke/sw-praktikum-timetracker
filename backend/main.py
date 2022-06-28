'''Unser Service basiert auf Flask'''
#from curses import erasechar
#from distutils.command.build import build
#from re import A
from flask import Flask
'''Auf Flask aufbauend nutzen wir RestX'''
from flask_restx import Api, Resource, fields
'''Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing'''
from flask_cors import CORS
'''Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück'''
from server.TimetrackerAdministration import TimetrackerAdministration
from server.bo.Aktivitaet import Aktivitaet
from server.bo.Arbeitszeitkonto import Arbeitszeitkonto
from server.bo.Buchung import Buchung
from server.bo.Ereignis import Ereignis
from server.bo.Person import Person
from server.bo.Projekt import Projekt
from server.bo.Zeitintervall import Zeitintervall

'''Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt'''
#from SecurityDecorator import secured

"""Hier wird Flask instanziert"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/app/*')

api = Api(app, version='1.0', title='Timetracker API',
          description='Eine rudimentäre Demo-API für Listenerstellung.')

"""Namespaces"""
timetracker = api.namespace('timetracker', description="Funktionen der App")


"""Nachfolgend werden analog zu den BusinessObject-Klassen transferierbare Strukturen angelegt."""

"""BusinessObject dient als Basisklasse."""

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id',
                         description='Der Unique Identifier eines Business Object')                  
})

aktivitaet = api.inherit('Aktivitaet', bo, {
    'bezeichnung': fields.String(attribute='_bezeichnung',
                                description='Bezeichnung einer Aktivitaet'),
    'kapazitaet': fields.Integer(attribute='_kapazitaet',                               # Hier eventuell float?
                                description='Kapazitaet einer Aktivitaet in Stunden'),
    'projekt_id': fields.Integer(attribute='_projekt_id',                               
                                description='Zugehörige Projekt ID der Aktivitaet'),     
    'stunden': fields.Float(attribute='_stunden',                               
                                description='Stunden der Aktivitaet'),    
    'allstunden': fields.Float(attribute='_allstunden',                               
                                description='Stunden der Aktivitaet'),                                                    
})

arbeitszeitkonto = api.inherit('Arbeitszeitkonto', bo, {
    'gesamtstunden': fields.Float(attribute='_gesamtstunden',
                                description='Gesamtstunden einer Person auf dem Arbeitszeitkonto gespeichert'),
    'urlaubstage': fields.Integer(attribute='_urlaubstage',
                                description='Urlaubstage einer Person gespeichert auf dem Arbeitszeitkonto gespeichert'),
    'krankheitstage': fields.Integer(attribute='_krankheitstage',
                                description='Krankheitstage einer Person auf dem Arbeitszeitkonto gespeichert'),
})

buchung = api.inherit('Buchung', bo, {
    'datum': fields.Date(attribute='_datum',
                                description='Datum an dem die Buchung durchgeführt wurde'),
    'stunden': fields.Float(attribute='_stunden',
                                description='Stunden der Buchung'),
    'person_id': fields.Integer(attribute='_person_id',
                                description='ID der Person, die die Buchung durchgeführt hat'),
    'aktivitaet_id': fields.Integer(attribute='_aktivitaet_id',
                                description='ID der Aktivitaet auf die sich die Buchung bezieht'),

})

ereignis = api.inherit('Ereignis', bo, {
    'erstellungs_zeitpunkt': fields.String(attribute='_erstellungs_zeitpunkt',       #DateTime richtig?
                            description='Erstellungszeitpunkt eines Ereignis')
})

person = api.inherit('Person', bo, {
    'vor_name': fields.String(attribute='_vor_name',
                                description='Vorname einer Person'),
    'nach_name': fields.String(attribute='_nach_name',
                                description='Nachname einer Person'),
    'email': fields.String(attribute='_email',
                                description='Email einer Person'),
    'benutzer_name': fields.String(attribute='_benutzer_name',
                                description='Benutzername einer Person'),
    'google_user_id': fields.String(attribute='_google_user_id',
                                description='Gegebene ID von Google'),
    'arbeitszeitkonto_id': fields.Integer(attribute='_arbeitszeitkonto_id',
                                description='Arbeitszeitkonto ID der Person'),
    'stunden': fields.Float(attribute='_stunden',
                                description='stunden der Person'),
})

projekt = api.inherit('Projekt', bo, {
    'bezeichnung': fields.String(attribute='_bezeichnung',
                                description='Bezeichnung eines Projekts'),
    'auftraggeber': fields.String(attribute='_auftraggeber',
                                description='Auftraggeber des Projekts'),
    'startzeitraum': fields.String(attribute='_startzeitraum',
                                description='Startzeitraum des Projekts'),
    'endzeitraum': fields.String(attribute='_endzeitraum',
                                description='Endzeitraum des Projekts'),
    'projektersteller_id': fields.Integer(attribute='_projektersteller_id',
                                description='Projektersteller ID des Projekts'),
})

zeitintervall = api.inherit('Zeitintervall', bo, {
    'start': fields.String(attribute='_start',                             
                            description='Start eines Zeitintervall'),
    'ende': fields.String(attribute='_ende',                                
                            description='Ende eines Zeitintervall'),
    'dauer': fields.Float(attribute='_dauer',                             
                            description='Dauer eines Zeitintervall'),
    'pausen_start': fields.String(attribute='_pausen_start',                             
                            description='Start einer Pause'),
    'pausen_ende': fields.String(attribute='_pausen_ende',                                
                            description='Ende einer Pause'),
    'pausen_dauer': fields.Float(attribute='_pausen_dauer',                             
                            description='Dauer einer Pause'),
    'person_id': fields.Integer(attribute='_person_id',                                
                            description='Person ID die das Zeitintervall erstellt hat'),
})



#Aktivitaet related
@timetracker.route('/aktivitaet')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AktivitaetOperations(Resource):
    @timetracker.marshal_with(aktivitaet)
    #@secured
    def get(self):
        """Auslesen aller Aktivitaet-Objekte
        """
        adm = TimetrackerAdministration()
        akt = adm.get_all_aktivitaet()
        return akt

    @timetracker.marshal_list_with(aktivitaet, code=200)
    @timetracker.expect(aktivitaet)
    #@secured
    def post(self):
        """Anlegen eines neuen Aktivitaet-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = TimetrackerAdministration()
        proposal = Aktivitaet.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            a = adm.create_aktivitaet(proposal)
            return a, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500


@timetracker.route('/aktivitaet/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Aktivitaet-Objekts.')
class AktivitaetIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Aktivitaet-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_aktivitaet(id)
            return '', 200
        else:
            '''Wenn unter id keine Aktivitaet existiert.'''
            return '', 500

    @timetracker.marshal_with(aktivitaet, code=200)
    @timetracker.expect(aktivitaet)  # Wir erwarten ein Aktivitaet-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Aktivitaet-Objekts."""
        adm = TimetrackerAdministration()
        ak = Aktivitaet.from_dict(api.payload)
        
        if ak is not None:
            ak.set_id(id)
            adm.save_aktivitaet(ak)
            return '', 200
        else:
            return '', 500

    @timetracker.marshal_with(aktivitaet)
    def get(self, id):
        """Auslesen eines bestimmten Aktivitaet-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        akt = adm.get_aktivitaet_by_id(id)

        if akt is not None:
            return akt
        else:
            return '', 500 



@timetracker.route('/akitvitaetbyprojektid/<int:projekt_id>/<string:start>/<string:ende>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AktivitaetbyProjektOperations(Resource):
    @timetracker.marshal_with(aktivitaet)
    def get(self, projekt_id, start, ende):
        """Auslesen eines bestimmten Aktivitaets-Objekts aufgrund seiner Projekt ID.
        Das auszulesende Objekt wird durch die ```projekt_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        akt = adm.get_aktivitaet_by_projekt_id(projekt_id, start, ende)

        if akt is not None:
            return akt
        else:
            return '', 500 




#Arbeitszeitkonto related
@timetracker.route('/arbeitszeitkonto')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ArbeitszeitkontoOperations(Resource):
    @timetracker.marshal_with(arbeitszeitkonto)
    #@secured
    def get(self):
        """Auslesen aller Arbeitszeitkonto-Objekte
        """
        adm = TimetrackerAdministration()
        azt = adm.get_all_arbeitszeitkonto()
        return azt

    @timetracker.marshal_list_with(arbeitszeitkonto, code=200)
    @timetracker.expect(arbeitszeitkonto)
    #@secured
    def post(self):
        """Anlegen eines neuen Arbeitszeitkonto-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = TimetrackerAdministration()
        proposal = Arbeitszeitkonto.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            ak = adm.create_arbeitszeitkonto(proposal)
            return ak, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500


@timetracker.route('/arbeitszeitkonto/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Arbeitszeitkonto-Objekts.')
class ArbeitszeitkontoIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Arbeitszeitkonto-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_arbeitszeitkonto(id)
            return '', 200
        else:
            '''Wenn unter id kein Arbeitszeitkonto existiert.'''
            return '', 500

    @timetracker.marshal_with(arbeitszeitkonto, code=200)
    @timetracker.expect(arbeitszeitkonto) 
    #@secured
    def put(self, id):
        """Update eines bestimmten Arbeitszeitkonto-Objekts."""
        adm = TimetrackerAdministration()
        azt = Arbeitszeitkonto.from_dict(api.payload)
        
        if azt is not None:
            azt.set_id(id)
            adm.save_arbeitszeitkonto(azt)
            return '', 200
        else:
            return '', 500

    @timetracker.marshal_with(arbeitszeitkonto)
    def get(self, id):
        """Auslesen eines bestimmten Arbeitszeitkonto-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        azt = adm.get_arbeitszeitkonto_by_id(id)

        if azt is not None:
            return azt
        else:
            return '', 500 


#Buchung related
@timetracker.route('/buchung')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class BuchungOperations(Resource):
    @timetracker.marshal_with(buchung)
    #@secured
    def get(self):
        """Auslesen aller Buchung-Objekte
        """
        adm = TimetrackerAdministration()
        bu = adm.get_all_buchung()
        return bu

    @timetracker.marshal_list_with(buchung, code=200)
    @timetracker.expect(buchung)
    #@secured
    def post(self):
        """Anlegen eines neuen Buchung-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = TimetrackerAdministration()
        proposal = Buchung.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            bu = adm.create_buchung(proposal)
            return bu, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500


@timetracker.route('/buchung/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Buchung-Objekts.')
class BuchungIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Buchung-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_buchung(id)
            return '', 200
        else:
            '''Wenn unter id kein Buchung existiert.'''
            return '', 500

    @timetracker.marshal_with(buchung, code=200)
    @timetracker.expect(buchung)  # Wir erwarten ein Buchung-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Buchung-Objekts."""
        adm = TimetrackerAdministration()
        bu = Buchung.from_dict(api.payload)
        
        if bu is not None:
            bu.set_id(id)
            adm.save_buchung(bu)
            return '', 200
        else:
            return '', 500


    @timetracker.marshal_with(buchung)
    def get(self, id):
        """Auslesen eines bestimmten Buchung-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        bu = adm.get_buchung_by_id(id)

        if bu is not None:
            return bu
        else:
            return '', 500 

@timetracker.route('/buchungbypersonid/<int:person_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class BuchungByPersonIDOperations(Resource):
    @timetracker.marshal_with(buchung)
    def get(self, person_id):
        """Auslesen eines bestimmten Buchung-Objekts aufgrund seiner Arbeitszeitkonto ID.
        Das auszulesende Objekt wird durch die ```person_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        bu = adm.get_buchung_by_person_id(person_id)

        if bu is not None:
            return bu
        else:
            return '', 500 


@timetracker.route('/buchungbyaktivitaetid/<int:aktivitaet_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class BuchungByAktivitaetIDOperations(Resource):
    @timetracker.marshal_with(buchung)
    def get(self, aktivitaet_id):
        """Auslesen eines bestimmten Buchung-Objekts aufgrund seiner Arbeitszeitkonto ID.
        Das auszulesende Objekt wird durch die ```aktivitaet_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        bu = adm.get_buchung_by_aktivitaet_id(aktivitaet_id)

        if bu is not None:
            return bu
        else:
            return '', 500 

#Ereignis related
@timetracker.route('/ereignis')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class EreignisOperations(Resource):
    @timetracker.marshal_with(ereignis)
    #@secured
    def get(self):
        """Auslesen aller Ereignis-Objekte
        """
        adm = TimetrackerAdministration()
        er = adm.get_all_ereignis()
        return er

    @timetracker.marshal_list_with(ereignis, code=200)
    @timetracker.expect(ereignis)
    #@secured
    def post(self):
        """Anlegen eines neuen Ereignis-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = TimetrackerAdministration()
        proposal = Ereignis.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            er = adm.create_ereignis(proposal)
            return er, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500


@timetracker.route('/ereignis/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Ereignis-Objekts.')
class EreignisIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Ereignis-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_ereignis(id)
            return '', 200
        else:
            '''Wenn unter id kein Ereignis existiert.'''
            return '', 500

    @timetracker.marshal_with(ereignis, code=200)
    @timetracker.expect(ereignis)  # Wir erwarten ein Ereignis-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Ereignis-Objekts."""
        adm = TimetrackerAdministration()
        er = Ereignis.from_dict(api.payload)
        
        if er is not None:
            er.set_id(id)
            adm.save_ereignis(er)
            return '', 200
        else:
            return '', 500


    @timetracker.marshal_with(ereignis)
    def get(self, id):
        """Auslesen eines bestimmten Ereignis-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        er = adm.get_ereignis_by_id(id)

        if er is not None:
            return er
        else:
            return '', 500 


#Person related
@timetracker.route('/person')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperations(Resource):
    @timetracker.marshal_with(person)
    #@secured
    def get(self):
        """Auslesen aller Person-Objekte
        """
        adm = TimetrackerAdministration()
        per = adm.get_all_person()
        return per

    @timetracker.marshal_list_with(person, code=200)
    @timetracker.expect(person)
    #@secured
    def post(self):
        """Anlegen eines neuen Person-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = TimetrackerAdministration()
        proposal = Person.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            per = adm.create_person(proposal)
            return per, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500


@timetracker.route('/person/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Person-Objekts.')
class PersonIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Person-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_person(id)
            return '', 200
        else:
            '''Wenn unter id kein Person existiert.'''
            return '', 500

    @timetracker.marshal_with(person, code=200)
    @timetracker.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Person-Objekts."""
        adm = TimetrackerAdministration()
        per = Person.from_dict(api.payload)
        
        if per is not None:
            per.set_id(id)
            adm.save_person(per)
            return '', 200
        else:
            return '', 500

    @timetracker.marshal_with(person)
    def get(self, id):
        """Auslesen eines bestimmten Person-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        pe = adm.get_person_by_id(id)

        if pe is not None:
            return pe
        else:
            return '', 500 


@timetracker.route('/personbyaktivitaet/<int:aktivitaet_id>/<string:start>/<string:ende>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonbyAktivitaetOperations(Resource):
    @timetracker.marshal_with(person)
    def get(self, aktivitaet_id, start, ende):
        """Auslesen eines bestimmten Aktivitaets-Objekts aufgrund seiner Projekt ID.
        Das auszulesende Objekt wird durch die ```aktivitaet_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        per = adm.get_person_by_aktivitaet_id(aktivitaet_id, start, ende)

        if per is not None:
            return per
        else:
            return '', 500 


@timetracker.route('/personbygoogle/<string:google_user_id>')     
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonGoogleOperations(Resource):
    @timetracker.marshal_with(person)
    def get(self, google_user_id):
        """Auslesen eines bestimmten Person-Objekts.
        Das auszulesende Objekt wird durch die ```google_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        pe = adm.get_person_by_google_user_id(google_user_id)
        if pe is not None:
            return pe
        else:
            return '', 500 

    def post(self, google_user_id):
        ''' Person das erste mal anlegen '''
        adm = TimetrackerAdministration()
        adm.add_person_google_user_id(google_user_id)
        return '', 200


@timetracker.route('/personbyarbeitszeitkonto/<string:arbeitszeitkonto_id>')     
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonGoogleOperations(Resource):
    @timetracker.marshal_with(person)
    def get(self, arbeitszeitkonto_id):
        """Auslesen eines bestimmten Person-Objekts.
        Das auszulesende Objekt wird durch die ```arbeitszeitkonto_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        pe = adm.get_person_by_arbeitszeitkonto_id(arbeitszeitkonto_id)
        if pe is not None:
            return pe
        else:
            return '', 500 


#Projekt related
@timetracker.route('/projekt')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektOperations(Resource):
    @timetracker.marshal_with(projekt)
    #@secured
    def get(self):
        """Auslesen aller Projekt-Objekte
        """
        adm = TimetrackerAdministration()
        pro = adm.get_all_projekt()
        return pro

    @timetracker.marshal_list_with(projekt, code=200)
    @timetracker.expect(projekt)
    #@secured
    def post(self):
        """Anlegen eines neuen Projekt-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        print(api.payload)
        adm = TimetrackerAdministration()
        proposal = Projekt.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            a = adm.create_projekt(proposal)
            return a, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500



@timetracker.route('/projekt/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Projekt-Objekts.')
class ProjektIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Projekt-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_projekt(id)
            return '', 200
        else:
            '''Wenn unter id kein Projekt existiert.'''
            return '', 500

    @timetracker.marshal_with(projekt, code=200)
    @timetracker.expect(projekt)  # Wir erwarten ein Projekt-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Projekt-Objekts."""
        adm = TimetrackerAdministration()
        pro = Projekt.from_dict(api.payload)
        
        if pro is not None:
            pro.set_id(id)
            adm.save_projekt(pro)
            return '', 200
        else:
            return '', 500


    @timetracker.marshal_with(projekt)
    def get(self, id):
        """Auslesen eines bestimmten Projekt-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        pro = adm.get_projekt_by_id(id)

        if pro is not None:
            return pro
        else:
            return '', 500 

@timetracker.route('/projektbyprojekterstellerid/<int:projektersteller_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektbyProjekterstellerIDOperations(Resource):
    @timetracker.marshal_with(projekt)
    def get(self, projektersteller_id):
        """Auslesen eines bestimmten Projekt-Objekts aufgrund seiner Projekt ID.
        Das auszulesende Objekt wird durch die ```projektersteller_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        pro = adm.get_projekt_by_projektersteller_id(projektersteller_id)

        if pro is not None:
            return pro
        else:
            return '', 500 

#Projekt-Person Beziehung
@timetracker.route('/projekt_person/<int:person_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('projekt_id', 'Die ID des Projekt-Objekts.')
class ProjektPersonOperations(Resource):
    @timetracker.marshal_list_with(projekt, code=200)
    #@secured
    def get(self, person_id):
        """Auslesen aller Projekte einer Person.
        """
        adm = TimetrackerAdministration()
        pro = adm.get_projekt_by_person(person_id)
        return pro

#Person-Projekt Beziehung
@timetracker.route('/projektbypersonid/<int:projekt_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('person_id', 'Die ID des Person-Objekts.')
class PersonenInProjektOperations(Resource):
    @timetracker.marshal_list_with(person, code=200)
    #@secured
    def get(self, projekt_id):
        """Auslesen aller Teilnehmer eines Projekts
        """
        adm = TimetrackerAdministration()
        personenliste = adm.get_person_in_projekt(projekt_id)
        return personenliste  

    @timetracker.marshal_list_with(projekt, code=200)
    #@secured
    def post(self, projekt_id):
        """Anlegen eines neuen Projekt-Person-Objekts.
        """
        if api.payload:
            adm = TimetrackerAdministration()
            response = adm.create_person_in_projekt(api.payload['projekt_id'], api.payload['person_id_list'])
            return response, 200
        else:
            return '' , 500

    @timetracker.marshal_list_with(projekt, code=200)
    #@secured
    def put(self, projekt_id):
        """Bearbeiten eines Projekt-Person-Objekts.
        """
        if api.payload:
            adm = TimetrackerAdministration()
            response = adm.update_person_in_projekt(api.payload['projekt_id'], api.payload['person_id_list'])
            return response, 200
        else:
            return '' , 500

    def delete(self, projekt_id):
        """Löschen eines bestimmten Projekt-Person-Objekts.
        Das zu löschende Objekt wird durch die ```projekt_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_person_projekt(projekt_id)
            return '', 200
        else:
            '''Wenn unter projekt_id kein Projekt existiert.'''
            return '', 500


@timetracker.route('/projekt_person_datum/<int:projekt_id>/<string:start>/<string:ende>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('projekt_id', 'Die ID des Projekt-Objekts.')
class ProjektPersonOperations(Resource):
    @timetracker.marshal_list_with(person, code=200)
    #@secured
    def get(self, projekt_id, start, ende):
        """Auslesen aller Teilnehmer eines Projekts
        """
        adm = TimetrackerAdministration()
        pro = adm.get_person_in_projekt_stunden(projekt_id, start, ende)
        return pro

@timetracker.route('/projektbyperson/<int:person_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjektByPersonOperations(Resource):
    @timetracker.marshal_list_with(projekt, code=200)
    #@secured
    def get(self, person_id):
        """Auslesen aller Projekte einer Person
        """
        adm = TimetrackerAdministration()
        pro = adm.get_projekt_by_person_id(person_id)
        return pro
    





#Zeitintervall related
@timetracker.route('/zeitintervall')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ZeitintervallOperations(Resource):
    @timetracker.marshal_with(zeitintervall)
    #@secured
    def get(self):
        """Auslesen aller Zeitintervall-Objekte
        """
        adm = TimetrackerAdministration()
        zi = adm.get_all_zeitintervall()
        return zi

    @timetracker.marshal_list_with(zeitintervall, code=200)
    @timetracker.expect(zeitintervall)
    #@secured
    def post(self):
        """Anlegen eines neuen Zeitintervall-Objekts.
        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der ProjektAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = TimetrackerAdministration()
        proposal = Zeitintervall.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            zi = adm.create_zeitintervall(proposal)
            return zi, 200
        else:
            '''Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.'''
            return '', 500


@timetracker.route('/zeitintervall/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Zeitintervall-Objekts.')
class ZeitintervallIDOperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Zeitintervall-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        if id is not None:
            adm.delete_zeitintervall(id)
            return '', 200
        else:
            '''Wenn unter id kein Zeitintervall existiert.'''
            return '', 500

    @timetracker.marshal_with(zeitintervall, code=200)
    @timetracker.expect(zeitintervall)  # Wir erwarten ein Zeitintervall-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Zeitintervall-Objekts."""
        adm = TimetrackerAdministration()
        zi = Zeitintervall.from_dict(api.payload)
        
        if zi is not None:
            zi.set_id(id)
            adm.save_zeitintervall(zi)
            return '', 200
        else:
            return '', 500


    @timetracker.marshal_with(zeitintervall)
    def get(self, id):
        """Auslesen eines bestimmten Zeitintervall-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        zi = adm.get_zeitintervall_by_id(id)

        if zi is not None:
            return zi
        else:
            return '', 500 

@timetracker.route('/zeitintervallbymaxid/<int:person_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Zeitintervall-Objekts.')
class ZeitintervallMaxIDOperations(Resource):

    @timetracker.marshal_with(zeitintervall)
    def get(self, person_id):
        """Auslesen eines bestimmten Zeitintervall-Objekts mit der Max ID und der Personen ID.
        Das auszulesende Objekt wird durch die ```person_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        zi = adm.get_zeitintervall_by_max_id_and_person_id(person_id)

        if zi is not None:
            return zi
        else:
            return '', 500 

@timetracker.route('/zeitintervallbypersonid/<int:person_id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Zeitintervall-Objekts.')
class ZeitintervallPersonIDOperations(Resource):

    @timetracker.marshal_with(zeitintervall)
    def get(self, person_id):
        """Auslesen eines bestimmten Zeitintervall-Objekts mit der Personen ID.
        Das auszulesende Objekt wird durch die ```person_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        zi = adm.get_zeitintervall_by_person_id(person_id)

        if zi is not None:
            return zi
        else:
            return '', 500 

@timetracker.route('/zeitintervallbypersonidbytime/<int:person_id>/<string:start>/<string:ende>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Zeitintervall-Objekts.')
class ZeitintervallPersonIDTimeOperations(Resource):

    @timetracker.marshal_with(zeitintervall)
    def get(self, person_id, start, ende):
        """Auslesen eines bestimmten Zeitintervall-Objekts mit der Personen ID.
        Das auszulesende Objekt wird durch die ```person_id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        zi = adm.get_zeitintervall_by_person_id_time(person_id, start, ende)

        if zi is not None:
            return zi
        else:
            return '', 500 



if __name__ == '__main__':
    app.run(debug=True)
