import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * POST /api/check-ins
 * Create or update a check-in for a habit on a specific date
 * Body: { habitId, date, completed, notes? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { habitId, date, completed, notes } = body

    // Validate required fields
    if (!habitId || !date) {
      return NextResponse.json(
        { error: 'habitId and date are required' },
        { status: 400 }
      )
    }

    // Parse date to ensure it's a valid date
    const checkInDate = new Date(date)
    checkInDate.setHours(0, 0, 0, 0) // Normalize to start of day

    // Try to find existing check-in for this habit on this date
    const existingCheckIn = await prisma.checkIn.findUnique({
      where: {
        habitId_date: {
          habitId,
          date: checkInDate,
        },
      },
    })

    let checkIn

    if (existingCheckIn) {
      // Update existing check-in
      checkIn = await prisma.checkIn.update({
        where: { id: existingCheckIn.id },
        data: {
          completed,
          notes: notes || null,
        },
      })
    } else {
      // Create new check-in
      checkIn = await prisma.checkIn.create({
        data: {
          habitId,
          date: checkInDate,
          completed,
          notes: notes || null,
        },
      })
    }

    return NextResponse.json(checkIn, { status: 201 })
  } catch (error) {
    console.error('Error creating/updating check-in:', error)
    return NextResponse.json(
      { error: 'Failed to create/update check-in' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/check-ins
 * Fetch check-ins for a habit within a date range
 * Query params: habitId, startDate, endDate
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const habitId = searchParams.get('habitId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!habitId) {
      return NextResponse.json(
        { error: 'habitId is required' },
        { status: 400 }
      )
    }

    // Build date filter
    const where: any = { habitId }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    // Fetch check-ins
    const checkIns = await prisma.checkIn.findMany({
      where,
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(checkIns)
  } catch (error) {
    console.error('Error fetching check-ins:', error)
    return NextResponse.json(
      { error: 'Failed to fetch check-ins' },
      { status: 500 }
    )
  }
}
