# Configuration du premier agent — Founder OS Qualifier

## Nom de l'agent

**Founder OS Qualifier**

## Plateforme utilisée

Claude cloud, via l'**API Anthropic** (endpoint `POST /v1/messages`), appelé
directement en HTTP natif depuis un script Node (`agents/qualifier/qualifier.mjs`),
sans SDK ni dépendance externe. Modèle utilisé : `claude-sonnet-5` (confirmé
fonctionnel lors du run réel du 2026-07-10 — voir
[evidence/runs/day-1-first-agent.md](../evidence/runs/day-1-first-agent.md)).

## Instructions (résumé du prompt système)

Le prompt système complet est versionné dans
[agents/qualifier/system-prompt.md](../agents/qualifier/system-prompt.md).
Il demande à l'agent de :

- qualifier toute demande entrante (prospect ou client) pour Web Studio OS ;
- produire une sortie strictement structurée en 5 blocs numérotés (voir
  ci-dessous) ;
- ne jamais produire de prix, délai ou engagement ferme lui-même (ces
  éléments restent des brouillons soumis à validation humaine, conformément à
  [docs/permissions-policy.md](permissions-policy.md)) ;
- signaler l'ambiguïté d'une demande plutôt que d'inventer des détails
  manquants ;
- rester concis (quelques lignes par bloc).

## Format de sortie attendu

```
1. Besoin reformulé
2. Agents Founder OS à mobiliser
3. Risque principal
4. Validation humaine requise : oui / non
5. Prochaine action
```

## Limites de l'agent

- Ne qualifie qu'une seule demande à la fois ; ne gère pas encore de
  contexte multi-tour (pas d'historique de conversation entre deux appels).
- Ne consulte pas encore le vault Obsidian (aucune mémoire persistante à ce
  stade) : chaque run est indépendant.
- Ne déclenche aucune action réelle (pas d'envoi de mail, pas de devis
  définitif) : sa sortie est uniquement une analyse à destination du
  fondateur.
- Dépend entièrement de la disponibilité et de la tarification de l'API
  Anthropic (voir [docs/provider-choice.md](provider-choice.md) pour le
  détail coût/données).
- Le modèle exact (`claude-sonnet-5`) devra être reconfirmé si ce script est
  repris après une mise à jour de l'offre de modèles Anthropic.
