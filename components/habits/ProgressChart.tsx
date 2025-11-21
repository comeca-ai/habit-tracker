'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { calculateCompletionPercentage } from '@/lib/habits'

interface ProgressChartProps {
  habit: any
  chartType?: 'bar' | 'line'
}

/**
 * ProgressChart Component
 * Displays habit completion data in a chart format
 * Shows 30-day completion history with visual representation
 */
export function ProgressChart({
  habit,
  chartType = 'bar',
}: ProgressChartProps) {
  // Prepare data for chart - last 30 days
  const data = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    // Find check-in for this date
    const checkIn = habit.checkIns?.find((ci: any) => {
      const ciDate = new Date(ci.date)
      ciDate.setHours(0, 0, 0, 0)
      return ciDate.getTime() === date.getTime()
    })

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: checkIn?.completed ? 1 : 0,
      fullDate: date.toISOString().split('T')[0],
    })
  }

  // Calculate weekly completion
  const weeklyData = []
  for (let week = 3; week >= 0; week--) {
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - week * 7)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const weekCheckIns = habit.checkIns?.filter((ci: any) => {
      const ciDate = new Date(ci.date)
      ciDate.setHours(0, 0, 0, 0)
      return ciDate >= weekStart && ciDate <= weekEnd
    }) || []

    const completed = weekCheckIns.filter((ci: any) => ci.completed).length
    const percentage = Math.round((completed / 7) * 100)

    weeklyData.push({
      week: `Week ${4 - week}`,
      completion: percentage,
    })
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">30-Day Progress</h3>
        <p className="text-sm text-muted-foreground">
          Track your habit completion over the last month
        </p>
      </div>

      {/* Daily Chart */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-4">Daily Completion</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval={Math.floor(data.length / 7)}
            />
            <YAxis domain={[0, 1]} hide />
            <Tooltip
              formatter={(value) => (value === 1 ? 'Completed' : 'Missed')}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar
              dataKey="completed"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Chart */}
      <div>
        <h4 className="text-sm font-medium mb-4">Weekly Completion Rate</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value) => `${value}%`}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', r: 5 }}
              activeDot={{ r: 7 }}
              name="Completion %"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.filter((d) => d.completed === 1).length}
          </div>
          <p className="text-xs text-muted-foreground">Days Completed</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(
              (data.filter((d) => d.completed === 1).length / data.length) * 100
            )}
            %
          </div>
          <p className="text-xs text-muted-foreground">Completion Rate</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {data.filter((d) => d.completed === 0).length}
          </div>
          <p className="text-xs text-muted-foreground">Days Missed</p>
        </div>
      </div>
    </Card>
  )
}
