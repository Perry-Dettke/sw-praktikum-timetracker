'''Unser Service basiert auf Flask'''
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

