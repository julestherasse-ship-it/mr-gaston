# Livraison — Site Mr Gaston

Document de remise pour **Jérôme** (Mr Gaston).  
Préparé par Aurelis. Aucun mot de passe ni secret n’est inclus.

---

## 1. Présentation du site

Site vitrine de **Mr Gaston**, friterie artisanale à Mons  
(Chaussée de Binche 141, 7000 Mons).

Contenu principal :

- Hero signature **Le Poivré**
- Carte HTML (burgers, snacks, frites, sauces, bar)
- Galerie photos
- Contact, horaires, avis
- Boutons **Commander** (GloriaFood / FoodBooking)
- Mentions société : **J.C.J.D SRL** · BCE **1036.078.477**

Stack technique : **Next.js 16** (App Router) · React 19 · Tailwind 4 · TypeScript.

---

## 2. URL actuelle (Aurelis — transition)

| Environnement | URL |
| --- | --- |
| Preview / production Vercel (actuelle) | https://mr-gaston.vercel.app |
| Domaine officiel (pas encore basculé vers Netlify) | https://mrgaston.be |

> Pendant la transition, **ne pas modifier les DNS** tant que le déploiement Netlify n’est pas validé.

---

## 3. Repository GitHub

| Élément | Valeur |
| --- | --- |
| Dépôt actuel | https://github.com/julestherasse-ship-it/mr-gaston |
| Branche de production | `main` |
| Visibilité | Public |

Le dépôt doit être **transféré** au compte GitHub de Jérôme avant le branchement Netlify définitif (voir section 10).

---

## 4. Hébergement prévu

- **Plateforme cible :** Netlify (compte Jérôme)
- **Framework :** Next.js (adapter OpenNext automatique)
- **Build :** `npm run build`
- **Node :** 20 (`netlify.toml` + `.nvmrc`)
- **Fichier de config :** `netlify.toml`

Aucune variable d’environnement n’est **obligatoire** pour afficher le site.

Variables optionnelles (à définir dans Netlify UI si besoin) :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO). Après bascule DNS : `https://mrgaston.be` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 (uniquement si pas de GTM) |

---

## 5. Instructions de déploiement Netlify

1. Se connecter au **compte Netlify de Jérôme**.
2. **Add new site → Import an existing project → GitHub**.
3. Autoriser Netlify à accéder au dépôt `mr-gaston` (après transfert GitHub).
4. Sélectionner la branche **`main`**.
5. Vérifier : Build command = `npm run build` · Node 20.
6. Déployer.
7. Noter l’URL publique : `https://xxxxx.netlify.app`.
8. Tester le site (voir checklist section 10.5).

---

## 6. Instructions pour connecter le domaine officiel

**À faire seulement après validation de l’URL Netlify.**

1. Dans Netlify → Site → **Domain management** → **Add custom domain** → `mrgaston.be` (et `www` si souhaité).
2. Suivre les enregistrements DNS indiqués par Netlify (souvent chez le registrar du domaine).
3. Attendre la propagation DNS.
4. Vérifier le **certificat HTTPS** (Let’s Encrypt, automatique sur Netlify).
5. Optionnel : définir `NEXT_PUBLIC_SITE_URL=https://mrgaston.be` puis **redeploy**.
6. Ne couper Vercel **qu’après** validation HTTPS + contenu sur le domaine officiel.

---

## 7. Informations de contact (sur le site)

| Type | Valeur |
| --- | --- |
| Téléphone (affiché) | 0483 44 49 83 |
| Téléphone (`tel:`) | +32483444983 |
| E-mail | info@monsieur-gaston.be |
| Adresse | Chaussée de Binche 141, 7000 Mons, Belgique |
| Société | J.C.J.D SRL |
| BCE | 1036.078.477 |
| Horaires | **Fermé le lundi** ; mardi–dimanche selon créneaux du site |
| Instagram | https://www.instagram.com/friterie_mrgaston/ |
| Facebook | https://www.facebook.com/mrgaston.mons |

---

## 8. Commandes GloriaFood / FoodBooking

Les boutons **Commander** ouvrent :

```
https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=3a126945-7b79-45f8-9e01-97eafbaca25b
```

- FoodBooking est la plateforme de commande en ligne (écosystème GloriaFood).
- **Aucun système de commande n’est hébergé sur le site.**
- Pour changer le lien : modifier `orderUrl` dans `src/data/site.ts`, puis commit + redeploy.
- À confirmer avec Jérôme que ce `restaurant_uid` est bien le sien.

