var fullname = document.querySelector('#fullname');
var email = document.querySelector('#email');
var subject = document.querySelector('#subject');
var message = document.querySelector('#message');
var form = document.forms.form;

function showError(input, message) {
    let errorElement = input.parentElement.querySelector('.form-message');

    input.parentElement.querySelector(".form-control").classList.add('invalid');
    errorElement.innerText = message;
    Object.assign(errorElement.style, {
        color: 'red',
        fontStyle: 'italic'
    });
}

function showSuccess(input) {
    let errorElement = input.parentElement.querySelector('.form-message');

    input.parentElement.querySelector(".form-control").classList.remove('invalid');
    errorElement.innerText = '';
}

function requireInput(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (input.value == "") {
            showError(input, `Please fill out your ${input.name}.`);
            isEmptyError = true;
        } else {
            showSuccess(input);
        }
    });
    return isEmptyError;
}

function checkInput(input) {
    input.value = input.value.trim();
    if (input.value === '') {
        showError(input, `Please fill out your ${input.name}.`);
    } else {
        showSuccess(input);
    }
}

function checkEmail(input) {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim();

    const isEmailError = !regexEmail.test(input.value);
    if (!isEmailError) {
        showSuccess(input);
    } else {
        showError(input, "Email invalid");
    }
    return isEmailError;
}

function checkLength(input, min, max) {

    input.value = input.value.trim();

    if (input.value.length < min) {
        showError(input, `${input.name} should not shorter than ${min} characters`);
        return true;
    } else if (input.value.length > max) {
        showError(input, `${input.name} should not exceed ${max} characters`);
        return true;
    }
    return false;
}

form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isEmptyError = requireInput([fullname, email, subject, message]);

    if (!isEmptyError) {
        var isfullNameLengthError = checkLength(fullname, 5, 100);
        var isemailLengthError = checkLength(email, 5, 100);
        var issubjectLengthError = checkLength(subject, 5, 250);
        var ismessageLengthError = checkLength(message, 5, 10);
    }
    if (!isEmptyError && !isemailLengthError) {
        var isEmailError = checkEmail(email);
    }

    if (isEmptyError || isEmailError || issubjectLengthError || isfullNameLengthError || isemailLengthError || ismessageLengthError) {

        var students = [
            {
                id: 1,
                name: "Dinh",
                toan: 5,
                ly: 6,
                hoa: 7
            },
            {
                id: 2,
                name: "Nam",
                toan: 10,
                ly: 8,
                hoa: 5,
            },
            {
                id: 3,
                name: "Tan",
                toan: 3,
                ly: 4,
                hoa: 5,
            }
        ];

        const obj = {
            id: 1,
            name: "hello"
        }

        console.table(students);
    } else {
        function Person(fullname, email, subject, message) {
            this.fullname = fullname;
            this.email = email;
            this.subject = subject;
            this.message = message;
        }

        const person = new Person(fullname.value, email.value, subject.value, message.value);

        console.table(person);
        // reset form
        form.reset();
    }
});

function validationInput(listInput) {
    listInput.forEach(input => {
        input.onblur = function () {
            checkInput(input);
        }
    });
}

validationInput([fullname, email, subject]);