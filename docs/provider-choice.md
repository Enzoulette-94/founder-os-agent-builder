# Choix de plateforme — Obsidian local + Claude cloud

## Choix retenu

Web Studio OS repose sur une architecture **mixte** :

- **Mémoire (vault)** : Obsidian, en local, sur la machine du fondateur.
- **Agents (inférence)** : Claude, en cloud.

## Justification

### Puissance machine (Mac M4)

Le fondateur dispose d'un Mac M4, une machine capable de faire tourner des
modèles locaux pour certaines tâches légères. Cependant, le choix retenu ici
est d'**externaliser l'inférence des agents** vers le cloud plutôt que
d'exploiter cette capacité locale. Ce choix est une préférence assumée du
fondateur, pas une contrainte technique : la machine n'est pas le facteur
limitant.

### Compromis coût

Faire tourner des agents en cloud implique un coût d'usage récurrent (par
appel/par volume), alors qu'un modèle local n'a pas de coût marginal par
requête au-delà de l'investissement matériel déjà réalisé. Ce compromis est
accepté ici en échange de la simplicité (pas de gestion de modèles locaux, de
mises à jour, de contraintes mémoire/VRAM) et d'un accès à des modèles plus
capables que ce qui tournerait confortablement en local sur cette machine.

### Confidentialité des données du vault

Le vault Obsidian contient les données les plus sensibles du studio :
historique des échanges clients, informations de prospection, éléments
administratifs et financiers. En le gardant **local**, ces données ne
transitent pas vers un tiers en permanence — seuls les extraits nécessaires à
une tâche donnée sont envoyés aux agents cloud au moment de l'exécution. Le
vault lui-même n'est pas hébergé ni synchronisé vers un service tiers dans ce
blueprint.

### Latence

Le local (vault) est instantané pour la lecture/écriture de notes. Le cloud
(agents) introduit une latence réseau par appel, jugée acceptable ici car les
tâches déléguées aux agents (rédaction, analyse, synthèse) ne sont pas
sensibles au temps réel — contrairement à la consultation directe du vault
par le fondateur, qui reste locale et instantanée.

## Statut du choix

Ce choix de plateforme est **provisoire et non bloquant**. Il pourra être
revu (par exemple vers une inférence locale partielle sur le Mac M4 pour
certaines tâches, ou vers un hébergement cloud du vault) sans remettre en
cause l'architecture globale décrite dans
[docs/architecture.md](architecture.md), qui reste valable indépendamment du
provider effectivement utilisé.
