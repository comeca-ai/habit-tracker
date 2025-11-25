'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { CreateHabitInput } from '@/types/habit'

interface CreateHabitDialogProps {
  onCreateHabit: (habit: CreateHabitInput) => void
  isLoading?: boolean
}

/**
 * CreateHabitDialog Component
 * Modal dialog for creating a new habit
 * Allows user to:
 * - Enter habit name and description
 * - Select category
 * - Choose color and icon
 * - Set frequency and goal
 */
export function CreateHabitDialog({
  onCreateHabit,
  isLoading = false,
}: CreateHabitDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'health',
    color: 'blue',
    icon: 'target',
    frequency: 'daily',
    goal: 1,
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name.trim()) {
      alert('Por favor, digite o nome do hábito')
      return
    }

    // Call parent handler
    await onCreateHabit(formData)

    // Reset form and close dialog
    setFormData({
      name: '',
      description: '',
      category: 'health',
      color: 'blue',
      icon: 'target',
      frequency: 'daily',
      goal: 1,
    })
    setOpen(false)
  }

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'goal' ? parseInt(value) : value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Hábito
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Hábito</DialogTitle>
          <DialogDescription>
            Comece a construir um novo hábito hoje. Preencha os detalhes abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Hábito *</Label>
            <Input
              id="name"
              name="name"
              placeholder="ex: Exercício Matinal"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Descrição opcional do seu hábito"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                handleSelectChange('category', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Saúde</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="learning">Aprendizado</SelectItem>
                <SelectItem value="productivity">Produtividade</SelectItem>
                <SelectItem value="mindfulness">Mindfulness</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="finance">Finanças</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Cor</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => handleSelectChange('color', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Azul</SelectItem>
                <SelectItem value="green">Verde</SelectItem>
                <SelectItem value="purple">Roxo</SelectItem>
                <SelectItem value="orange">Laranja</SelectItem>
                <SelectItem value="red">Vermelho</SelectItem>
                <SelectItem value="pink">Rosa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) =>
                handleSelectChange('frequency', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Diariamente</SelectItem>
                <SelectItem value="weekly">Semanalmente</SelectItem>
                <SelectItem value="monthly">Mensalmente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <Label htmlFor="goal">Meta Diária</Label>
            <Input
              id="goal"
              name="goal"
              type="number"
              min="1"
              value={formData.goal}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? 'Criando...' : 'Criar Hábito'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