---

## 9. Futures modifications (guide rapide)

| Besoin | Fichier principal |
| --- | --- |
| Téléphone, e-mail, adresse, réseaux | `src/data/site.ts` |
| Horaires | `src/data/hours.ts` |
| Menu / prix | `src/data/menu.ts` |
| Images galerie / chemins | `src/data/images.ts` + dossier `public/` |
| FAQ | `src/data/faq.ts` |

Workflow recommandé :

1. Modifier le fichier concerné.
2. Tester en local : `npm run dev` puis `npm run build`.
3. Commit + push sur `main`.
4. Netlify redéploie automatiquement.

---

## 10. Transfert définitif (à exécuter avec Jérôme)

### 10.1 Transférer le dépôt GitHub

1. Compte GitHub Aurelis → dépôt `mr-gaston` → **Settings → Transfer ownership**.
2. Saisir le **username GitHub de Jérôme**.
3. Confirmer le transfert.
4. Ne transférer **aucun** autre dépôt Aurelis.

### 10.2 Acceptation par Jérôme

1. Jérôme reçoit une invitation / notification GitHub.
2. Il **accepte** le transfert.
3. Le dépôt apparaît sous son compte.

### 10.3 Connecter à Netlify (compte Jérôme)

1. Netlify → Import from Git → dépôt `mr-gaston`.
2. Branche `main` · build `npm run build` · Node 20.
3. Déployer.

### 10.4 Déployer

Attendre le statut **Published** sur Netlify. Noter l’URL `*.netlify.app`.

### 10.5 Tester l’URL publique Netlify

Checklist :

- [ ] Accueil / Hero Poivré
- [ ] Images burgers
- [ ] Menu et prix
- [ ] Pas d’anciennes photos de cartes papier (bar / burgers maison)
- [ ] Téléphone 0483 44 49 83 + bouton Appeler
- [ ] E-mail info@monsieur-gaston.be
- [ ] Lundi fermé
- [ ] Navigation (carte, maison, galerie, contact)
- [ ] Mobile
- [ ] Bouton Commander → FoodBooking
- [ ] Footer : J.C.J.D SRL · BCE 1036.078.477

### 10.6 Domaine officiel

Voir section 6. **Pas de DNS avant validation Netlify.**

### 10.7 Certificat HTTPS

Vérifier le cadenas HTTPS sur `mrgaston.be` après bascule DNS.

### 10.8 GloriaFood

Tester un parcours « Commander » depuis le site Netlify / domaine.

### 10.9 Remise des accès

Remettre à Jérôme :

- Dépôt GitHub (propriétaire)
- Site Netlify (propriétaire)
- Domaine / DNS (s’il n’y a pas déjà accès)
- Ce document `LIVRAISON-MR-GASTON.md`
- Comptes GloriaFood / FoodBooking (gérés par le client — Aurelis ne détient pas ces accès)

### 10.10 Retirer les accès Aurelis

**Après validation écrite de Jérôme :**

1. Retirer collaborateurs Aurelis du dépôt GitHub (si encore présents).
2. Retirer accès Netlify Aurelis (si ajoutés temporairement).
3. Couper / archiver le projet **Vercel** Aurelis uniquement à ce moment-là.
4. Ne jamais supprimer le site Netlify du client.

---

## 11. Services externes réellement utilisés

| Service | Usage |
| --- | --- |
| GitHub | Code source |
| Netlify (cible) | Hébergement + HTTPS |
| Vercel (actuel, temporaire) | Hébergement de transition |
| FoodBooking / GloriaFood | Commande en ligne |
| Google Maps | Itinéraire / carte embarquée |
| Instagram / Facebook | Réseaux sociaux |
| Google Fonts / polices locales | Typographie (selon build) |
| GTM / GA4 | Optionnel, non requis |
| Mailchimp (lien 5.G / reseller) | Lien externe déjà présent dans le footer |

---

## 12. Points encore à confirmer avec Jérôme

1. Username GitHub exact pour le transfert.
2. E-mail du compte Netlify.
3. Confirmation définitive du lien FoodBooking (`restaurant_uid`).
4. Qui gère le DNS de `mrgaston.be` (registrar).
5. Date de bascule DNS souhaitée.
6. Accès GloriaFood / FoodBooking (côté client uniquement).

---

*Document sans secrets — prêt pour remise client.*
