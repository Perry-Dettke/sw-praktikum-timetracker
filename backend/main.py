'''Unser Service basiert auf Flask'''
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

arbeitszeikonto = api.inherit('Arbeitszeitkonto', bo, {
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
@timetracker.route('/aktiviteat')
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

    @timetracker.marshal_with(aktivitaet, code=200)
    @timetracker.expect(aktivitaet)  
    #@secured
    def put(self):
        """Update eines bestimmten Aktivitaet-Objekts."""
        adm = TimetrackerAdministration()
        a = Aktivitaet.from_dict(api.payload)
        if a is not None:
            adm.save_aktivitaet(a)
            return '', 200
        else:
            return '', 500

@timetracker.route('/aktivitaet/<int:id>')
@timetracker.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@timetracker.param('id', 'Die ID des Aktivitaet-Objekts.')
class AktivitaetDeleteOperations(Resource):

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
