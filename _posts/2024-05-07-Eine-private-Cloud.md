---
layout: post
title:  "Eine private Cloud"
categories: [Homelab]
tags: [Homelab, Cloud, Server, Docker, Raspberry Pi]
image: 
  path: /images/2024-05-07-Eine-private-Cloud/Meine-eigene-Cloud.jpg
  alt: Meine private Cloud besteht auf drei Raspberry Pi Servern mit angeschlossenen SSDs an drei verschiedenen Orten
---

# Einleitung
Ich habe mir in den letzten Monaten viele Gedanken zum Thema [Datensouveränität, Datenhoheit bzw. Data Sovereignty](https://www.ionos.de/digitalguide/server/sicherheit/datenhoheit/) gemacht. Der Grund hierfür waren einige Veränderungen in meinem privaten Umfeld, woraus sich der Wunsch ergeben hat, in Zukunft (noch) sorgfältiger mit den eigenen Daten umzugehen und besser kontrollieren zu können, wo diese gehostet sind und wer (potentiell) darauf Zugriff hat. Aufgrund dessen bin ich zum Entschluss gekommen, mein über viele Jahre bestehendes iCloud Abo bei Apple (vorher habe ich Google Drive genutzt) zu kündigen und meine Daten (und die meiner Familie) künftig selbst zu hosten.

## Bestandsaufnahme
Um zu verstehen was ich alles umsetzen muss, um dem Ideal einer eigenen Cloud am nächsten zu kommen, habe ich mir zunächst iCloud nochmal angeschaut. Ziel war es zu sehen, was es alles bietet (und was davon ich überhaupt nutze). Sozusagen eine erste Bestandsaufnahme.

iCloud beinhaltet folgende Applikationen:
- Mail
- Contacts
- Calendar
- Photos
- Drive
- Notes
- Reminders
- Pages
- Numbers
- Keynote
- Find my

![iCloud Bestandteile](/images/2024-05-07-Eine-private-Cloud/iCloud-Bestandteile.png)

Einen eigenen Mailserver zu hosten halte ich für unsinnig und nutze stattdessen seit einigen Jahren Proton Mail aus der Schweiz, einen Anbieter mit sehr starkem Fokus auf der Privatsphäre der Nutzer. Der Dienst beinhaltet auch eine Kontaktverwaltung und einen Kalender (im Paket Mail Plus). Es gäbe bei Proton zwar auch das Unlimited Paket welches zusätzlich noch Drive (ein Cloud Speicher), VPN (selbsterklärend) sowie Pass (eine Passwortverwaltung) enthält, aber da ich die Cloud ja selber hosten möchte, beim VPN auf Mullvad vertraue und auch meine Passwortverwaltung selbst hosten möchte benötige ich diese zusätzlichen Dienste nicht. Mail, Contacts und Calendar habe ich somit bereits abgedeckt.

Als nächstes schauen wir uns die beiden (aus meiner Sicht) Kerndienste von iCloud an, Photos und Drive. Diese möchte ich auf jeden Fall durch selbstgehostete services ersetzen. Als Alternativen habe ich mir immich (für Photos) und Nextcloud (für Drive) ausgesucht, die ich auch bereits im kleinen Rahmen auf einem meiner Testserver erprobt habe. Nextcloud würde sogar "ab Werk" eine Fotoverwaltung, eine Kontaktverwaltung, einen Kalender, Notizen etc. mitbringen (und ist durch plug-ins erweiterbar), mir gefällt immich von den Funktionen und dem UI (user interface) allerdings besser.

Die weiteren Dienste die ich noch ersetzen möchte sind Notes (mit einer Kombination aus Joplin und Vikunja, welches gleichzeitig Microsoft To Do als Nachfolger von Wunderlist abgelöst hat) und Reminders (ist durch Proton Calendar bereits abgedeckt). Pages, Numbers und Keynote habe ich nie genutzt, da ich sowohl noch eine Microsoft Office Lizenz besitze als auch (immer öfter) LibreOffice verwende. Auf Find my muss (oder kann) ich verzichten.

Zu guter Letzt brauche ich im Gegensatz zu einer kommerziellen Cloud bei einem Anbieter noch ein paar Verwaltungs- und Synchronisationsdienste sowie einige Anwendungen zum Aufsetzen des Systems und für eine sichere Verbindung. Diese sollten möglichst leicht zu bedienen und für meine Nutzer unsichtbar sein.

## Der Plan
Ich plane die Umsetzung mithilfe eines Verbundes von drei Raspberry Pi's und externen SSDs anzugehen. Einer der Raspis steht bei mir zuhause, die anderen beiden jeweils an zwei weiteren, sicheren Orten außerhalb meiner Wohnung. Alle drei Geräte sind mittels eines WireGuard VPN verbunden und somit nicht direkt im Internet exposed.  

Vorteil ist, dass ich mir um die Sicherheit meines Netzwerks, meiner Daten und meiner Dienste keine allzu großen Sorgen machen muss. Nachteil ist, dass sowohl ich als auch meine Familie (außerhalb meines privaten Heimnetzes) immer per VPN mit meinem Heimnetz verbunden sein müssen, um Zugriff zu haben. Dies ist grundsätzlich kein Problem und kann auch für technisch weniger versierte Nutzer beispielsweise über Automatismen (iOS) oder "always on" (Android) gelöst werden.  

Alle von mir genutzten Projekte sind FOSS (free and open source software) und bieten sowohl Desktop Clients für Linux, MacOS und Windows (oder Webanwendungen) als auch Apps für iOS und Android an. Teilweise sind kleinere Einstellungen auf den Endgeräten vorzunehmen um die gleiche Nutzererfahrung wie beispielsweise Apple oder Google Photos zu haben (beispielsweise automatische Uploads aller gemachten Fotos in den eigenen immich account in der Cloud), grundsätzlich ist die Einrichtung aber überall sehr simpel.

## Der finanzielle Aspekt
Auch unter finanziellen Gesichtspunkten kann (!) sich das selber hosten lohnen, allerdings sollte man es eher aus ideellen Gründen in Betracht ziehen.

![Hardware für einen Cloud Rechner](/images/2024-05-07-Eine-private-Cloud/Hardware-für-einen-Cloud-Rechner.jpg)

Die benötigte Hardware für mein Projekt ist folgende:
- 3x Raspberry Pi 5 (4b RAM Version): ca. 70,00 Euro (210,00 Euro für alle drei)
- 3x Raspberry Pi Case (Raspberry Pi 5 Version): ca. 17,00 Euro (45,00 Euro für alle drei)
- 3x Samsung T9 Portable SSD 4TB: ca. 350,00 Euro (1.050,00 Euro für alle drei)
- 3x SanDisk Extreme 64 GB micro SD Karte: ca. 9,00 Euro (27,00 Euro für alle drei)
- 5er Pack Amazon Basics Ethernet Kabel 30 cm: ca. 15,00 Euro (also 9,00 Euro für drei, gibt es aber nur im fünfer Pack)

Insgesamt kostet die Hardware also ca. 1.340,00 Euro. Nicht gerade wenig, aber immerhin ist die komplette Software umsonst (die Ersteller freuen sich aber über Spenden!). Der Aufkleber ist übrigens von der [Free Software Foundation Europe (fsfe)](https://fsfe.org/) und verdeutlicht den Grundgedanken hinter meinem Projekt ganz gut.

![Ein Teil der benötigten Komponenten](/images/2024-05-07-Eine-private-Cloud/Ein-Teil-der-benötigten-Komponenten.jpg)

Demgegenüber stehen meine bisherigen Kosten für den 2 TB im Monat Plan von iCloud+ (teilbar mit maximal fünf Personen) in Höhe von 10,00 Euro im Monat, also 120,00 Euro im Jahr. Wenn ich einen (fiktiven) 4 TB für 20,00 Euro im Monat Plan hochrechne müsste ich meine eigene Cloud also über 5 Jahre nutzen, um (ohne Inflation) rein von den Hardwarekosten (ohne Strom) günstiger zu sein. Naja. Das ist wohl der Preis der Datensouveränität.

![iCloud Preise in Deutschland 05/2024 (Quelle: Apple)](/images/2024-05-07-Eine-private-Cloud/iCloud-Preise-05⁄2024.jpg)

## Mögliche Schwachpunkte und Verbesserungspotential
Wenn man sich meinen Plan so durchliest könnte man argumentieren, dass "das ja gar keine richtige Cloud ist", weil es keine high availability gibt (d.h. wenn der cloud-master ausfällt, übernimmt keiner der cloud-backups automatisch und die services sind nicht mehr erreichbar). Im Grunde handelt es sich nur um ein etwas komplexeres Setup aus einem kleinen homelab und einer externen backup Lösung. Das ist richtig.  

Ich habe bereits weitere Überlegungen angestellt, die in Richtung Proxmox Cluster (ebenfalls aus drei Rechnern) aus thin clients oder anderen Minicomputern bestehen. Diese sollen nicht mehr über ein WireGuard VPN Netzwerk verbunden, sondern regulär exposed werden. Bei diesem high availability cluster wäre es dann tatsächlich so, dass die Dienste zum einen "einfach so" aus dem Internet erreichbar sind und zum anderen redundant ausgeführt, falls einer der drei Rechner ausfällt. Hierzu muss ich mir allerdings vor allem im Bereich (Zugriffs-) Sicherheit noch ein paar Gedanken machen bevor ich den Plan umsetzen kann. Bis dahin ist die aktuelle Cloud "good enough".

# Die Umsetzung der eigenen Cloud
Nachdem ich nun das warum erklärt habe geht es ab sofort um das wie. Ich werde Schritt für Schritt im Detail auflisten wie ich mein Setup aufgesetzt habe. Basis des Ganzen ist Docker. Um zu zeigen wie man Container aufsetzt werde ich verschiedene Wege aufzeigen. Wer bereits weiß wie das geht und seinen präferierten Weg gefunden hat (meiner sind docker compose files) kann diese Abschnitte natürlich überspringen. Ich habe versucht die einzelnen Kommandos so gut wie möglich zu erklären und zu trennen. Einfache oder sich häufig wiederholende Kommandos werde ich versuchen nicht erneut zu erklären.

## Hardware zusammenbauen
Im ersten Schritt wird die Hardware zusammen gebaut. Das ist relativ einfach und selbsterklärend, nur beim Kabel für den beim Raspberry 5 neuen und im offiziellen Gehäuse bereits integrierten Lüfter muss man ein bisschen aufpassen. Die Micro SD Karte wird noch nicht eingesteckt, da wir sie erst beschreiben müssen. Die folgenden Bilder illustrieren den Zusammenbau.

![Stecker für den Lüfter (ohne Kappe)](/images/2024-05-07-Eine-private-Cloud/Stecker-für-den-Lüfter-(ohne-Kappe).jpg)

![Lüfter montiert](/images/2024-05-07-Eine-private-Cloud/Lüfter-montiert.jpg)

![Einsetzen des Raspis im Gehäuse](/images/2024-05-07-Eine-private-Cloud/Einsetzen-des-Raspis-im-Gehäuse.jpg)

![Gehäuse verbunden](/images/2024-05-07-Eine-private-Cloud/Gehäuse-verbunden.jpg)

![Gehäuse geschlossen](/images/2024-05-07-Eine-private-Cloud/Gehäuse-geschlossen.jpg)

## Micro SD Karte vorbereiten
Um die zukünftigen Cloud Rechner in Betrieb nehmen zu können, brauchen wir zunächst ein funktionierendes Betriebssystem (Operating System /OS). Hier habe ich mich für den vermeintlich leichtesten Weg entschieden und einfach Raspberry Pi OS (vormals Raspbian) entschieden. Andere aus meiner Sicht für das Projekt auch gut geeignete OS wären [Ubuntu Server 24.04 LTS für den Raspberry Pi](https://ubuntu.com/download/raspberry-pi) oder [Debian für Raspberry Pi](https://raspi.debian.net/). Die Kommandos sollten sich übertragen lassen.

Zum flashen von .iso Dateien nehme ich entweder den [Raspberry Pi Imager](https://www.raspberrypi.com/software/) oder [Balena Etcher](https://etcher.balena.io/)(beides gibt es für Linux, MacOS und Windows). Auf Windows gibt es noch das beliebte Rufus, habe ich persönlich aber noch nie verwendet. Jetzt stecken wir die erste der drei Micro SD Karten in unseren Rechner.

Im Raspberry Pi Imager gehen wir auf Raspberry Pi Device und wählen den Raspberry Pi 5 aus. Bei Operating System wählen wir Raspberry Pi OS (other) und dann Raspberry Pi OS Lite (64-bit). Lite habe ich gewählt weil alle drei Rechner sowieso headless (also ohne angeschlossenen Bildschirm und somit auch ohne benötigte Desktop Umgebung laufen werden) laufen werden und der Zugriff rein über SSH (Secure Shell Protocol) laufen wird. Unter Storage wählen wir die Micro SD Karte aus und klicken auf "Next".

![Raspberry Pi Imager](/images/2024-05-05-Eine-private-Cloud/Imager.jpg)

Unter OS customization gehen wir auf "Edit settings" und ändern unter General den hostname, den username und das password und wählen unter locale etwas passendes aus, in meinem Fall Europe/Berlin. Auch das eigene keyboard sollte man bereits auswählen (vermutlich de, ich selbst nutzte us aufgrund der Lage der Sonderzeichen). Unter Services ist es wichtig den Haken bei "enable SSH" zu setzen und eine Authentifizierungsmethode zu wählen. Für mein Projekt wähle ich "use password", sicherer (vor allem wenn es public exposed wird wäre aber ein key). Unter Options wählen wir eject media when finished, klicken "yes" bei OS customization und bestätigen nochmal mit "yes" das der gesamte Inhalt der ausgewählten Micro SD Karte gelöscht werden wird (sie ist in meinem Fall allerdings sowieso noch leer) und bestätigen den Vorgang mit unserem Passwort. Nach einer kurzen Wartezeit ist die Karte fertig beschrieben und wird automatisch ausgeworfen. Jetzt entfernen wir sie und wiederholen das Ganze noch zwei Mal für die beiden backup Server (wichtig: andere Passwörter wählen!).

![Fertige Cloud Einheit](/images/2024-05-07-Eine-private-Cloud/Fertige-Cloud-Einheit.jpg)

## SSD vorbereiten
Im nächsten Schritt werden die drei SSD vorbereitet, die später im Betrieb alle Inhalte unserer Cloud aufnehmen werden. Ich habe mich aufgrund der Größe, der Geschwindigkeit und der Lautstärke für SSD und gehen HDD entschieden, da ich die beiden backup Server ja "offsite" bei Familienmitgliedern lagern werde und sie dort möglichst wenig Platz wegnehmen und auf keinen Fall "Schreibgeräusche" von sich geben sollen. Das Einzige was man vor Ort (und auch nur selten) hören wird ist der neue Lüfter beim Pi 5. Zur Vorbereitung schließen wir die erste SSD an unseren Rechner an.

Unter Linux gehen wir wie folgt vor (bei anderen OS kann ich hier leider nichts sagen):
1. Mit ```df``` zeigen wir alle Laufwerke an um den Dateipfad zu finden (für uns relevant (kann abweichen!): /dev/sda)
2. ```sudo mkfs.ext4 /dev/sda``` formatiert die SSD mit dem Linux (de facto) Standarddateisystem EXT4. Da der Befehl als super user ausgeführt wird bestätigen wir mit einem Klick auf "y".
3. Nach dem formatieren mounten wir die SSD erneut und kopieren den Dateipfad zur gemounteten Platte (in meinem Fall /run/media/username).
4. ```ls -l /run/media/username``` (Pfad zur eigenen Festplatte selbst einfügen) zeigt die aktuellen Rechte an
5. ```sudo chmod -R -v 777 /run/media/username``` ändert die Rechte so, dass jeder Nutzer lesen und schreiben darf (wird später wichtig)
6. Jetzt die Platte auswerfen und neu mounten, um zu sehen ob es geklappt hat
7. Am Ende legen wir auf der Platte mit ```mkdir cloud``` (wahlweise auch ein anderer Name) noch einen Ordner an, der später alle Inhalte enthalten wird. Sieht finde ich einfach aufgeräumter aus,
8. Das Ganze wiederholen wir jetzt noch zwei Mal für die restlichen beiden SSDs.

Achtung: es findet keine Verschlüsselung der Festplatten statt, d.h. diese können später einfach abgezogen und ausgelesen werden. Wer möchte kann dies natürlich trotzdem tun, das ist aber außerhalb des Umfangs dieses Artikels.

![Fertige Cloud Einheit mit SSD](/images/2024-05-07-Eine-private-Cloud/Fertige-Cloud-Einheit-mit-SSD.jpg)

## Raspis einrichten
Jetzt richten wir die drei Raspberry Pi Rechner ein und bereiten sie für die Installation von Docker vor. Die Schritte Raspis einrichten, Docker installieren und Portainer installieren müssen auf allen Geräten durchgeführt werden, Portainer Agent installieren nur auf den cloud-backups. Später ist es dann teils, teils. Ich werde es bei allen Schritten aber auch nochmals dazu schreiben.

Hierzu benötigen wir die jeweiligen IP Adressen. Diese kann man einfach aus den DHCP Leases des eigenen Routers auslesen, unter OPNsense etwa bei Services -> ISC DHCPv4 -> Leases. In der Tabelle werden sie als jüngste Geräte meistens ganz unten stehen oder am Beginn des Teils der IP Adressraums, der dynamisch vergeben wird.

Zur Einrichtung der Raspis gehen wir wie folgt vor:
1. Wir verbinden uns mit ```ssh username@192.168.1.41``` per SSH mit dem Rechner und nutzen hierbei den Benutzernamen, den wir beim Beschreiben der Micro SD Karten festgelegt haben und die IP des jeweiligen Gerätes.
2. Da wir uns zum allerersten Mal mit diesem Server verbinden bestätigen wir dessen Identität durch die Eingabe von ```yes```
3. Jetzt geben wir das zuvor vergebene Passwort ein, klicken auf "Enter" und schon sind wir auf dem System aufgeschaltet
4. Zuallererst aktualisieren wir die Repositories mit ```sudo apt update``` und bringen danach mit ```sudo apt upgrade``` das komplette System auf den neusten Stand
5. Jetzt verbinden wir eine der SSDs mit dem Raspi und lesen deren UUID (Universally Unique Identifier) mit ```blkid``` aus. Diese UUID brauchen wir um sicherstellen zu können, dass diese verbundene externe Festplatte immer automatisch gemountet wird, also auch bei einem Systemneustart etwa nach einem Crash oder Update. Da zwei Geräte ja offsite platziert werden ist ein einfacher Zugriff später nicht mehr so leicht möglich.
4. Mit ``` sudo nano /etc/fstab``` bearbeiten wir die fstab Datei des Systems und fügen die Zeile ```UUID=xxx-xxx-xxx-xxx-xxx /mnt/usb ext4    defaults        0 0``` ein, wobei wir hier bei UUID die vorher ausgelesene Nummer eintragen.
5. Jetzt sollte die SSD bei einem Neustart automatisch gemounted werde. Im Notfall kann dies aber auch mit dem Befehl ```mount -a``` manuell erfolgen (es ist ja eh nur ein Gerät eingesteckt).
6. Den Pfad zur SSD finden wir wieder mit ```df``` und merken ihn uns für später.
7. Jetzt wechseln wir mit ```cd``` ins eigene home Verzeichnis und legen mit ```mkdir docker``` einen Ordner für Docker und die diversen weiteren Container an.

## Docker installieren (alle Geräte)
Docker ist eine open source Software, die zum deployment und zur Steuerung von containerisierten Applikationen eingesetzt wird. Im Prinzip starten und steuern wir hiermit (über die Kommandozeile) viele kleine mini Linux Einheiten (meist mit Alpine Linux), die jeweils nur eine Applikation bereit stellen.

Wir richten Docker wie folgt ein:
1. Mit ```cd docker``` wechseln wir in den soeben erstellten Ordner 
2. ```curl -fsSL https://get.Docker.com -o get-Docker.sh``` besorgt uns das offizielle Docker Installationsskript 
3. ```sudo sh get-Docker.sh``` führt es aus (Achtung: grundsätzlich sollte man nicht einfach irgendwelche Skripte irgendwo aus dem Internet mit super Rechten ausführen, daher findet sich [hier](https://get.docker.com/) nochmal der offizielle Link um das Skript zu verifizieren)
4. Als Nächstes fügen wir mit ```sudo usermod -aG docker $USER``` den Benutzer zur docker Gruppe hinzu
5. Mit ```newgrp docker``` loggen wir uns in diese docker Gruppe ein
6. Als letztes deployen wir mit ```docker run hello-world``` unseren ersten Testcontainer um die Docker Installation abzuschließen.

## Portainer installieren (alle Geräte)
Das von uns soeben installierte Docker läuft rein über die Kommandozeile. Es gibt zwar eine Docker Desktop Applikation, aber wir nutzen zur grafischen Verwaltung unserer Container einen weiteren Container, nämlich die Docker Verwaltungssoftware Portainer. Diese ist nach der Einrichtung bequem über den Browser erreichbar und ermöglicht uns eine einfache und schnelle Übersicht über unsere diversen container. Am Ende dieser Anleitung werden es übrigens mindestens 21 Container sein, verteilt auf drei Server.

Die Schritte im Detail:
1. Ein volume für Portainer erstellen mit ```docker volume create portainer_data```
2. Portainer deployen mit ```docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest```
3. Portainer startet jetzt automatisch und kann im Browser unter https://192.168.1.41:9443 (IP anpassen) aufgerufen werden
4. Beim ersten Aufrufen der Seite müssen wir das Sicherheitsrisiko akzeptieren (gilt für alle neuen Dienste und kann zum Beispiel durch die Einrichtung eines reverse proxy wie beispielsweise NPM mit let's encrypt Zertifikaten "umgangen" werden. Hierzu schreibe ich vielleicht nochmal einen extra Artikel.)
5. Passwort vergeben
6. "Get started" anklicken
7. Lokale Umgebung (Environments -> local) auswählen und umbenennen (cloud-master und cloud-backup-1 bzw. cloud-backup-2)
8. "Containers" auswählen
9. Den im letzten Abschnitt frisch erstellten "Hallo Welt" Container löschen (es ist der "nicht-Portainer" Container mit dem zufällig vergebenen Namen)

## Portainer Agent installieren (nur auf den cloud-backups)
Um nicht jedes Mal für jeden der drei Server Portainer aufrufen zu müssen um die Container zu überprüfen setzen wir auf den beiden backup Servern noch Portainer Agent auf. Nach dem Installieren erlaubt uns Portainer Agent die beiden backup Server mit dem Hauptserver zu verbinden und deren Container in der Portainer Instanz des Hauptservers zu verwalten.

Zur Einrichtung brauchen wir die folgenden Schritte:
1. Zur Installation auf den beiden cloud-backups ```docker run -d -p 9001:9001 --name portainer_agent --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes portainer/agent:latest``` ausführen
2. Jetzt auf cloud-master auf "Environments" in der Liste links gehen und "Connect to existing environments" oder links in der Leiste "Environments" -> "+ Add environment" -> "Docker Standalone" auswählen
3. "Start Wizard" anklicken
4. Name (cloud-backup-1) und IP (inklusive Port, also z.B.: 192.168.1.42:9001) eingeben
5. "Connect" klicken
6. Zurück auf die Home Seite gehen und die Browsertabs von cloud-backup-1 und cloud-backup-2 schließen, da diese nicht länger benötigt werden. Alle drei Environments sollten nun auf der Weboberfläche von cloud-master zu sehen sein.

![Alle Umgebungen übersichtlich in einem Portainer Fenster angezeigt](/images/2024-05-07-Eine-private-Cloud/portainer-environments.png)

Achtung: sobald WireGuard eingerichtet wurde (s.u.) müssen die IPs von den derzeitigen lokalen Adressen auf die in WireGuard ausgewählten IPs geändert werden (kleines Stiftsymbol rechts), damit auch noch auf die beiden Portainer Instanzen zugegriffen werden kann wenn sich diese an ihren (remote) Bestimmungsorten befinden.

## MariaDB (nur auf cloud-master)
Als Nächstes geht es um die Einrichtung einer Datenbank, die die Informationen für unsere Cloud Applikation Nextcloud beinhalten wird. Die Installation erfolgt beispielhaft grafisch über Portainer (einfach aber relativ aufwendig).

Hier die Anleitung:
1. In Portainer "cloud-master" environment auswählen
2. Add container anklicken, als Name ```MariaDB``` und als Image ```linuxserver/mariadb:latest``` angeben
3. Unter Manual network port publishing -> "+ publish a new network port" anklicken und ```host publish 3306 container 3306``` ausfüllen
4. Unter "Advanced container settings" unten unter Volumes -> Volume mapping -> + map additional volume anklicken und den Kippschalter auf "Bind' setzen. Unter ```container /config``` und unter ```host /home/pflavio/docker/mariadb/config``` (den Pfad in den Docker Ordner) angeben
5. Unter Env -> "+ Add an environment variable" (7x anklicken) und wie folgt befüllen
```
- PUID    1000
- PGID    1000
- TZ  Europe/Berlin (passende auswählen)
- MYSQL_ROOT_PASSWORD     passwort1234 (ändern)
- MYSQL_DATABASE      nextclouddb
- MYSQL_USER      dbuser
- MYSQL_PASSWORD      passwort1234 (ändern)  
```
6. Als Restart Policy "unless stopped" auswählen und "Deploy the container" anklicken

## Nextcloud (nur auf cloud-master)
Jetzt setzen wir [Nextcloud](https://nextcloud.com/) auf. Nextcloud ist eine open source cloud sofware die man selber hosten kann. Dadurch dass alle Daten nur auf unserem eigen Server liegen haben wir die Kontrolle darüber, wer wann wie Zugriff erhält.

Wir machen das nochmal über die Portainer Web Oberfläche:
1. "Add container" anklicken und als Namen ```Nextcloud``` vergeben und bei Image ```linuxserver/nextcloud:latest``` angebenn
2. Unter "Manual network port publishing" "+ publish a new network port" anklicken und ```host publish 443 container 443``` angeben
3. Unter "Advanced container settings" unten unter "Volumes" und "Volume mapping" 2x den Punkt "+ map additional volume" anklicken und den Kippschalter wieder jeweils auf "Bind" setzen. Die beiden Volumes wie folgt befüllen:  
```container /config -> host /home/pflavio/docker/nextcloud/config``` (der Pfad in den Docker Ordner)  
und 
```container /data -> host /mnt/usb/cloud-master/nextcloud``` (der Pfad auf die externe USB SSD)
4. Unter "Env" 3x "+ Add an environment variable" anklicken und folgendes eintragen
```
- PUID 1000
- PGID 1000
- TZ Europe/Berlin (passende auswählen)
```
5. Als "Restart Policy" wieder "unless stopped" wählen und "Deploy the container" anklicken

Nextcloud ist ab sofort unter https://192.168.1.41:443 erreichbar (bzw. unter der eigenen IP Adresse). Beim ersten Start muss man einen Nutzernamen und ein Passwort für den Admin Nutzer vergeben. Best practice ist hier einen extra Admin Nutzer aufzusetzen und für sich selbt (im "Normalbetrieb") nochmal einen separaten Nutzer ohne Adminprivilegien.

Als Nächstes wird die Datenbank konfiguriert:
1. MySQL/MariaDB auswählen
2. Den Nutzernamen, das Passwort und die Datenbank vom mariadb container wählen (aus Schritt 5)
3. ```localhost``` in die IP von cloud-master ändern
4. "Weiter" klicken und die "Recommended apps" überspringen (Apps können wenn gewünscht nachträglich noch hinzugefügt werden)
5. Im letzten Schritt werden alle weiteren, "normalen" (nicht Admin) Nutzer angelegt

### Bestehende Dateien hochladen
Bestehende Dateien werden bei Nextcloud am besten direkt über das Web Interface hochgeladen. Dies geht relativ schnell und problemlos. Den upload über das Terminal würde ich nur fortgeschrittenen Nutzern empfehlen, da danach die Datenbank neu indexiert werden muss.

## immich (nur auf cloud-master)
[immich](https://immich.app/) ist eine selbst gehostete Foto- und Videomanagementsoftware, ähnlich Apple Photos. Dieser Container ist einfacher ohne Portainer mit Docker Compose zu erstellen, was auch die vom Projekt (und von mir persönlich) [bevorzugte](https://immich.app/docs/install/docker-compose/) Variante ist.

Wir gehen wie folgt vor:
1. Im Terminal wechseln wir mit ```cd ~/docker``` in den Docker Ordner
2. Mit ```mkdir immich-app``` erstellen wir einen Ordner für immich
3. Wir wechseln in den neuen Ordner mit ```cd immich-app```
4. Das offizielle Docker compose file laden wir mit ```wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml```
5. Zusätlich brauchen wir die .env Beispieldatei. Diese laden wir mit ```wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env```. Achtung: sie ist wahrscheinlich unsichtbar und daher per ```ls``` nicht anzeigbar. Um sicherzustellen dass sie heruntergeladen wurde am besten mit ```ls -a``` alle Dateien anzeigen lassen.
6. Die .env Beispieldatei müssen wir noch an unsere Bedürfnisse anpassen und ändern sie mit ```nano .env```. Dann ändern wir die ```UPLOAD_LOCATION``` auf ```/mnt/usb/cloud-master/immich``` (der Pfad auf die externe USB SSD) und das ```DB_PASSWORD``` ändern wir auf ein sicheres Passwort.
7. Den Container starten wir mit dem Befehl ```docker compose up -d```

immich ist jetzt unter https://192.168.1.41:2283 erreichbar (bzw. unter der eigenen IP Adresse). In der Portainer Web GUI sollten jetzt auch fünf neue Container sichtbar sein. Wir klicken unter der immich IP "Getting started" an und nehmen die Ersteinrichtung vor. Zuerst legen wir wieder einen separaten Admin user an und dann die weiteren Benutzer (analog zur Einrichtung von Nextcloud).

### Bestehende Fotos hochladen
Da der web upload in immich bei großen Mengen an Fotos nicht ganz so gut funktioniert wie Dateien in Nextcloud, würde ich hier zum "kleinen Helfer" [immich-go](https://github.com/simulot/immich-go) greifen.

Die folgenden Schritte werden auf dem eigenen Rechner (mit Zugriff auf die hochzuladenden Fotos) ausgeführt, nicht auf den neuen Cloud Pis.
1. [immich-go](https://github.com/simulot/immich-go) herunterladen.
2. Mit ```cd ~/Downloads``` zum downloads Ordner wechseln
3. immich-go entpacken, ausführbar machen und in den gleichen Ordner kopieren in dem sich die bestehende Foto-Bibliothek befindet.
4. In diesen Ordner wechseln und folgendes Kommando ausführen: ```./immich-go -server=http://192.168.1.41:2283 -key=eigenerapikey upload /run/media/pflavio/T9/cloud/immich/library/philip```. Der Befehlt sagt immich-go welchen Ordner mit Fotos er wohin kopieren soll und authentifiziert sich dabei mit einem API-key. Im Befehlt angepasst werden müssen die IP des eigenen Server, der eigene API key sowie der gewünschte Zielpfad. Der Vorgang kann für jeden Nutzer erneut durchgeführt werden (mit entsprechenden individuellen Anpassungen) um alle bestehenden Fotos zum Beispiel aus iCloud umzuziehen. Den eigenen API-key findet man übrigens unter dem eigenen Benutzer und dann "API Keys" und ein Klick auf "New API Key".

## Joplin (nur auf cloud-master)
Joplin ist eine Notizbuchapp ähnlich OneNote oder Evernote. Wir nutzen diesmal ein docker compose file. Joplin bräuchte für die reine Syncronisierung gar keine eigene App, man könnte auch einfach unsere schon bestehende Nextcloud Instanz einbinden. Joplin Server hat allerdings den Vorteil, dass dann auch Inhalte und Notizbücher geteilt werden können.

Die Einrichtung läuft wie folgt ab:
1. Wir wechseln in den Docker Ordner, legen einen neuen Ordner für Joplin an und wechseln in diesen Ordner mit ```cd ~/docker && mkdir joplin && cd joplin```
2. Wir erstellen eine docker-compose.yml Datei mit ```nano docker-compose.yml``` mit folgendem Inhalt:
```
  joplin-server:
    image: etechonomy/joplin-server:latest
    container_name: joplin-server
    environment:
        - APP_BASE_URL=http://192.168.1.41:22300
        - APP_PORT=22300
        - DB_CLIENT=pg
        - POSTGRES_PASSWORD=bitteaendern
        - POSTGRES_DATABASE=joplin
        - POSTGRES_USER=joplin
        - POSTGRES_PORT=5432
        - POSTGRES_HOST=joplin-db
    restart: unless-stopped
    ports:
      - 22300:22300
  joplin-db:
    image: postgres:16
    container_name: joplin-db
    restart: unless-stopped
    ports:
      - 5432:5432
    volumes:
      - /mnt/usb/cloud-master/joplin/joplin-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=bitteaendern
      - POSTGRES_USER=joplin
      - POSTGRES_DB=joplin
```
Alle Werte bei denen ```bitteaendern``` steht bitte anpassen. Achtung: bei ```- APP_BASE_URL``` muss die  IP des Servers inkl. Port 22300 und voranstehendem http:// stehen, sonst ist ein login isn web interface später nicht möglich!
3. Den Container starten wir mit dem Befehl ```docker compose up -d```
4. Das interface ist jetzt unter http://192.168.1.41:22300 erreichbar. Die Standardemail ist  admin@localhost und das Standardpasswort admin. Beides bitte ändern.
5. Zur Nutzung von Joplin braucht man nun noch einen (oder mehrere, wird ja synchronisiert) Client Apps

![Viel zu sehen gibt es auf der Joplin Server Instanz nicht, die Inhalte kann man nur über die Apps sehen und bearbeiten. Diese sind für alle gängingen Plattformen kostenfrei erhältlich](/images/2024-05-07-Eine-private-Cloud/joplin-server.jpg)

# Zwischenfazit
Die Einrichtung der Apps, die man normalerweise als Nutzer bei Apple oder Google verwendet ist nun abgeschlossen. Da wir uns aber auch um die Verwaltung und die Vernetzung des Servers kümmern müssen, brauchen wir zusätzlich zu Docker und Portainer noch einige weitere Tools. Diese richten wir im Folgenden ein.

## Syncthing
Um Redundanzen zu schaffen und ein ständiges, automatisiertes Backup aller unser Daten zu erhalten verwenden wir Syncthing. In Syncthing wählt man vereinfacht gesagt einen Ordner aus, der auf allen Instanzen vorhanden ist und konstant überall auf dem gleichen Stand gehalten wird. Das machen wir uns zunutze für den Ordner ```/mnt/usb/cloud-master```, also der Ort an dem wir alle unsere Inhalte abgelegt haben.

Zur Einrichtung nutzen wir wieder die Portainer GUI (da wir mittlerweile so ziemlich alle Wege durch haben um Docker Container einzurichten kann natürlich auch ein anderer Weg gewählt werden) und führen folgende Schritte aus:
1. "Add container" anklicken, als Name ```syncthing``` und als Image ```linuxserver/syncthing:latest``` wählen
2. Unter "Manual network port publishing" 4x "+ publish a new network port" anklicken und folgendes eintragen:
```host publish 8384 container 8384
host publish 22000 container 22000/tcp
host publish 22000 container 22000/udp
host publish 21027 container 21027/udp
```
3. Unter "Advanced container settings" unten unter "Volumes", "Volume mapping" 2x "+ map additional volume anklicken und die Kippschalter auf "Bind" setzen. Befüllen werden wir die volumes wie folgt:
```container /config -> host /home/pflavio/docker/syncthing/config``` (der Pfad in den Docker Ordner) und 
```container /data -> host /mnt/usb/cloud-master``` (der Pfad auf die externe USB SSD)
4. Unter "Env" klicken wir 3x auf "+ Add an environment variable" und tragen ein:
```PUID    1000
PGID    1000
TZ  Europe/Berlin (passende auswählen)
```
5. Die Restart Policy ist wie immer "unless stopped" und mit einem Klick auf "Deploy the container" starten wir Syncthing.

Syncthing ist jetzt unter https://192.168.1.41:8384 (bzw. der gewählten IP Adresse) erreichbar. Wichtig ist jetzt, unbedingt einen Nutzernamen und ein Passwort zu vergeben und den Standard Ordner Pfad zu ändern, damit Syncthing für unseren use case in der Einleitung funktioniert.  
Hiezu entfernen wir zuerst den default folder. Dazu klicken wir auf "Folders", dann "Default Folder", dann "edit" und dann "remove". Wir brauchen ihn nicht, da dieser Ordner auf unseren Raspis jeweils bei den Syncthing config Dateien im Docker Ordner auf dem home Verzeichnis liegt. Synchronisieren wollen wir aber die Daten auf der externen Festplatte, also die in schritt 3. unter dem container volume /data abgelegt sind.  
Um diesen Pfad korrekt zu hinterlegen klicken wir oben rechts auf "actions", "settings", "Default Configuration" und dann "Edit Folder Defaults" und geben jetzt als Folder Path ```/data``` an. Dann hinterlegen wir den Ordner durch klicken auf "Folders" und "Add Folder". Die Felder befüllen wir wie folgt:
```
Folder Label cloud-master
Folder ID cloud-master
Folder path /data
```
Um später Fehler mit dem filesystem watcher zu vermeiden führen wir jetzt auf der Kommandozeile folgenden Befehl aus: ```echo "fs.inotify.max_user_watches=204800" | sudo tee -a /etc/sysctl.conf``` Dieser erhöht die maximale Anzahl der auf 204.800 und verhindert, dass Syncthing einen entsprechenden Fehler ausgibt. Danach starten wir den Rechner mit ```sudo reboot``` neu. Alternativ ist auch der Befehl ```echo 204800 | sudo tee /proc/sys/fs/inotify/max_user_watches``` möglich, hier ist kein direkter Neustart notwendig.

Syncthing überwacht nun permanent das Verzeichnis ```/cloud-master``` auf Änderungen und synchronisiert diese mit... aktuell noch niemandem, da wir die beiden anderen Raspis noch nicht eingebunden haben. Das erledigen wir jetzt:
1. Klick auf "add remote device"
2. Gib jeweils die volle ID der beiden anderen Raspis an
3. Nur auf cloud-master: wähle den Ordner aus
4. Klicke auf "sharing"
4. Wähle beide backup Raspis aus

Das automatisierte backup auf der eigenen Cloud funktioniert jetzt. Durch die Internetmagie von Syncthing (und die IDs) finden sich die drei Rechner jetzt und synchronisieren sich. Hierzu ist nicht mal ein VPN nötig!

## WireGuard (nur auf den cloud-backups)
Obowhl nur für Syncthing der nächste Schritt nicht notwendig wäre, werden wir im nächsten Schritt trotzem einen privaten VPN über das sehr leichtgewichtige WireGuard Protokoll einrichten. Das VPN dient zum einen der Fernwartung unserer beiden externen Raspis (die wir ja an einem sicheren, externen Ort aufstellen werden), zum anderen erlaubt es uns in Zukunft auf Wunsch etwa weitere tools oder container zu installieren ohne vor Ort sein zu müssen. Ich habe bereits einen WireGuard Server auf meinem OPNsense Router laufen, daher muss ich nur die beiden cloud-backup Geräte als clients einrichten (das Hauptgerät cloud-master bleibt ja bei mir im Heimnetz und benötigt somit keine WireGuard Anwendung). Falls noch kein WireGuard Server besteht und dieser unbedingt auf dem cloud-master Gerät laufen soll, ist die Einrichtung eines Servers zum Beispiel über den [WireGuard Docker Container von linuxserver.io](https://github.com/linuxserver/docker-wireguard) möglich.

Nur für das einrichten der beiden clients gehen wir folgt vor:
1. Im home Ordner (*nicht* in /home/pflavio/docker) einen Ordner für WireGuard anlegen mit ```mkdir wireguard```
2. WireGuard installieren mit ```sudo apt install wireguard```
3. private key erstellen mit ```wg genkey > cloud-backup-1_private.key``` und notieren
4. public key erstellen mit ```wg pubkey < cloud-backup-1_private.key > cloud-backup-1_public.key``` und notieren
5. config file erstellen mit ```sudo nano /etc/wireguard/wg0.conf``` und mit folgendem Inhalt befüllen:
```
[Interface]
PrivateKey = EintragausSchritt3.
Address = 192.168.66.10/32
DNS = 192.168.1.1

[Peer]
PublicKey = EintragvomServer
AllowedIPs = 0.0.0.0/0
Endpoint = öffentlicheIPoderDynDNS:51820
```
Die IP Adresse muss einmalig sein und aus dem im Server definierten Addressraum stammen. DNS ist optional, allerdings habe ich mein eigenes Pi-hole und nutze dies dank WireGuard auch für meine diversen externen und mobilen Geräte.
6. Die beiden public keys der clients müssen jetzt noch im Server als Peers hinterlegt werden (analog zum Server als Peer in Schritt 5.)
7. WireGuard starten mit ```wg-quick up wg0```
8. WireGuard ist jetzt aktiv (überprüfen kann man dies zum Beispiel anhand des letzten handshakes oder des Durchsatzes im Server)
9. Um WireGuard bei jedem booten zu starten führen wir noch ```sudo systemctl enable wg-quick@wg0``` aus

Jetzt könnten die beiden backup Geräte bereits "ausgewildert" und an ihren späteren Bestimmgsort verbracht werden.

## homepage (nur auf cloud-master)
Nachdem die Pflicht nun erfüllt ist, folgt die Kür. Als kleinen Bonus und um eine ähnliche UI/UX wie etwa iCloud Web zu erhalten richten wir noch ein kleines Dashboard ein, über dessen GUI wir mit einem Klick in die diversen Apps abspringen können.

Die Einrichtung ist simpel:
1. Wir wechseln wieder per ```cd ~/Docker``` in den Docker Ordner
2. Im Docker Ordner legen wir mit ```mkdir homepage``` einen Ordner für homepage an
3. Wir erstellen eine docker-compose.yml Datei mit ```nano docker-compose.yml``` mit folgendem Inhalt:
```
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - 3000:3000
    volumes:
      - /home/pflavio/docker/homepage/config:/app/config
```
4. Den Container starten wir mit dem Befehl ```docker compose up -d```
5. Das interface ist jetzt unter http://192.168.1.41:3000 erreichbar. Noch ist es aber komplett leer.
6. Zur Nutzung müssen nun die config files von homepage befüllt werden. Als "Starthilfe" habe ich die Datein für das hier gezeigte Dashboard zum Download verlinkt. Sie müssen auf den eigenen Server angepasst (inkl. URL und API keys) in den Ordner ```/home/pflavio/docker/homepage/config``` kopiert werden (die existierenden Dateien werden ersetzt). Die icons müssen unter ```/home/pflavio/docker/homepage/icons``` abgelegt werden. Danach muss der homepage Container neu gestartet werden (zum Beispiel über Portainer). Das Ergebnis wird in etwa so aussehen:

![Unser eigenes Cloud Dashboard (vergleiche das iCloud Web Dashoard in der Einleitung)](/images/2024-05-07-Eine-private-Cloud/cloud-Übersicht.png)

Paperless-ngx (eine Anwendung zur Digitalisierung von Dokumenten auf Papier) ist in diesem Tutorial nicht enthalten. Eventuell schreibe ich dazu einen weiteren Artikel.

Um es (aus meiner Sicht) perfekt zu machen fehlt nun noch ein reverse proxy, wie etwa Nginx Proxy Manager. Die Services sind zwar nicht exposed, aber wir können diesen trotzdem verwenden um mit Let's Encrypt SSL Zertifikate zu bekommen und "schöne" domain names. Das ist allerdings außerhalb des Umfangs dieses Artikels.

# Finaler Test
Jetzt ist die Stunde der Wahrheit gekommen. Um zu testen ob alles funktioniert, verteilen wir zunächst die beiden externen Raspis. Dann checken wir in Syncthing, ob diese verbunden sind. Alternativ können wir auch schauen, ob die Ping Anzeige auf unserem Dashboard grün ist (=Server ist erreichbar). Zum Testen der Synchronisieerung schieben wir einfach ein paar Dateien auf unsere Nextcloud und schauen, ob Syncthing anfängt zu arbeiten.

# Updates
Man sollte seine Systeme und Applikationen stets aktuell halten, um die Sicherheit und korrekte Funktion zu gewährleisten.

Zum updaten der OS gehen wir wie folgt vor:
1. Wir verbinden uns mit ```ssh username@192.168.1.41``` und dem Passwort per SSH mit dem jeweiligen Rechner (Achtung: bei den beiden externen Raspis brauchen wir nun die jeweils in WireGuard spezifizierte IP, *nicht* die lokale ).
2. Wir aktualisieren die Repositories mit ```sudo apt update``` und bringen mit ```sudo apt upgrade``` das komplette System auf den neusten Stand.

Zum updaten der container können wir entweder Portainer nutzen oder Docker compose.

Über Portainer:
1. Wir wählen den zu aktualisierenden Container in der Portainer GUI unter "Containers" einzeln aus und stoppen ihn über den Button "stop"
2. Wir wählen den zu aktualisierenden Container erneut aus, klicken auf den Namen um in die Ansicht "Container details' zu kommen und klicken dort oben rechts  auf den button "recreate". Im pop-up Fenster wählen setzen wir den Schalter auf 're-pill image" und bestätigen mit "Recreate".
3. Nach einer kurzen Wartezeit (je nach Container Größe) klicken wir auf "Start".
4. Zum Schluss müssen wir den alten Container (erkennbar am Zusatz "-old" am Namen) noch löschen (über den button "remove")

Über Docker compose:
1. Wir ziehen uns die neuesten Versionen der Docker images mit ```docker-compose pull```
2. Nach dem erfolgreichen download starten wir alle Container auf Basis der neuen Images mit ```docker-compose up -d``` neu und haben so den kompletten Stack auf den neusten Stand gebracht.

# Fazit
In diesem blog post habe ich aufgezeigt, warum ich mir Gedanken um eine eigene Cloud gemacht habe und wie diese umgesetzt wurde. Ich habe versucht es möglichst einfach zu halten und im Detail zu erklären. Ich nutze dieses Setup nun seit einigen Wochen und bin bisher sehr zufrieden.

Falls Fragen bestehen schreibt mir gerne eine Email oder schreibt mich bei Mastodon an. Vielen Dank fürs Lesen!

# Quellen
- [IONOS Digital Guide Datenhoheit](https://www.ionos.de/digitalguide/server/sicherheit/datenhoheit/)
- [Apple iCloud+ Deutschland](https://www.apple.com/de/icloud/#compare-plans)
- [debian.org](https://www.debian.org/)
- [ubuntu.com](https://ubuntu.com/)
- [Heise.de "Wie man Docker auf dem Raspberry Pi in 15 Minuten einrichtet"](https://www.heise.de/news/Wie-man-Docker-auf-dem-Raspberry-Pi-in-15-Minuten-einrichtet-7524692.html)
- [portainer.io](https://www.portainer.io/)
- [Nextcloud](https://nextcloud.com/)
- [immich](https://immich.app/)
- [immich-go](https://github.com/simulot/immich-go)
- [Joplin Server für arm64](https://hub.docker.com/r/etechonomy/joplin-server)
- [homepage](https://gethomepage.dev/latest/)