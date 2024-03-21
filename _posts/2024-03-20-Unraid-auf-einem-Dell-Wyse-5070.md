---
layout: post
title:  "Unraid auf einem Dell Wyse 5070"
---

# Unraid auf einem Dell Wyse 5070
## Einleitung
Herzlich willkommen auf meiner Seite. Die ist mein erster Post und es geht um meinen ersten Heimserver, einen gebrauchten Dell Wyse 5070. Dieser ist ein sogenannter "thin client" und lässt ähnlich wie vergleichbare Geräte von HP (z.B. EliteDesk) oder Lenovo (z.B. ThinkCentre) bei verschiedenen spezialisierten online Händlern relativ günstig erwerben. Thin clients sind gefühlt seit der COVID-bedingten Raspberry Pi Knappheit sehr sehr beliebt geworden bei Heimanwendern, da sie bei ähnlichen Anschaffungskosten mindestens vergleichbare Leistung liefern, sehr gut erweiterbar sind (Speicherkapazität, Arbeitsspeicher) und dabei trotzdem nur relativ wenig verbrauchen (aber doch etwas mehr als ein Raspi). In diesem Artikel fasse ich alle Informationen auf deutsch zusammen, die ich vorher in [diesem repository](https://github.com/pflavio/Dell-Wyse-5070-Home-Server) auf englisch abgelegt hatte.

Dieser Artikel erklärt, wie man den Dell Wyse 5070 aufrüstet und dann auf dem Gerät Unraid einrichtet, um es als Heimserver nutzen zu können. Zuerst war er bei mir als "besseres" NAS (network-attached storage) und für ein paar Docker Container gedacht. Das Proejkt "eigener Server" ist allerdings mit der Zeit außer Kontrolle geraten und ich habe angefangen, mehr und mehr Dienst selbst zu hosten. Dies führte zwangsläufig auch zu mehr Hardware. Nachdem ich mittlerweile drei Server allein bei mir zuhause betreibe, ist der Dell Wyse 5070 mit Unraid eigentlich nur noch für das Thema Medien zuständig.

Der thin client hat aktuell 32 GB (2x16) RAM verbaut, einen Quad Core mit 4x 1.5GHz Prozessor sowie eine 1 TB interne SSD. Insgesamt hat mich die komplette Hardware um die 300 Euro gekostet (Stand Dezember 2023) und ca. eine Stunde für den Umbau und die Einrichtung. Die vielen vielen Stunden die danach ins home lab allgemein geflossen sind, sind hier natürlich nicht eingerechnet. :) Um zu lernen wie ich das Gerät aufgerüstet und eingerichtet habe, lies gerne weiter. Ich werde versuchen meine Erfahrungen zu beschreiben und hoffe, dass dies für den ein oder anderen bei der Umsetzung eigener, ähnlicher Projekte nützlich ist. Dieser Artikel soll eine Art  eine Schritt für Schritt Anleitung in Form einer kurzen Zusammenfassung der einzelnen Themengebiete werden, die ich nach und nach beschreiben werde. Er basiert auf diversen Texten die ich mir im Vorfeld im Internet durchgelesen habe und fasst das ganze Projekt hoffentlich einigermaßen verständlich zusammen. Die einzelnen Quellen findet ihr auch ganz unten verlinkt.

