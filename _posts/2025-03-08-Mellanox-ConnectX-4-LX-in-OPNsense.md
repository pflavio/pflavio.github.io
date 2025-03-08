---
layout: post
title:  "Mellanox ConnectX-4 LX in OPNsense"
categories: [Homelab]
tags: [Homelab, OPNsense, Networking]
image: 
  path: /images/2025-03-08-Mellanox-ConnectX-4-LX-in-OPNsense/signal-2025-03-08-221948-002.jpeg
  alt: Die Mellanox ConnectX-4 LX passt sogar in das beim riser mitgelieferte bracket (eigentlich für quad port gigabit NIC), wenn man die untere Befestigungsschraube nicht montiert. Nicht unbeding schön, aber passt.
---

# Einführung

Die Mellanox ConnectX-4 LX ist eine güstige Möglichkeit an eine 10 Gbit NIC (sogar 25 Gbit, aber ohne den passenden switch egal). Sie liegt gebraucht bei eBay zwischen 35 Euro (single port) und 70 Euro (dual port). Nvidia (mittlerweile Eigentümerin von Mellanox) unterstützt dieses Modell sogar noch mit aktueller Firmware. Die NIC funktioniert unter Linux plug and play und das Firmware Update ist relativ einfach (Anleitung unten). Unter FreeBSD (relevant für OPNsense) ist die Situation ähnlich. In OPNsense selbst muss ein Tuneable Eintrag gesetzt werden, damit der entsprechende Treiber direkt beim boot Vorgang geladen wird (Anleitung unten). Die NIC unterstützt ASPM (ein Stromsparmodus), hierzu darf sie aber nicht in einem direkt mit der CPU verbundenen PCIe Slot stecken (sondern in einem PCH PCIe Slot). Das bedeutet grob je weiter unten in einem klassichen ATX mainboard desto besser

Ich habe mir verschiedene NICs gekauft um meine Server im homelab 10 Gbit fähig zu machen. Die Mellanox ConnectX-4 LX ist (aus meiner Sicht) die beste Variante für den Lenovo M720q Tiny. Hier beschreibe ich wie ich die Karte für meinen OPNsense Tiny installiert habe. Zuerst habe ich die Firmware geupdatet (unter Linux, nicht FreeBSD), dann einen neuen boot Paramenter in OPNsense gesetzt, dann die Karte in meinen Tiny eingebaut und zuletzt über die OPNsense direkt die neue Interface Zuordnung erledigt.

![Mellanox ConnectX-4 LX (oben) im Größenvergleich mit einer Intel X710-DA2 (unten). Die Intel NIC passt ohne Modifikationen am Gehäuse nicht in den Lenovo M720q Tiny.](/images/2025-03-08-Mellanox-ConnectX-4-LX-in-OPNsense/signal-2025-03-08-145352-002.jpeg)

Mellanox ConnectX-4 LX (oben) im Größenvergleich mit einer Intel X710-DA2 (unten). Die Intel NIC passt ohne Modifikationen am Gehäuse nicht in den Lenovo M720q Tiny.

# Firmware Upgrade auf neueste Version

