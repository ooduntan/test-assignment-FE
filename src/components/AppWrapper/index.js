import React, { Component } from 'react';
import Header from './Header';
import './App.css';
import BookList from './BookList/';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Header/>
        <BookList/>
        {children}
      </div>
    );
  }
}

export default App;
