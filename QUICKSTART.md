# 🚀 Quick Start Guide - Habit Tracker

Get up and running with Habit Tracker in minutes!

---

## ⚡ 5-Minute Setup

### 1. Prerequisites
```bash
# Check Node.js version (need 18+)
node --version

# Check PostgreSQL is running
psql --version
```

### 2. Install Dependencies
```bash
cd /home/code/habit-tracker
npm install
```

### 3. Setup Database
```bash
# Create database
createdb -h localhost habit_tracker

# Run migrations
npx prisma migrate dev
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open in Browser
```
http://localhost:3000
```

---

## 🎯 First Steps

### Create Your First Habit
1. Click **"New Habit"** button
2. Fill in the form:
   - **Name**: e.g., "Morning Exercise"
   - **Description**: Optional details
   - **Category**: Choose from 8 categories
   - **Color**: Pick a color
   - **Frequency**: Daily, Weekly, or Monthly
3. Click **"Create Habit"**

### Check In Your Habit
1. Click **"Check In"** button on the habit card
2. See the button change to **"Done Today"** (green)
3. Watch your statistics update!

### View Progress
1. Click on a habit card to see details
2. View 30-day progress chart
3. See weekly completion rate

---

## 📁 Project Structure

```
habit-tracker/
├── app/api/          # Backend API
├── components/       # React components
├── lib/              # Utilities
├── prisma/           # Database
└── public/           # Static files
```

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Format code
npm run format

# Lint code
npm run lint
```

---

## 📊 API Quick Reference

### Create Habit
```bash
curl -X POST http://localhost:3000/api/habits \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Morning Exercise",
    "category": "fitness",
    "color": "orange",
    "frequency": "daily"
  }'
```

### Check In Habit
```bash
curl -X POST http://localhost:3000/api/check-ins \
  -H "Content-Type: application/json" \
  -d '{
    "habitId": "habit-id-here",
    "date": "2025-11-21T00:00:00Z",
    "completed": true
  }'
```

### Get All Habits
```bash
curl http://localhost:3000/api/habits
```

---

## 🎨 Customization

### Change Colors
Edit `lib/habits.ts` - `getCategoryColor()` function

### Change Icons
Edit `lib/habits.ts` - `getCategoryIcon()` function

### Modify Badges
Edit `lib/habits.ts` - `determineBadges()` function

### Update Styling
Edit `app/globals.css` or component files

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check connection string in .env.local
cat .env.local
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Migrations Failed
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or manually:
dropdb habit_tracker
createdb habit_tracker
npx prisma migrate dev
```

---

## 📚 Documentation

- **README.md** - Project overview
- **PROJECT_SUMMARY.md** - Technical details
- **DEPLOYMENT.md** - Deployment guide
- **GITHUB_SETUP.md** - GitHub setup
- **FINAL_SUMMARY.md** - Complete summary

---

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add PostgreSQL database
4. Deploy!

### Option 3: Docker
```bash
docker-compose up -d
```

See **DEPLOYMENT.md** for detailed instructions.

---

## 🔐 Environment Variables

Create `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/habit_tracker"
NODE_ENV="development"
```

---

## 📞 Need Help?

1. Check documentation files
2. Review code comments
3. Check browser console for errors
4. Check server logs: `tail -f server.log`

---

## ✨ Features Overview

- ✅ Create and manage habits
- ✅ Daily check-ins
- ✅ Streak tracking
- ✅ Progress charts
- ✅ Badge system
- ✅ Category filtering
- ✅ Responsive design
- ✅ Beautiful UI

---

## 🎯 Next Steps

1. **Create some habits** - Start tracking!
2. **Check in daily** - Build your streak
3. **Earn badges** - Achieve milestones
4. **Deploy** - Share with others
5. **Customize** - Make it your own

---

## 💡 Tips

- Create habits for different areas of life
- Check in every day to build streaks
- Use categories to organize habits
- View charts to track progress
- Share your achievements!

---

**Ready to build better habits? Let's go! 🚀**

For more details, see the full documentation files.
