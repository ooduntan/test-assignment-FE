import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BookList from './BookList';
import { getBooks } from '../../../actions/bookActions';

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: bindActionCreators(getBooks, dispatch),
  };
};

const mapStateToProps = ({books: { books}}) => {
  return {
    books,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
