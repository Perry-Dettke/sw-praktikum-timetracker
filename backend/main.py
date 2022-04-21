'''Unser Service basiert auf Flask'''
from distutils.command.build import build
from re import A
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
from SecurityDecorator import secured

"""Hier wird Flask instanziert"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/app/*')

api = Api(app, version='1.0', title='Timetracker API',
          description='Eine rudimentäre Demo-API für Listenerstellung.')

"""Namespaces"""
timetracker = api.namespace('app', description="Funktionen der App")


"""Nachfolgend werden analog zu den BusinessObject-Klassen transferierbare Strukturen angelegt."""

"""BusinessObject dient als Basisklasse."""

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id',
                         description='Der Unique Identifier eines Business Object'),

    'last_change': fields.String(attribute='_person',                                          #hier eventuell DateTime
                                description='Die Person die am BO die letzte Änderung durchgeführt hat'),
    
})

aktivitaet = api.inherit('Aktivitaet', bo, {
    'bezeichnung': fields.String(attribute='_bezeichnung',
                                description='Bezeichnung einer Aktivitaet'),
    'kapazitaet': fields.Integer(attribute='_kapazitaet',                               # Hier eventuell float?
                                description='Kapazitaet einer Aktivitaet in Stunden'),
})

arbeitszeitkonto = api.inherit('Arbeitszeitkonto', bo, {
    'arbeitsleistung': fields.String(attribute='_arbeitsleistung',
                                description='Arbeitsleistung im Arbeitszeitkonto'),
    'buchung_id': fields.Integer(attribute='_buchung_id',
                                description='ID einer Buchung einem Arbeitskonto zugeteilt'),
})

buchung = api.inherit('Buchung', bo, {
    'person_id': fields.Integer(attribute='_person_id',
                                description='ID der Person die die Buchung durchgeführt hat'),
    'arbeitskonto_id': fields.Integer(attribute='_arbeitskonto_id',
                                description='ID des Arbeitskonto auf dem die Buchung durchgeführt wird'),
})

person = api.inherit('Person', bo, {
    'vor_name': fields.String(attribute='_nach_name',
                                description='Vorname einer Person'),
    'nach_name': fields.String(attribute='_nach_name',
                                description='Nachname einer Person'),
    'email': fields.String(attribute='_email',
                                description='Email einer Person'),
    'benutzername': fields.String(attribute='_benutzer_name',
                                description='Benutzername einer Person'),
    'arbeitszeitkonto_id': fields.Integer(attribute='_arbeitszeitkonto_id',
                                description='ID des Arbeitszeitkonto einer Person'),
    'projekt_id': fields.Integer(attribute='_projekt_id',
                                description='ID eines Projekts an dem die Person arbeitet'),
    'google_user_id': fields.String(attribute='_google_user_id',
                                description='Gegebene ID von Google'),
})

projekt = api.inherit('Projekt', bo, {
    'bezeichnung': fields.String(attribute='_bezeichnung',
                                description='Bezeichnung eines Projekts'),
    'auftraggeber': fields.String(attribute='_auftraggeber',
                                description='Auftraggeber des Projekts'),
    'aktivitaet_id': fields.String(attribute='_aktivitaet_id',
                                description='IDs der Aktivitaeten im Projekt'),
})

zeitintervall = api.inherit('Zeitintervall', bo, {
    'start': fields.String(attribute='_start',                              #String richtig?
                            description='Start eines Zeitintervall'),
    'ende': fields.String(attribute='_ende',                                #String richtig?
                            description='Ende eines Zeitintervall'),
})

ereignis = api.inherit('Ereignis', bo, zeitintervall, {
    'erstellungs_zeitpunkt': fields.DateTime(attribute='_erstellungs_zeitpunkt',       #DateTime richtig?
                            description='Erstellungszeitpunkt eines Ereignis'),
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
class AktivitaetIDperations(Resource):

    def delete(self, id):
        """Löschen eines bestimmten Aktivitaet-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = TimetrackerAdministration()
        akt = adm.get_aktivitaet_by_id(id)
        if akt is not None:
            adm.delete_aktivitaet(akt)
            return '', 200
        else:
            '''Wenn unter id keine Aktivitaet existiert.'''
            return '', 500

    @timetracker.marshal_with(aktivitaet, code=200)
    @timetracker.expect(aktivitaet)  # Wir erwarten ein Aktivitaet-Objekt von Client-Seite.
    @secured
    def put(self, id):
        """Update eines bestimmten Aktivitaet-Objekts."""
        adm = TimetrackerAdministration()
        ak = Aktivitaet.from_dict(api.payload)
        
        if ak is not None:
            ak.set_id(id)
            adm.save_student(ak)
            return '', 200
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
        azt = adm.get_arbeitszeitkonto_by_id(id)
        if azt is not None:
            adm.delete_arbeitszeitkonto(azt)
            return '', 200
        else:
            '''Wenn unter id kein Arbeitszeitkonto existiert.'''
            return '', 500

    @timetracker.marshal_with(arbeitszeitkonto, code=200)
    @timetracker.expect(arbeitszeitkonto)  # Wir erwarten ein Arbeitszeitkonto-Objekt von Client-Seite.
    #@secured
    def put(self, id):
        """Update eines bestimmten Arbeitszeitkonto-Objekts."""
        adm = TimetrackerAdministration()
        azt = Arbeitszeitkonto.from_dict(api.payload)
        
        if azt is not None:
            azt.set_id(id)
            adm.save_student(azt)
            return '', 200
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
        bu = adm.get_buchung_by_id(id)
        if bu is not None:
            adm.delete_buchung(bu)
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
            adm.save_student(bu)
            return '', 200
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
        er = adm.get_ereignis_by_id(id)
        if er is not None:
            adm.delete_ereignis(er)
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
            adm.save_student(er)
            return '', 200
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
        per = adm.get_person_by_id(id)
        if per is not None:
            adm.delete_person(per)
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
            adm.save_student(per)
            return '', 200
        else:
            return '', 500


            