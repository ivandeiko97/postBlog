import React from 'react'

export default function Comment({ comment }) {
  return (
    <section>
      <h1>Anonym</h1>
      <p>{comment.body}</p>
    </section>
  )
}
