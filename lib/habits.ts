/**
 * Utility functions for habit tracking logic
 */

/**
 * Calculate the current streak for a habit based on check-ins
 * A streak is broken if there's a day without a completed check-in
 * @param checkIns - Array of check-ins sorted by date (newest first)
 * @returns Current streak count
 */
export function calculateStreak(checkIns: any[]): number {
  if (checkIns.length === 0) return 0

  // Sort by date descending (newest first)
  const sorted = [...checkIns].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // Check each day going backwards
  for (const checkIn of sorted) {
    const checkInDate = new Date(checkIn.date)
    checkInDate.setHours(0, 0, 0, 0)

    // Calculate days difference
    const daysDiff = Math.floor(
      (currentDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    // If this check-in is not on the expected day, streak is broken
    if (daysDiff > 0) {
      break
    }

    // If completed, increment streak
    if (checkIn.completed) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

/**
 * Calculate completion percentage for a habit over a period
 * @param checkIns - Array of check-ins
 * @param days - Number of days to calculate over
 * @returns Percentage (0-100)
 */
export function calculateCompletionPercentage(
  checkIns: any[],
  days: number = 30
): number {
  if (checkIns.length === 0) return 0

  // Filter check-ins within the period
  const now = new Date()
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  const recentCheckIns = checkIns.filter((ci) => {
    const ciDate = new Date(ci.date)
    return ciDate >= startDate && ciDate <= now
  })

  const completed = recentCheckIns.filter((ci) => ci.completed).length
  return Math.round((completed / Math.min(days, recentCheckIns.length)) * 100)
}

/**
 * Determine which badges should be awarded based on habit progress
 * @param checkIns - Array of check-ins
 * @param existingBadges - Array of existing badges
 * @returns Array of badge objects to award
 */
export function determineBadges(checkIns: any[], existingBadges: any[] = []) {
  const badgesToAward = []
  const streak = calculateStreak(checkIns)
  const completionPercentage = calculateCompletionPercentage(checkIns, 30)

  // Get existing badge names to avoid duplicates
  const existingBadgeNames = existingBadges.map((b) => b.name)

  // 7-Day Streak Badge
  if (streak >= 7 && !existingBadgeNames.includes('Sequência de 7 Dias')) {
    badgesToAward.push({
      name: 'Sequência de 7 Dias',
      description: 'Completou o hábito por 7 dias consecutivos',
      icon: 'flame',
    })
  }

  // 30-Day Streak Badge
  if (streak >= 30 && !existingBadgeNames.includes('Sequência de 30 Dias')) {
    badgesToAward.push({
      name: 'Sequência de 30 Dias',
      description: 'Completou o hábito por 30 dias consecutivos',
      icon: 'zap',
    })
  }

  // Perfect Week Badge
  if (
    completionPercentage === 100 &&
    checkIns.length >= 7 &&
    !existingBadgeNames.includes('Semana Perfeita')
  ) {
    badgesToAward.push({
      name: 'Semana Perfeita',
      description: 'Completou o hábito todos os dias por uma semana',
      icon: 'star',
    })
  }

  // Getting Started Badge
  if (checkIns.length >= 1 && !existingBadgeNames.includes('Começando')) {
    badgesToAward.push({
      name: 'Começando',
      description: 'Completou seu primeiro check-in',
      icon: 'rocket',
    })
  }

  // Dedicated Badge
  if (
    completionPercentage >= 80 &&
    checkIns.length >= 30 &&
    !existingBadgeNames.includes('Dedicado')
  ) {
    badgesToAward.push({
      name: 'Dedicado',
      description: 'Manteve 80% de taxa de conclusão por 30 dias',
      icon: 'heart',
    })
  }

  return badgesToAward
}

/**
 * Get color for a habit category
 * @param category - Category name
 * @returns Color code
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    health: 'bg-red-500',
    fitness: 'bg-orange-500',
    learning: 'bg-blue-500',
    productivity: 'bg-purple-500',
    mindfulness: 'bg-green-500',
    social: 'bg-pink-500',
    finance: 'bg-yellow-500',
    other: 'bg-gray-500',
  }

  return colors[category.toLowerCase()] || colors.other
}

/**
 * Get icon for a habit category
 * @param category - Category name
 * @returns Icon name from lucide-react
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    health: 'heart',
    fitness: 'dumbbell',
    learning: 'book',
    productivity: 'briefcase',
    mindfulness: 'brain',
    social: 'users',
    finance: 'wallet',
    other: 'target',
  }

  return icons[category.toLowerCase()] || icons.other
}
