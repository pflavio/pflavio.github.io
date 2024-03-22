---
layout: post
title:  "Änderungen beim Lizenzmodell und den Preisen bei Unraid"
categories: [Homelab]
tags: [Homelab, Unraid, Server]
image: 
  path: /images/2024-03-22-Änderungen-beim-Lizenzmodell-und-den-Preisen-bei-Unraid/unraidpro.jpg
  alt: Schnell zuschlagen
---

# Erwartete Änderungen
Bei Reddit war es ein großes Thema seit der user [u/Akadexium](https://www.reddit.com/user/Akadexium/) Hinweise im Code entdeckt hatte: Unraid ändert sein Lizenzmodell. Aktuell ist es so, dass man für eine einmalige Zahlung ein von drei Lizenzleveln kauft, die sich nur in der Anzahl der maximal möglichen verbundenen Speichermedien (nicht Speichergröße!) unterscheiden. Für eine Gebühr, die minimal höher ist als gleich ein höheres Level zu kaufen, kann man auch upgraden. Egal welche Stufe man besitzt, man erhält lebenslang updates und Upgrades auf neue Versionen. Soweit so gut (und wahrscheinlich unsustianable für Lime Technology). Dieses Lizenzmodell hat nun ausgedient und wird durch ein neues ersetzt, welches zwar ebenfalls aus drei Stufen besteht, die sich aber beim weiteren Support etwas unterscheiden.

# Neue Lizenzarten und Peise
Bisher war es so, dass man einmalig eine Lizenz kauft und lebenslag mit Updates versorgt wird. In Zukunft wird es etwas anders:
- Starter kostet $49 und ersetzt mehr oder weniger Basic (6 Festplatten, aber auf ein Jahr begrenzte Updates)
- Unleashed kostet $109 und ersetzt irgendwas zwischen Plus und Pro (unlimitierte Festplatten, aber auf ein Jahr begrenzte Updates)
- Lifetime kostet $249 und ersetzt praktisch Pro (unlimitierte Festplatten mit unbegrenzten Updates) -> alles wie immer, nur teurer

![Neue Lizenzarten](/images/2024-03-22-Änderungen-beim-Lizenzmodell-und-den-Preisen-bei-Unraid/lizenzen.png)

Für Pro gibt es also einen 1:1 Ersatz, der aber fast doppelt so viel kostet. Die beiden niedrigeren level werden zwar erst mal leicht günstiger, aber bekommen nur noch für ein Jahr ab Kauf Softwareupdates. Sie funktionieren zwar auch weiterhin (es ist kein Abomodell im klassichen Sinn), aber bleiben eben auf dem Stand an dem das Jahr abgelaufen ist. Beide (Starter und Unleased) können für jährlich 36$ jeweils um ein Jahr weiter mit Updates versorgt werden und das jederzeit (man kann also auch mal ein oder mehrere Jahre "aussetzen" und dann erst auf den zu diesem Zeitpunkt aktuellsten Stand aufrüsten).

# Gültigkeit
Lime Technology nennt auf ihrer Internetseite Mittwoch, den 27 März, als Stichtag. Vermutlich kalifornischer Zeit, daher würde ich vermuten die neuen Bedingungen gelten ab kommenden Mittwoch 8:00 Uhr morgens bei uns.

# Fazit
Ich habe meine bestehende Unraid OS Basic Lizenz direkt auf Unraid OS Pro geupgradet. Brauche ich zwar aktuell noch nicht (habe aktuell nur 3 von 6 Plätzen verbraucht), aber haben ist besser als brauchen. Ausserdem habe ich jetzt lebenslang Ruhe. :) Insgesamt muss ich aber auch sagen, dass ich nahc wie vor super zufrieden mit Unraid bin und mich von Anfang an gefragt habe wie die Firma nur mit einer einmaligen Zahlung pro Kunde wirtschaftlich operieren konnte. Super finde ich, dass sich für bestehende Kunden nichts ändert und sie nach wie vor mit Updates versorgt werden (und man nicht einfach gesagt hat wir benennen das Produkt um und alte Lizenzen gelten nru noch für das dann alte Produkt). Wer noch keine Lizenz hat, sollte sich schnell noch eine zu den alten Bedingungen kaufen! Auch eine Unraid OS Basic Lizenz reicht erstmal, man wird auch später noch zu alten Konditionen upgraden können auch wenn das wohl ein bisschen teurer wird.

## Quellen
- [New Unraid OS License Pricing, Timeline, and FAQs](https://unraid.net/blog/new-pricing)
- [PSA: Unraid might be changing license models](https://www.reddit.com/r/selfhosted/comments/1aue3rc/psa_unraid_might_be_changing_license_models/)