#!/bin/bash

echo "🔍 Vérification de la casse des imports..."
echo ""

# Fichiers à vérifier
PAGE_FILE="src/app/exercise/[id]/page.tsx"

if [ ! -f "$PAGE_FILE" ]; then
    echo "❌ Fichier $PAGE_FILE introuvable"
    exit 1
fi

echo "Imports actuels dans $PAGE_FILE :"
echo "---"
grep "from '@/components/exercises" "$PAGE_FILE"
echo "---"
echo ""

echo "Fichiers réels dans src/components/exercises/ :"
echo "---"
ls -1 src/components/exercises/
echo "---"
echo ""

echo "✅ Vérifications :"
echo ""

# Vérifier ComprehensionEcrite
if grep -q "ComprehensionEcrite'" "$PAGE_FILE"; then
    echo "✓ Import ComprehensionEcrite trouvé"
else
    echo "⚠️  Import ComprehensionEcrite introuvable ou mal écrit"
fi

# Vérifier ProductionEcrite
if grep -q "ProductionEcrite'" "$PAGE_FILE"; then
    echo "✓ Import ProductionEcrite trouvé"
else
    echo "⚠️  Import ProductionEcrite introuvable ou mal écrit"
fi

# Vérifier ProductionOrale
if grep -q "ProductionOrale'" "$PAGE_FILE"; then
    echo "✓ Import ProductionOrale trouvé"
else
    echo "⚠️  Import ProductionOrale introuvable ou mal écrit"
fi

echo ""
echo "💡 Note : Les noms doivent correspondre EXACTEMENT (sensible à la casse)"
