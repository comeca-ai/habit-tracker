import { Dashboard } from '@/components/habits/Dashboard'
import { Toaster } from 'sonner'

/**
 * Home Page
 * Main entry point for the habit tracker application
 * Displays the dashboard with all habits and features
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Dashboard />
      </div>
      <Toaster position="bottom-right" />
    </main>
  )
}
