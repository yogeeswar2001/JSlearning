//book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }    
}

// UI class
class UI {
    addToBookList(book) {
        console.log(book);

        //create row element
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
        `
        const list = document.querySelector('.book-list');

        list.appendChild(tr);
        console.log(tr);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(msg, className) {
        const alertElem = document.createElement('div');

        alertElem.className = `alert ${className}`;
        alertElem.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(alertElem, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearFields() {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    }
}

//add event listners
document.querySelector("#book-form").addEventListener('submit', function(e) {
    //get values from all fields
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const ui = new UI();

    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Enter all Values', 'error');
    } else {
        //create book class
        const book = new Book(title, author, isbn);
        
        //add to book list
        ui.addToBookList(book);
    }

    //clear fields
    ui.clearFields();

    e.preventDefault();
});

document.querySelector('.book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    
    e.preventDefault();
})