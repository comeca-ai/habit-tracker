# 🚀 Deployment Guide - Habit Tracker

## Deployment Options

This guide covers multiple deployment options for the Habit Tracker application.

---

## 1. Vercel (Recommended) ⭐

Vercel is the official Next.js hosting platform and offers the best experience.

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (free tier available)

### Steps

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `habit-tracker` repository

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add the following variables:
     ```
     DATABASE_URL=postgresql://user:password@host:5432/habit_tracker
     ```

3. **Database Setup**
   - Create a PostgreSQL database (use Vercel Postgres or external provider)
   - Update the `DATABASE_URL` with your connection string

4. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Your app will be available at `https://habit-tracker.vercel.app`

### Benefits
- ✅ Automatic deployments
- ✅ Zero-config Next.js optimization
- ✅ Global CDN
- ✅ Free tier available
- ✅ Custom domains
- ✅ Analytics included

---

## 2. Railway

Railway offers a simple deployment experience with integrated databases.

### Steps

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Authorize and select your repository

2. **Add PostgreSQL Database**
   - In Railway dashboard, click "Add Service"
   - Select "PostgreSQL"
   - Railway will automatically set `DATABASE_URL`

3. **Configure Environment**
   - Add any additional environment variables needed
   - Railway will handle the rest

4. **Deploy**
   - Push to GitHub and Railway will auto-deploy
   - Your app will be available at a Railway URL

### Benefits
- ✅ Integrated database
- ✅ Simple setup
- ✅ Pay-as-you-go pricing
- ✅ Good free tier

---

## 3. Render

Render provides a modern deployment platform with free tier.

### Steps

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   - **Name**: `habit-tracker`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   - Add `DATABASE_URL` in the Environment section

5. **Create PostgreSQL Database**
   - Click "New +"
   - Select "PostgreSQL"
   - Render will provide connection string

6. **Deploy**
   - Click "Create Web Service"
   - Render will deploy automatically

### Benefits
- ✅ Free tier available
- ✅ Integrated PostgreSQL
- ✅ Auto-deploy from GitHub
- ✅ Good documentation

---

## 4. Docker + Self-Hosted

For complete control, deploy using Docker.

### Prerequisites
- Docker installed
- Server with Docker support (AWS EC2, DigitalOcean, etc.)

### Steps

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'

   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://user:password@db:5432/habit_tracker
       depends_on:
         - db

     db:
       image: postgres:15
       environment:
         - POSTGRES_USER=user
         - POSTGRES_PASSWORD=password
         - POSTGRES_DB=habit_tracker
       volumes:
         - postgres_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"

   volumes:
     postgres_data:
   ```

3. **Build and Run**
   ```bash
   docker-compose up -d
   ```

4. **Run Migrations**
   ```bash
   docker-compose exec app npx prisma migrate deploy
   ```

### Benefits
- ✅ Complete control
- ✅ Portable
- ✅ Scalable
- ✅ Works anywhere

---

## 5. AWS (EC2 + RDS)

For enterprise-grade deployment.

### Steps

1. **Create EC2 Instance**
   - Launch Ubuntu 22.04 LTS instance
   - Configure security groups (allow ports 80, 443, 3000)

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm git
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/username/habit-tracker.git
   cd habit-tracker
   npm install
   ```

4. **Create RDS PostgreSQL Database**
   - Use AWS RDS console
   - Create PostgreSQL instance
   - Note the endpoint and credentials

5. **Configure Environment**
   ```bash
   echo "DATABASE_URL=postgresql://user:password@endpoint:5432/habit_tracker" > .env.local
   ```

6. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

7. **Start Application**
   ```bash
   npm run build
   npm start
   ```

8. **Setup PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "habit-tracker" -- start
   pm2 startup
   pm2 save
   ```

9. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

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

10. **Setup SSL with Let's Encrypt**
    ```bash
    sudo apt install -y certbot python3-certbot-nginx
    sudo certbot --nginx -d your-domain.com
    ```

### Benefits
- ✅ Enterprise-grade
- ✅ Highly scalable
- ✅ Full control
- ✅ Auto-scaling available

---

## 6. DigitalOcean App Platform

Simple deployment with integrated database.

### Steps

1. **Connect GitHub**
   - Go to [digitalocean.com](https://digitalocean.com)
   - Click "Create" > "Apps"
   - Connect your GitHub account

2. **Select Repository**
   - Choose `habit-tracker` repository
   - Select branch (main)

3. **Configure App**
   - DigitalOcean will auto-detect Next.js
   - Review build and run commands

4. **Add Database**
   - Click "Add Resource"
   - Select "PostgreSQL"
   - DigitalOcean will set `DATABASE_URL`

5. **Deploy**
   - Click "Create Resources"
   - Wait for deployment to complete

### Benefits
- ✅ Simple setup
- ✅ Integrated database
- ✅ Good pricing
- ✅ Reliable uptime

---

## Environment Variables Checklist

Before deploying, ensure you have:

```
DATABASE_URL=postgresql://user:password@host:5432/habit_tracker
NODE_ENV=production
```

Optional:
```
NEXT_PUBLIC_API_URL=https://your-domain.com
```

---

## Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] README.md updated
- [ ] Environment variables configured
- [ ] Database migrations tested locally
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors
- [ ] API endpoints tested
- [ ] UI responsive on mobile
- [ ] Performance optimized

---

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Can create habits
- [ ] Can check in habits
- [ ] Can view dashboard
- [ ] Gráficos load correctly
- [ ] Notifications work
- [ ] Database persists data
- [ ] Performance is acceptable
- [ ] SSL certificate valid
- [ ] Monitoring configured

---

## Monitoring & Maintenance

### Logs
- **Vercel**: Dashboard > Deployments > Logs
- **Railway**: Dashboard > Logs
- **Render**: Dashboard > Logs
- **Self-hosted**: `pm2 logs` or `docker logs`

### Database Backups
- **Vercel Postgres**: Automatic daily backups
- **Railway**: Automatic backups
- **AWS RDS**: Configure backup retention
- **Self-hosted**: Set up automated backups

### Updates
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Restart application
npm run build
npm start
```

---

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
- Check `DATABASE_URL` is correct
- Verify database is running
- Check firewall rules

### Build Fails
```
Error: Cannot find module
```
- Run `npm install` locally
- Check `package.json` for missing dependencies
- Clear cache: `npm cache clean --force`

### Application Crashes
- Check logs for errors
- Verify environment variables
- Check database migrations ran
- Restart application

### Slow Performance
- Check database queries
- Enable caching
- Optimize images
- Use CDN for static assets

---

## Cost Estimation

| Platform | Tier | Cost/Month |
|----------|------|-----------|
| Vercel | Free | $0 |
| Vercel | Pro | $20 |
| Railway | Free | $0 |
| Railway | Pay-as-you-go | $5-50 |
| Render | Free | $0 |
| Render | Paid | $7+ |
| DigitalOcean | Basic | $5-12 |
| AWS | Free tier | $0 (limited) |

---

## Recommended Setup

For most users, we recommend:

1. **Development**: Local machine with PostgreSQL
2. **Staging**: Railway or Render (free tier)
3. **Production**: Vercel + Vercel Postgres

This provides:
- ✅ Zero-config deployment
- ✅ Automatic scaling
- ✅ Global CDN
- ✅ Integrated database
- ✅ Free tier available

---

## Support

For deployment issues:
- Check platform documentation
- Review application logs
- Test locally first
- Open GitHub issue

---

**Happy deploying! 🚀**
