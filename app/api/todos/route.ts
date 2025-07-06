import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    let query = 'SELECT * FROM todos'
    let params: any[] = []
    
    if (date) {
      query += ' WHERE DATE(created_at) = ?'
      params.push(date)
    }
    
    query += ' ORDER BY priority DESC, created_at DESC'
    
    const [rows] = await db.execute(query, params)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, priority = 1 } = await request.json()
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const [result] = await db.execute(
      'INSERT INTO todos (text, priority) VALUES (?, ?)',
      [text, priority]
    )
    
    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}