# Guide de configuration - Secrets et services

## 📋 Checklist de configuration

### 1. Docker Hub ✅ (Déjà configuré)
- [x] `DOCKERHUB_USERNAME` : `voilacter`
- [x] `DOCKERHUB_TOKEN` : [À configurer dans GitHub Secrets]

### 2. Vercel (Frontend)

**Étapes :**
1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer le projet `packages/client`
3. Obtenir les tokens :
   - Aller dans Settings → Tokens
   - Créer un nouveau token → Copier le token
   - Dans Settings → General → Copier `Org ID` et `Project ID`

**Secrets GitHub à ajouter :**
- `VERCEL_TOKEN` : Token Vercel
- `VERCEL_ORG_ID` : ID de l'organisation
- `VERCEL_PROJECT_ID` : ID du projet

### 3. Render (Backend)

**Étapes :**
1. Créer un compte sur [render.com](https://render.com)
2. Créer un nouveau "Web Service"
3. Configuration :
   - **Image Docker** : `voilacter/todo-server:latest` (sera remplacé par la version lors du déploiement)
   - **Port** : `3001`
   - **Environment Variables** :
     - `PORT=3001`
     - `SENTRY_DSN=[votre-dsn-sentry]`
     - `NODE_ENV=production`
4. Obtenir le webhook de déploiement :
   - Dans le service Render → Settings → Manual Deploy Hook
   - Copier l'URL du webhook

**Secrets GitHub à ajouter :**
- `RENDER_DEPLOY_HOOK` : URL du webhook Render

**Note :** Après chaque push d'image versionnée, il faudra mettre à jour manuellement l'image Docker dans Render vers la nouvelle version, ou configurer un webhook automatique.

### 4. Discord (Notifications)

**Étapes :**
1. Créer un serveur Discord (ou utiliser un existant)
2. Aller dans Paramètres du serveur → Intégrations → Webhooks
3. Créer un nouveau webhook
4. Copier l'URL du webhook

**Secrets GitHub à ajouter :**
- `DISCORD_WEBHOOK_URL` : URL du webhook Discord

### 5. URLs de déploiement (Smoke tests)

Après le premier déploiement, ajouter ces secrets :
- `FRONTEND_URL` : URL Vercel (ex: `https://mon-app.vercel.app`)
- `BACKEND_URL` : URL Render (ex: `https://mon-app.onrender.com`)

### 6. Sentry (Déjà configuré)

- `SENTRY_DSN` : [Déjà configuré localement, à ajouter dans Render]

## 🔧 Configuration des secrets GitHub

1. Aller sur votre repo GitHub
2. Settings → Secrets and variables → Actions
3. New repository secret
4. Ajouter chaque secret un par un

## 🧪 Test de la pipeline

### Test sur PR
1. Créer une branche : `git checkout -b test/pr-workflow`
2. Faire un commit : `git commit -m "test: verify PR workflows"`
3. Push : `git push -u origin test/pr-workflow`
4. Créer une PR sur GitHub
5. Vérifier que les workflows s'exécutent :
   - ✅ test-unit
   - ✅ coverage-check
   - ✅ lint-commits
   - ✅ security-scan-npm
   - ✅ docker-build-and-scan (build + Trivy)

### Test de déploiement (sur tag)
1. Créer un tag : `git tag v1.0.0`
2. Push le tag : `git push origin v1.0.0`
3. Vérifier que les workflows s'exécutent :
   - ✅ docker-build-and-scan (build + push)
   - ✅ deploy-frontend
   - ✅ deploy-backend
   - ✅ smoke-test
   - ✅ notify-discord

## 📝 Notes importantes

- **Les déploiements ne se déclenchent QUE sur les tags** (format `v*.*.*`)
- **L'image Docker est taguée avec la version** (ex: `voilacter/todo-server:v1.0.0`)
- **Pas de tag `:latest`** pour éviter les problèmes de versioning
- **Le rollback est simple** : redéployer l'image versionnée précédente

