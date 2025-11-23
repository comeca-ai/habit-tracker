'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { calculateStreak, calculateCompletionPercentage } from '@/lib/habits'
import * as Icons from 'lucide-react'
import { useState } from 'react'

interface HabitCardProps {
  habit: any
  onCheckIn: (habitId: string, completed: boolean) => void
  onEdit: (habit: any) => void
  onDelete: (habitId: string) => void
}

/**
 * HabitCard Component
 * Displays a single habit with streak counter, completion percentage, and check-in button
 * Features:
 * - Shows current streak with flame icon
 * - Displays completion percentage with progress bar
 * - Quick check-in button
 * - Edit and delete options
 * - Badge display for achievements
 */
export function HabitCard({
  habit,
  onCheckIn,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Calculate streak and completion percentage
  const streak = calculateStreak(habit.checkIns || [])
  const completionPercentage = calculateCompletionPercentage(
    habit.checkIns || [],
    30
  )

  // Get today's check-in status
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayCheckIn = habit.checkIns?.find((ci: any) => {
    const ciDate = new Date(ci.date)
    ciDate.setHours(0, 0, 0, 0)
    return ciDate.getTime() === today.getTime()
  })

  // Get icon component dynamically
  const IconComponent = (Icons as any)[habit.icon] || Icons.Target

  // Handle check-in button click
  const handleCheckIn = async () => {
    setIsLoading(true)
    try {
      await onCheckIn(habit.id, !todayCheckIn?.completed)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Header with icon and title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`p-2 rounded-lg ${habit.color === 'blue' ? 'bg-blue-100' : habit.color === 'green' ? 'bg-green-100' : habit.color === 'purple' ? 'bg-purple-100' : habit.color === 'orange' ? 'bg-orange-100' : habit.color === 'red' ? 'bg-red-100' : habit.color === 'pink' ? 'bg-pink-100' : 'bg-gray-100'}`}
          >
            <IconComponent
              className={`w-5 h-5 ${habit.color === 'blue' ? 'text-blue-600' : habit.color === 'green' ? 'text-green-600' : habit.color === 'purple' ? 'text-purple-600' : habit.color === 'orange' ? 'text-orange-600' : habit.color === 'red' ? 'text-red-600' : habit.color === 'pink' ? 'text-pink-600' : 'text-gray-600'}`}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground">{habit.description}</p>
            )}
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {habit.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {habit.frequency}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Streak and stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Icons.Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-lg text-orange-600">{streak}</span>
          </div>
          <p className="text-xs text-muted-foreground">Dias Seguidos</p>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <div className="font-bold text-lg text-blue-600 mb-1">
            {completionPercentage}%
          </div>
          <p className="text-xs text-muted-foreground">Conclusão</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded-lg">
          <div className="font-bold text-lg text-purple-600 mb-1">
            {habit.badges?.length || 0}
          </div>
          <p className="text-xs text-muted-foreground">Conquistas</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium">Progresso (30 dias)</span>
          <span className="text-xs text-muted-foreground">
            {completionPercentage}%
          </span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      {/* Badges display */}
      {habit.badges && habit.badges.length > 0 && (
        <div className="mb-4 pb-4 border-b">
          <p className="text-xs font-medium mb-2">Conquistas Recentes</p>
          <div className="flex flex-wrap gap-2">
            {habit.badges.slice(0, 3).map((badge: any) => (
              <div
                key={badge.id}
                className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full border border-yellow-200"
              >
                <Icons.Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-700">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleCheckIn}
          disabled={isLoading}
          className={`flex-1 ${
            todayCheckIn?.completed
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          }`}
        >
          {todayCheckIn?.completed ? (
            <>
              <Icons.CheckCircle2 className="w-4 h-4 mr-2" />
              Feito Hoje
            </>
          ) : (
            <>
              <Icons.Plus className="w-4 h-4 mr-2" />
              Check In
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(habit)}
          className="px-3"
        >
          <Icons.Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(habit.id)}
          className="px-3 text-red-500 hover:text-red-600"
        >
          <Icons.Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
