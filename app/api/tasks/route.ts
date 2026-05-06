import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/mongodb'
import Task from '@/models/Task'
import Project from '@/models/Project'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    await dbConnect()

    let query = {}
    if (projectId) {
      query = { project: projectId }
    } else {
      // Get tasks from user's projects
      const projects = await Project.find({
        $or: [
          { owner: session.user?.id },
          { members: session.user?.id }
        ]
      })
      const projectIds = projects.map(p => p._id)
      query = { project: { $in: projectIds } }
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('project', 'name')
      .sort({ createdAt: -1 })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, project, assignedTo, priority, dueDate } = await request.json()

    if (!title || !project) {
      return NextResponse.json({ error: 'Title and project are required' }, { status: 400 })
    }

    await dbConnect()

    // Check if user has access to the project
    const projectDoc = await Project.findById(project)
    if (!projectDoc || (projectDoc.owner.toString() !== session.user?.id && !projectDoc.members.includes(session.user?.id))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const task = new Task({
      title,
      description,
      project,
      assignedTo,
      priority: priority || 'Medium',
      dueDate,
    })

    await task.save()

    // Add task to project
    await Project.findByIdAndUpdate(project, { $push: { tasks: task._id } })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}