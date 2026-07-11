# Memory Setup — Founder OS

## Stack utilisée

- Notes locales au format Markdown.
- Arborescence compatible avec Obsidian.
- Lecture manuelle d'une sélection de notes par l'agent Coach.
- Citations explicites des chemins de fichiers dans chaque réponse.

Aucun moteur de recherche sémantique, index vectoriel ou RAG automatisé n'est utilisé dans ce MVP.

## Pourquoi ce choix

Cette solution est simple, inspectable et suffisante pour valider le besoin : les notes sont structurées, les sources sont identifiables, le Coach peut analyser les contenus fournis et sa réponse peut citer les documents utilisés.

Elle évite d'ajouter une infrastructure complexe avant de savoir si la mémoire et les recommandations produites sont réellement utiles. Son principal coût est une sélection manuelle des notes à chaque run.

## Structure du vault

```text
vault/
  10-business/      Vision, brief et décisions
  20-clients/       Cibles, problèmes et besoins
  30-offers/        Offres, promesses et livrables
  40-seo-market/    Marché, SEO et idées de contenu
  50-sales-mail/    Ton, emails et scripts commerciaux
  60-admin/         Règles, permissions et confidentialité
  70-learning/      Apprentissages prioritaires
  90-agent-runs/    Journal des réponses d'agents
```

Les fichiers peuvent être ouverts dans n'importe quel éditeur Markdown ou en choisissant le dossier `vault/` comme coffre Obsidian.

## Méthode de connexion

Pour chaque run :

1. Formuler une question précise.
2. Sélectionner les notes locales pertinentes.
3. Copier leur contenu dans le contexte de l'outil IA, avec leur chemin complet dans le projet.
4. Ajouter le prompt système du Coach.
5. Demander une réponse qui cite les chemins des notes utilisées.
6. Relire les citations et vérifier que chaque recommandation est réellement étayée.
7. Enregistrer la question, les sources, la réponse et les limites dans `evidence/runs/`.

Cette « connexion » est donc un protocole manuel documenté. L'agent n'accède pas seul au vault et ne conserve pas automatiquement les notes entre deux conversations.

## Fonctionnement de l'agent Coach

Le Coach répond à une seule question stratégique :

> À partir de mes notes, que dois-je apprendre cette semaine pour mieux lancer mon offre ?

Il synthétise les apprentissages ayant l'impact le plus direct sur la validation et le lancement de l'offre. Il distingue les faits écrits, les hypothèses et les informations manquantes. Il propose ensuite des actions observables et cite les notes ayant justifié chaque recommandation.

## Notes utilisées par l'agent

La sélection minimale prévue pour le run de démonstration est :

- `vault/10-business/business-brief.md`
- `vault/30-offers/main-offer.md`
- `vault/20-clients/target-clients.md`
- `vault/70-learning/learning-plan.md`
- `vault/50-sales-mail/commercial-tone.md`
- `vault/60-admin/permissions.md`

D'autres notes peuvent être ajoutées si elles sont pertinentes. Ajouter tout le vault par défaut serait une mauvaise pratique : cela augmente le bruit et rend la provenance des recommandations moins claire.

## Prompt système de l'agent Coach

```text
Tu es l'agent Coach de Founder OS.

Tu aides l'utilisateur à transformer ses notes en priorités d'apprentissage concrètes.

Règles :
- Utilise uniquement les notes fournies.
- Cite les notes utilisées.
- N'invente pas de sources.
- Si une information manque, dis-le clairement.
- Donne une réponse actionnable.
- Priorise ce qui aide à mieux lancer l'offre.
- Réponds à la question :
  “À partir de mes notes, que dois-je apprendre cette semaine pour mieux lancer mon offre ?”

Format de réponse :
1. Résumé court
2. Apprentissages prioritaires de la semaine
3. Pourquoi ces apprentissages sont prioritaires
4. Actions concrètes
5. Notes utilisées
6. Limites de l'analyse
```

## Limites

- La sélection et la copie des notes sont manuelles.
- Il n'existe pas de recherche sémantique automatique.
- La qualité de la réponse dépend de la qualité et de l'actualité des notes.
- L'agent n'a pas de mémoire dynamique entre les runs.
- Les affirmations ne sont pas vérifiées par des sources externes.
- Une citation prouve la provenance dans le vault, pas la vérité du contenu cité.

## Données envoyées au cloud

Les fichiers restent stockés localement. Aucune donnée n'est envoyée automatiquement au cloud.

Si l'utilisateur copie des notes dans un outil IA hébergé, leur contenu est alors transmis au fournisseur de cet outil. Avant cette action, il faut retirer les secrets et les données personnelles ou confidentielles inutiles, puis vérifier les règles du service utilisé.

## Évolution possible vers un RAG

Si le volume de notes rend la sélection manuelle trop lente ou peu fiable, une évolution possible serait d'importer le vault dans Open WebUI, Flowise, Langflow ou une base de connaissance cloud. Un système RAG pourrait rechercher automatiquement les passages pertinents avant de générer une réponse.

Cette évolution ne doit être envisagée qu'après avoir mesuré une douleur réelle : beaucoup de notes, recherches fréquentes ou oublis récurrents. Elle ajouterait de la configuration, des coûts, des risques de confidentialité et de nouveaux contrôles de qualité.

