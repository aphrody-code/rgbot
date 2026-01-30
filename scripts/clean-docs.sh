#!/bin/bash
set -e

echo "🧹 Nettoyage de la documentation et des fichiers Markdown..."

# Suppression du dossier docs
if [ -d "docs" ]; then
    echo "Suppression du dossier docs/..."
    rm -rf docs
fi

# Liste des fichiers Markdown à supprimer
FILES_TO_REMOVE=(
    "AGENTS.md"
    "CHANGELOG.md"
    "CLAUDE.md"
    "CONTRIBUTING.md"
    "SECURITY.md"
    "docs.acp.md"
)

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        echo "Suppression de $file..."
        rm "$file"
    fi
done

# Réinitialisation du README.md
echo "Réinitialisation de README.md..."
cat > README.md <<EOF
# Rose Griffon Discord Bot

Bot Discord officiel pour la communauté Rose Griffon.

## Installation

```bash
pnpm install
```

## Build

```bash
pnpm build
```

## Démarrage

```bash
pnpm start
```
EOF

echo "✨ Nettoyage terminé !"