Für das Firmware Upgrade verwenden wir [Mstflint](https://github.com/Mellanox/mstflint/tree/master), eine open source version von MFT (Mellanox Firmware Tools). Unter Arch Linux installieren wir das tool mit:

```
yay -S mstflint
```

Zuerst listen wir alle Mellanox devices um zu sehen, ob die Karte korrekt erkannt wurde.

```
/sbin/lspci -d 15b3:
```

```
05:00.0 Ethernet controller: Mellanox Technologies MT27710 Family [ConnectX-4 Lx]
05:00.1 Ethernet controller: Mellanox Technologies MT27710 Family [ConnectX-4 Lx]
```

Da ich in diesem Beispiel die dual port Variante (Modellnummer: CX4121A-ACAT) verbaut habe, werden auch zwei devices erkannt.

Wir nutzen Mstflint um zu checken, welche Firmware Version aktuell aufgespielt ist:

```
sudo mstflint -d 05:00.0 q
```

```
Image type:            FS3
FW Version:            14.28.2006
FW Release Date:       15.9.2020
Product Version:       14.28.2006
Rom Info:              type=UEFI version=14.21.17 cpu=AMD64
                       type=PXE version=3.6.102 cpu=AMD64
Description:           UID                GuidsNumber
Base GUID:             b8599f0300f11c18        4
Base MAC:              b8599ff11c18            4
Image VSD:             N/A
Device VSD:            N/A
PSID:                  LNV2420110034
Security Attributes:   N/A
```

```
sudo mstflint -d 05:00.1 q
```

```
Image type:            FS3
FW Version:            14.28.2006
FW Release Date:       15.9.2020
Product Version:       14.28.2006
Rom Info:              type=UEFI version=14.21.17 cpu=AMD64
                       type=PXE version=3.6.102 cpu=AMD64
Description:           UID                GuidsNumber
Base GUID:             b8599f0300f11c18        4
Base MAC:              b8599ff11c18            4
Image VSD:             N/A
Device VSD:            N/A
PSID:                  LNV2420110034
Security Attributes:   N/A
```

Ich habe hier beide devices gecheckt, ist abber natürlich nicht notwendig da sie immer identisch bespielt werden.

Mit ibv\_devinfo können wir die hca\_id herausfinden:

```
ibv_devinfo | grep hca_id
```

```
hca_id:    mlx5_0
hca_id:    mlx5_1
```

Diese hci\_id nutzen wir jetzt wiederum, um die VQuellenPD (Vital Product Data) unserer Karte zu bekommen, darunter die genaue Modellnummer. Das ist gleich für den Download der Treiber wichtig. Hierzu nehmen wir das mstvpd tool:

```
sudo mstvpd mlx5_0
```

```
ID:      Mellanox ConnectX-4 Lx PCIe 25Gb 2-Port SFP28 Ethernet Adapter
PN:      01GR252
V2:      01GR253
SN:      Y150AG9AP1B1
V3:      62155c897afbe9118000b8599ff11c18
MN:      A5
VA:      LNV:MODL=CX4121A-ACAT:CNLY=22:PKTY=9:PHTY=32773:MN=LNV:CSKU=V2:UUID=V3
V0:      Mellanox ConnectX-4 Lx PCIe 25Gb 2-Port SFP28 Ethernet Adapter
```

```
sudo mstvpd mlx5_1
```

```
ID:      Mellanox ConnectX-4 Lx PCIe 25Gb 2-Port SFP28 Ethernet Adapter
PN:      01GR252
V2:      01GR253
SN:      Y150AG9AP1B1
V3:      62155c897afbe9118000b8599ff11c18
MN:      A5
VA:      LNV:MODL=CX4121A-ACAT:CNLY=22:PKTY=9:PHTY=32773:MN=LNV:CSKU=V2:UUID=V3
V0:      Mellanox ConnectX-4 Lx PCIe 25Gb 2-Port SFP28 Ethernet Adapter
```

Auch hier habe ich wieder beide gechekt, es reicht aber eine "Seite". Wichtig ist der Eintrag "LNV:MODL=CX4121A-ACAT" in der vorletzten Zeile. Diese Modellnummer brauchen wir im nächsten Schritt auf der NVIDIA Seite.

Die Firmware für alle Mellanox ConnectX-4 LX NIC gibt es unter [https://network.nvidia.com/support/firmware/connectx4lxen/](https://network.nvidia.com/support/firmware/connectx4lxen/). Wir filtern die Liste nach MCX4121A-ACAT und laden die Firmware runter (aktuell im März 2025: MT\_2420110034 / ConnectX4Lx: fw-ConnectX4Lx-rel-14\_32\_1900-MCX4121A-ACA\_Ax-UEFI-14.25.17-FlexBoot-3.6.502). Eine detailierte Anleitung zum flashen der NIC (mit MFT, Mstflint funktioniert aber beinahe identisch) gibt es unter [https://network.nvidia.com/support/firmware/nic/](https://network.nvidia.com/support/firmware/nic/).

Folgender Befehlt flasht die soeben heruntergeladene firmware auf die Karte:

```
sudo mstflint -d 05:00.0 -i fw-ConnectX4Lx-rel-14_32_1900-MCX4121A-ACA_Ax-UEFI-14.25.17-FlexBoot-3.6.502.bin -allow_psid_change burn
```

Nach erfolgreichem Abschluss des flash Vorgangs nutzen wir erneut Mstflint (analog zu oben) um zu checken, welche Firmware Version aktuell aufgespielt ist.

```
sudo mstflint -d 05:00.1 q
```

Es sind zwei Einträge sichtbar. Um die aktuelle Version zu laden starten wir das System neu. Der Update Vorgang ist abgeschlossen.

```
sudo reboot
```

# Interface Zuordnung

- In einem Tiny (normale Orientierung): links das erste Interface (0, in meinem Fall enp5s0f0np0) und rechts das zweite (1, in meinem Fall enp5s0f0np1)
- In einem PC (Karte gedreht): links 1 (in meinem Fall enp5s0f0np1) und rechts 0 (in meinem Fall enp5s0f0np0)

Warum ich das erwähne? Weil ich das DAC Kabel nach dem Einbau in meinem Tiny beim ersten Mal wie gewohnt außen eingesteckt habe und erstmal überlegen musste warum ich keine Verbindung bekomme (bis ich gemerkt habe, dass ich das Interface von 0 auf 1 wechseln muss weil die Interfaces durch den umgedrehten Verbau "vertauscht" sind).

[![Die Mellanox ConnectX-4 LX mit montiertem riser für den M720q Tiny. Das bracket muss noch entfernt werden.](/images/2025-03-08-Mellanox-ConnectX-4-LX-in-OPNsense/signal-2025-03-08-221948.jpeg)

Die Mellanox ConnectX-4 LX mit montiertem riser für den M720q Tiny. Das bracket muss noch entfernt werden.

# OPNsense: Mellanox ConnectX-4 LX beim boot Vorgang laden

Um die Mellanox ConnectX-4 LX in der OPNsense firewall nutzen zu können ist zwar keine Treiberinstallation notwendig, allerdings ein boot Eintrag da der Treiber bei einer Standardinstallation nicht automatisch beim booten geladen wird. Dies ist natürlich VOR dem Einbau der Karte durchzuführen, da diese sonst nicht genutzt werden kann. Wie gehen wie folgt vor:

Unter System -&gt; Settings -&gt; Tunables einen neuen Eintrag erstellen.

- Tunable: mlx5en\_load
- Type: environment
- Value: yes
- Description: aussagekräftige Beschreibung, um den Eintrag bei Bedarf zuordnen zu können.

[![Der obige screenshot zeigt den fertigen Eintrag](/images/2025-03-08-Mellanox-ConnectX-4-LX-in-OPNsense/G3Vimage.png)

# Wechsel der Interfaces

Nach dem Tausch der NIC musste ich die Interfaces über die OPNsense CLI tauschen (da LAN noch meiner alten 1 Gbit NIC zugeordet bzw. dann verwaist war). Hierzu einfach die OPNsense mit angeschlossenem keyboard und Maus booten, einloggen und mit

```
/usr/local/sbin/opnsense-shell
```

das Installationsmenü aufrufen. Hier durch klicken von 1 die Interfaces neu zordnen und im Punkt LAN das neue (drauf achten welches, siehe meine Verwechslung oben) LAN Interface auswählen. Neu starten und fertig!

[![Ansicht auf der OPNsense](/images/2025-03-08-Mellanox-ConnectX-4-LX-in-OPNsense/signal-2025-03-08-221948-005.jpeg)

# Quellen
- [Thomas Krenn Wiki](https://www.thomas-krenn.com/de/wiki/OPNsense\_Chelsio\_Mellanox\_Broadcom\_Netzwerkkarten-Treiber\_aktivieren#Tuneable\_Eintr%C3%A4ge\_f%C3%BCr\_Chelsio\_und\_Mellanox\_Netzwerkkarten)