## Unraid
Die Software beziehungsweise das Betriebssystem welches ich auf meinem Heimserver installieren möchte ist Unraid. Unraid ist ein kommerzielles (bedeutet: 55 Euro einmalig als ich meine Basic Lizenz im Dezember 2023 gekauft habe), aber auf Linux basierendes "NAS Deluxe" Betriebssystem (Distro) mit einer sehr großen und aktiven community. Unraid OS wird von Lime Technology aus den USA entwickelt, einem sehr sympathischen kleinen Familienunternehmen aus Kalifornien (das ist *kein* Sarkasmus, ich empfehle hierzu die Folge "The Unraid Story" des Podcasts ["The Uncast Show"](https://unraid.net/uncast). Gute Entwickler denen ihre Kunden und ihre community wichtig ist unterstütze ich gerne.)

Unraid gilt generell als sehr leichter und benutzerfreundlicher Einstieg in die Welt der Heimserver. Es bietet die Möglichkeit, jede Art und Größe von (USB-) Festplatten anzubinden die mal sich entweder kaufen möchte (meine Samsung SSDs) oder noch irgendwo herumliegen hat (ein altes LaCie Porsche Design Mobile Drive). Theoretisch gehen auch (natürlich große) USB-Sticks (Achtung nicht der mit der Lizenz, dazu später mehr) oder Speicherkarten, aber das macht eher weniger Sinn. Zusätzlich bietet Unraid OS einen eigenen (von der community getriebenen) "App Store", wobei es dort weder Apps gibt noch man diese kaufen muss. Vielmehr handelt es sich bei den Unraid community apps um von der community speziell an Unraid OS angepasste Docker images, die über eine grafische Benutzeroberfläche bequem eingerichtet, verwaltet und aktualisiert werden können. Durch den Docker-Unterbau sind den "Apps" also praktisch keine Grenzen gesetzt was die Funktionen angeht. Man benötigt hierfür praktisch keine Vorkenntnisse und kann sich seinen Server im Prinzip nach belieben "zusammen klicken".

## Verbaute Hardware und Anleitung zum Aufrüsten
In diesem Abschnitt geht es um die verwendete Hardware und eine Schritt-für-Schritt-Anleitung zum Einbau. Achtung: dies geschieht selbstverständlich auf eigene Gefahr und Verantwortung. Ich zeige lediglich wie ich das Projekt angegangen bin und hoffe, dass dies anderen bei der Umsetzung ihrer eigenen Homeserver Projekte weiterhilft.

### Sonstige Dinge die für den Umbau und die Ersteinrichtung des Heimservers nützlich sind: 
- eine *kabelgebundenes* USB-Tastatur
- eine *kabelgebundene* USB-Maus
- ein DisplayPort Kabel
- ein externer Monitor mit DisplayPort Anschluss (oder entsprechendem Adapter)
- eine neue CR2032 Knopfbatterie (nicht zwingend notwendig aber definitiv empfohlen)

### Der Thin client
Wie bereits beschrieben bildet ein thin client von Dell die Basis für meinen ersten Heimserver und zwar speziell das Modell Dell Wyse 5070 (model/type N11D001). Wer sich unter einem thin client nach wie vor nichts vorstellen kann: das sind die Rechner, die man typischerweise zum Beispiel bei Arztpraxen vorne am Empfang sieht. Klein, leise und (meist) relativ leistungsschwach, dafür aber unauffällig und sparsam. Diese Geräte sind normalerweise eher nicht für Heimanwender gedacht, sondern werden "im großen Stil" an Geschäftskunden als "full service" verleast. Nach dem Ende des Leasingzeitraums (typischerweise 36 Monate) gehen sie an den Leasingeber (meist den Hersteller) zurück, welcher die gebrauchten Geräte dann wiederum in sehr großen Chargen an spezialisierte Händler verkaufen die sie (mehr oder weniger gründlich refurbishen, also aufbereiten, etwas reinigen und testen) und dann entweder über den eigenen Shop oder auf Handelsplattformen wie eBay verkaufen. Für mein Gerät habe ich inklusive Versand um die 90 Euro auf eBay gezahlt, inklusive Versand. Die Preise können jetzt aber natürlich je nach aktueller Marktlage und Hype um Raspis und/oder thin clients niedriger oder höher sein (unterscheidet sich aber natürlich auch je nach Ausstattung). Das BIOS zeigt sowohl für das Herstellungsjahr als auch für die erste Inbetriebnahme Ende 2020 an, daher war das Gerät ziemlich genau drei Jahr alt als ich es bekommen habe. Der Zustand war absolut i.O. und es kam inklusive Netzteil (nicht selbstverständlich) und Standfuß.

Es hat folgende Ausstattung:
- Prozessor: Intel Pentium J5005 (Quad Core -> 4x1.5GHz)
- Arbeitsspeicher: 4 GB RAM DDR4
- Festplatte: 16 GB eMMC Flash
- Netzwerkkarte: Gigabit Ethernet port (Ab Werk nur ein Netzwerkport, daher nicht geeignet für einen selbstgebauten Router/Firewall wie zum Beispiel OPNsense. Hierzu folgt bald nochmals ein separater Arikel.)
- Sonstige Schnittstellen: 3 x USB 2.0 (2 vorne, 1 innen), 6 x USB 3.0 (1 vorne, 4 hinten, 1 innen), 1 x USB 3.2 Type C mit Power Delivery und DisplayPort (vorne), 3 x DisplayPort 1.2a hinten)
- es war kein Betriebssystem vorinstalliert (für mich natürlich egal da ich sowieso Unraid installieren wollte, aber es gibt ja noch weitere Anwendungsfälle daher vor dem Kauf genau schauen)
- inklusive NEtzteil und Stecker (Ist wie bereits geschrieben keine Selbstverständlichkeit, daher gilt auch hier die Anzeige vorher genau lesen. Originale Dell Ladegeräte sind relativ teuer, aber es gibt USB-C Adapter mit dem man einfach ein bereits vorhandenes Ladegerät etwa von einem Notebook weiternutzen kann)

Das Gerät ist super kompakt und hat in etwa die Größe einer großen Fritzbox (184 mm x 35,6 mm x 184 mm).

![Rückseite](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/rueckseite.JPG)

### Auspacken und erster Funktionstest
Da es sich bei meinem zwar um ein refurbishtes, aber im Endeffekt trotzdem gebrauchtes, Gerät handelt war der erste Schritt ein eigener Funktionstest. Es heißt zwar von den Händlern immer dass die Geräte (zertifiziert) geprüft werden, aber sicher ist sicher. Ich habe es also per DisplayPort über den obersten Ausgang auf der Rückseite an einen meiner externen Monitore angeschlossen. Zusätzlich habe ich eine kabelgebundene USB-Tastatur und -Maus angeschlossen (ehrlicherweise zuerst nur die Tastatur weil ich dachte das reicht, aber im BIOS konnte ich ohne Maus weder die für das BIOS Update benötigten Dateien noch die richtige Reihenfolge der boot Sequenz auswählen).

![Funktionstest](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/funktionstest.JPG)

Das Gerät startete ohne Probleme, versuchte zu booten aber da wie oben erwähnt kein Betriebssystem installiert war (und es somit nichts zu booten gab) fand ich mich wie erwartet in einem sehr schlichten Menü mit drei Auswahlmöglichkeiten wieder. Nach dem initialen Test habe ich das Gerät neu gestartet um ins BIOS zu gelangen.

![Neustart](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/start.JPG)

### BIOS Update
Beim Neustart kommt man durch drücken von F2 (bei manchen Geräten wohl auch F12) ins BIOS. Ich habe kein Passwort benötigt, solltet ihr gefragt werden lautet es vermutlich "Fireport". Zuallererst habe ich die BIOS Version geprüft und sie war wie erwartet veraltet. Die Support Seite von Dell auf der man sich die aktuellsten BIOS Treiber herunterladen kann habe ich unten bei den Quellen verlinkt. Zum Zeitpunkt der Einrichtung (Dezember 2023) war dies 1.27.0. Durch einen Klick auf "Download" kann man sich die Software herunterladen. Die Datei "Wyse_5070_1.27.0.exe" legt man nun auf einem mit FAT32 formatierten USB-Stick ab (Achtung: beim formatieren werden alle vorhandenen Dateien überschrieben). Nach dem Einstecken des USB-Sticks ins Gerät und einem erneuten Neustart kann das Update durchgeführt werden. Starte das Gerät danach erneut neu, zieh den USB-Stick ab und schaue ob das Update erfolgreich war. Hierbei habe ich direkt auch die Speicherkapazität und den verbauten Arbeitsspeicher geprüft um zu schauen, ob nach meinem anstehenden Umbau auch alles korrekt erkannt wird.

![BIOS](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/bios.JPG)

### Auseinanderbauen des Gehäuses
Schalte das Gerät nun aus und entferne alle Kabel. Entferne mit Hilfe eines Schraubenziehens die einzelne schwarze Schraube zwischen den vier USB-Ports auf der Rückseite sowie die Kabelhalterung. Ziehe nun das Gehäuse vorsichtig auseinander um ans Innere zu gelangen.

![Auseinanderbau](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/auseinanderbau.JPG)

### RAM aufrüsten
Der PC hatte nur magere 4 GB Arbeitsspeicher, daher brauchte ich in jedem Fall ein Update. Obwohl von Dell offiziell nicht freigegeben, funtkioniert das Gerät mit bis zu 32 GB Arbeitspeicher. Ich habe mich daher für eine Aufrüstung von 2x 16 GB RAM entschieden und ein Corsair Vengeance Series 32GB (2 x 16GB) DDR4 SODIMM 2400MHz CL16 Memory Kit verbaut. Dieses Kit hat mich auf Amazon.de etwa 80 Euro inklusive Versand gekostet (Stand Dezember 2023).

![ram](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/ram.JPG)

Raste den aktuell verbauten RAM Riegel durch vorsichtiges Drücken der Haltenasen aus, ziehe ihn nach außen und leg ihn zur Seite. Stecke nun zuerst den unteren Riegel ein und lasse ihn einrasten und wiederhole das ganze dann mit dem oberen Riegel. Stelle hierbei sicher, dass alle Haltenasen wieder korrekt einrasten! Von der nun verbauten Gesamtkapazität von 32 GB kann Unraid etwa 30 GB nutzen.

![Dashboard mit aktueller Auslastung](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/genutzterram.JPG)

### Speicher aufrüsten
Als ich ihn bekommen hatte, hatte mein Thin Client nur 16 GB internen Speicher. Da einer meiner Beweggründe für die Anschaffung ein selbstgebautes NAS war, wollte ich diesen natürlich erweitern. Hierfür habe ich mich für die Western Digital WD Blue SA510 SATA SSD M.2 2280 internal SSD mit einer Kapazität von 1 TB entschieden, welche mich inklusive Versand etwa 70 Euro gekostet hat (Dezember 2023). Achtung: der Dell Wyse 5070 akzeptiert keine NVME SSD, sondern nur M.2 SATA SSD.

![Speicher](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/speicher.JPG)

Die neue SSD muss vorsichtig **mit der richtigen Ausrichtung** (Einschnitte beachten!) eingesteckt werden. Danach wird sie sanft runter gedrückt und mit einer passenden Schraube fixiert. Da ich keine passende Festplattenschraube zur Hand hatte habe ich eine aus dem Sortiment genommen, das meinem Wowstick beilag. Achtung: diese Schraube darf auf keinen Fall zu fest angezogen werden.

### Batteriewechsel (optional)
Da das Gehäuse sowieso offen ist habe ich direkt auch die Knopfzelle gegen eine neue getauscht (CR2032).

![Batterie](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/batterie.JPG)

### Zusammenbauen des Gehäuses
Beide Teile des Gehäuses müssen nun wieder vorsichtig zusammen geschoben werden. Danach wird die einzelne schwarze Schraube auf der Rückseite wieder eingeschraubt und die Kabelhalterung wieder fixiert. Nun können alle Kabel wieder eingesteckt und der Thin Client neu gestartet werden.

### Prüfen ob alles geklappt hat 
Nach dem Start muss wieder F2 (beziehungsweise F12) gedrückt werden um ins BIOS zu gelangen. Unter "system information" können wir nun überprüfen ob die neuen Komponenten korrekt erkannt werden. Ist dies der Fall, ist die Aufrüstung abgeschlossen und es geht mit der Installation von Unraid OS weiter.

### Vorbereiten des USB-Sticks für Unraid
Um Unraid nutzen zu können braucht man einen "Marken-"USB-Stick. Der Grund hierfür ist, dass diese (meist) teureren USB-Stick eine individuelle Seriennummer (GUID) haben die von Unraid mit dem eigenen Lizenzschlüssel verknüpft wird. Die Empfehlung ist ein Gerät zu nehmen dass mindestens 2 GB groß ist (was kein Problem darstellen sollte). Früher gab es auch ein oberes Limit von 32 GB, welches aber nicht mehr gilt (außer vielleicht für die manuelle Installation, aber in dieser Anleitung werden wir den "USB Flash Creator" nutzen). Es ist wichtig zu wissen, dass der USB-Stick zu einer Art "Dongle" umfunktioniert wird und "für immer" (oder zumindest so lange wie man diese Unraid Lizenz in diesem Gerät nutzen möchte ohne sie umzuziehen) im Gerät verbleibt und auch *nicht* als weiterer Speicherplatz genutzt werden kann. Es lohnt sich also nicht, hier einen möglichst großen USB-stick zu verwenden. Ich habe einen alten SanDisk Ultra Dual Drive USB Type-C genommen den ich nicht hatte, auch wenn Unraid offiziell aufgrund einiger Probleme mit Produktfälschungen von SanDisk abrät. Bei mir hat es ohne Problem funktioniert. :)

