import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import ClaimHistory from "@/models/ClaimHistory"

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectDB()
    const { userId } = params

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Generate random points (1-10)
    const randomPoints = Math.floor(Math.random() * 10) + 1

    // Update user's total points
    user.totalPoints += randomPoints
    await user.save()

    // Create claim history record
    const claimHistory = new ClaimHistory({
      userId: user._id,
      points: randomPoints,
    })
    await claimHistory.save()

    return NextResponse.json({
      user,
      pointsEarned: randomPoints,
      message: `${user.name} earned ${randomPoints} points!`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to claim points" }, { status: 500 })
  }
}
