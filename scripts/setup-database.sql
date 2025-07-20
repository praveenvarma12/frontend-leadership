-- MongoDB setup script (for reference)
-- This would be executed in MongoDB shell or MongoDB Compass

-- Create database
use leaderboard;

-- Create users collection with indexes
db.users.createIndex({ "name": 1 }, { unique: true });
db.users.createIndex({ "totalPoints": -1 });

-- Create claimhistory collection with indexes  
db.claimhistory.createIndex({ "userId": 1 });
db.claimhistory.createIndex({ "claimedAt": -1 });

-- Insert sample data (optional)
db.users.insertMany([
  { name: "Alice", totalPoints: 0 },
  { name: "Bob", totalPoints: 0 },
  { name: "Charlie", totalPoints: 0 }
]);

print("Database setup complete!");
