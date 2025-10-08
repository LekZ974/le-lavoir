# Configuration de Sanity CMS

## 🚀 Étapes de configuration

### 1. Créer un projet Sanity

1. Allez sur [sanity.io](https://www.sanity.io/)
2. Créez un compte gratuit (si ce n'est pas déjà fait)
3. Cliquez sur "Create project"
4. Donnez un nom à votre projet : "Le Lavoir de la Passerelle"
5. Choisissez un dataset : "production"
6. Notez votre **Project ID** (vous en aurez besoin)

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet :

```bash
# Pour Sanity CLI (utilisé par "npm run sanity")
SANITY_STUDIO_PROJECT_ID=votre_project_id_ici
SANITY_STUDIO_DATASET=production

# Pour Next.js (utilisé par "npm run dev" et build)
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id_ici
NEXT_PUBLIC_SANITY_DATASET=production
```

**Important** : Remplacez `votre_project_id_ici` par votre vrai Project ID obtenu à l'étape 1.

### 3. Créer le fichier rapidement

Vous pouvez créer le fichier en une commande (remplacez `VOTRE_PROJECT_ID`) :

```bash
cat > .env.local << EOF
# Pour Sanity CLI
SANITY_STUDIO_PROJECT_ID=VOTRE_PROJECT_ID
SANITY_STUDIO_DATASET=production

# Pour Next.js
NEXT_PUBLIC_SANITY_PROJECT_ID=VOTRE_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
EOF
```

### 4. Vérifier la configuration

Pour vérifier que tout est bien configuré :

```bash
# Afficher les variables (masquées si le fichier existe)
cat .env.local

# Le Project ID devrait être visible
grep SANITY_STUDIO_PROJECT_ID .env.local
```

### 5. Lancer le studio Sanity

```bash
npm run sanity
```

Le studio devrait s'ouvrir sur `http://localhost:3333`

Si vous voyez une erreur "Configuration must contain `projectId`", c'est que les variables d'environnement ne sont pas correctement configurées.

## 🔧 Troubleshooting

### Problème : "Configuration must contain `projectId`"

**Solution** : Vérifiez que :

1. Le fichier `.env.local` existe à la racine du projet
2. Les variables `SANITY_STUDIO_PROJECT_ID` et `NEXT_PUBLIC_SANITY_PROJECT_ID` sont définies
3. Le Project ID est correct (sans espaces, guillemets ou caractères spéciaux)
4. Vous avez redémarré le terminal après avoir créé le fichier

### Problème : Les variables ne sont pas chargées

**Solution** :

1. Vérifiez que le fichier s'appelle exactement `.env.local` (avec le point au début)
2. Redémarrez votre terminal
3. Si vous utilisez un IDE, redémarrez-le complètement

### Problème : "Project not found"

**Solution** :

1. Vérifiez que le Project ID est correct sur [sanity.io/manage](https://www.sanity.io/manage)
2. Assurez-vous d'être connecté au bon compte Sanity
3. Le projet doit exister sur Sanity avant de pouvoir l'utiliser localement

## 📍 Où trouver votre Project ID

1. Connectez-vous sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez votre projet
3. Allez dans "Settings" → "Project details"
4. Copiez le "Project ID"

## 🌐 Pour le déploiement en production

N'oubliez pas d'ajouter ces variables sur votre plateforme de déploiement :

### Sur Vercel

1. Allez dans "Settings" → "Environment Variables"
2. Ajoutez :
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = votre_project_id
   - `NEXT_PUBLIC_SANITY_DATASET` = production

### Sur Netlify

1. Allez dans "Site settings" → "Environment variables"
2. Ajoutez les mêmes variables que pour Vercel

## 🔒 CORS Configuration

Une fois votre site déployé, configurez les CORS sur Sanity :

1. Allez sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez votre projet
3. Allez dans "Settings" → "API"
4. Ajoutez votre domaine de production dans "CORS origins"
   - Par exemple : `https://lelavoir.re`
   - Cochez "Allow credentials"

## 🎯 Next Steps

Une fois configuré :

1. ✅ Lancez le studio : `npm run sanity`
2. ✅ Créez votre premier auteur
3. ✅ Créez des catégories
4. ✅ Publiez votre premier article
5. ✅ Visitez `http://localhost:3000/blog` pour voir vos articles

Pour plus d'informations, consultez `SANITY_GUIDE.md` et `README_SANITY.md`.
