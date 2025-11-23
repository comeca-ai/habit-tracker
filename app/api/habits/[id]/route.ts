import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET /api/habits/[id]
 * Fetch a specific habit with all its check-ins and badges
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const habit = await prisma.habit.findUnique({
      where: { id },
      include: {
        checkIns: {
          orderBy: { date: 'desc' },
        },
        badges: {
          orderBy: { earnedAt: 'desc' },
        },
      },
    })

    if (!habit) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(habit)
  } catch (error) {
    console.error('Error fetching habit:', error)
    return NextResponse.json(
      { error: 'Failed to fetch habit' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/habits/[id]
 * Update a habit
 * Body: { name?, description?, category?, color?, icon?, frequency?, goal? }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params

    // Update habit with provided fields
    const habit = await prisma.habit.update({
      where: { id },
      data: body,
      include: {
        checkIns: true,
        badges: true,
      },
    })

    return NextResponse.json(habit)
  } catch (error) {
    console.error('Error updating habit:', error)
    return NextResponse.json(
      { error: 'Failed to update habit' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/habits/[id]
 * Delete a habit and all its associated check-ins and badges
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Delete habit (cascades to check-ins and badges)
    await prisma.habit.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting habit:', error)
    return NextResponse.json(
      { error: 'Failed to delete habit' },
      { status: 500 }
    )
  }
}
