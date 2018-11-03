import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { browserHistory } from "react-router";
import { isEqual } from 'lodash';
import autoBind from "auto-bind";
import moment from "moment";

class EditBook extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      selectedBook: this.props.selectedBook,
      errorMessage: ''
    };
  }

  componentWillMount() {
    this.props.getCategories();
  }

  componentDidMount() {
    if (!Object.keys(this.state.selectedBook).length) {
      browserHistory.push('/');
    }
  }

  componentWillReceiveProps(nextProps, props) {
    if (!isEqual(nextProps.selectedBook, props.selectedBook)) {
      this.setState({selectedBook: nextProps.selectedBook,})
    }
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState({...change, errorMessage: ''});
  }

  getSelectedBook(books) {
    const selectedBook = books[this.props.params.bookIndex] || {};
    this.setState({ selectedBook });
  }

  updateBook(e) {
    e.preventDefault()
    const {category, selectedBook: {_id, numberOfBooks, numberOfBooksIssued } } = this.state;
    const { selectedBook } = this.props;
    const categoryUpdated = category && selectedBook.category._id.toString() !== category;
    let newBookData = {numberOfBooks, id: _id};
    let issuedValue = category === '1' ? 1 : -1;

    if (categoryUpdated && numberOfBooks > (numberOfBooksIssued + issuedValue)) {
      newBookData = { ...newBookData, category, numberOfBooksIssued: (numberOfBooksIssued + issuedValue) }
      this.props.editBook(newBookData);
    } else if(categoryUpdated && numberOfBooks <= (numberOfBooksIssued + issuedValue)) {
      this.setState({errorMessage: 'Number of Books Issued is terribly low'})
    }
  }

  render() {
    const { booksCategories, loadingBooks, selectedBook } = this.props;

    const {
      nameValidation,
      authorValidation,
      isbnValidation,
      datePublishedValidation,
      numberOfBooksIssuedValidation,
      numberOfBooksValidation,
      errorMessage
    } = this.state;

    return (
      <div className="newBook">
        <h3>Edit Book</h3>
        <form onSubmit={this.updateBook} ref="editForm">
          {!!errorMessage && (
            <p className="alert alert-danger">{errorMessage}</p>
          )}
          <FormGroup controlId="formBasicText" validationState={nameValidation}>
            <ControlLabel>Book Name</ControlLabel>
            <FormControl
              type="text"
              disabled
              value={selectedBook.name}
              name="name"
              placeholder="Enter Name"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
            validationState={authorValidation}
          >
            <ControlLabel>Author name</ControlLabel>
            <FormControl
              type="text"
              disabled
              value={selectedBook.author}
              name="author"
              placeholder="Enter Author name"
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="formBasicText" validationState={isbnValidation}>
            <ControlLabel>Book ISBN Code</ControlLabel>
            <FormControl
              type="text"
              disabled
              value={selectedBook.isbn}
              name="isbn"
              placeholder="Enter ISBN Code"
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={numberOfBooksValidation}
          >
            <ControlLabel>Number of Books</ControlLabel>
            <FormControl
              type="number"
              value={selectedBook.numberOfBooks}
              name="numberOfBooks"
              onBlur={this.validateInput}
              placeholder="Number of Books"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={datePublishedValidation}
          >
            <ControlLabel>Publish date</ControlLabel>
            <FormControl
              type="text"
              value={moment(selectedBook.datePublished).format("DD/MM/YYYY")}
              disabled
              name="datePublished"
              placeholder="Publish date"
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Book Categories</ControlLabel>
            <FormControl
              componentClass="select"
              name="category"
              onChange={this.handleChange}
              defaultValue={selectedBook.category ? selectedBook.category._id : ''}
              placeholder="select"
            >
              <option value="select">select</option>
              {booksCategories.map(eachCategories => (
                <option
                  selected={selectedBook.category._id === eachCategories._id}
                  key={eachCategories._id}
                  value={eachCategories._id}
                >
                  {eachCategories.category}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
            validationState={numberOfBooksIssuedValidation}
          >
            <ControlLabel>Number of Books Issued</ControlLabel>
            <FormControl
              type="number"
              disabled
              name="numberOfBooksIssued"
              value={selectedBook.numberOfBooksIssued}
              placeholder="Number of Books Issued"
            />
            <FormControl.Feedback />
          </FormGroup>

          <Button
            className={loadingBooks ? "createBookButton" : ""}
            type="submit"
          >
            Submit
          </Button>
          {loadingBooks && <div className="loader" />}
        </form>
      </div>
    );
  }
}

export default EditBook;
