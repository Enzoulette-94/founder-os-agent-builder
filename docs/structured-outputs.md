# Schémas de sortie structurés — Founder OS (Web Studio OS)

Ce document définit le format de sortie attendu pour les actions du
[catalogue](tool-catalog.md). Chaque schéma est présenté sous forme d'un
tableau de champs (nom, type, obligatoire/optionnel, exemple) suivi d'un
exemple JSON complet, pour rester cohérent d'un schéma à l'autre.

---

## 1. Qualification de lead (`qualify_lead`)

| Champ | Type | Obligatoire | Exemple |
|---|---|---|---|
| `besoin_reformule` | string | oui | "Site vitrine pour présenter des prestations de rénovation, avec devis et délai attendus." |
| `agents_a_mobiliser` | array\<string\> (parmi : Code/Produit, SEO, Prospection, Mail/Sales, Admin/Compta, Coach) | oui | `["Code/Produit", "Mail/Sales"]` |
| `risque_principal` | string | oui | "Besoin non chiffré, informations de cadrage manquantes." |
| `validation_humaine_requise` | boolean | oui | `true` |
| `validation_justification` | string | oui | "Aucun prix/délai ne doit être communiqué sans accord du fondateur." |
| `prochaine_action` | string | oui | "Envoyer un questionnaire de cadrage au prospect." |

```json
{
  "besoin_reformule": "Site vitrine pour présenter des prestations de rénovation, avec devis et délai attendus.",
  "agents_a_mobiliser": ["Code/Produit", "Mail/Sales"],
  "risque_principal": "Besoin non chiffré, informations de cadrage manquantes.",
  "validation_humaine_requise": true,
  "validation_justification": "Aucun prix/délai ne doit être communiqué sans accord du fondateur.",
  "prochaine_action": "Envoyer un questionnaire de cadrage au prospect."
}
```

---

## 2. Brouillon de mail (`draft_email_reply`)

| Champ | Type | Obligatoire | Exemple |
|---|---|---|---|
| `destinataire` | string | oui | "prospect.artisan@example.fr" |
| `objet` | string | oui | "Votre projet de site vitrine — quelques questions avant devis" |
| `corps` | string | oui | "Bonjour, merci pour votre message..." |
| `ton` | string | non | "professionnel et chaleureux" |
| `statut` | enum(`brouillon`, `validé`, `envoyé`) | oui | `"brouillon"` |
| `mentions_sensibles` | array\<string\> | non | `["prix", "délai"]` |

```json
{
  "destinataire": "prospect.artisan@example.fr",
  "objet": "Votre projet de site vitrine — quelques questions avant devis",
  "corps": "Bonjour, merci pour votre message. Avant de vous proposer un prix et un délai précis, j'aurais besoin de quelques précisions sur votre projet...",
  "ton": "professionnel et chaleureux",
  "statut": "brouillon",
  "mentions_sensibles": ["prix", "délai"]
}
```

---

## 3. Devis fictif (`create_mock_quote`)

| Champ | Type | Obligatoire | Exemple |
|---|---|---|---|
| `client` | string | oui | "Artisan rénovation — M. Dupont" |
| `prestations` | array\<objet {`nom`, `description`, `prix_unitaire`}\> | oui | voir JSON ci-dessous |
| `montant_total` | number | oui | `1200` |
| `delai_estime` | string | oui | "10 jours ouvrés" |
| `conditions` | string | non | "Acompte de 30 % à la commande." |
| `statut` | enum(`brouillon`, `validé`, `envoyé`) | oui | `"brouillon"` |
| `mention` | string (valeur fixe) | oui | `"(fictif)"` |

```json
{
  "client": "Artisan rénovation — M. Dupont",
  "prestations": [
    { "nom": "Site vitrine (5 pages)", "description": "Structure standard + personnalisation", "prix_unitaire": 1200 }
  ],
  "montant_total": 1200,
  "delai_estime": "10 jours ouvrés",
  "conditions": "Acompte de 30 % à la commande.",
  "statut": "brouillon",
  "mention": "(fictif)"
}
```

---

## 4. Recherche dans la mémoire (`search_knowledge_base`)

| Champ | Type | Obligatoire | Exemple |
|---|---|---|---|
| `requete` | string | oui | "artisan rénovation site vitrine" |
| `resultats` | array\<objet {`extrait`, `note_source`, `date`}\> | oui | voir JSON ci-dessous |
| `nombre_resultats` | number | oui | `1` |
| `confiance` | enum(`haute`, `moyenne`, `faible`) | non | `"moyenne"` |

```json
{
  "requete": "artisan rénovation site vitrine",
  "resultats": [
    {
      "extrait": "Premier échange du 2026-07-10 : demande de site vitrine, prix/délai encore à cadrer.",
      "note_source": "vault/clients/artisan-renovation.md",
      "date": "2026-07-10"
    }
  ],
  "nombre_resultats": 1,
  "confiance": "moyenne"
}
```
