import { connect } from 'react-redux';
import CommentList from './CommentList.jsx';
import { fetchPostAction } from '../../redux/action.js';

function mapStateToProps(state, {comments, postId}) {
  return {
    comments,
    postId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    load: id => dispatch(fetchPostAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
