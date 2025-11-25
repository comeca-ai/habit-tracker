/**
 * Type definitions for the Habit Tracker application
 */

export interface CheckIn {
  id: string
  habitId: string
  date: Date | string
  completed: boolean
  notes: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface Badge {
  id: string
  habitId: string
  name: string
  description: string
  icon: string
  earnedAt?: Date | string
}

export interface Habit {
  id: string
  name: string
  description: string
  category: string
  color: string
  icon: string
  frequency: string
  goal: number
  checkIns?: CheckIn[]
  badges?: Badge[]
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CreateHabitInput = Omit<Habit, 'id' | 'checkIns' | 'badges' | 'createdAt' | 'updatedAt'>
