import {
  findIndex,
  clone
} from 'lodash';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  books: [],
  loadingBooks: false,
  booksError: false,
  selectedBook: {},
  booksCategories: []
};

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GETTING_BOOKS:
      return Object.assign({}, state, action.payload);
    case actionTypes.GETTING_BOOKS_CATEGORIES_SUCCESSFUL:
      return { ...state,
        ...action.payload
      };
    case actionTypes.GETTING_BOOKS_SUCCESSFUL:
      return Object.assign({}, state, action.payload);
    case actionTypes.GETTING_BOOKS_FAILED:
      return Object.assign({}, state, action.payload);
    case actionTypes.ADD_NEW_BOOK:
      return { ...state,
        books: [...state.books, action.payload.newBook],
        loadingBooks: false,
      };
    case actionTypes.UPDATE_SELECTED_BOOK:
      return { ...state,
        selectedBook: action.payload.selectedBook,
      };
    case actionTypes.UPDATE_NEW_BOOK:
      const newBookIndex = findIndex(state.books, eachBook => eachBook._id === action.payload.newBook._id)
      const bookClone = clone(state.books)
      bookClone[newBookIndex] = action.payload.newBook;

      return Object.assign({}, state, {
        books: bookClone,
        selectedBook: action.payload.newBook,
        loadingBooks: false
      })
    default:
      return state;
  }
}
