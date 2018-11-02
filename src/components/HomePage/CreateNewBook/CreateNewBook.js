import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { browserHistory } from "react-router";
import autoBind from "auto-bind";

class CreateNewBook extends Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      name: "",
      isbn: "",
      author: "",
      numberOfBooks: "0",
      datePublished: "",
      category: "",
      numberOfBooksIssued: "0",
      nameValidation: null,
      datePublishedValidation: null,
      authorValidation: null,
      numberOfBooksIssuedValidation: null,
      numberOfBooksValidation: null,
      errorMessage: '',
    };
  }

  componentWillMount() {
    this.props.getCategories();
  }

  createBook(e) {
    e.preventDefault();
    const {
      name,
      isbn,
      author,
      numberOfBooks,
      datePublished,
      category,
      numberOfBooksIssued,
      nameValidation,
      datePublishedValidation,
      authorValidation,
      numberOfBooksIssuedValidation,
      numberOfBooksValidation
    } = this.state;
    if (
      nameValidation === "success" &&
      datePublishedValidation === "success" &&
      authorValidation === "success" &&
      numberOfBooksIssuedValidation === "success" &&
      numberOfBooksValidation === "success"
    ) {
      this.props.createNewBook({
        name,
        isbn,
        author,
        numberOfBooks,
        datePublished,
        category,
        numberOfBooksIssued
      }).then(() => {
        this.refs.createForm.reset();
        browserHistory.push("/");
      })
    } else {
      this.setState({
        errorMessage: "This form is not filled correctly"
      });
    }
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState({...change, errorMessage: ''});
  }

  validateInput(e) {
    let change = {};
    change[`${e.target.name}Validation`] = !!e.target.value
      ? "success"
      : "error";
    this.setState(change);
  }

  render() {
    const { booksCategories, loadingBooks } = this.props;
    const {
      name,
      author,
      isbn,
      datePublished,
      numberOfBooks,
      numberOfBooksIssued,
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
        <h3>Create New Book</h3>
        <form onSubmit={this.createBook} ref="createForm">
         {!!errorMessage && (<p className="alert alert-danger">{errorMessage}</p>)}
          <FormGroup controlId="formBasicText" validationState={nameValidation}>
            <ControlLabel>Book Name</ControlLabel>
            <FormControl
              type="text"
              value={name}
              name="name"
              onBlur={this.validateInput}
              placeholder="Enter Name"
              onChange={this.handleChange}
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
              value={author}
              onBlur={this.validateInput}
              name="author"
              placeholder="Enter Author name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="formBasicText" validationState={isbnValidation}>
            <ControlLabel>Book ISBN Code</ControlLabel>
            <FormControl
              type="text"
              value={isbn}
              onBlur={this.validateInput}
              name="isbn"
              placeholder="Enter ISBN Code"
              onChange={this.handleChange}
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
              value={numberOfBooks}
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
              type="date"
              value={datePublished}
              onBlur={this.validateInput}
              name="datePublished"
              placeholder="Publish date"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Book Categories</ControlLabel>
            <FormControl
              componentClass="select"
              name="category"
              onChange={this.handleChange}
              placeholder="select"
            >
              <option value="select">select</option>
              {booksCategories.map(eachCategories => (
                <option key={eachCategories._id} value={eachCategories._id}>
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
              name="numberOfBooksIssued"
              value={numberOfBooksIssued}
              onBlur={this.validateInput}
              placeholder="Number of Books Issued"
              onChange={this.handleChange}
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

export default CreateNewBook;
