export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POST = 'LOAD_POST';

export function fetchDataAction() {
  return (dispatch) => {
    fetch('https://bloggy-api.herokuapp.com/posts')
      .then(data => data.json())
      .then(data => dispatch(loadPostsAction(data)))
  };
};

export function fetchPostAction(id) {
  return (dispatch) => {
    fetch(`https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`)
      .then(data => data.json())
      .then(data => dispatch(loadPostAction(data)))
  }
}

function loadPostsAction(posts) {
  return {
    type: LOAD_POSTS,
    posts,
  }
}

function loadPostAction(post) {
  return {
    type: LOAD_POST,
    post,
  }
}
