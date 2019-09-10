import {LOAD_POSTS, LOAD_POST } from './action';

const initialState = {
  posts: null,
  viewedPost: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_POSTS:
      return {
        posts: action.posts,
      };
    case LOAD_POST: 
      return {
        viewedPost: action.post,
      }
    default:
      return state;
  };
};