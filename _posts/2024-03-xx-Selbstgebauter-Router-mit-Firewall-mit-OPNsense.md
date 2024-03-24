---
layout: post
title:  "Selbstgebauter Router mit Firewall mit OPNsense"
categories: [Computer]
tags: [Computer, Linux, Lenovo, ThinkPad]
image: 
  path: /images/2024-03-22-Änderungen-beim-Lizenzmodell-und-den-Preisen-bei-Unraid/unraidpro.jpg
  alt: Schnell zuschlagen
---

# Einleitung

 It's a RTL8111/8168/8411 PCI Express Gigabit Ethernet Controller. :) If anyone else is wondering about their system: you can install os-hw-probe from plug-ins and run 'hw-probe -all -upload' to get a full, easy to read report on your hardware and also help out the BSD community. 

Treiber Version überprüfen

 root@OPNsense:~ # sysctl -a | grep -E 'dev.(igb|ix|em).*.%desc:'
dev.em.3.%desc: Intel(R) PRO/1000 PT 82571EB/82571GB (Quad Copper)
dev.em.2.%desc: Intel(R) PRO/1000 PT 82571EB/82571GB (Quad Copper)
dev.em.1.%desc: Intel(R) PRO/1000 PT 82571EB/82571GB (Quad Copper)
dev.em.0.%desc: Intel(R) PRO/1000 PT 82571EB/82571GB (Quad Copper)
root@OPNsense:~ # sysctl -a | grep -E 'dev.(igb|ix|re).*.%desc:'
dev.re.0.%desc: Realtek PCIe GbE Family Controller
root@OPNsense:~ # 



# Fazit
rg

## Quellen
- [New Unraid OS License Pricing, Timeline, and FAQs](https://unraid.net/blog/new-pricing)