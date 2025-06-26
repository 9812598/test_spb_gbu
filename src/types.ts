export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type TaskFilter = 'date' | 'undone' | 'done' | 'not_set'
