import { connect } from 'react-redux';
import Post from './Post';
import {fetchDataAction} from '../../../redux/action';

function mapStateToProps(state, ownProps) {
  const {title, body, id} = ownProps.post;
  return {
    title,
    body,
    id,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(fetchDataAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
