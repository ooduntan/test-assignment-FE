import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BookList from './BookList';
import { getBooks, selectedBook, editBook } from '../../../actions/bookActions';

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: bindActionCreators(getBooks, dispatch),
    selectedBook: bindActionCreators(selectedBook, dispatch),
    editBook: bindActionCreators(editBook, dispatch),
  };
};

const mapStateToProps = ({books: { books}}) => {
  return {
    books,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
