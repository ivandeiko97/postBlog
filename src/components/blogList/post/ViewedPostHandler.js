import { connect } from 'react-redux';
import ViewedPost from './ViewedPost';
import { fetchPostAction } from '../../../redux/action';

function mapStateToProps({ viewedPost }, ownProps) {
  return {
    viewedPost,
    id: ownProps.match.params.id,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    load: id => dispatch(fetchPostAction(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewedPost);
