# RG Bot — Bot Discord Rose Griffon

<p align="center">
  <strong>Le bot Discord de la communauté Inazuma Eleven francophone</strong>
</p>

<p align="center">
  <a href="https://github.com/aphrody-code/rgbot/actions"><img src="https://img.shields.io/github/actions/workflow/status/aphrody-code/rgbot/ci.yml?branch=main&style=for-the-badge" alt="CI"></a>
  <a href="https://github.com/aphrody-code/rgbot/releases"><img src="https://img.shields.io/github/v/release/aphrody-code/rgbot?style=for-the-badge" alt="Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

---

**RG Bot** est le bot Discord officiel de [Rose Griffon](https://rosegriffon.fr), la communauté francophone dédiée à Inazuma Eleven.

## Fonctionnalités

- **Intégration Discord** — Commandes slash, webhooks, interactions
- **Base de données Inazuma** — Accès aux personnages, Super Techniques, équipes
- **Communauté** — Gestion des rôles, notifications, événements

## Prérequis

- Node.js >= 22.12.0
- pnpm >= 9.0.0
- Un bot Discord configuré

## Installation

```bash
# Cloner le repo
git clone https://github.com/aphrody-code/rgbot.git
cd rgbot

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec votre token Discord
```

## Configuration

Créez un fichier `.env` avec :

```env
DISCORD_TOKEN=votre_token_discord
DISCORD_CLIENT_ID=votre_client_id
```

## Commandes

```bash
# Développement
pnpm dev

# Build
pnpm build

# Lancer le bot
pnpm start

# Linter
pnpm lint

# Tests
pnpm test
```

## Structure du projet

```
src/
├── discord/          # Intégration Discord
├── commands/         # Commandes CLI
├── config/           # Configuration
├── channels/         # Adaptateurs de canaux
├── plugins/          # Système de plugins
└── infra/            # Infrastructure (logs, erreurs)
```

## Terminologie Inazuma Eleven

Ce bot utilise la terminologie officielle française :

| Terme officiel | Équivalent japonais |
|----------------|---------------------|
| Super Techniques | Hissatsu |
| Esprits Guerriers | Keshin |
| Collège Raimon | Raimon Junior High |
| Tir / Dribble / Arrêt | Shoot / Dribble / Block |

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m 'feat: ajout de ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

## Crédits

- Fork de [OpenClaw](https://github.com/openclaw/openclaw)
- Communauté [Rose Griffon](https://rosegriffon.fr)

## Licence

MIT — voir [LICENSE](LICENSE)
