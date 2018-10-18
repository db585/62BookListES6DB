// Define Book class
class Book {
  constructor (title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

// Define UI class and its methods
class UI {
  addBookList (book) {
    const list = document.querySelector('#db-book-list')

    // Create tr element
    const row = document.createElement('tr')

    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `

    // Append row it to list
    list.appendChild(row)
  }

  deleteBook (target) {
    // console.log('deleteBook() executing...')

    // If the target is X anchor remove li element
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFields () {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }

  showMsg (msg, className) {
    const message = document.createElement('div')
    message.className = `db-message ${className}`
    message.appendChild(document.createTextNode(msg))

    // Get parent
    const container = document.querySelector('.container')
    // Get form
    const form = document.querySelector('#db-book-form')
    // Insert into container and before form element
    container.insertBefore(message, form)

    // Disappear in 3 seconds
    setTimeout(() => {
      document.querySelector('.db-message').remove()
    }, 3000)
  }
}

// Define Store class to store data in LocalStorage
class Storage {
  static getBooks () {
    let books = []
    let booksLS = window.localStorage.getItem('books')

    // If books is not null then get books element from LS to books arr
    if (booksLS !== null) {
      books = JSON.parse(booksLS)
    }

    return books
  }

  static displayBooks () {
    // Get books object from LS as an array
    const books = Storage.getBooks()

    // Make lis from books arr
    books.forEach(book => {
      const ui = new UI()

      // Add book to the list
      ui.addBookList(book)
    })
  }

  // Add a book to LocalStorage
  static addBook (book) {
    // Get books object from LS as an array
    const books = Storage.getBooks()

    // Add new book to books array
    books.push(book)

    // Store books arr as string object to LS(LS keep all objects as strings only)
    window.localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook (book) {

  }
}

// DOM load event listener
document.addEventListener('DOMContentLoaded', () => {
  Storage.displayBooks()
})

// Event listener for add a book
document.querySelector('#db-book-form').addEventListener('submit', (e) => {
  // Get form values
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  // Instantiate new book object
  const book = new Book(title, author, isbn)

  // Instantiate new UI object
  const ui = new UI()

  // Vslidate input
  if (title === '' || author === '' || isbn === '') {
    ui.showMsg('Please fillin all fileds', 'error')
  } else {
    // Add book to ui
    ui.addBookList(book)

    // Add book to Storage
    Storage.addBook(book)

    // Show success msg
    ui.showMsg('Book added!', 'success')

    // Clear input fields after book inserted into table
    ui.clearFields()
  }

  // console.log(ui)
  e.preventDefault()
}
)

// Event listener for delete a book
document.querySelector('#db-book-list').addEventListener('click', (e) => {
  // Instantiate new UI object
  const ui = new UI()

  // console.log('Calling deleteBook func...', e.target)

  // passing event.target parametr to deleteBook func
  ui.deleteBook(e.target)

  // Show message
  ui.showMsg('Book removed!', 'warning')

  e.preventDefault()
})
