# Demandes types — objectif fin de semaine

Ces trois scénarios illustrent des demandes concrètes que le Founder OS
devra savoir orchestrer entre ses agents d'ici la fin de la semaine. Ils
servent de fil conducteur pour tester le système une fois implémenté.

## 1. Nouveau prospect — demande de landing page

> « Un prospect demande une landing page pour son activité de coaching
> sportif, budget serré, il veut quelque chose de rapide. »

Le Founder OS doit produire, via l'orchestrateur :
- une **analyse** du besoin (Agent Code/Produit : ce qui est faisable dans
  le format landing page, ce qui ne l'est pas) ;
- une **offre** adaptée (Agent Admin/Compta, à partir de la grille tarifaire
  du studio) ;
- un **brouillon de mail** de réponse au prospect (Agent Mail/Sales, non
  envoyé sans validation) ;
- un **devis fictif** correspondant à l'offre proposée (Agent
  Admin/Compta) ;
- une **checklist produit** listant ce qui devra être vérifié avant
  livraison (Agent Code/Produit).

## 2. Client existant — site qui ne remonte pas sur Google

> « Un client livré il y a deux mois se plaint que son site n'apparaît pas
> dans les recherches Google. »

Le Founder OS doit produire :
- un **diagnostic SEO** de base du site concerné (Agent SEO) ;
- des **recommandations concrètes** (méta-données, contenu, structure),
  sans promesse chiffrée de résultat (rappel de l'interdiction posée dans
  [docs/permissions-policy.md](permissions-policy.md)) ;
- un **brouillon de mail** expliquant le diagnostic et les prochaines étapes
  au client (Agent Mail/Sales, non envoyé sans validation) ;
- une **note de suivi** archivée dans le vault pour garder trace de
  l'échange.

## 3. Point hebdomadaire du fondateur

> « Fais-moi un point sur la semaine : où en sont mes projets, qu'est-ce qui
> est bloqué, à quoi dois-je faire attention ? »

Le Founder OS doit produire :
- une **synthèse transverse** de l'activité de la semaine, à partir du vault
  (Agent Coach) ;
- la liste des **actions en attente de validation humaine** (mails non
  envoyés, devis non validés, imports de prospects en attente) ;
- les **questions ouvertes** nécessitant un arbitrage du fondateur ;
- une **priorisation proposée** pour la semaine suivante, sans décision
  automatique à sa place.
