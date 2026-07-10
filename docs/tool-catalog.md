# Catalogue d'actions — Founder OS (Web Studio OS)

Ce catalogue documente les actions ("tools") que les agents du Founder OS
peuvent exécuter. Il est **entièrement simulé** à ce stade : aucune des
actions ci-dessous n'est branchée sur un système réel (pas d'envoi de mail,
pas de déploiement, pas de transaction). La stack "cloud/API" mentionnée pour
certaines actions renvoie à l'API Anthropic déjà utilisée par l'agent
Qualifier ([docs/first-agent-config.md](first-agent-config.md)) — toute
utilisation réelle d'une API payante devra être signalée avant usage,
conformément à [docs/permissions-policy.md](permissions-policy.md).

---

## `qualify_lead`

- **Mission** : qualifier une demande entrante (prospect ou client) et
  produire une analyse structurée en 5 blocs (besoin, agents à mobiliser,
  risque, validation requise, prochaine action).
- **Agents autorisés** : Mail/Sales, Coach.
- **Entrées** : texte brut de la demande.
- **Sortie attendue** : objet structuré "qualification de lead" (voir
  [docs/structured-outputs.md](structured-outputs.md)).
- **Permissions** : lecture seule ; aucune donnée n'est modifiée ni envoyée
  à un tiers autre que l'API utilisée pour l'analyse.
- **Risques** : qualification erronée si la demande est ambiguë ;
  sur-interprétation d'un besoin non explicite.
- **Approval requis** : non (analyse informative, non engageante).
- **Stack utilisée** : cloud/API (Claude, API Anthropic — agent Qualifier
  existant).

## `draft_email_reply`

- **Mission** : rédiger un brouillon de réponse mail à un prospect ou un
  client, jamais envoyé automatiquement.
- **Agents autorisés** : Mail/Sales.
- **Entrées** : contexte de la demande (idéalement la sortie de
  `qualify_lead`), historique éventuel dans le vault.
- **Sortie attendue** : objet structuré "brouillon de mail" (objet + corps,
  voir [docs/structured-outputs.md](structured-outputs.md)).
- **Permissions** : écriture d'un brouillon uniquement ; aucun accès à un
  service d'envoi de mail réel.
- **Risques** : ton inadapté au destinataire ; mention implicite d'un prix
  ou d'un délai non validé.
- **Approval requis** : non pour la rédaction du brouillon ; **oui**
  systématiquement avant tout envoi réel (action distincte, hors de ce
  catalogue à ce stade).
- **Stack utilisée** : simulée (par défaut).

## `create_mock_quote`

- **Mission** : générer un devis **fictif** (prestations, montant, délai
  indicatif) à partir de la grille tarifaire du studio et du besoin qualifié.
- **Agents autorisés** : Admin/Compta.
- **Entrées** : type de prestation demandée, éléments spécifiques au client,
  grille tarifaire de [docs/business-brief.md](business-brief.md) (déjà
  marquée fictive).
- **Sortie attendue** : objet structuré "devis fictif" (voir
  [docs/structured-outputs.md](structured-outputs.md)), portant
  explicitement la mention **(fictif)**.
- **Permissions** : écriture d'un brouillon de devis ; aucun engagement
  contractuel réel, aucun envoi.
- **Risques** : montant incohérent avec la grille tarifaire ; devis brouillon
  pris à tort pour un document final par le fondateur ou le client.
- **Approval requis** : non pour la génération du brouillon ; **oui** avant
  tout envoi au client.
- **Stack utilisée** : simulée (par défaut).

## `extract_seo_keywords`

- **Mission** : proposer une liste de mots-clés et des recommandations
  d'optimisation SEO de base pour un site client.
- **Agents autorisés** : SEO.
- **Entrées** : contenu des pages du site, secteur d'activité du client,
  mots-clés cibles éventuels.
- **Sortie attendue** : objet structuré "recherche SEO" (liste de mots-clés
  + recommandations), au format défini dans
  [docs/structured-outputs.md](structured-outputs.md).
- **Permissions** : lecture du contenu existant ; écriture d'une note de
  recommandations ; aucune publication directe sur le site du client.
- **Risques** : mots-clés hors sujet ; promesse implicite de résultat de
  positionnement (interdite, voir permissions-policy).
- **Approval requis** : non pour la génération des recommandations ; **oui**
  avant toute publication ou communication au client.
- **Stack utilisée** : cloud/API (Claude, API Anthropic — API payante à
  signaler avant usage réel).

## `search_knowledge_base`

- **Mission** : rechercher une information pertinente dans le vault
  Obsidian (mémoire du Founder OS) pour contextualiser une action en cours.
- **Agents autorisés** : tous les agents (recherche transverse), en
  particulier l'agent Coach.
- **Entrées** : requête de recherche, filtre éventuel (client, projet,
  période).
- **Sortie attendue** : objet structuré "résultat de recherche" (extraits +
  référence à la note source), voir
  [docs/structured-outputs.md](structured-outputs.md).
- **Permissions** : lecture seule du vault ; aucune écriture.
- **Risques** : information périmée ou incomplète ; mauvaise interprétation
  du contexte retrouvé.
- **Approval requis** : non (lecture seule, non engageante).
- **Stack utilisée** : locale (vault Obsidian, recherche sans appel cloud).

## `write_note_draft`

- **Mission** : rédiger un brouillon de note destinée au vault Obsidian
  (synthèse, décision, information client), en attente de validation avant
  de devenir une note permanente.
- **Agents autorisés** : tous les agents peuvent proposer une note brouillon,
  en particulier l'agent Coach.
- **Entrées** : contenu à noter (texte libre), référence au projet/client
  concerné.
- **Sortie attendue** : objet structuré "brouillon de note", marqué
  "brouillon" tant qu'il n'est pas validé.
- **Permissions** : écriture d'un brouillon temporaire uniquement ;
  l'écriture d'une **note permanente** dans le vault exige une validation
  humaine explicite (voir [docs/permissions-policy.md](permissions-policy.md)).
- **Risques** : information incorrecte ou incomplète figée dans la mémoire
  long terme si elle est validée trop vite.
- **Approval requis** : non pour le brouillon lui-même ; **oui** pour toute
  transformation en note permanente.
- **Stack utilisée** : locale (vault Obsidian).
