# 📦 Résumé de l'intégration Sanity CMS

## ✅ Ce qui a été fait

### 1. **Installation des dépendances**

Les packages suivants ont été installés :

- `@sanity/client` - Client pour communiquer avec Sanity
- `@sanity/image-url` - Gestion optimisée des images
- `@portabletext/react` - Rendu du contenu riche
- `sanity` - Studio Sanity
- `next-sanity` - Intégration Next.js
- `@sanity/vision` - Plugin pour tester les requêtes GROQ
- `styled-components` - Dépendance requise par Sanity UI

### 2. **Configuration Sanity**

#### Fichiers de configuration :

- **`sanity.config.ts`** : Configuration du studio avec les schémas et plugins
- **`sanity.cli.ts`** : Configuration CLI pour le développement local

#### Schémas de contenu (`sanity/schemas/`) :

- **`post.ts`** : Articles de blog avec support multilingue (FR/EN)
  - Titre, slug, auteur, image, catégories, date, extrait, contenu
- **`author.ts`** : Auteurs avec nom, photo, bio
- **`category.ts`** : Catégories pour organiser les articles

### 3. **Client et requêtes Sanity**

#### `sanity/lib/client.ts`

- Configuration du client Sanity
- Gestion des URLs d'images optimisées
- Gestion des cas où les variables d'environnement ne sont pas configurées

#### `sanity/lib/queries.ts`

- `getAllPosts()` : Récupère tous les articles publiés
- `getPostBySlug(slug)` : Récupère un article spécifique
- Gestion des erreurs et fallbacks

### 4. **Composants Next.js**

#### Page blog mise à jour (`pages/blog.tsx`)

- Récupère les articles depuis Sanity via `getStaticProps`
- Affiche les articles avec leurs images et extraits
- Support multilingue automatique
- Revalidation ISR toutes les 60 secondes

#### Nouvelle page article (`pages/blog/[slug].tsx`)

- Affichage complet d'un article avec :
  - En-tête avec titre, date, auteur
  - Image principale
  - Contenu riche formaté
  - Catégories
- SEO optimisé avec Open Graph
- Support multilingue

#### Composant PortableText (`src/components/PortableText.tsx`)

- Rendu du contenu riche avec styles personnalisés
- Support des images inline
- Titres, listes, citations, liens
- Styles cohérents avec votre design

### 5. **Configuration Next.js**

#### Modifications dans `next.config.js` :

- Ajout du domaine `cdn.sanity.io` pour les images
- Mise à jour du CSP pour autoriser les images Sanity

### 6. **Scripts NPM**

Ajout dans `package.json` :

```json
"sanity": "sanity start",
"sanity:deploy": "sanity deploy"
```

### 7. **Documentation**

Création de guides complets :

- **`SANITY_GUIDE.md`** : Guide détaillé d'utilisation
- **`README_SANITY.md`** : Démarrage rapide
- **`.env.local.example`** : Template pour les variables d'environnement

## 🎯 Prochaines étapes pour vous

### Étape 1 : Créer un projet Sanity

1. Allez sur [sanity.io](https://www.sanity.io/)
2. Créez un compte (gratuit)
3. Créez un nouveau projet
4. Notez votre `project_id`

### Étape 2 : Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id_ici
NEXT_PUBLIC_SANITY_DATASET=production
```

### Étape 3 : Lancer le studio

```bash
npm run sanity
```

Ouvrez `http://localhost:3333` pour accéder au studio.

### Étape 4 : Créer du contenu

1. Créez d'abord un **Auteur**
2. Créez quelques **Catégories**
3. Créez votre premier **Article de Blog**
   - Remplissez les champs en français et anglais
   - Ajoutez une image
   - Publiez !

### Étape 5 : Voir vos articles

```bash
npm run dev
```

Visitez `http://localhost:3000/blog` pour voir vos articles !

## 🚀 Pour le déploiement en production

### 1. Ajoutez les variables d'environnement sur Vercel/Netlify

```
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Configurez les CORS sur Sanity

Sur [sanity.io/manage](https://www.sanity.io/manage), ajoutez votre domaine de production dans les CORS.

### 3. (Optionnel) Déployez votre studio

```bash
npm run sanity:deploy
```

Sinon, utilisez le studio hébergé sur [sanity.io/manage](https://www.sanity.io/manage)

## 🎨 Fonctionnalités disponibles

✅ Gestion complète des articles de blog
✅ Support multilingue français/anglais
✅ Éditeur de texte riche (WYSIWYG)
✅ Gestion d'images optimisées automatiquement
✅ SEO optimisé avec métadonnées Open Graph
✅ Pages dynamiques avec génération statique (SSG)
✅ Revalidation incrémentale (ISR) toutes les 60s
✅ Auteurs et catégories pour organiser le contenu
✅ Interface d'administration intuitive

## 📁 Structure des fichiers

```
le-lavoir/
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── post.ts
│   │   ├── author.ts
│   │   └── category.ts
│   └── lib/
│       ├── client.ts
│       └── queries.ts
├── src/
│   └── components/
│       └── PortableText.tsx
├── pages/
│   ├── blog.tsx (modifié)
│   └── blog/
│       └── [slug].tsx (nouveau)
├── sanity.config.ts
├── sanity.cli.ts
├── SANITY_GUIDE.md
├── README_SANITY.md
└── .env.local (à créer)
```

## 🔧 Maintenance et évolution

### Ajouter un nouveau champ à un article

1. Modifiez `sanity/schemas/post.ts`
2. Mettez à jour `sanity/lib/queries.ts`
3. Ajoutez le rendu dans `pages/blog/[slug].tsx`

### Ajouter un nouveau type de contenu

1. Créez un nouveau fichier dans `sanity/schemas/`
2. Ajoutez-le à `sanity/schemas/index.ts`
3. Créez les requêtes dans `sanity/lib/queries.ts`
4. Créez les pages correspondantes

### Modifier le style du contenu

Modifiez le composant `src/components/PortableText.tsx` pour personnaliser le rendu.

## 📞 Besoin d'aide ?

- **Documentation complète** : Consultez `SANITY_GUIDE.md`
- **Documentation Sanity** : [sanity.io/docs](https://www.sanity.io/docs)
- **Communauté** : [Slack Sanity](https://slack.sanity.io/)

## 🎉 C'est tout !

Votre site est maintenant équipé d'un CMS moderne et puissant. Vous pouvez créer et gérer vos articles de blog facilement, avec un support multilingue complet.

**Bon blogging ! 📝✨**
