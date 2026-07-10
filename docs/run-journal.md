# Journal de run — Jour 1

**Date : 2026-07-10**

## Pourquoi ce projet

L'objectif du jour 1 n'était pas de construire le Founder OS, mais de poser
son **plan** : à quoi ressemble un système d'agents capable d'absorber la
charge opérationnelle répétitive d'une micro-agence web (Web Studio OS), sans
perdre le contrôle sur les décisions qui comptent. Formaliser ce blueprint
avant de coder évite de partir sur une architecture bancale ou sur des
permissions mal pensées une fois le système en place.

## Agents qui semblent les plus importants

- **Agent Mail / Sales** et **Agent Admin / Compta** : ce sont les deux
  agents qui touchent le plus directement à la relation client et à
  l'argent — leur qualité de brouillon (ton, exactitude des montants)
  conditionne la crédibilité du studio.
- **Agent Coach** : parce qu'il est le seul agent avec une vue transverse sur
  le vault entier. Sans lui, le risque est de se noyer dans les tâches
  déléguées aux autres agents sans prendre de recul.

Les agents Code/Produit, SEO et Prospection sont importants aussi, mais leur
sortie est plus facilement vérifiable a posteriori (un plan de site, une
liste de mots-clés) qu'une communication déjà partie ou un montant déjà
engagé.

## Actions les plus sensibles

D'après [docs/permissions-policy.md](permissions-policy.md), les points de
vigilance principaux sont :

- L'**envoi réel d'un mail** ou d'un **devis/facture définitif** : irréversible
  et visible du client, donc systématiquement soumis à validation.
- L'**import de nouvelles données prospects** : risque de dérive vers des
  données personnelles non maîtrisées si l'agent de prospection élargit ses
  sources sans cadrage.
- Toute action touchant un **projet déjà livré** (modification de fichier,
  déploiement) : classée interdite par défaut, car le coût d'une erreur y est
  le plus élevé.

## Questions gardées pour demain

- Comment mesurer concrètement qu'un brouillon (mail, devis) est "prêt à
  valider" plutôt que "à retravailler" — faut-il un score de confiance
  explicite par l'agent ?
- Le vault Obsidian doit-il avoir une structure imposée (dossiers par
  client/projet) ou rester libre au fil de l'eau ?
- À partir de quel volume d'activité le choix "cloud pour tous les agents"
  (voir [docs/provider-choice.md](provider-choice.md)) devient-il coûteux au
  point de reconsidérer une inférence locale partielle ?
- Faut-il un agent supplémentaire dédié à la relation client existante
  (post-livraison), distinct de Mail/Sales qui est plutôt tourné vers
  l'acquisition ?
