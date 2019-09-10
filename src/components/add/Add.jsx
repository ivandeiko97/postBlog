import React, { Component } from 'react';
import './add.css';

export default class Add extends Component {
  state = {
    title: '',
    body: '',
    error: false,
    added: false,
  }

  titleInput = React.createRef();
  bodyInput = React.createRef();

  inputHandler = ({ target }) => {
    switch (target.dataset.addinput) {
      case 'title':
        this.setState({
          title: target.value,
        });
        break;
      case 'body': 
        this.setState({
          body: target.value,
        })
        break;
      default:
    }
  }
  
  clickHandler = () => {
    this.setState({
      added: false,
    })
  }

  addHandler = () => {
    const {title, body} = this.state;

    if (title.trim() !== '' && body.trim() !== '') {
      const postBody = {
        title: title,
        body: body,
      }

      fetch('https://bloggy-api.herokuapp.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      });

      this.titleInput.current.value = '';
      this.bodyInput.current.value = '';
      this.setState({
        body: '',
        value: '',
        error: false,
        added: true,
      })
      
    } else {
        this.setState({
          error: true,
        })
    };
  }
  
  render() {
    const {title, body, error, added} = this.state;
    return (
      <section className="add">
        <div className={`${added ? 'addedPost' : 'hidden'}`}>
          <p className="added-p">Post is added</p>
          <button onClick={this.clickHandler} className="added-ok">Ok</button>
        </div>
        <form className="add-form" onChange={this.inputHandler}>
          <input 
            type="text" 
            className={`add-input ${error && title.trim() === '' ? 'error' : ''}`}
            data-addinput="title" 
            placeholder="title" 
            defaultValue={title}
            ref={this.titleInput}
          />
          <input 
            type="text" 
            className={`add-input ${error && body.trim() === '' ? 'error' : ''}`}
            data-addinput="body" 
            placeholder="body"
            ref={this.bodyInput}
            defaultValue={body} />
        </form>
        <button onClick={this.addHandler} className="add-btn">Add</button>
      </section>

    )
  }
}
