#!/bin/bash

# Script de collecte automatique d'informations de diagnostic
# Pour partager avec un assistant IA

OUTPUT_FILE="diagnostic-report.txt"

echo "🔍 Collecte des informations de diagnostic..."
echo ""

# Créer le fichier de rapport
cat > "$OUTPUT_FILE" << 'EOF'
# RAPPORT DE DIAGNOSTIC VERCEL
Généré le : $(date)

==========================================
INSTRUCTIONS POUR L'ASSISTANT IA
==========================================

Bonjour ! Mon projet Next.js ne build pas sur Vercel.
Voici toutes les informations de diagnostic.

EOF

echo "==========================================
1. PACKAGE.JSON
==========================================" >> "$OUTPUT_FILE"

if [ -f "package.json" ]; then
    cat package.json >> "$OUTPUT_FILE"
else
    echo "❌ package.json introuvable !" >> "$OUTPUT_FILE"
fi

echo "

==========================================
2. STRUCTURE DES FICHIERS
==========================================" >> "$OUTPUT_FILE"

echo "
Fichiers TypeScript/JavaScript dans src/ :" >> "$OUTPUT_FILE"
find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) 2>/dev/null >> "$OUTPUT_FILE" || echo "Erreur : dossier src/ introuvable" >> "$OUTPUT_FILE"

echo "
Composants exercises :" >> "$OUTPUT_FILE"
ls -la src/components/exercises/ 2>/dev/null >> "$OUTPUT_FILE" || echo "❌ Dossier src/components/exercises/ introuvable !" >> "$OUTPUT_FILE"

echo "
Bibliothèques :" >> "$OUTPUT_FILE"
find src/lib -type f 2>/dev/null >> "$OUTPUT_FILE" || echo "❌ Dossier src/lib/ introuvable !" >> "$OUTPUT_FILE"

echo "

==========================================
3. FICHIERS DE CONFIGURATION
==========================================" >> "$OUTPUT_FILE"

echo "
--- .npmrc ---" >> "$OUTPUT_FILE"
if [ -f ".npmrc" ]; then
    cat .npmrc >> "$OUTPUT_FILE"
else
    echo "❌ .npmrc introuvable !" >> "$OUTPUT_FILE"
fi

echo "
--- vercel.json ---" >> "$OUTPUT_FILE"
if [ -f "vercel.json" ]; then
    cat vercel.json >> "$OUTPUT_FILE"
else
    echo "⚠️ vercel.json introuvable (optionnel)" >> "$OUTPUT_FILE"
fi

echo "
--- tsconfig.json ---" >> "$OUTPUT_FILE"
if [ -f "tsconfig.json" ]; then
    cat tsconfig.json >> "$OUTPUT_FILE"
else
    echo "❌ tsconfig.json introuvable !" >> "$OUTPUT_FILE"
fi

echo "
--- next.config.js ---" >> "$OUTPUT_FILE"
if [ -f "next.config.js" ]; then
    cat next.config.js >> "$OUTPUT_FILE"
else
    echo "❌ next.config.js introuvable !" >> "$OUTPUT_FILE"
fi

echo "
--- tailwind.config.js ---" >> "$OUTPUT_FILE"
if [ -f "tailwind.config.js" ]; then
    cat tailwind.config.js >> "$OUTPUT_FILE"
else
    echo "⚠️ tailwind.config.js introuvable" >> "$OUTPUT_FILE"
fi

echo "

==========================================
4. GIT STATUS
==========================================" >> "$OUTPUT_FILE"

git status >> "$OUTPUT_FILE" 2>&1

echo "
Fichiers critiques dans Git :" >> "$OUTPUT_FILE"
git ls-files | grep -E "(components/exercises|lib/gemini|lib/supabase)" >> "$OUTPUT_FILE" 2>&1

echo "

==========================================
5. VARIABLES D'ENVIRONNEMENT (.env.local)
==========================================" >> "$OUTPUT_FILE"

echo "⚠️ NE PAS PARTAGER LES VALEURS RÉELLES !" >> "$OUTPUT_FILE"
if [ -f ".env.local" ]; then
    echo "Variables présentes (noms uniquement) :" >> "$OUTPUT_FILE"
    grep -v "^#" .env.local | grep "=" | cut -d'=' -f1 >> "$OUTPUT_FILE"
else
    echo "❌ .env.local introuvable !" >> "$OUTPUT_FILE"
fi

echo "

==========================================
6. TEST BUILD LOCAL
==========================================" >> "$OUTPUT_FILE"

echo "Test de build en cours..." >> "$OUTPUT_FILE"
npm run build >> "$OUTPUT_FILE" 2>&1

if [ $? -eq 0 ]; then
    echo "
✅ BUILD LOCAL RÉUSSI !" >> "$OUTPUT_FILE"
else
    echo "
❌ BUILD LOCAL ÉCHOUÉ (voir erreurs ci-dessus)" >> "$OUTPUT_FILE"
fi

echo "

==========================================
7. VERSIONS
==========================================" >> "$OUTPUT_FILE"

echo "Node version : $(node --version)" >> "$OUTPUT_FILE"
echo "npm version : $(npm --version)" >> "$OUTPUT_FILE"
echo "Git version : $(git --version)" >> "$OUTPUT_FILE"

echo "

==========================================
8. CHECKLIST FICHIERS CRITIQUES
==========================================" >> "$OUTPUT_FILE"

check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1" >> "$OUTPUT_FILE"
    else
        echo "❌ $1 MANQUANT !" >> "$OUTPUT_FILE"
    fi
}

check_file "src/components/exercises/ComprehensionEcrite.tsx"
check_file "src/components/exercises/ProductionEcrite.tsx"
check_file "src/components/exercises/ProductionOrale.tsx"
check_file "src/lib/gemini/api.ts"
check_file "src/lib/supabase/client.ts"
check_file "src/app/api/exercises/evaluate/route.ts"
check_file ".npmrc"
check_file "package.json"
check_file "tsconfig.json"

echo "

==========================================
FIN DU RAPPORT
==========================================

PROCHAINES ÉTAPES :

1. Copiez le contenu de ce fichier
2. Allez sur ChatGPT, Claude, ou tout assistant IA
3. Collez le contenu
4. Ajoutez les logs d'erreur Vercel si disponibles
5. Demandez un diagnostic

" >> "$OUTPUT_FILE"

echo "✅ Rapport généré : $OUTPUT_FILE"
echo ""
echo "📋 Vous pouvez maintenant :"
echo "   1. Ouvrir $OUTPUT_FILE"
echo "   2. Copier tout le contenu"
echo "   3. Le partager avec ChatGPT/Claude"
echo ""
echo "⚠️  ATTENTION : Vérifiez qu'il n'y a pas de secrets/tokens avant de partager !"
