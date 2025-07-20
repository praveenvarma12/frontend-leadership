import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ClaimHistory from "@/models/ClaimHistory"

export async function GET() {
  try {
    await connectDB()
    const history = await ClaimHistory.find({}).populate("userId", "name").sort({ claimedAt: -1 }).limit(50) // Limit to last 50 claims

    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}