![USB-Stick](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/usb-stick.JPG)

Nach dem Herunterladen des USB Flash Creator auf den eigenen Computer (MacOS oder Windows, leider kein Linux) von der offiziellen Unraid Webseite muss der USB-Stick eingesteckt werden. Der USB Creator erledigt den Rest, dies kann einige Minuten dauern. Achtung: auch hier werden alle eventuell vorhandenen Daten gelöscht. Der USB-Stick ist danach nicht weiter nutzbar, da er wie bereits beschrieben im Heimserver eingesteckt verbleibt. Nachdem er in den Thin Client eingesteckt wurde kann dieser neu gestartet werden.

### Boot order Festlegen
Nach dem Start muss nun zum letzten Mal F2 (beziehungsweise F12) gedrückt werden um ins BIOS zu gelangen. Hier wird unter "general" -> "boot sequence" der neu geflashte USB-Stick mit Hilfe der Pfeiltasten an die oberste Stelle geschoben und das Gerät final neu gestartet.

![Boot order](/assets/images/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/bootorder.JPG)

### Unraid starten und einrichten
Die gesamte Peripherie bis auf den USB-Stick sowie eventuell gewünschte Festplatten können nun entfernt werden. Wenn die boot Reihenfolge korrekt eingestellt wurde startet Unraid nun.

