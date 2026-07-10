# Architecture — Web Studio OS

## Schéma

```mermaid
flowchart TB
    F["Fondateur (humain)"]

    subgraph ORCH["Orchestrateur"]
        O["Agent Orchestrateur"]
    end

    subgraph AGENTS["Agents spécialisés (cloud — Claude)"]
        CODE["Agent Code / Produit"]
        SEO["Agent SEO"]
        PROSPECT["Agent Prospection"]
        SALES["Agent Mail / Sales"]
        ADMIN["Agent Admin / Compta"]
        COACH["Agent Coach"]
    end

    VAULT[("Vault Obsidian\n(mémoire — local)")]

    F <--> O
    O --> CODE
    O --> SEO
    O --> PROSPECT
    O --> SALES
    O --> ADMIN
    O --> COACH

    CODE <--> VAULT
    SEO <--> VAULT
    PROSPECT <--> VAULT
    SALES <--> VAULT
    ADMIN <--> VAULT
    COACH <--> VAULT
    O <--> VAULT

    classDef local fill:#e8f5e9,stroke:#2e7d32,color:#1b1b1b;
    classDef cloud fill:#e3f2fd,stroke:#1565c0,color:#1b1b1b;
    classDef human fill:#fff3e0,stroke:#e65100,color:#1b1b1b;

    class VAULT local;
    class O,CODE,SEO,PROSPECT,SALES,ADMIN,COACH cloud;
    class F human;
```

## Légende

Le **Fondateur** reste au centre des décisions et dialogue avec un
**Agent Orchestrateur** unique, qui répartit les demandes vers les six agents
spécialisés (Code/Produit, SEO, Prospection, Mail/Sales, Admin/Compta,
Coach). Tous les agents — orchestrateur compris — lisent et écrivent dans un
**vault Obsidian local**, qui sert de mémoire partagée persistante (contexte
projet, historique, notes). Les agents eux-mêmes tournent en **cloud**
(Claude), tandis que la mémoire reste **locale** sur la machine du fondateur :
c'est le choix **mixte** détaillé dans
[docs/provider-choice.md](provider-choice.md). Aucune flèche ne représente
une action automatique irréversible : les actions sensibles passent par les
règles définies dans [docs/permissions-policy.md](permissions-policy.md).
