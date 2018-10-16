// Book constructor
function Book (title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI contructor
function UI () {
}

// set addBookList methods to prototype
UI.prototype.addBookList = function (book) {
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

// Set method deleteBook to prototype
UI.prototype.deleteBook = function (target) {
  // console.log('deleteBook() executing...')
  // If the target is X anchor remove li element
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// set method clearFields to prototype
UI.prototype.clearFields = function () {
  document.querySelector('#title').value = ''
  document.querySelector('#author').value = ''
  document.querySelector('#isbn').value = ''
}

// set method showMsg to prototype
UI.prototype.showMsg = function (msg, className) {
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
  ui.showMsg('Book removed!', 'success')

  e.preventDefault()
})
