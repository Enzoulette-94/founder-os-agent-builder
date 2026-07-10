# Politique de permissions — Web Studio OS

Cette politique définit, pour chaque action sensible qu'un agent pourrait
être amené à réaliser, son statut par défaut. Elle s'applique à tous les
agents décrits dans [docs/agent-roles.md](agent-roles.md) et à toutes les
actions du [catalogue](tool-catalog.md), et prévaut en cas de doute sur une
action non listée ici : par défaut, une action ambiguë est traitée comme
**Autorisée avec validation humaine**, jamais comme **Autorisée**.

## Règles clés (rappel jour 2)

- Les **mails** produits par les agents sont **toujours des brouillons** :
  aucun agent n'envoie un mail réel automatiquement, quelle que soit la
  qualité perçue du brouillon (voir `draft_email_reply` dans le
  [catalogue](tool-catalog.md)).
- Les **devis** générés par les agents sont **fictifs** par défaut tant que
  le fondateur ne les a pas validés et transformés en offre réelle (voir
  `create_mock_quote`).
- L'écriture d'une **note permanente** dans le vault Obsidian (mémoire long
  terme) exige toujours une **validation humaine** explicite ; un brouillon
  de note (non permanent) reste autorisé sans validation (voir
  `write_note_draft`).
- Toute **API payante** nouvelle ou non déjà budgétée doit être **signalée
  au fondateur avant tout usage réel**, même si l'agent est techniquement
  capable de l'appeler.

| Action sensible | Statut |
|---|---|
| Qualifier une demande entrante (analyse, sans action engageante) | Autorisée |
| Rédiger un brouillon de mail (sans envoi) | Autorisée |
| Envoyer un mail réel à un prospect ou un client | Autorisée avec validation humaine |
| Rédiger un brouillon de note (non permanente) dans le vault | Autorisée |
| Écrire une note permanente dans le vault (mémoire long terme) | Autorisée avec validation humaine |
| Modifier un fichier d'un projet client déjà livré | Interdite |
| Modifier un fichier de travail interne (brouillon, note temporaire) | Autorisée |
| Générer un devis (brouillon, marqué fictif) | Autorisée |
| Envoyer un devis ou une facture définitive au client | Autorisée avec validation humaine |
| Utiliser une API payante déjà signalée et budgétée (ex. agent Qualifier existant) | Autorisée |
| Utiliser une nouvelle API payante non encore signalée/budgétée | Autorisée avec validation humaine |
| Consulter (lecture seule) le vault Obsidian ou rechercher une information mémorisée | Autorisée |
| Importer des données prospects (nouvelle liste, nouvelle source) | Autorisée avec validation humaine |
| Rechercher des informations publiques sur un prospect existant | Autorisée |
| Effectuer une transaction financière réelle (paiement, virement) | Interdite |
| Déployer ou publier un site en ligne | Interdite |
| Publier des recommandations SEO sur le site d'un client | Autorisée avec validation humaine |
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
