#!/bin/bash

echo "🔍 Vérification des fichiers nécessaires..."
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

missing=0

# Liste des fichiers critiques
files=(
    "src/components/exercises/ComprehensionEcrite.tsx"
    "src/components/exercises/ProductionEcrite.tsx"
    "src/components/exercises/ProductionOrale.tsx"
    "src/lib/gemini/api.ts"
    "src/app/api/exercises/evaluate/route.ts"
    "src/app/api/progress/update/route.ts"
    "src/types/index.ts"
    ".npmrc"
    "vercel.json"
)

echo "Fichiers requis :"
echo ""

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file ${RED}(MANQUANT)${NC}"
        missing=$((missing + 1))
    fi
done

echo ""
echo "================================"

if [ $missing -eq 0 ]; then
    echo -e "${GREEN}✓ Tous les fichiers sont présents !${NC}"
    echo ""
    echo "Vous pouvez maintenant :"
    echo "  git add ."
    echo "  git commit -m \"Add all required files\""
    echo "  git push"
else
    echo -e "${RED}✗ $missing fichier(s) manquant(s)${NC}"
    echo ""
    echo -e "${YELLOW}Action requise :${NC}"
    echo "1. Téléchargez la nouvelle archive : delf-b2-trainer-stable.tar.gz"
    echo "2. Extrayez-la dans votre projet"
    echo "3. Relancez ce script pour vérifier"
fi

echo "================================"
