import * as actionTypes from './actionTypes';
import {apiRequest} from '../networkBroker';
import apiUrl from '../constants/apiUrl'

export function getBooksFailed() {
  return {
    type: actionTypes.GETTING_BOOKS_FAILED,
    data: {
      loadingBooks: false,
      bookError: true
    }
  };
}

export function gettingBooks() {
  return {
    type: actionTypes.GETTING_BOOKS,
    payload: {
      loadingBooks: true,
    }
  };
}

export function getBooksSuccessful(books) {
  return {
    type: actionTypes.GETTING_BOOKS_SUCCESSFUL,
    payload: {
      books,
      loadingBooks: false
    }
  };
}

function getCategoriesSuccessful(booksCategories) {
  return {
    type: actionTypes.GETTING_BOOKS_SUCCESSFUL,
    payload: {
      booksCategories,
      loadingBooks: false
    }
  };
}

function addNewBook(newBook) {
  return {
    type: actionTypes.ADD_NEW_BOOK,
    payload: {
      newBook,
      loadingBooks: false
    }
  };
}

export function createNewBook(bookData) {
  return (dispatch) => {
    dispatch(gettingBooks());
    return apiRequest(bookData, 'post', apiUrl.createNewBook())
      .then((apiResult) => {
        return dispatch(addNewBook(apiResult.data.book));
      })
      .catch(() => {
        return dispatch(getBooksFailed());
      });
  };
}

export function getBooks() {
  return (dispatch) => {
    dispatch(gettingBooks());
    return apiRequest(null, 'get', apiUrl.getBooks())
      .then((apiResult) => {
        return dispatch(getBooksSuccessful(apiResult.data.books));
      })
      .catch(() => {
        return dispatch(getBooksFailed());
      });
  };
}

export function getCategories() {
  return (dispatch) => {
    dispatch(gettingBooks());
    return apiRequest(null, 'get', apiUrl.categories())
      .then((apiResult) => {
        return dispatch(getCategoriesSuccessful(apiResult.data.categories));
      })
      .catch(() => {
        return dispatch(getBooksFailed());
      });
  };
}
