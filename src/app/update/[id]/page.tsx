'use client'

import {useParams, useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

export default function Update() {
  const router = useRouter()
  const params = useParams()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const id = params.id

  const refresh = useCallback(async (): Promise<void> => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`)
      .then(res => res.json())
      .then(res => {
        setTitle(res.title)
        setBody(res.body)
      })
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
        const topic = await res.json()
        router.push(`/read/${topic.id}`)
        router.refresh()
      }}>
      <h2>Update</h2>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  )
}
