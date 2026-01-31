#!/usr/bin/env node

/**
 * Script de vérification de la configuration
 * Vérifie que toutes les variables d'environnement sont présentes
 */

const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GEMINI_API_KEY',
  'NEXT_PUBLIC_SITE_URL',
];

console.log('🔍 Vérification de la configuration...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Fichier .env.local non trouvé!');
  console.log('\n📝 Créez le fichier .env.local en copiant .env.example:');
  console.log('   cp .env.example .env.local');
  console.log('\nPuis remplissez les valeurs nécessaires.\n');
  process.exit(1);
}

// Read environment variables
require('dotenv').config({ path: envPath });

let allValid = true;
const issues = [];

// Check each required variable
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  
  if (!value) {
    allValid = false;
    issues.push(`❌ ${varName}: Non défini`);
  } else if (value.includes('your_') || value.includes('YOUR_')) {
    allValid = false;
    issues.push(`⚠️  ${varName}: Valeur d'exemple non remplacée`);
  } else {
    console.log(`✅ ${varName}: Configuré`);
  }
});

console.log('\n');

// Report issues
if (issues.length > 0) {
  console.log('❌ Problèmes détectés:\n');
  issues.forEach(issue => console.log('  ' + issue));
  console.log('\n📚 Consultez SETUP_GUIDE.md pour les instructions de configuration.\n');
}

// Validate Supabase URL format
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl && !supabaseUrl.includes('supabase.co')) {
  console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL ne semble pas être une URL Supabase valide');
  allValid = false;
}

// Validate Gemini API key format
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey && !geminiKey.startsWith('AIza')) {
  console.log('⚠️  GEMINI_API_KEY ne semble pas être une clé Gemini valide (devrait commencer par AIza)');
  allValid = false;
}

// Validate site URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (siteUrl && !siteUrl.startsWith('http')) {
  console.log('⚠️  NEXT_PUBLIC_SITE_URL doit commencer par http:// ou https://');
  allValid = false;
}

// Final result
console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('\n✅ Configuration valide! Vous pouvez lancer l\'application:\n');
  console.log('   npm run dev\n');
  console.log('Puis ouvrez http://localhost:3000\n');
} else {
  console.log('\n❌ Configuration incomplète ou invalide.\n');
  console.log('📚 Consultez SETUP_GUIDE.md pour résoudre les problèmes.\n');
  process.exit(1);
}
