import React, { Component } from 'react';
import { fetchData } from '../../../secondaryFunc';
import InputPost from './InputPost';
import CommentListHandler from '../../comments/CommentListHandler';
import { Link } from 'react-router-dom';

export default class ViewedPost extends Component {
  state = {
    editTitle: false,
    editBody: false,
    title: null,
    body: null,
    deleted: false,
  }

  componentDidMount() {
    this.props.load(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.viewedPost.title,
      body: nextProps.viewedPost.body,
    })
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
  
  deleteHandler = () => {
    fetch(`https://bloggy-api.herokuapp.com/posts/${this.props.id}`, {
      method: 'DELETE',
    })
      this.setState({
        deleted: true,
      })
  }
  
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
    const {title, body, editTitle, editBody, deleted} = this.state;
    const { viewedPost, id } = this.props;
    if (viewedPost && !deleted) {
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
          <CommentListHandler comments={viewedPost.comments} postId={id} />
        </section>
      )
    } else if (deleted) {
      return (
        <div className="deleted">
          <h1 className="deleted-message">This post is deleted</h1>
          <Link to="/" className="deleted-back">Back to posts</Link>
        </div>
      )
    } 
    return (
      <div className="preloader">
        <div className="preloader-1"></div>
        <div className="preloader-2"></div>
        <div className="preloader-3"></div>
      </div>
    )
  }
}

