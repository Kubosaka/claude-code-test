import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    
    const [rows] = await db.execute('SELECT * FROM todos WHERE id = ?', [id])
    const todos = rows as any[]
    
    if (todos.length === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    const currentTodo = todos[0]
    
    if (body.priority !== undefined) {
      await db.execute(
        'UPDATE todos SET priority = ? WHERE id = ?',
        [body.priority, id]
      )
    } else {
      const newCompleted = !currentTodo.completed
      await db.execute(
        'UPDATE todos SET completed = ? WHERE id = ?',
        [newCompleted, id]
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    await db.execute('DELETE FROM todos WHERE id = ?', [id])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}