# 🏆 Leaderboard System

A full-stack leaderboard application built with Next.js, React, and MongoDB where users can claim random points and compete for rankings.

## ✨ Features

- **User Management**: Add new users and select existing ones
- **Point Claiming**: Claim random points (1-10) with a single click
- **Real-time Leaderboard**: View rankings updated in real-time
- **Claim History**: Track all point claims with timestamps
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern UI**: Clean, animated interface with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **UI**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd leaderboard-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
# Create .env.local file
MONGODB_URI=mongodb://localhost:27017/leaderboard
\`\`\`

4. Start MongoDB (if running locally):
\`\`\`bash
mongod
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String (unique),
  totalPoints: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### ClaimHistory Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  points: Number,
  claimedAt: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Fetch all users |
| POST | `/api/users` | Add a new user |
| POST | `/api/claim/:userId` | Claim random points for user |
| GET | `/api/leaderboard` | Get ranked users by points |
| GET | `/api/history` | Get claim history |

## 🎮 How to Use

1. **Add Users**: Enter a name in the input field and click the + button
2. **Select User**: Choose a user from the dropdown menu
3. **Claim Points**: Click "Claim Random Points" to earn 1-10 points
4. **View Rankings**: Check the leaderboard for current standings
5. **Track History**: See all recent point claims in the history panel

## 🎨 UI Components

- **UserSelector**: Dropdown for user selection and adding new users
- **ClaimButton**: Interactive button for claiming points with feedback
- **Leaderboard**: Ranked list with crown/medal icons for top 3
- **ClaimHistory**: Scrollable history of all point claims

## 🔄 Real-time Updates

The application automatically refreshes the leaderboard and user data after each point claim, ensuring all users see the latest rankings immediately.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your MongoDB connection string as an environment variable
4. Deploy!

### MongoDB Atlas
For production, use MongoDB Atlas:
1. Create a cluster at [mongodb.com](https://mongodb.com)
2. Get your connection string
3. Update the `MONGODB_URI` environment variable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure MongoDB is running
3. Verify environment variables are set correctly
4. Open an issue on GitHub

---

Built with ❤️ using Next.js and MongoDB
