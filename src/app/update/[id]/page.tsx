'use client'

import {useParams, useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

type TopicData = {
  id: number
  title: string
  body: string
}

export default function Update() {
  const router = useRouter()
  const params = useParams()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const id = params.id

  const refresh = useCallback(async (): Promise<void> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`)
    const topic: TopicData = await res.json()

    setTitle(topic.title)
    setBody(topic.body)
  }, [id])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()

        const form = e.currentTarget
        const title = (form.elements.namedItem('title') as HTMLInputElement)
          .value
        const body = (form.elements.namedItem('body') as HTMLTextAreaElement)
          .value

        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, body}),
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
          options,
        )
        const topic: TopicData = await res.json()
        router.push(`/read/${topic.id}`)
        router.refresh()
      }}>
      <h2>Update</h2>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          onChange={e => setBody(e.target.value)}
          value={body}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  )
}
