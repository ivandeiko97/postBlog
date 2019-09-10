import React, { useState } from 'react';
import Comment from './comment/Comment';

export default function CommentList({comments, postId, load}) {
  const [body, setBody] = useState('');
  function changeTextArea({ target }) {
    setBody(target.value)
  }

  let textAreaRef = React.createRef();
  
  function addCommentHandler() {
    const commentBody = {
      body: body,
      postId: +postId,
    }

    fetch('https://bloggy-api.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentBody)
    })
      .then(data => data.json())
      .then(data => load(postId))
      textAreaRef.current.value = '';
      setBody('');
  };

  return (
    <div className="commentList">
      {
        comments.length === 0 
        ? 
          <p className="commentList-noCom">No cooments</p> 
        : 
          comments.map(comment => <Comment key={comment.id} comment={comment} />)}

      <div className="commentList-addWrapper">
        <textarea
          className="commentList-textarea"
          ref={textAreaRef} 
          defaultValue={body} 
          placeholder="comment write here" 
          onChange={changeTextArea}
        />
        <button
          className="commentList-add"
          onClick={addCommentHandler} 
          disabled={body.trim() === ''}
        >
          Add Comment
        </button>
      </div>
    </div>
  )
}
