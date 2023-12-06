'use strict'
import { users } from "/js/get-data.js";
// login script
const adminP = document.querySelectorAll('.admin-only');
const stdP = document.getElementById('std-p');
const loginP = document.getElementById('login-p');


                    

// login pop 
document.querySelector("#login").addEventListener("click", function () {
    document.querySelector('.login-pop').classList.toggle('hiddennn');
});

document.querySelector(".btnnn").addEventListener("click", function () {
    document.querySelector('.login-pop').classList.toggle('hiddennn');
});

const hid = function () {
    loginP.classList.toggle('hiddennn');
    document.getElementById('sidebar').classList.toggle('hiddennn');
    document.getElementById('search-bar').classList.toggle('hiddennn');
}

const hidAdmin = function() {
    for(const btn of adminP) {
        btn.classList.toggle('hiddennn');
    }

}


document.querySelector("#subb").addEventListener("click", function () {
    const user = document.querySelector('#user').value;

    // console.log(uPower);
    if (users.admin.name === user) {
        // adminP.classList.toggle('hiddennn');
        stdP.classList.toggle('hiddennn');
        document.getElementById('std-only').classList.toggle('hiddennn');
        hidAdmin();
        hid();
    }
    else {
        // adminP.classList.toggle('hiddennn');
        stdP.classList.toggle('hiddennn');
        // document.getElementById('userForm').classList.toggle('hiddennn');
        hid();
    }

});