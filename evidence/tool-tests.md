# Tests d'actions — Founder OS (Web Studio OS)

**Date** : 2026-07-10

Ces tests sont **simulés** : les sorties "obtenues" ci-dessous sont des
exemples réalistes rédigés à la main pour vérifier la cohérence avec les
schémas de [docs/structured-outputs.md](../docs/structured-outputs.md), et
non des sorties issues d'une exécution réelle du système. Chaque sortie
simulée est explicitement marquée **« simulé »**.

---

## Test 1 — `qualify_lead`

### Input

```
Un artisan me demande un site vitrine pour vendre ses prestations de rénovation. Il veut savoir le prix, le délai et ce qu'il doit fournir.
```

*(demande fil rouge, réutilisée du jour 1 — voir
[evidence/runs/day-1-first-agent.md](runs/day-1-first-agent.md))*

### Sortie attendue (selon le schéma)

Un objet JSON respectant le schéma "Qualification de lead" : `besoin_reformule`,
`agents_a_mobiliser`, `risque_principal`, `validation_humaine_requise`,
`validation_justification`, `prochaine_action`.

### Sortie obtenue (simulé)

```json
{
  "besoin_reformule": "Site vitrine pour présenter et vendre des prestations de rénovation, avec attente d'un prix, d'un délai et de la liste des éléments à fournir.",
  "agents_a_mobiliser": ["Code/Produit", "Mail/Sales"],
  "risque_principal": "Le besoin n'est pas cadré (nombre de pages, contenus disponibles) : tout chiffrage serait prématuré.",
  "validation_humaine_requise": true,
  "validation_justification": "Aucun prix ni délai ne doit être communiqué sans validation du fondateur.",
  "prochaine_action": "Envoyer un questionnaire de cadrage au prospect."
}
```

*(sortie simulée — cohérente avec le run réel du jour 1, voir
[evidence/runs/day-1-first-agent.md](runs/day-1-first-agent.md) pour la
version réellement exécutée via l'API)*

### Verdict

**Conforme.** Tous les champs obligatoires sont présents, types corrects,
`agents_a_mobiliser` référence bien des agents valides du catalogue.

### Correction à faire

Aucune.

---

## Test 2 — `draft_email_reply`

### Input

Qualification du Test 1 (ci-dessus), destinataire : l'artisan concerné.

### Sortie attendue (selon le schéma)

Un objet JSON respectant le schéma "Brouillon de mail" : `destinataire`,
`objet`, `corps`, `ton` (optionnel), `statut`, `mentions_sensibles`.

### Sortie obtenue (simulé)

```json
{
  "destinataire": "artisan.renovation@example.fr",
  "objet": "Votre projet de site vitrine — quelques précisions avant devis",
  "corps": "Bonjour,\n\nMerci pour votre message concernant votre projet de site vitrine. Avant de vous proposer un prix et un délai précis, pourriez-vous me préciser : le nombre de prestations à présenter, si vous disposez déjà de photos/textes, et un exemple de site qui vous plaît ?\n\nBien à vous,\nWeb Studio OS",
  "ton": "professionnel et chaleureux",
  "statut": "brouillon",
  "mentions_sensibles": ["prix", "délai"]
}
```

*(sortie simulée)*

### Verdict

**Conforme.** Le statut est bien `"brouillon"` (jamais `"envoyé"`), et les
champs sensibles (prix, délai) sont correctement flagués dans
`mentions_sensibles` sans qu'aucun chiffre ne soit avancé dans le corps du
mail.

### Correction à faire

Aucune.

---

## Test 3 — `create_mock_quote`

### Input

Qualification du Test 1 + réponse du prospect au questionnaire de cadrage
(simulée) : "Je veux 5 pages, j'ai déjà des photos, pas de logo."

### Sortie attendue (selon le schéma)

Un objet JSON respectant le schéma "Devis fictif" : `client`, `prestations`,
`montant_total`, `delai_estime`, `conditions` (optionnel), `statut`,
`mention` (fixée à `"(fictif)"`).

### Sortie obtenue (simulé)

```json
{
  "client": "Artisan rénovation — prospect du 2026-07-10",
  "prestations": [
    { "nom": "Site vitrine (5 pages)", "description": "Structure standard + intégration des photos fournies", "prix_unitaire": 1200 }
  ],
  "montant_total": 1200,
  "delai_estime": "10 jours ouvrés",
  "conditions": "Acompte de 30 % à la commande.",
  "statut": "brouillon",
  "mention": "(fictif)"
}
```

*(sortie simulée — montant repris de la grille tarifaire fictive de
[docs/business-brief.md](../docs/business-brief.md))*

### Verdict

**Conforme.** Le montant correspond à la grille tarifaire fictive déjà
documentée, la mention `"(fictif)"` est présente, le statut reste
`"brouillon"`.

### Correction à faire

Aucune.

---

## Test 4 — `search_knowledge_base`

### Input

```
requête : "artisan rénovation site vitrine"
```

### Sortie attendue (selon le schéma)

Un objet JSON respectant le schéma "Recherche dans la mémoire" : `requete`,
`resultats`, `nombre_resultats`, `confiance` (optionnel).

### Sortie obtenue (simulé)

```json
{
  "requete": "artisan rénovation site vitrine",
  "resultats": [
    {
      "extrait": "Premier échange du 2026-07-10 : demande de site vitrine, prix/délai à cadrer, questionnaire envoyé.",
      "note_source": "vault/clients/artisan-renovation.md",
      "date": "2026-07-10"
    }
  ],
  "nombre_resultats": 1,
  "confiance": "moyenne"
}
```

*(sortie simulée — le vault ne contient pas encore réellement cette note à
ce stade du projet ; cet exemple illustre le format attendu une fois le
vault alimenté)*

### Verdict

**Écart mineur.** La sortie respecte le schéma, mais `confiance: "moyenne"`
n'est pas justifiée par un critère explicite dans la sortie — on ne sait pas
sur quelle base ce niveau de confiance est calculé.

### Correction à faire

Ajouter un champ ou une règle documentée expliquant comment `confiance` est
déterminée (ex. : nombre de résultats trouvés, ancienneté de la note) avant
d'implémenter réellement cette action.
