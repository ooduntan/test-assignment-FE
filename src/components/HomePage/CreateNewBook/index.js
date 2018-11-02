import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreateNewBook from './CreateNewBook';
import { createNewBook, getCategories } from '../../../actions/bookActions';

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: bindActionCreators(createNewBook, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch),
  };
};

const mapStateToProps = ({books: { booksCategories, loadingBooks }}) => {
  return {
    booksCategories,
    loadingBooks,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewBook);
