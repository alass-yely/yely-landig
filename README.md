# YELY V3 Frontend (Landing + Driver App Entry)

Frontend Next.js de YELY V3 combinant:
- une landing publique orientee acquisition
- les parcours d'authentification chauffeur
- une home chauffeur connectee (`/chauffeur`) orientee activation + partage + utilite

## 1. Stack technique
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- `lucide-react` (icones)
- `framer-motion` (animations legeres sur certains ecrans)

## 2. Demarrage rapide
### Prerequis
- Node.js 20+
- npm (ou pnpm/yarn selon votre usage)

### Installation
```bash
npm install
```

### Variables d'environnement
Copier `.env.example` vers `.env` puis ajuster:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_LANDING_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL=https://chat.whatsapp.com/your-community-link
```

### Lancer en local
```bash
npm run dev
```
Puis ouvrir `http://localhost:3000`.

### Build production
```bash
npm run build
npm run start
```

## 3. Routes principales
- `/` : landing publique marketing
- `/register` : inscription chauffeur
- `/login` : connexion
- `/success` : page de fallback/transition (non principale)
- `/chauffeur` : home principale du chauffeur connecte
- `/organisation` : formulaire lead organisation

## 4. Flux produit actuels
### 4.1 Visiteur non connecte
- Arrive sur `/` (landing)
- Peut aller vers `/register`, `/login`, `/organisation`

### 4.2 Chauffeur register
1. Soumission du formulaire register
2. Appel `POST /auth/drivers/register`
3. Stockage session en localStorage
4. Redirection vers `/chauffeur` (avec `aff` preserve si present)

### 4.3 Chauffeur login
1. Soumission du formulaire login
2. Appel `POST /auth/login`
3. Stockage session en localStorage
4. Redirection par role (DRIVER -> `/chauffeur`)

### 4.4 Chauffeur connecte
- Sa home principale est `/chauffeur`
- Contenu priorise:
  1. activation (bienvenue)
  2. partage/referral
  3. utilite (QR, cashback, transactions)

## 5. Session frontend (simple)
Stockage local (`localStorage`):
- `yely_access_token`
- `yely_refresh_token`
- `yely_user`

Utils session: `src/lib/utils/session.ts`
- `getStoredUser()`
- `getAccessToken()`
- `isAuthenticated()`
- `clearSession()`
- `getDefaultRedirectPathByRole(role)`

## 6. API consommees
Base URL: `NEXT_PUBLIC_API_BASE_URL`

### Auth
- `POST /auth/drivers/register`
- `POST /auth/login`

### Driver
- `GET /drivers/me/dashboard`
- `GET /drivers/me/affiliation`
- `GET /drivers/me/referrals/summary`

### Network
- `POST /network/affiliations/apply`

### Public
- `GET /public/referrals/:code`
- `GET /public/affiliations/:code`
- `POST /public/leads/organizations`

Clients API:
- `src/lib/api/client.ts` (helper fetch central)
- `src/lib/api/auth.ts`
- `src/lib/api/drivers.ts`
- `src/lib/api/network.ts`
- `src/lib/api/organizations.ts`
- `src/lib/api/public.ts`

## 7. Structure projet (resume)
```txt
src/
  app/
    page.tsx                # landing
    register/page.tsx
    login/page.tsx
    chauffeur/page.tsx
    organisation/page.tsx
    success/page.tsx
  components/
    sections/               # blocs landing
    forms/                  # register/login/lead
    driver/                 # home chauffeur
    success/                # cartes + partage + affiliation apply
    layout/                 # navbar/footer/menu user
    auth/                   # redirects UX client
  lib/
    api/                    # appels API
    config/env.ts           # mapping des env vars
    utils/                  # session + tracking
  types/
    auth.ts
    api.ts
    driver.ts
    ...
```

## 8. UI/UX conventions
- Mobile-first
- Cartes `rounded-2xl`, `border`, `shadow-sm`
- Animations discretes uniquement
- Couleur marque principale: `#0f9b58`
- Typography: Space Grotesk (layout global)
- Favicon: icone YELY (`src/app/icon.png`)

## 9. Navbar adaptative
### Non connecte
- Chauffeur
- Organisation
- Connexion
- Inscription

### Connecte
- menu utilisateur dropdown
- Mon espace (selon role)
- Logout (frontend only)

## 10. Tracking (V1)
Tracking minimal via `console.log`:
- `register_success`
- `login_success`
- `referral_share_click`
- `organisation_lead_submit`

Helper: `src/lib/utils/track.ts`

## 11. Points d'attention connus
- Pas d'auth provider global (choix volontaire pour simplicite)
- Pas de refresh token automatique
- Pas de guards serveur/middleware complets
- `/success` est conservee comme fallback, pas comme destination principale chauffeur

## 12. Checklist dev avant PR
1. Verifier `.env` local
2. Lancer `npm run dev`
3. Verifier register/login/chauffeur/organisation
4. Lancer `npm run build`
5. Verifier qu'aucune route critique n'est cassée

---
Pour toute evolution produit, prioriser la logique suivante:
- acquisition sur `/`
- activation + partage + utilite sur `/chauffeur`
