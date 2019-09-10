import React, { Component } from 'react'
import PostHandler from './post/PostHandler';

export default class PostList extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    const { posts } = this.props;
    if (posts) {
      return (
        <div>
          {posts.map(post => <PostHandler key={post.id} post={post} />)}
        </div>
      )
    };
    
    return (
      <div className="preloader">
        <div className="preloader-1"></div>
        <div className="preloader-2"></div>
        <div className="preloader-3"></div>
      </div>
    )
  };
};
