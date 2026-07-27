# Instructions de déploiement en ligne - Archanges Hôtel

## État actuel du projet
- ✅ Site configuré pour fonctionner localement avec SQLite (base de données locale)
- ✅ Toutes les images utilisent des fichiers locaux (plus de dépendance internet)
- ✅ Code optimisé et nettoyé (console.error supprimés)
- ✅ Serveur local fonctionnel sur http://localhost:3000

## Options de déploiement

### Option 1: Vercel (Recommandé pour Next.js)

#### Avantages
- Déploiement automatique depuis GitHub
- Certificat SSL gratuit
- CDN global intégré
- Support natif de Next.js

#### Étapes de déploiement

1. **Préparer le dépôt Git**
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

2. **Créer un compte Vercel**
- Allez sur https://vercel.com
- Créez un compte avec GitHub

3. **Importer le projet**
- Cliquez sur "Add New Project"
- Sélectionnez votre dépôt GitHub
- Vercel détectera automatiquement Next.js

4. **Configuration des variables d'environnement**
Dans les settings du projet Vercel, ajoutez:
```
DATABASE_URL=postgresql://votre_url_postgresql
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=votre_email
SMTP_PASSWORD=votre_mot_de_passe
```

**Important**: Pour la production, utilisez PostgreSQL au lieu de SQLite. Vercel offre PostgreSQL via leur service ou vous pouvez utiliser Neon, Supabase, etc.

5. **Modifier le schéma Prisma pour la production**
Dans `prisma/schema.prisma`, changez:
```prisma
datasource db {
  provider = "postgresql"  # Au lieu de "sqlite"
  url      = env("DATABASE_URL")
}
```

6. **Déployer**
- Cliquez sur "Deploy"
- Attendez quelques minutes
- Votre site sera accessible via une URL Vercel

### Option 2: VPS (Serveur privé virtuel)

#### Avantages
- Contrôle total
- Coût fixe mensuel
- Possibilité d'héberger plusieurs sites

#### Étapes de déploiement

1. **Choisir un fournisseur VPS**
- DigitalOcean, Hetzner, OVH, etc.
- Ubuntu 22.04 LTS recommandé

2. **Installer les dépendances sur le serveur**
```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Installer PM2 (gestion de processus)
sudo npm install -g pm2

# Installer Nginx (serveur web)
sudo apt install -y nginx
```

3. **Cloner le projet**
```bash
git clone votre_dépôt_git
cd archangeshotel
npm install
```

4. **Configurer les variables d'environnement**
```bash
nano .env
```
Ajoutez:
```
DATABASE_URL=postgresql://votre_url_postgresql
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=votre_email
SMTP_PASSWORD=votre_mot_de_passe
NODE_ENV=production
```

5. **Modifier Prisma pour PostgreSQL**
```bash
# Dans prisma/schema.prisma, changer provider en "postgresql"
npx prisma generate
npx prisma db push
```

6. **Build de l'application**
```bash
npm run build
```

7. **Démarrer avec PM2**
```bash
pm2 start npm --name "archanges-hotel" -- start
pm2 save
pm2 startup
```

8. **Configurer Nginx**
```bash
sudo nano /etc/nginx/sites-available/archangeshotel
```
Ajoutez:
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site:
```bash
sudo ln -s /etc/nginx/sites-available/archangeshotel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **SSL avec Certbot**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

### Option 3: Netlify

#### Avantages
- Déploiement simple depuis Git
- Fonctions serverless intégrées
- CDN global

#### Étapes de déploiement

1. **Créer un compte Netlify**
- Allez sur https://netlify.com
- Connectez votre compte GitHub

2. **Importer le projet**
- "Add new site" → "Import an existing project"
- Sélectionnez votre dépôt

3. **Configuration du build**
```
Build command: npm run build
Publish directory: .next
```

4. **Variables d'environnement**
Ajoutez les mêmes variables que pour Vercel

5. **Adapter pour Next.js**
Netlify nécessite un adaptateur pour Next.js:
```bash
npm install @netlify/next
```

Modifiez `next.config.ts` pour inclure l'adaptateur Netlify.

## Migration de SQLite vers PostgreSQL

Pour la production, SQLite n'est pas recommandé. Voici comment migrer:

1. **Créer une base PostgreSQL**
- Via Neon (https://neon.tech) - gratuit pour démarrer
- Via Supabase (https://supabase.com) - gratuit pour démarrer
- Via votre propre serveur PostgreSQL

2. **Exporter les données SQLite**
```bash
sqlite3 prisma/dev.db .dump > backup.sql
```

3. **Modifier le schéma Prisma**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. **Régénérer et pousser**
```bash
npx prisma generate
npx prisma db push
```

5. **Importer les données** (si nécessaire)
Utilisez un outil de migration ou recréez les données via l'interface d'administration.

## Checklist avant déploiement

- [ ] Base de données PostgreSQL configurée
- [ ] Variables d'environnement définies
- [ ] Schéma Prisma mis à jour pour PostgreSQL
- [ ] `npm run build` fonctionne sans erreur
- [ ] Images optimisées (taille < 500Ko)
- [ ] SMTP email configuré
- [ ] Domaine configuré
- [ ] SSL/HTTPS activé
- [ ] Tests effectués en environnement de staging

## Maintenance après déploiement

### Mises à jour
```bash
git pull origin main
npm install
npm run build
pm2 restart archanges-hotel  # Si sur VPS
```

### Sauvegardes
- Configurez des sauvegardes automatiques de la base de données
- Sauvegardez les fichiers uploadés dans `public/uploads`

### Monitoring
- Surveillez les logs avec `pm2 logs` (VPS)
- Configurez des alertes pour les erreurs
- Surveillez l'utilisation des ressources

## Support

Pour toute question ou problème lors du déploiement:
- Consultez la documentation Next.js: https://nextjs.org/docs
- Documentation Vercel: https://vercel.com/docs
- Documentation Prisma: https://www.prisma.io/docs
