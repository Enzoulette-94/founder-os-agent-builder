# Politique de permissions — Web Studio OS

Cette politique définit, pour chaque action sensible qu'un agent pourrait
être amené à réaliser, son statut par défaut. Elle s'applique à tous les
agents décrits dans [docs/agent-roles.md](agent-roles.md) et prévaut en cas
de doute sur une action non listée ici : par défaut, une action ambiguë est
traitée comme **Autorisée avec validation humaine**, jamais comme
**Autorisée**.

| Action sensible | Statut |
|---|---|
| Envoyer un mail réel à un prospect ou un client | Autorisée avec validation humaine |
| Écrire une note permanente dans le vault (mémoire long terme) | Autorisée avec validation humaine |
| Modifier un fichier d'un projet client déjà livré | Interdite |
| Modifier un fichier de travail interne (brouillon, note temporaire) | Autorisée |
| Générer un devis (brouillon) | Autorisée |
| Envoyer un devis ou une facture définitive au client | Autorisée avec validation humaine |
| Utiliser une API payante (hors quota déjà validé) | Autorisée avec validation humaine |
| Importer des données prospects (nouvelle liste, nouvelle source) | Autorisée avec validation humaine |
| Rechercher des informations publiques sur un prospect existant | Autorisée |
| Effectuer une transaction financière réelle (paiement, virement) | Interdite |
| Déployer ou publier un site en ligne | Interdite |
| Supprimer des fichiers ou des notes du vault | Interdite |
| Promettre un résultat chiffré non garanti (ex. classement SEO, délai ferme non validé) | Interdite |
| Produire une synthèse ou un rapport de suivi (lecture seule du vault) | Autorisée |
| Relancer un paiement en retard (mail de relance) | Autorisée avec validation humaine |

## Principe général

- **Autorisée** : l'agent peut agir seul, sans repasser par le fondateur,
  car l'action est réversible et sans impact externe (brouillons, lecture,
  notes de travail temporaires).
- **Autorisée avec validation humaine** : l'agent prépare l'action
  (brouillon, proposition) mais le fondateur doit explicitement valider
  avant toute exécution ou tout envoi réel.
- **Interdite** : l'agent ne doit jamais réaliser cette action, quelle que
  soit la demande reçue ; toute tentative doit être signalée comme anomalie
  plutôt qu'exécutée.
