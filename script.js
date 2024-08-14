const container = document.querySelector('.library')
const addBtn = document.querySelector('.addBtn')
const addBookPopUp = document.querySelector('.pop-add-book')
const submitBtn = document.querySelector('button.submit-btn')
const cancelBtn = document.querySelector('button.cancel-btn')

let myLibrary = [
  new Book("Book 1", "MohamedSIssa", 200, true),
  new Book("Book 2", "MohamedSIssa", 120, false)
]

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.getInfo = () => {
    return this.title + ' by ' + this.author + ' ' + this.pages + ' pages ' + (this.read ? "Finished" : "Not Finished")
  }
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead) {
  myLibrary.push(new Book(bookTitle, bookAuthor, +bookPages, bookRead))
}

function displayBooks() {
  resetLibraryBooks()
  for(let i = 0; i < myLibrary.length; i++){
    console.log(myLibrary[i].getInfo());
    
    let bookDiv = document.createElement('div')
    bookDiv.setAttribute('book-id', i)
    bookDiv.className = "book"
    
    let bookTitle = document.createElement('h1')
    bookTitle.textContent = 'Title: '+myLibrary[i].title

    let bookAuthor = document.createElement('p')
    bookAuthor.textContent = 'Author: '+myLibrary[i].author

    let bookPages = document.createElement('p')
    bookPages.textContent = 'Pages: '+myLibrary[i].pages

    let bookRead = document.createElement('p')
    bookRead.textContent = myLibrary[i].read ? "Finished Reading" : "Not Finished Yet"

    let checkBoxRead = document.createElement('input')
    checkBoxRead.type = 'checkbox'
    checkBoxRead.checked = myLibrary[i].read
    checkBoxRead.title = "Mark as finished or not finished"
    checkBoxRead.addEventListener('click', () => {
      myLibrary[i].read = checkBoxRead.checked
      bookRead.textContent = myLibrary[i].read ? "Finished Reading" : "Not Finished Yet"
    })

    let deleteBtn = document.createElement('button')
    deleteBtn.className = `delete-book`
    deleteBtn.setAttribute('book-id', i)
    deleteBtn.textContent = 'x'
    deleteBtn.addEventListener('click', () => {
      container.removeChild(bookDiv)
      console.log(myLibrary[+deleteBtn.getAttribute('book-id')], 'Deleted!')
      myLibrary = deleteItemAtIndex(myLibrary, +deleteBtn.getAttribute('book-id'))
    })

    bookDiv.appendChild(bookTitle)
    bookDiv.appendChild(document.createElement('hr'))
    bookDiv.appendChild(bookAuthor)
    bookDiv.appendChild(document.createElement('hr'))
    bookDiv.appendChild(bookPages)
    bookDiv.appendChild(document.createElement('hr'))
    bookDiv.appendChild(bookRead)
    bookDiv.appendChild(document.createElement('hr'))
    bookDiv.appendChild(checkBoxRead)
    bookDiv.appendChild(deleteBtn)
    container.appendChild(bookDiv)
  }
}

displayBooks()

addBtn.addEventListener('click' , () => {
  addBookPopUp.classList.toggle('hidden')
  container.classList.toggle('not-interactive')
})

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let bookTitle = document.querySelector('#title').value
  let bookAuthor = document.querySelector('#author').value
  let bookPages = document.querySelector('#pages').value
  let bookRead = document.querySelector('#readYes').checked
  if(bookTitle && bookAuthor && bookPages){
    console.log(bookTitle, bookAuthor, bookPages, bookRead);
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead)
    displayBooks()
    addBookPopUp.classList.add('hidden')
    container.classList.remove('not-interactive')
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#pages').value = ''
  }else {
    alert('Not Enough Info!')
  }
})

function resetLibraryBooks() {
  container.innerHTML = ""
}

cancelBtn.addEventListener('click', (event) => {
  event.preventDefault()
  addBookPopUp.classList.add('hidden')
  container.classList.remove('not-interactive')
  document.querySelector('#title').value = ''
  document.querySelector('#author').value = ''
  document.querySelector('#pages').value = ''
})

function deleteItemAtIndex(arr, index) {
  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
  ];
}