![Finaler Neustart](/images/assets/2024-03-20-Unraid-auf-einem-Dell-Wyse-5070/neustart.JPG)

Jetzt gibt es zwei Optionen:
1. Unraid direkt einrichten (in diesem Fall müssen Maus, Tastatur und Monitor natürlich wieder angeschlossen werden)
2. Das Gerät ausschalten, an den gewünschten Ort stellen, Ethernetkabel einstecken, einschalten und am eigenen Rechner via web interface im Browser einrichten. So habe ich es gemacht. Falls einem die Unraid Server IP nicht bekannt ist kann man sie sehr einfach zum Beispiel über die DHCP leases des eigenen Browsers nachschauen.

## Software
Diesen Abschnitt habe ich in dieser Neufassung ausgelassen, weil er nur relativ kurz war, da ich ihn direkt nach der Einrichtung geschrieben habe und damals nur wenige Container eingerichtet hatte. Ich werde versuchen einen weiteren Artikel zu schreiben mit allen services die ich aktuell (auf diesem und den weiteren) Servern hoste.

## Quellen
- [Gebrauchter Mini-PC für 70 Euro: Thin Client Fujitsu Futro S740](https://www.heise.de/ratgeber/Gebrauchter-Mini-PC-fuer-70-Euro-Thin-Client-Fujitsu-Futro-S740-7485477.html)
- [Du WILLST einen Homeserver (glaub mir)](https://www.youtube.com/watch?v=cB5n_cWJor8&t=1235s)
- [Download Unraid OS](https://unraid.net/download)
- [Getting started](https://docs.unraid.net/unraid-os/getting-started/)
- [Finden Sie einen Treiber für Ihr Wyse 5070 Thin Client](https://www.dell.com/support/home/de-de/product-support/product/wyse-5070-thin-client/drivers)
- [heckpiets blog](https://www.heckpiet.net/dell-wyse-5070-thin-client-als-home-sever)
- [How to update Dell Wyse 5070 BIOS using USB (no system installed)](https://gist.github.com/oreze/aa803b421a410acd169ccb6782531fe9)