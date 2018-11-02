export default {
  baseUrl: 'http://localhost:3000/api',
  createNewBook() { return `${this.baseUrl}/books/create` },
  getBooks() { return `${this.baseUrl}/books/fetch_all` },
  categories() { return `${this.baseUrl}/books/category` }
}
