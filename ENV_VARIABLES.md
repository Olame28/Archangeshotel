# Variables d'environnement pour la production

Ces variables doivent être configurées dans les settings de votre hébergeur (Vercel, VPS, etc.)

## Base de données
```
DATABASE_URL=postgresql://user:password@host:port/database
```
Exemple avec Neon (gratuit pour démarrer):
```
DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## Configuration Email (SMTP)
```
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=votre_email@archangeshotel.com
SMTP_PASSWORD=votre_mot_de_passe_email
```

## Authentification
```
GESTION_PASSWORD=archanges2026
ADMIN_PASSWORD=archanges2026
```

## Comment obtenir une base PostgreSQL gratuite?

### Option 1: Neon (Recommandé)
1. Allez sur https://neon.tech
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Copiez l'URL de connexion (Connection String)
5. Utilisez-la comme DATABASE_URL

### Option 2: Supabase
1. Allez sur https://supabase.com
2. Créez un nouveau projet
3. Allez dans Settings > Database
4. Copiez l'URI de connexion
5. Utilisez-la comme DATABASE_URL

### Option 3: Railway
1. Allez sur https://railway.app
2. Créez un nouveau projet PostgreSQL
3. Copiez l'URL de connexion

## Configuration sur Vercel

1. Allez sur votre projet Vercel
2. Cliquez sur Settings > Environment Variables
3. Ajoutez chaque variable avec sa valeur
4. Redéployez le projet
