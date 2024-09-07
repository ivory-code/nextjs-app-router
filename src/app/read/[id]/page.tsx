interface Props {
  params: {id: string}
}

export default function Read(props: Props) {
  return (
    <>
      <h2>Read!!</h2>
      parameters: {props.params.id}
    </>
  )
}
