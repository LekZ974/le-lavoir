# Intégration Sanity CMS - Le Lavoir de la Passerelle

## 🎉 Intégration complétée !

Sanity CMS a été intégré avec succès à votre site. Vous pouvez maintenant gérer vos articles de blog de manière dynamique via une interface d'administration intuitive.

## 📁 Fichiers ajoutés/modifiés

### Nouveaux fichiers :

- `sanity.config.ts` - Configuration du studio Sanity
- `sanity.cli.ts` - Configuration CLI pour Sanity
- `sanity/schemas/` - Schémas de contenu (post, author, category)
- `sanity/lib/client.ts` - Client Sanity pour Next.js
- `sanity/lib/queries.ts` - Requêtes pour récupérer le contenu
- `src/components/PortableText.tsx` - Composant pour afficher le contenu riche
- `SANITY_GUIDE.md` - Guide complet d'utilisation

### Fichiers modifiés :

- `pages/blog.tsx` - Récupère maintenant les articles depuis Sanity
- `pages/blog/[slug].tsx` - Nouvelle page pour afficher les articles individuels
- `next.config.js` - Configuration pour les images Sanity
- `package.json` - Ajout des dépendances et scripts Sanity

## 🚀 Démarrage rapide

### 1. Créer un compte Sanity

1. Allez sur [sanity.io](https://www.sanity.io/)
2. Créez un compte gratuit
3. Créez un nouveau projet

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Vous trouverez votre `project_id` dans les paramètres de votre projet sur [sanity.io/manage](https://www.sanity.io/manage).

### 3. Lancer le studio Sanity

```bash
npm run sanity
```

Le studio sera accessible à `http://localhost:3333`

### 4. Créer votre premier article

1. Ouvrez le studio (`http://localhost:3333`)
2. Créez un auteur dans la section "Auteur"
3. Créez des catégories dans la section "Catégorie"
4. Créez un article dans "Article de Blog"
5. Publiez l'article

### 5. Voir vos articles

Lancez votre site :

```bash
npm run dev
```

Vos articles seront visibles sur `http://localhost:3000/blog`

## 🌍 Support multilingue

Tous les contenus sont disponibles en **français** et **anglais**. Le site affiche automatiquement le contenu dans la langue choisie par l'utilisateur.

## 📝 Structure du contenu

### Articles de blog (Posts)

- Titre (FR/EN)
- Slug (URL)
- Auteur
- Image principale
- Catégories
- Date de publication
- Extrait (FR/EN)
- Contenu riche (FR/EN) avec :
  - Titres (H1-H4)
  - Paragraphes
  - Listes
  - Citations
  - Images
  - Liens

### Auteurs (Authors)

- Nom
- Photo
- Biographie (FR/EN)

### Catégories (Categories)

- Titre (FR/EN)
- Description (FR/EN)

## 🎨 Fonctionnalités

✅ CMS complet avec interface intuitive
✅ Support multilingue (FR/EN)
✅ Éditeur de texte riche (Portable Text)
✅ Gestion d'images optimisées
✅ SEO optimisé
✅ Prévisualisation en temps réel
✅ ISR (Incremental Static Regeneration) - revalidation toutes les 60 secondes

## 📚 Documentation complète

Consultez le fichier `SANITY_GUIDE.md` pour une documentation complète incluant :

- Configuration détaillée
- Utilisation du studio
- Création de contenu
- Ajout de nouveaux types de contenu
- Déploiement en production

## 🔧 Scripts disponibles

```bash
npm run dev         # Lancer le site en développement
npm run build       # Builder le site pour la production
npm run sanity      # Lancer le studio Sanity localement
npm run sanity:deploy # Déployer le studio sur Sanity
```

## 🚢 Déploiement

### Variables d'environnement en production

N'oubliez pas d'ajouter ces variables sur votre plateforme de déploiement (Vercel, Netlify, etc.) :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### CORS

Dans les paramètres de votre projet Sanity ([sanity.io/manage](https://www.sanity.io/manage)), ajoutez votre domaine de production dans les origines CORS autorisées.

## 📞 Support

- [Documentation Sanity](https://www.sanity.io/docs)
- [Communauté Slack](https://slack.sanity.io/)
- [Guide GROQ](https://www.sanity.io/docs/groq)

## 🎯 Prochaines étapes

Vous pouvez maintenant :

1. ✅ Créer et publier des articles
2. ✅ Gérer vos auteurs et catégories
3. ✅ Personnaliser les schémas selon vos besoins
4. ✅ Déployer votre site en production

Bonne création de contenu ! 🚀
