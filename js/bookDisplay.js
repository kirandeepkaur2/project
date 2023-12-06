'use strict'


// lib script 
class Book {
    constructor(id, name, author, publisher, type) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.publisher = publisher;
        this.type = type;
    }
}

// class to display new add book
class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        const uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.id}</td>
                            <td>${book.author}</td>
                            <td>${book.publisher}</td>
                            <td>${book.type}</td>
                            <td>  </td>
                            <td>  </td>
                          </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('add-book-form');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        // let message = document.getElementById('message');
        // let boldText;
        // if (type === 'success') {
        //     boldText = 'Success';
        // }
        // else {
        //     boldText = 'Error!';
        // }
        // message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        //                         <strong>${boldText}:</strong> ${displayMessage}
        //                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        //                         <span aria-hidden="true">×</span>
        //                         </button>
        //                     </div>`;
        // setTimeout(function () {
        //     message.innerHTML = ''
        // }, 5000);

    }
}

export {Book, Display} ;