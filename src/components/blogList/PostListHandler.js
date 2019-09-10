import { connect } from 'react-redux';
import PostList from './PostList';
import { fetchDataAction } from '../../redux/action';

function mapStateToProps({ posts }) {
  return {
    posts,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    load: () =>  dispatch(fetchDataAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
