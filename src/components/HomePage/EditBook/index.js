import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EditBook from './EditBook';
import { getCategories, editBook } from '../../../actions/bookActions';

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: bindActionCreators(getCategories, dispatch),
    editBook: bindActionCreators(editBook, dispatch),
  };
};

const mapStateToProps = ({books: { booksCategories, loadingBooks, books, selectedBook }}) => {
  return {
    books,
    booksCategories,
    selectedBook,
    loadingBooks,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
