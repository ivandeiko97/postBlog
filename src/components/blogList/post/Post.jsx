import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../../../secondaryFunc';
import InputPost from './InputPost';
import './post.css';

export default class Post extends Component {
  state = {
    editTitle: false,
    editBody: false,
    title: this.props.title,
    body: this.props.body,
  }

  changeEditMode = ({ target }) => {
    if (target.dataset.edit === undefined) return
    switch (target.dataset.edit) {
      case 'title': 
        this.setState({
          editTitle: true,
        });
        break;
      case 'body': 
        this.setState({
          editBody: true,
        });
        break;
      default:
    };
  };
  
  deleteHandler = () => {
    fetch(`https://bloggy-api.herokuapp.com/posts/${this.props.id}`, {
      method: 'DELETE',
    })
      .then(data => this.props.load())
  }

  changeHandler = ({ target }) => {
    switch (target.dataset.editinput) {
      case 'title':
        this.setState({
          title: target.value,
        });
        break;
      case 'body':
        this.setState({
          body: target.value,
        });
        break;
      default:
    };
  };

  closeHandler = ({ target }) => {
    switch (target.dataset.close) {
      case 'title': 
        this.setState({
          editTitle: false,
        })
        break;
      case 'body': 
        this.setState({
          editBody: false,
        })
        break;
      default:
    }
  }

  saveHandler = ({ target }) => {
    const {title, body} = this.state;
    const {id, load} = this.props;
    let changed = {
      title: title,
      body: body,
    };
    switch (target.dataset.save) {
      case 'title':
        fetchData(id, changed, load)
        this.setState({
          editTitle: false,
        })
        break;
      case 'body': {
        fetchData(id, changed, load)
        this.setState({
          editBody: false,
        })
        break;
      }
      default:
    };
  };

  render() {
    const {title, body, editTitle, editBody} = this.state;
    return (
      <section onClick={this.changeEditMode} onChange={this.changeHandler} className="post">
        <span onClick={this.deleteHandler} className="post-delete">&times;</span>
        {
          editTitle
            ?
              <InputPost text={title} input='title' onSave={this.saveHandler} onClose={this.closeHandler} />
            :
              <h1 className="post-title">
                { title }
                <span data-edit="title" className="post-edit"> edit</span>
              </h1>
        }

        {
          editBody
            ?
              <InputPost text={body} input='body' onSave={this.saveHandler} onClose={this.closeHandler} />
            :
              <p className="post-body">
                { body }
                <span data-edit="body" className="post-edit"> edit</span>
              </p>
        }
        <Link to={`/posts/${this.props.id}/`} className="post-view">View details</Link>
      </section>
    )
  }
}

