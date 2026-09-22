# Mr Gaston

Site vitrine de Mr Gaston, friterie artisanale à Mons.

## Développement

```bash
npm install
npm run dev
```

## Vérifications avant déploiement

```bash
npm run lint
npm run typecheck
npm run build
```

## Production locale

```bash
npm run build
npm start
```

## GitHub → Vercel

1. Pousser le dépôt sur GitHub.
2. Importer le projet dans Vercel (Framework Preset : **Next.js**, détection automatique).
3. Build Command : `npm run build` · Output : géré par Next.js · Node : **20** (`.nvmrc`).
4. Aucune variable n’est obligatoire : le site se construit et s’affiche sans elles.
5. Ne pas déployer depuis cet environnement local — le premier déploiement se fait depuis le dashboard Vercel après le push GitHub.

Les previews Vercel (`VERCEL_ENV=preview`) restent en `noindex`. Seul le déploiement de production est indexable.

## Variables d'environnement (optionnelles)

À définir dans Vercel → Settings → Environment Variables si besoin. Les valeurs `NEXT_PUBLIC_*` doivent être présentes **au moment du build**.

| Nom | Rôle | Obligatoire |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origine canonique (sitemap, robots, Open Graph, JSON-LD). Recommandée en production : `https://mrgaston.be` | Non — fallback `https://mrgaston.be` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Jeton Search Console (`<meta name="google-site-verification">`) | Non |
| `NEXT_PUBLIC_GTM_ID` | Conteneur Google Tag Manager (`GTM-…`). Prioritaire. Événements via `dataLayer`. | Non |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 direct (`G-…`), seulement si GTM n’est pas défini | Non |

Les scripts GTM/GA4 ne se chargent que sur le déploiement de production (`VERCEL_ENV=production`). Aucune donnée personnelle n’est envoyée (pas d’URL `tel:`, pas d’e-mail, pas de query string).

Événements : `click_phone`, `click_directions`, `click_order`, `click_menu`, `click_social`, `click_location`, `click_email`. Paramètres : `placement`, `cta` (`primary` \| `secondary`), `network`, `path`. Pas de formulaire sur le site — `form_submit` n’est prévu que si un formulaire est ajouté plus tard.

Vercel injecte déjà `VERCEL_ENV` et `NODE_ENV` : ne pas les inventer ni les recopier.
