import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET /api/habits
 * Fetch all habits, optionally filtered by category
 * Query params: category (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Build query filter - if category is provided, filter by it
    const where = category ? { category } : {}

    // Fetch habits with their check-ins and badges
    const habits = await prisma.habit.findMany({
      where,
      include: {
        checkIns: {
          orderBy: { date: 'desc' },
          take: 30, // Get last 30 check-ins for streak calculation
        },
        badges: {
          orderBy: { earnedAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(habits)
  } catch (error) {
    console.error('Error fetching habits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/habits
 * Create a new habit
 * Body: { name, description?, category, color?, icon?, frequency?, goal? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, category, color, icon, frequency, goal } = body

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      )
    }

    // Create new habit in database
    const habit = await prisma.habit.create({
      data: {
        name,
        description: description || null,
        category,
        color: color || 'blue',
        icon: icon || 'target',
        frequency: frequency || 'daily',
        goal: goal || 1,
      },
      include: {
        checkIns: true,
        badges: true,
      },
    })

    return NextResponse.json(habit, { status: 201 })
  } catch (error) {
    console.error('Error creating habit:', error)
    return NextResponse.json(
      { error: 'Failed to create habit' },
      { status: 500 }
    )
  }
}
