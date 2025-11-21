import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * POST /api/badges
 * Award a badge to a habit
 * Body: { habitId, name, description?, icon }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { habitId, name, description, icon } = body

    // Validate required fields
    if (!habitId || !name || !icon) {
      return NextResponse.json(
        { error: 'habitId, name, and icon are required' },
        { status: 400 }
      )
    }

    // Create new badge
    const badge = await prisma.badge.create({
      data: {
        habitId,
        name,
        description: description || null,
        icon,
      },
    })

    return NextResponse.json(badge, { status: 201 })
  } catch (error) {
    console.error('Error creating badge:', error)
    return NextResponse.json(
      { error: 'Failed to create badge' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/badges
 * Fetch badges for a habit
 * Query params: habitId
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const habitId = searchParams.get('habitId')

    if (!habitId) {
      return NextResponse.json(
        { error: 'habitId is required' },
        { status: 400 }
      )
    }

    // Fetch badges for the habit
    const badges = await prisma.badge.findMany({
      where: { habitId },
      orderBy: { earnedAt: 'desc' },
    })

    return NextResponse.json(badges)
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch badges' },
      { status: 500 }
    )
  }
}
