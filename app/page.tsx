"use client"

import { useState, useEffect } from "react"
import UserSelector from "@/components/UserSelector"
import ClaimButton from "@/components/ClaimButton"
import Leaderboard from "@/components/Leaderboard"
import ClaimHistory from "@/components/ClaimHistory"
import { Button } from "@/components/ui/button"
import { RefreshCw, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  _id: string
  name: string
  totalPoints: number
}

interface LeaderboardUser extends User {
  rank: number
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard")
      if (!response.ok) throw new Error("Failed to fetch leaderboard")
      const data = await response.json()
      setLeaderboard(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leaderboard",
        variant: "destructive",
      })
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    await Promise.all([fetchUsers(), fetchLeaderboard()])
    setIsLoading(false)
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleAddUser = async (name: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to add user")
      }

      await refreshData()
      toast({
        title: "Success",
        description: `User "${name}" added successfully!`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add user",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleClaim = async (userId: string) => {
    try {
      const response = await fetch(`/api/claim/${userId}`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to claim points")

      const result = await response.json()
      await refreshData()

      return {
        pointsEarned: result.pointsEarned,
        message: result.message,
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim points",
        variant: "destructive",
      })
      throw error
    }
  }

  const selectedUser = users.find((user) => user._id === selectedUserId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-500" />
            Leaderboard System
          </h1>
          <p className="text-gray-600 text-lg">Add users, claim random points, and compete for the top spot!</p>
          <Button onClick={refreshData} variant="outline" className="mt-4 bg-transparent" disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Actions */}
          <div className="space-y-6">
            <UserSelector
              users={users}
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
              onAddUser={handleAddUser}
              isLoading={isLoading}
            />

            <ClaimButton
              selectedUserId={selectedUserId}
              selectedUserName={selectedUser?.name || null}
              onClaim={handleClaim}
              isLoading={isLoading}
            />
          </div>

          {/* Middle Column - Leaderboard */}
          <div>
            <Leaderboard users={leaderboard} isLoading={isLoading} />
          </div>

          {/* Right Column - History */}
          <div>
            <ClaimHistory key={leaderboard.length} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with Next.js, React, and MongoDB</p>
        </div>
      </div>
    </div>
  )
}
