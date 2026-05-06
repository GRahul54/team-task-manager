import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import User from '@/models/User'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const projects = await Project.find({
      $or: [
        { owner: session.user?.id },
        { members: session.user?.id }
      ]
    }).populate('owner', 'name email').populate('members', 'name email')

    return NextResponse.json(projects)
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

    const { name, description, members } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }

    await dbConnect()

    const project = new Project({
      name,
      description,
      owner: session.user?.id,
      members: members || [],
    })

    await project.save()

    // Add project to owner's projects
    await User.findByIdAndUpdate(session.user?.id, { $push: { projects: project._id } })

    // Add project to members' projects
    if (members && members.length > 0) {
      await User.updateMany({ _id: { $in: members } }, { $push: { projects: project._id } })
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}