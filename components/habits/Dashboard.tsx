'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HabitCard } from './HabitCard'
import { CreateHabitDialog } from './CreateHabitDialog'
import { ProgressChart } from './ProgressChart'
import { toast } from 'sonner'
import * as Icons from 'lucide-react'
import { calculateStreak } from '@/lib/habits'

/**
 * Dashboard Component
 * Main dashboard view showing:
 * - All habits with cards
 * - Category filtering
 * - Progress charts
 * - Statistics overview
 * - Motivational elements
 */
export function Dashboard() {
  const [habits, setHabits] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedHabit, setSelectedHabit] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch habits on mount
  useEffect(() => {
    fetchHabits()
  }, [])

  /**
   * Fetch all habits from API
   */
  const fetchHabits = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/habits')
      if (!response.ok) throw new Error('Failed to fetch habits')
      const data = await response.json()
      setHabits(data)
    } catch (error) {
      console.error('Error fetching habits:', error)
      toast.error('Failed to load habits')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Create a new habit
   */
  const handleCreateHabit = async (habitData: any) => {
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData),
      })
      if (!response.ok) throw new Error('Failed to create habit')
      const newHabit = await response.json()
      setHabits([newHabit, ...habits])
      toast.success('Habit created successfully! 🎉')
    } catch (error) {
      console.error('Error creating habit:', error)
      toast.error('Failed to create habit')
    }
  }

  /**
   * Check in a habit for today
   */
  const handleCheckIn = async (habitId: string, completed: boolean) => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const response = await fetch('/api/check-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habitId,
          date: today.toISOString(),
          completed,
        }),
      })

      if (!response.ok) throw new Error('Failed to check in')

      // Refresh habits to get updated data
      await fetchHabits()

      if (completed) {
        toast.success('Great job! Keep up the streak! 🔥')
      } else {
        toast.info('Check-in removed')
      }
    } catch (error) {
      console.error('Error checking in:', error)
      toast.error('Failed to check in')
    }
  }

  /**
   * Delete a habit
   */
  const handleDeleteHabit = async (habitId: string) => {
    if (!confirm('Are you sure you want to delete this habit?')) return

    try {
      const response = await fetch(`/api/habits/${habitId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete habit')
      setHabits(habits.filter((h) => h.id !== habitId))
      toast.success('Habit deleted')
    } catch (error) {
      console.error('Error deleting habit:', error)
      toast.error('Failed to delete habit')
    }
  }

  /**
   * Get unique categories from habits
   */
  const categories = Array.from(
    new Set(habits.map((h) => h.category))
  ) as string[]

  /**
   * Filter habits by selected category
   */
  const filteredHabits = selectedCategory
    ? habits.filter((h) => h.category === selectedCategory)
    : habits

  /**
   * Calculate dashboard statistics
   */
  const totalHabits = habits.length
  const totalBadges = habits.reduce((sum, h) => sum + (h.badges?.length || 0), 0)
  const totalStreak = habits.reduce(
    (sum, h) => sum + calculateStreak(h.checkIns || []),
    0
  )
  const completedToday = habits.filter((h) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return h.checkIns?.some((ci: any) => {
      const ciDate = new Date(ci.date)
      ciDate.setHours(0, 0, 0, 0)
      return ciDate.getTime() === today.getTime() && ci.completed
    })
  }).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Habit Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Build better habits, one day at a time
          </p>
        </div>
        <CreateHabitDialog onCreateHabit={handleCreateHabit} />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Habits</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">
                {totalHabits}
              </p>
            </div>
            <Icons.Target className="w-12 h-12 text-blue-300" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">
                Total Streak
              </p>
              <p className="text-3xl font-bold text-orange-700 mt-2">
                {totalStreak}
              </p>
            </div>
            <Icons.Flame className="w-12 h-12 text-orange-300" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Badges Earned
              </p>
              <p className="text-3xl font-bold text-purple-700 mt-2">
                {totalBadges}
              </p>
            </div>
            <Icons.Star className="w-12 h-12 text-purple-300" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Completed Today
              </p>
              <p className="text-3xl font-bold text-green-700 mt-2">
                {completedToday}/{totalHabits}
              </p>
            </div>
            <Icons.CheckCircle2 className="w-12 h-12 text-green-300" />
          </div>
        </Card>
      </div>

      {/* Motivational Message */}
      {completedToday === totalHabits && totalHabits > 0 && (
        <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <Icons.Zap className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="font-semibold text-yellow-900">
                Amazing! You've completed all your habits today! 🎉
              </p>
              <p className="text-sm text-yellow-700">
                Keep this momentum going and build an unstoppable streak!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All Habits Tab */}
        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <Icons.Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground mt-2">Loading habits...</p>
            </div>
          ) : habits.length === 0 ? (
            <Card className="p-12 text-center">
              <Icons.Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No habits yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first habit to get started!
              </p>
              <CreateHabitDialog onCreateHabit={handleCreateHabit} />
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onCheckIn={handleCheckIn}
                  onEdit={() => setSelectedHabit(habit)}
                  onDelete={handleDeleteHabit}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Category Tabs */}
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits
                .filter((h) => h.category === category)
                .map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onCheckIn={handleCheckIn}
                    onEdit={() => setSelectedHabit(habit)}
                    onDelete={handleDeleteHabit}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Selected Habit Detail View */}
      {selectedHabit && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{selectedHabit.name} - Details</h2>
            <Button
              variant="outline"
              onClick={() => setSelectedHabit(null)}
            >
              <Icons.X className="w-4 h-4" />
            </Button>
          </div>
          <ProgressChart habit={selectedHabit} />
        </div>
      )}
    </div>
  )
}
