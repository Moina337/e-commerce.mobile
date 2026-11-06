# E-commerce Expo

Application mobile e-commerce construite avec Expo + React Native + Expo Router.

Le projet couvre les parcours essentiels d’un magasin en ligne : visite de la boutique, affichage des produits, authentification, panier, checkout et suivi des commandes.

## Fonctionnalités

- Accueil et boutique
- Liste des produits par catégorie
- Détail d’un produit
- Authentification (connexion / inscription)
- Profil utilisateur
- Panier avec gestion des quantités
- Finalisation de commande
- Suivi des commandes et détail d’une commande
- État de loading / erreur / vide réutilisable pour les écrans

## Stack technique

- Expo SDK 58
- React Native
- Expo Router pour la navigation
- TypeScript
- Zustand pour l’état global
- expo-secure-store pour la persistance du token
- Requêtes HTTP via fetch et service dédié

## Prérequis

- Node.js 18+ ou compatible avec Expo
- npm ou Bun
- Expo Go sur mobile, ou un émulateur Android / iOS

## Installation

1. Clone le dépôt

```bash
git clone https://github.com/Moina337/e-commerce.mobile.git
cd e-commerce.mobile
```

2. Installe les dépendances

```bash
npm install
```

Ou, si tu utilises Bun :

```bash
bun install
```

3. Configure les variables d’environnement

Copie le fichier d’exemple en fichier local :

```bash
cp .env.example .env
```

Vérifie la valeur :

```env
EXPO_PUBLIC_API_URL=https://ecommerce-api-1eu4.onrender.com/api
```

## Lancer l’application

Démarrer le serveur Expo :

```bash
npx expo start
```

Options utiles :

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Scripts disponibles

```bash
npm run start
npm run android
npm run ios
npm run web
npx expo lint
npx tsc --noEmit
```

## Structure du projet

```text
.
├── app.json
├── .env.example
├── README.md
├── package.json
├── tsconfig.json
├── assets/
├── scripts/
├── src/
│   ├── app/                  # écrans et routes Expo Router
│   ├── components/           # composants UI réutilisables
│   ├── constants/            # palette, thème, polices
│   ├── data/                 # données mockées / fixtures
│   ├── hooks/                # hooks React
│   ├── services/             # appels API / accès backend
│   ├── store/                # Zustand stores (auth, panier)
│   ├── types/                # types TypeScript
│   ├── global.css            # styles globaux
│   └── ...
└──
```

## Architecture fonctionnelle

### Routes principales

- `src/app/(tabs)/index.tsx` : accueil
- `src/app/(tabs)/boutique.tsx` : boutique
- `src/app/(tabs)/cart.tsx` : panier
- `src/app/(tabs)/profil.tsx` : profil utilisateur
- `src/app/auth/login.tsx` : connexion
- `src/app/auth/register.tsx` : inscription
- `src/app/checkout.tsx` : validation de commande
- `src/app/commandes/index.tsx` : liste des commandes
- `src/app/commandes/[id].tsx` : détail d’une commande
- `src/app/product/[slug].tsx` : détail d’un produit

### Services et données

- `src/services/api.ts` : utilitaire HTTP centralisé
- `src/services/productService.ts` : gestion des produits et images
- `src/services/orderService.ts` : gestion des commandes
- `src/services/authService.ts` : gestion auth API
- `src/store/authStore.ts` : session utilisateur
- `src/store/cartStore.ts` : panier global

## API et intégration

Le projet utilise une API exposée via la variable `EXPO_PUBLIC_API_URL`.

Les services utilisent des endpoints pour :
- les catégories et produits
- l’authentification
- les commandes

En cas d’erreur backend ou de réseau, l’application affiche des états lisibles via `ScreenState` et remonte des messages explicites à l’utilisateur.

## Qualité de code

Le projet est configuré pour :

- TypeScript strict au travers de la pile Expo / React Native
- ESLint via Expo
- composants organisés par responsabilité
- navigation via file-based routing

Commandes de validation :

```bash
npx expo lint
npx tsc --noEmit
```

## Développement recommandé

- Conserver les écrans dans `src/app/`
- Conserver les composants réutilisables dans `src/components/`
- Ne pas mettre la logique de navigation dans les composants UI
- Gérer les fonctions API via les services dans `src/services/`
- Préférer Zustand pour l’état global et les stores dédiés

## Notes

- Le projet est pensé pour une expérience mobile-first.
- La navigation suit le modèle Expo Router.
- L’application est compatible avec les plateformes prises en charge par Expo.

## Licence

Ce projet est sous licence MIT ou conforme à la licence associée au dépôt.

## Contact / contribution

Pour contribuer ou poser une question :

- ouvrir une issue sur le dépôt GitHub
- ou proposer une branche avec des changements bien découpés par fonctionnalité

---

Projet développé avec Expo, React Native et Expo Router.
