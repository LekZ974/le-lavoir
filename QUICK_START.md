# 🚀 Démarrage rapide - Sanity CMS

## ✅ La commande fonctionne maintenant !

La commande `npm run sanity` est maintenant opérationnelle.

## 📋 Configuration nécessaire

Avant de lancer le studio, vous devez configurer vos variables d'environnement.

### 1. Créer un projet Sanity

1. Allez sur [sanity.io](https://www.sanity.io/)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre **Project ID**

### 2. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet :

```bash
# Pour Sanity CLI
SANITY_STUDIO_PROJECT_ID=votre_project_id
SANITY_STUDIO_DATASET=production

# Pour Next.js
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Remplacez `votre_project_id` par votre vrai Project ID** obtenu sur [sanity.io/manage](https://www.sanity.io/manage).

### Commande rapide pour créer le fichier :

```bash
cat > .env.local << 'EOF'
# Pour Sanity CLI
SANITY_STUDIO_PROJECT_ID=REMPLACER_PAR_VOTRE_PROJECT_ID
SANITY_STUDIO_DATASET=production

# Pour Next.js
NEXT_PUBLIC_SANITY_PROJECT_ID=REMPLACER_PAR_VOTRE_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
EOF
```

N'oubliez pas de remplacer `REMPLACER_PAR_VOTRE_PROJECT_ID` !

## 🎬 Lancer le studio

Une fois le fichier `.env.local` configuré :

```bash
npm run sanity
```

Le studio s'ouvrira sur **http://localhost:3333**

## 📝 Commandes disponibles

```bash
npm run sanity         # Lancer le studio en mode développement
npm run sanity:build   # Builder le studio pour la production
npm run sanity:deploy  # Déployer le studio sur Sanity
```

## ⚠️ Note sur la version de Node.js

Vous verrez peut-être un warning concernant la version de Node.js :

```
[WARN] The current Node.js version (v20.16.0) is not supported
Please upgrade to a version that satisfies the range >=20.19 <22 || >=22.12
```

Ce n'est qu'un **avertissement** - le studio fonctionnera quand même. Pour éviter ce warning, vous pouvez :

```bash
# Avec nvm
nvm install 20.19
nvm use 20.19

# Ou avec homebrew
brew upgrade node
```

## 🎯 Prochaines étapes

1. ✅ Créer un projet sur [sanity.io](https://www.sanity.io/)
2. ✅ Configurer `.env.local` avec votre Project ID
3. ✅ Lancer `npm run sanity`
4. ✅ Créer votre premier auteur
5. ✅ Créer des catégories
6. ✅ Publier votre premier article
7. ✅ Voir vos articles sur `http://localhost:3000/blog`

## 📚 Documentation complète

- **CONFIGURATION_SANITY.md** - Guide de configuration détaillé
- **SANITY_GUIDE.md** - Guide complet d'utilisation
- **README_SANITY.md** - Vue d'ensemble

## 🆘 Problèmes courants

### "Configuration must contain `projectId`"

→ Le fichier `.env.local` n'existe pas ou les variables ne sont pas définies correctement.

### "Project not found"

→ Vérifiez que le Project ID est correct sur [sanity.io/manage](https://www.sanity.io/manage)

### Le studio ne se lance pas

→ Vérifiez que toutes les dépendances sont installées :

```bash
npm install
```

Pour plus d'aide, consultez **CONFIGURATION_SANITY.md** 📖


