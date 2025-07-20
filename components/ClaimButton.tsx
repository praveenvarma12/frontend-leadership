"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Sparkles } from "lucide-react"

interface ClaimButtonProps {
  selectedUserId: string | null
  selectedUserName: string | null
  onClaim: (userId: string) => Promise<{ pointsEarned: number; message: string }>
  isLoading: boolean
}

export default function ClaimButton({ selectedUserId, selectedUserName, onClaim, isLoading }: ClaimButtonProps) {
  const [lastClaim, setLastClaim] = useState<{ points: number; message: string } | null>(null)
  const [isClaiming, setIsClaiming] = useState(false)

  const handleClaim = async () => {
    if (!selectedUserId) return

    setIsClaiming(true)
    try {
      const result = await onClaim(selectedUserId)
      setLastClaim({ points: result.pointsEarned, message: result.message })

      // Clear the message after 3 seconds
      setTimeout(() => setLastClaim(null), 3000)
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Claim Points
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleClaim}
          disabled={!selectedUserId || isClaiming || isLoading}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {isClaiming ? (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-spin" />
              Claiming...
            </>
          ) : (
            <>
              <Trophy className="mr-2 h-5 w-5" />
              Claim Random Points (1-10)
            </>
          )}
        </Button>

        {selectedUserName && (
          <p className="text-sm text-muted-foreground text-center">
            Selected: <span className="font-medium">{selectedUserName}</span>
          </p>
        )}

        {lastClaim && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-medium">🎉 +{lastClaim.points} points earned!</p>
            <p className="text-green-600 text-sm">{lastClaim.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
