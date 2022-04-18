from server.bo.Projekt import Projekt
from server.db.Mapper import Mapper


class ProjektnMapper (Mapper):
    """Mapper-Klasse, die Projekt-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekte unseres Systems.

        :return Eine Sammlung mit Projekt-Objekten.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from projekt")
        tuples = cursor.fetchall()

        for (id, letzte_aenderung, bezeichnung, auftraggeber, aktivitaet_id) in tuples:
            projekt = Projekt()
            projekt.set_id(id)
            projekt.set_letzte_aenderung(letzte_aenderung)
            projekt.bezeichnung(bezeichnung)
            projekt.auftraggeber(auftraggeber)
            projekt.aktivitaet_id(aktivitaet_id)
            result.append(projekt)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_auftraggeber(self, auftraggeber):
        """Auslesen aller Projekte anhand des Auftraggebers.

        :param auftraggeber Auftraggeber des Projekts.
        :return Eine Sammlung mit Projekt-Objekten.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, letzte_aenderung, aktivitaets_id FROM projekt WHERE auftraggeber LIKE '{}' ORDER BY auftraggeber".format(auftraggeber)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, letzte_aenderung, auftraggeber, aktivitaets_id) = tuples[0]
            projekt = Projekt()
            projekt.set_id(id)
            projekt.set_letzte_aenderung(letzte_aenderung)
            projekt.set_aktivitaets_id(aktivitaets_id)

            result.append(projekt)

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None 

        self._cnx.commit()
        cursor.close()

        return result