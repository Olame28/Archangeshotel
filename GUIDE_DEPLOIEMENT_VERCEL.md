# Guide de déploiement rapide sur Vercel

## Étape 1: Créer une base PostgreSQL gratuite (5 minutes)

### Option recommandée: Neon
1. Allez sur https://neon.tech
2. Cliquez sur "Sign up" (créez un compte avec GitHub)
3. Cliquez sur "Create a project"
4. Donnez un nom au projet (ex: archanges-hotel)
5. Sélectionnez la région la plus proche (ex: Frankfurt)
6. Cliquez sur "Create project"
7. Une fois créé, copiez l'URL de connexion (Connection String)
8. Elle ressemble à: `postgresql://neondb_owner:xxxx@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

## Étape 2: Déployer sur Vercel (3 minutes)

1. Allez sur https://vercel.com
2. Cliquez sur "Sign up" (utilisez votre compte GitHub)
3. Cliquez sur "Add New" → "Project"
4. Sélectionnez votre dépôt: `Olame28/archanges-hotel`
5. Cliquez sur "Import"

## Étape 3: Configurer les variables d'environnement (2 minutes)

Dans la page de configuration du projet Vercel:

1. Faites défiler jusqu'à "Environment Variables"
2. Ajoutez les variables suivantes:

**DATABASE_URL**
- Collez l'URL Neon copiée à l'étape 1
- Exemple: `postgresql://neondb_owner:xxxx@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

**SMTP_HOST**
- Valeur: `smtp.zoho.com`

**SMTP_PORT**
- Valeur: `465`

**SMTP_USER**
- Valeur: votre email Zoho (ex: info@archangeshotel.com)

**SMTP_PASSWORD**
- Valeur: votre mot de passe email Zoho

**GESTION_PASSWORD**
- Valeur: `archanges2026` (ou votre mot de passe choisi)

**ADMIN_PASSWORD**
- Valeur: `archanges2026` (ou votre mot de passe choisi)

3. Cliquez sur "Add" pour chaque variable
4. Cliquez sur "Deploy"

## Étape 4: Attendre le déploiement (2-3 minutes)

Vercel va:
- Installer les dépendances
- Générer le client Prisma
- Pousser le schéma vers PostgreSQL
- Builder l'application
- Déployer sur le CDN global

## Étape 5: Vérifier le déploiement

Une fois terminé:
1. Cliquez sur l'URL fournie (ex: https://archanges-hotel.vercel.app)
2. Vérifiez que le site fonctionne
3. Testez la page /gestion avec le mot de passe configuré
4. Testez la page /admin avec le mot de passe configuré

## Étape 6: Configurer votre domaine (optionnel)

Si vous avez un domaine (ex: archangeshotel.com):

1. Dans Vercel, allez dans Settings > Domains
2. Cliquez sur "Add"
3. Entrez votre domaine
4. Suivez les instructions DNS fournies par Vercel
5. Attendez la propagation DNS (5-30 minutes)

## Problèmes courants

### Erreur: "Environment variable not found: DATABASE_URL"
- Assurez-vous que la variable DATABASE_URL est bien configurée dans Vercel
- Redéployez le projet après avoir ajouté la variable

### Erreur: Prisma connection failed
- Vérifiez que l'URL PostgreSQL est correcte
- Assurez-vous que la base de données est active sur Neon

### Images ne s'affichent pas
- Les images doivent être dans le dossier `public/images/gallery/`
- Vérifiez que les fichiers sont bien présents dans le dépôt Git

### Authentification ne fonctionne pas
- Vérifiez que les cookies sont activés dans votre navigateur
- Assurez-vous que GESTION_PASSWORD et ADMIN_PASSWORD sont configurés

## Support

- Documentation Vercel: https://vercel.com/docs
- Documentation Neon: https://neon.tech/docs
- Votre dépôt GitHub: https://github.com/Olame28/archanges-hotel
