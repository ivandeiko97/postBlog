import React from 'react';

export default function InputPost(props) {
  const {
    text,
    input,
    onSave,
    onClose,
  } = props;

  return (
    <div className="post-inputWrapper">
      <input type="text" className="post-input" data-editinput={input} defaultValue={text} />
      <div className="post-control">
        <button onClick={(event) => onSave(event)} data-save={input} className="post-save">save</button>
        <button onClick={onClose} data-close={input} className="post-close">close</button>
      </div>
    </div>
  )
}
