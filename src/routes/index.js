import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppWrapper from '../components/AppWrapper';
import CreateBook from '../components/HomePage/CreateNewBook';
import EditBook from '../components/HomePage/EditBook';

export default(
  <Route path='/' component={AppWrapper}>
    <IndexRoute/>
    <Route path="create_new_book" component={CreateBook}/>
    <Route path="edit_book/:bookIndex" component={EditBook}/>
  </Route>
);
