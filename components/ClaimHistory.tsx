"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, ChevronDown, ChevronUp } from "lucide-react"

interface ClaimHistoryItem {
  _id: string
  userId: {
    _id: string
    name: string
  }
  points: number
  claimedAt: string
}

export default function ClaimHistory() {
  const [history, setHistory] = useState<ClaimHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history")
      if (!response.ok) throw new Error("Failed to fetch history")
      const data = await response.json()
      setHistory(data)
      setError(null)
    } catch (err) {
      setError("Failed to load history")
      console.error("Error fetching history:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const displayedHistory = isExpanded ? history : history.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Claim History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-4">{error}</p>
        ) : history.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No claims yet. Start claiming points!</p>
        ) : (
          <div className="space-y-3">
            {displayedHistory.map((claim) => (
              <div key={claim._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{claim.userId.name}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(claim.claimedAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+{claim.points} pts</p>
                </div>
              </div>
            ))}

            {history.length > 5 && (
              <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="w-full">
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show More ({history.length - 5} more)
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
