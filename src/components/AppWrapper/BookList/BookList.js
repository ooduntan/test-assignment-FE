import React, { Component } from "react";
import { browserHistory } from "react-router";
import moment from 'moment';
import {
  PageHeader,
  ListGroupItem,
  ListGroup,
  ButtonToolbar,
  Button,
  Table
} from "react-bootstrap";

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      bookSelected: false
    };
  }
  componentWillMount() {
    this.props.getBooks();
  }

  render() {
    const { books } = this.props;
    const { bookSelected } = this.state;
    return (
      <div className="container">
        <PageHeader>Book List</PageHeader>
        <ListGroup>
          {books.length < 1 && <ListGroupItem>No book available</ListGroupItem>}

          {books.length > 1 && (
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>ISBN CODE</th>
                  <th>Number of Books</th>
                  <th>Date Published</th>
                  <th>Category</th>
                  <th>Number of Books Issued</th>
                </tr>
              </thead>
              <tbody>
                {books.map((eachBooks, index) => {
                  return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{eachBooks.name}</td>
                    <td>{eachBooks.author}</td>
                    <td>{eachBooks.isbn}</td>
                    <td>{eachBooks.numberOfBooks}</td>
                    <td>{ moment(eachBooks.datePublished).format('YYYY-MM-DD hh:mm')}</td>
                    <td>{eachBooks.category.category ? eachBooks.category.category : eachBooks.category === 1 ? 'Return' : 'Issue'  }</td>
                    <td>{eachBooks.numberOfBooksIssued}</td>
                  </tr>
                )})}
              </tbody>
            </Table>
          )}
        </ListGroup>
        <div>
          <ButtonToolbar>
            <Button onClick={() => browserHistory.push("create_new_book")}>
              Add New Book
            </Button>
            {bookSelected && (
              <ButtonToolbar>
                <Button>Edit Selected Book</Button>
                <Button bsStyle="danger">Delete Selected Book</Button>
              </ButtonToolbar>
            )}
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default BookList;
