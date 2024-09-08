'use client'

type TopicData = {
  id: string
  title: string
  body: string
}

import {useRouter} from 'next/navigation'

export default function Create() {
  const router = useRouter()

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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, body}),
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, options)
          .then(res => res.json())
          .then((res: TopicData) => {
            const lastId = res.id

            router.push(`/read/${lastId}`)
          })
      }}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  )
}
