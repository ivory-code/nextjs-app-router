interface Props {
  params: {id: string}
}

type TopicData = {
  id: number
  title: string
  body: string
}

export default async function Read(props: Props) {
  const id = props.params.id
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
    cache: 'no-cache',
  })
  const topic: TopicData = await res.json()

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  )
}
