import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed_count
      FROM todos 
      GROUP BY DATE(created_at) 
      ORDER BY DATE(created_at) DESC
    `)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch dates' }, { status: 500 })
  }
}