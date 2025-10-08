# Guide d'utilisation de Sanity CMS

Ce guide vous explique comment utiliser Sanity CMS pour gérer les articles de blog de votre site.

## Configuration initiale

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

Vous pouvez trouver votre `project_id` dans les paramètres de votre projet Sanity sur [sanity.io/manage](https://www.sanity.io/manage).

### 3. Initialiser Sanity

Exécutez la commande suivante pour connecter votre projet local à Sanity :

```bash
npx sanity init
```

Suivez les instructions et sélectionnez votre projet existant.

## Utilisation du Studio Sanity

### Accéder au Studio

Vous avez deux options pour accéder au Studio Sanity :

#### Option 1 : Studio hébergé par Sanity (Recommandé)

Connectez-vous sur [sanity.io/manage](https://www.sanity.io/manage) et accédez au studio via le navigateur web.

#### Option 2 : Studio local (Pour le développement)

Pour utiliser le studio localement en mode développement, exécutez :

```bash
npx sanity start
```

Le studio sera accessible à l'adresse : `http://localhost:3333`

**Note :** Le studio Sanity n'est pas intégré dans le build de production car il nécessite une configuration serveur spécifique. Pour la production, utilisez le studio hébergé par Sanity ou déployez le studio séparément avec `npx sanity deploy`.

### Structure du contenu

#### Articles de blog (Posts)

Les articles de blog supportent le contenu multilingue (français et anglais) :

- **Titre** (requis) : Titre de l'article en français et anglais
- **Slug** (requis) : URL de l'article (généré automatiquement à partir du titre français)
- **Auteur** : Référence à un auteur
- **Image principale** : Image d'en-tête de l'article
- **Catégories** : Liste de catégories
- **Date de publication** (requise) : Date de publication de l'article
- **Extrait** : Court résumé de l'article
- **Contenu** (requis) : Contenu complet de l'article avec éditeur riche

#### Auteurs (Authors)

- **Nom** (requis)
- **Slug** : URL de l'auteur
- **Image** : Photo de profil
- **Bio** : Biographie en français et anglais

#### Catégories (Categories)

- **Titre** (requis) : Titre en français et anglais
- **Slug** (requis) : URL de la catégorie
- **Description** : Description de la catégorie

### Publier un article

1. Accédez au Studio Sanity (`http://localhost:3000/studio`)
2. Créez un nouvel article en cliquant sur "Article de Blog" puis "+"
3. Remplissez au minimum :
   - Le titre (français et anglais)
   - Générez le slug en cliquant sur "Generate"
   - La date de publication
   - Le contenu (français et anglais)
4. Cliquez sur "Publish" pour publier l'article

### Support multilingue

Tous les champs de contenu (titre, extrait, corps) sont disponibles en français et anglais. Le site affichera automatiquement le contenu dans la langue sélectionnée par l'utilisateur.

## Développement

### Ajouter un nouveau type de contenu

1. Créez un nouveau fichier dans `sanity/schemas/`
2. Définissez le schéma avec `defineType`
3. Ajoutez-le à `sanity/schemas/index.ts`

### Modifier les requêtes

Les requêtes Sanity sont définies dans `sanity/lib/queries.ts`. Vous pouvez les modifier pour récupérer des données supplémentaires ou créer de nouvelles requêtes.

## Déploiement

### 1. Déployer le Studio Sanity

Pour déployer le studio Sanity, vous avez deux options :

#### Option A : Utiliser le studio hébergé par Sanity (Recommandé)

Le studio est automatiquement disponible sur [sanity.io/manage](https://www.sanity.io/manage) sans configuration supplémentaire.

#### Option B : Déployer votre propre studio

Si vous souhaitez héberger votre propre studio, exécutez :

```bash
npx sanity deploy
```

Le studio sera déployé sur `https://votre-projet.sanity.studio`

### 2. Variables d'environnement en production

N'oubliez pas d'ajouter les variables d'environnement dans votre plateforme de déploiement (Vercel, Netlify, etc.) :

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

### 3. Configurer les CORS

Dans les paramètres de votre projet Sanity (sur sanity.io/manage), ajoutez votre domaine de production dans les origines CORS autorisées.

## Ressources

- [Documentation Sanity](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)

## Support

Pour toute question ou problème, consultez la [documentation officielle de Sanity](https://www.sanity.io/docs) ou leur [communauté Slack](https://slack.sanity.io/).
