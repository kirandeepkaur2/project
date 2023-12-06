'use strict'


let users;
let jBook;
let books;


// getting login data from server
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        users = req.responseText;
    }
};

req.open("GET", "https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ", true);
req.setRequestHeader("X-Access-Key", "$2b$10$vVrdTC03qN6B66LyKf/0J.yZGnHCjlof.xcPgr7nNPgwKL4Z5AevK");
req.send();



// getting books data from database\
let reqe = new XMLHttpRequest();
reqe.onreadystatechange = () => {
    if (reqe.readyState == XMLHttpRequest.DONE) {
        jBook = reqe.responseText;
    }
};

reqe.open("GET", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false ", true);
reqe.setRequestHeader("X-Access-Key", "$2b$10$vVrdTC03qN6B66LyKf/0J.yZGnHCjlof.xcPgr7nNPgwKL4Z5AevK");
reqe.send();




setTimeout(function () {
    books = JSON.parse(jBook);
    users =JSON.parse(users);
}, 6000);

function hidAll(){
    document.getElementById('std-p').classList.add('hiddennn');
    document.getElementById('add-new-book-form').classList.add('hiddennn');
    document.getElementById('add-new-user-form').classList.add('hiddennn');
    document.getElementById('search-bar').classList.add('hiddennn');
    document.getElementById('issue-book-user-form').classList.add('hiddennn');
    document.getElementById('issued-to-user').classList.add('hiddennn');
    document.getElementById('user-dashboard').classList.add('hiddennn');
    document.getElementById('return-page').classList.add('hiddennn');

}
// add new user function
document.getElementById('btn-add-user').addEventListener('click', function(){
    hidAll();
    document.getElementById('add-new-user-form').classList.toggle('hiddennn');
});

document.getElementById('btn-add-user1').addEventListener('click', function(){
    hidAll();
    document.getElementById('add-new-user-form').classList.toggle('hiddennn');
});


const userForm = document.getElementById('add-user-form');

userForm.addEventListener('submit', function (e) {
    const className = document.getElementById('classs').value;
    const name = document.getElementById('userName').value;
    const passwd = document.getElementById('passwd3').value;

    const newUser = {
        id: users.admin.users + 1,
        name: name,
        class: className,
        passwd: passwd,
        issueBooksId:[],
    };


    users.users.push(newUser);
    users.admin.users++;
    alert(`Remember this User ID and Password \n ID => ${newUser.id} \n Password => ${newUser.passwd}`);

    let libraryForm = document.getElementById('add-user-form');
        libraryForm.reset();

    // uploading new user data on database

    fetch('https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ', {
        method: 'PUT',
        body: JSON.stringify(users),
        headers: {
            'Content-type': 'application/json',
            "X-Access-Key": "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO",
        },
    })
        .then(res => res.json())
        .then(data => console.log(data))


    e.preventDefault();
});


// lib script 
class Book {
    constructor(id, name, author, publisher, type, lockerNo) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.publisher = publisher;
        this.type = type;
        this.issuedTo = 0;
        this.issuedDate = 0;
        this.lockerNo = lockerNo;
    }
}

// class to display new add book
class Display {
    add(books) {
        let tableBody = document.getElementById('tableBody');
        for (const book of books) {
            if (book.issuedTo !== 0) {
                const issueed = new Display().issue;
                issueed(book);
            }
            else {
                const uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.id}</td>
                            <td>${book.author}</td>
                            <td>${book.publisher}</td>
                            <td>${book.type}</td>
                            <td>${book.lockerNo}</td>
    
                          </tr>`;
                tableBody.innerHTML += uiString;
            }
        }

        // let tableBody = document.getElementById('tableBody');
        // const uiString = `<tr>
        //                     <td>${book.name}</td>
        //                     <td>${book.id}</td>
        //                     <td>${book.author}</td>
        //                     <td>${book.publisher}</td>
        //                     <td>${book.type}</td>
        //                     <td>${book.lockerNo}</td>

        //                   </tr>`;
        // tableBody.innerHTML += uiString;
    }
    issue(book) {
        let user;
        for (const userr of users.users) {
            if (userr.id === book.issuedTo) {
                user = userr;
            }
        }
        let tableBody = document.getElementById('issued-tableBody');
        const uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.id}</td>
                            <td>${book.issuedDate}</td>
                            <td>${user.name}</td>
                            <td>${user.class}</td>
                            <td>${user.id}</td>
                          </tr>`;
        tableBody.innerHTML += uiString;
    }
    dashboard(user) {

        for (const id of user.issueBooksId) {
            for (const book of books) {
                if (book.id === id) {

                    let tableBody = document.getElementById('dashboard-tableBody');
                    const uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.id}</td>
                            <td>${book.issuedDate}</td>
                          </tr>`;
                    tableBody.innerHTML += uiString;
                }
            }
        }
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



