# Installationshinweise
Die Installationshinweise betreffen nur die lokale Entwicklungsumgebung. In der Cloud kann die App [hier]() genutzt werden. Das Frontend befindet sich [hier]().

## Dependencies
Folgende Packages werden benötigt:

### Node-Packages
Die folgenden Node-Packages können mit dem Befehl `npm install` im Verzeichnis `/reactfrontend` installiert werden.

- @material-ui/core
- @mui/icons-material"s
- @material-ui/pickers
- @mui/material"
- @date-io/date-fns@1.x date-fns
- react-router-dom
- firebase

### Python Packages
Installation über `pip install <package>`. Das Anlegen eines Virtual Environments ist empfohlen.

- Flask
- Flask-Cors
- flask-restx
- mysql-connector-python

## Anlegen der Datenbank
Um die App lokal zu nutzen muss zuerst die Datenbank mit MySQL/MariaDB erstellt werden.  
Dazu die `/database/dump.sql` einlesen und in der Datei `/backend/server/db/Mapper.py` die entsprechenden Login-Daten angeben.

## Starten der App
Zuerst muss in Firebase ein Projekt angelegt werden und die entsprechende Konfiguration in die Datei `/reactfrontend/src/firebaseconfig.js` eingefügt werden.  
Dann kann der React-Client mit `npm run build` im Ordner `/reactfrontend` kompiliert werden. Der Inhalt des entstandenen Ordners `/reactfrontend/build` muss dann nach `/backend/server/static/reactclient` kopiert werden.  
Anschließend kann das Python Backend gestartet werden, in dem die Datei `main.py` im Ordner `/backend` ausgeführt wird.  
Die REST-API steht dann unter `http://localhost:5000` zur Verfügung. Die Anwendung kann über `http://localhost:5000/static/reactclient/index.html` aufgerufen werden.

## Python Root Directory in VSCode festlegen
Damit die Python Imports problemlos funktionieren, muss in VSCode unter umständen zuerst die `root directory` für das Backend gesetzt werden.  
Dazu die folgenden Zeilen in der `settings.json` einfügen.

```json
"terminal.integrated.env.osx": {
    "PYTHONPATH": "${workspaceFolder}/backend",
},
"terminal.integrated.env.linux": {
    "PYTHONPATH": "${workspaceFolder}/backend",
},
"terminal.integrated.env.windows": {
    "PYTHONPATH": "${workspaceFolder}/backend",
},
"python.envFile": "${workspaceFolder}/.env"
```