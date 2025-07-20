"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface UserSelectorProps {
  users: any[]
  selectedUserId: string | null
  onUserSelect: (userId: string) => void
  onAddUser: (name: string) => void
  isLoading: boolean
}

export default function UserSelector({ users, selectedUserId, onUserSelect, onAddUser, isLoading }: UserSelectorProps) {
  const [newUserName, setNewUserName] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddUser = async () => {
    if (!newUserName.trim()) return

    setIsAdding(true)
    try {
      await onAddUser(newUserName.trim())
      setNewUserName("")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Select User
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Select value={selectedUserId || ""} onValueChange={onUserSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a user..." />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>
                  {user.name} ({user.totalPoints} points)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Enter new user name..."
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddUser()}
            disabled={isAdding}
          />
          <Button onClick={handleAddUser} disabled={!newUserName.trim() || isAdding || isLoading} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