document.getElementById('btn-add-book').addEventListener('click', function(){
    hidAll();
    document.getElementById('add-new-book-form').classList.toggle('hiddennn');
});

document.getElementById('btn-add-book1').addEventListener('click', function(){
    hidAll();
    document.getElementById('add-new-book-form').classList.toggle('hiddennn');
});



// Add submit event listener to add new book
let libraryForm = document.getElementById('add-book-form');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let id = Number(document.getElementById('bookID').value);
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let publisher = document.getElementById('bookPublisher').value;
    let type = document.getElementById('bookType').value;
    let lockerNo = document.getElementById('locker-no').value;


    let book = new Book(id, name, author, publisher, type, lockerNo);
    books.push(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add([book]);
        display.clear();

        // uploading new book to database
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                console.log(req.responseText);
            }
        };

        req.open("PUT", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Access-Key", "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO");
        req.send(JSON.stringify(books));


        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}


const tableBody = document.getElementById('return-tableBody');

document.getElementById('return-p').addEventListener('click', function () {
    hidAll();
    document.getElementById('return-page').classList.toggle('hiddennn');
});
document.getElementById('return-p1').addEventListener('click', function () {
    hidAll();
    document.getElementById('return-page').classList.toggle('hiddennn');
});

let rBook;
let rUser;
document.getElementById('return-book-id').addEventListener('change', function (e) {
    loop1:
    for (let book of books) {
        if (book.id === Number(e.target.value)) {
            rBook = book;
            for (const user of users.users) {
                if (user.id === rBook.issuedTo) {
                    rUser = user;
                    break loop1;
                }
            }
        }

    }
    tableBody.innerHTML = `<tr>
    <td> ${rBook.name} </td>
    <td> ${rBook.author} </td>
    <td> ${rUser.name} </td>
    <td> ${rUser.id} </td>
    <td> ${rBook.lockerNo} </td>
    <!-- <td> other book option </td> -->
  </tr>`;
});

document.getElementById('return-book-form').addEventListener('submit', function (e) {
    rBook.issuedDate = 0;
    rBook.issuedTo = 0;
    loop1:
    for (const user of users.users) {
        for (let [index, issueBooksId] of user.issueBooksId.entries()) {
            if (issueBooksId === String(rBook.id)) {
                user.issueBooksId.splice(index, 1);
                break loop1;
            }
        }
    }

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Access-Key", "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO");
    req.send(JSON.stringify(books));

    fetch('https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ', {
        method: 'PUT',
        body: JSON.stringify(users),
        headers: {
            'Content-type': 'application/json',
            "X-Access-Key": "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO",
        },
    })
        .then(res => res.json())
        .then(data => console.log(data))


    document.getElementById('return-book-form').reset();
    e.preventDefault();
});



const userDetails = document.getElementById('issue-user-tableBody');
const bookDetails = document.getElementById('issue-book-tableBody');
let indexOfUser, indexOfBook, userId, bookId, checker1 = 0, checker2 = 0;



document.getElementById('issue-page').addEventListener('click', function () {
    hidAll()
    document.getElementById('issue-book-user-form').classList.toggle('hiddennn');
})

document.getElementById('issue-page1').addEventListener('click', function () {
    hidAll()
    document.getElementById('issue-book-user-form').classList.toggle('hiddennn');
})

document.getElementById('user-id').addEventListener('change', function (e) {

    for (const [index, user] of users.users.entries()) {
        if (user.id === Number(e.target.value)) {
            userDetails.innerHTML = `<tr>
                                     <td>${user.name}</td>
                                     <td>${user.class}</td>
                                 </tr>`;
            indexOfUser = index;
            userId = user.id;
            checker1 = 1;
            break;
        }
        else {
            checker1 = 0;
            userDetails.innerHTML = '';
        }

    }
});

document.getElementById('book-id').addEventListener('change', function (e) {
    for (const [index, book] of books.entries()) {
        if (Number(book.id) === Number(e.target.value)) {
            bookDetails.innerHTML = `<tr>
                                     <td>${book.name}</td>
                                     <td>${book.author}</td>
                                     <td>${book.publisher}</td>

                                 </tr>`;
            indexOfBook = index;
            bookId = book.id;
            checker2 = 1;
            break;
        }
        else {
            checker2 = 0;
            bookDetails.innerHTML = '';
        }

    }
});

// issuing book to user
const issueForm = document.getElementById('issue-book-form');
issueForm.addEventListener('submit', function (e) {
    if (checker1 + checker2 === 2) {
        users.users[indexOfUser].issueBooksId.push(bookId);
        books[indexOfBook].issuedTo = userId;
        books[indexOfBook].issuedDate = document.getElementById('date').value;
        const issueed = new Display().issue;
        issueed(books[indexOfBook]);


        // uploading issued details to database
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                console.log(req.responseText);
            }
        };

        req.open("PUT", "https://api.jsonbin.io/v3/b/64081c59c0e7653a058439f8?meta=false", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Access-Key", "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO");
        req.send(JSON.stringify(books));

        fetch('https://api.jsonbin.io/v3/b/64030be9ace6f33a22e92074?meta=false ', {
            method: 'PUT',
            body: JSON.stringify(users),
            headers: {
                'Content-type': 'application/json',
                "X-Access-Key": "$2b$10$yCt1TczM9drUVreBsiuKjubH1z/W5ZkloK7Aj/NQFxAbBiqWNN8OO",
            },
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    checker1 = 0;
    checker2 = 0;

    issueForm.reset();
    bookDetails.innerHTML = '';
    userDetails.innerHTML = '';
    e.preventDefault();
});

document.getElementById('issued-to-user-btn').addEventListener('click', function(){
    hidAll();
    document.getElementById('issued-to-user').classList.toggle('hiddennn');
});

document.getElementById('issued-to-user-btn1').addEventListener('click', function(){
    hidAll();
    document.getElementById('issued-to-user').classList.toggle('hiddennn');
});

// book  search function

class DisplaySearchBook {

    deleteBook(books, indexs) {
        indexs = indexs.reverse();
        for (const index of indexs) {
            books.splice(index, 1);
        }
        return books
    }

    search(bookName, findBy) {
        document.getElementById('tableBody').innerHTML = '';
        const add = new Display().add;
        const sBa = [];
        let clonedBooks = JSON.parse(JSON.stringify(books));
        for (const [index, book] of books.entries()) {
            if (book[findBy].toLowerCase() === bookName.toLowerCase()) {
                add([book]);
                sBa.push(index);
            }
        }
        clonedBooks = this.deleteBook(clonedBooks, sBa);
        const sName = bookName.split(' ');

        for (const book of clonedBooks) {
            const cBook = book[findBy].split(' ');
            loop1:
            for (const name of sName) {
                loop2:
                for (const spName of cBook) {
                    if (spName.toLowerCase() === name.toLowerCase()) {
                        add([book]);
                        break loop1;
                    }
                }
            }
        }

    }

}

document.getElementById('search').addEventListener('click', function (e) {
    const name = document.getElementById('search-txt').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let btype = document.getElementById('btype');
    const displaySearch = new DisplaySearchBook();

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else if (btype.checked) {
        type = btype.value;
    }
    if (name === '') {
        const display = new Display().add;
        display(books);
    }
    else{
        displaySearch.search(name, type);
    }
    e.preventDefault();
        // console.log(name , type);
});

const searchByMenu = document.querySelectorAll('.search-by-btn');
for (const sByM of searchByMenu) {
    sByM.addEventListener('click', function () {
        document.querySelector('.dropdown-menu').classList.toggle('show');
    });
}


// displaying books

setTimeout(function () {

const display = new Display().add;
display(books);
    // let tableBody = document.getElementById('tableBody');
    // for (const book of books) {
    //     if (book.issuedTo !== 0) {
    //         const issueed = new Display().issue;
    //         issueed(book);
    //     }
    //     else {
    //         const uiString = `<tr>
    //                         <td>${book.name}</td>
    //                         <td>${book.id}</td>
    //                         <td>${book.author}</td>
    //                         <td>${book.publisher}</td>
    //                         <td>${book.type}</td>
    //                         <td>${book.lockerNo}</td>
    
    //                       </tr>`;
    //         tableBody.innerHTML += uiString;
    //     }
    // }
}, 6100);

document.getElementById('books').addEventListener('click', function () {
    hidAll();
    document.getElementById('std-p').classList.toggle('hiddennn');
    document.getElementById('search-bar').classList.toggle('hiddennn');

});

document.getElementById('books1').addEventListener('click', function () {
    hidAll();
    document.getElementById('std-p').classList.toggle('hiddennn');
    document.getElementById('search-bar').classList.toggle('hiddennn');

});

document.getElementById('dashboard-btn').addEventListener('click', function () {
    hidAll();
    document.getElementById('user-dashboard').classList.remove('hiddennn');
});
document.getElementById('std-only1').addEventListener('click', function () {
    hidAll();
    document.getElementById('user-dashboard').classList.remove('hiddennn');
});
// login script
const adminP = document.querySelectorAll(".admin-only");
const stdP = document.getElementById("std-p");
const loginP = document.getElementById("login-p");

const dashboard = new Display().dashboard;
// login pop
document.querySelector("#login").addEventListener("click", function () {
    document.querySelector(".login-pop").classList.toggle("hiddennn");
});
document.querySelector("#login-logo").addEventListener("click", function () {
    document.querySelector(".login-pop").classList.toggle("hiddennn");
});


document.querySelector(".btnnn").addEventListener("click", function () {
    document.querySelector(".login-pop").classList.toggle("hiddennn");
});

const hid = function () {
    loginP.classList.toggle("hiddennn");
    document.getElementById("sidebar").classList.toggle("hiddennn");
    document.getElementById("buttom-bar").classList.toggle("hiddennn");
};

const hidAdmin = function () {
    for (const btn of adminP) {
        btn.classList.toggle("hiddennn");
    }
};
const afterLogin = function () {
    document.getElementById('user-logo').classList.toggle('hiddennn');
    document.getElementById('login-logo').classList.toggle('hiddennn');

}


document.querySelector("#subb").addEventListener("click", function () {
    const user = document.querySelector("#user").value;
    const password = document.querySelector("#passwd").value;

    // console.log(uPower);
    if (users.admin.name === user && users.admin.passwd === password) {
        // adminP.classList.toggle('hiddennn');
        stdP.classList.toggle("hiddennn");
        document.getElementById("std-only").classList.toggle("hiddennn");
        document.getElementById("std-only1").classList.toggle("hiddennn");
        hidAdmin();
        hid();
        afterLogin();
        document.getElementById("search-bar").classList.toggle("hiddennn");
    }
    else {
        for (let input of users.users) {
            if (String(input.id) === user && input.passwd === password) {
                dashboard(input);
                // common
                stdP.classList.toggle("hiddennn");
                // document.getElementById('userForm').classList.toggle('hiddennn');
                hid();
                afterLogin();
                document.getElementById("search-bar").classList.toggle("hiddennn");
            }
            else {
                document.querySelector('#check-user').innerHTML = 'check the user name and password';
            }
        }
    }
});
