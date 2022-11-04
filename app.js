var fullname = document.querySelector('#fullname');
var email = document.querySelector('#email');
var subject = document.querySelector('#subject');
var message = document.querySelector('#message');
var form = document.forms.form;

function showError(input, message) {
    let inputElement = input.parentElement;
    let errorElement = inputElement.querySelector('.form-error');

    inputElement.querySelector(".form-control").classList.add('invalid');
    errorElement.innerText = message;
}

function showSuccess(input) {
    let inputElement = input.parentElement;
    let errorElement = inputElement.querySelector('.form-error');

    inputElement.querySelector(".form-control").classList.remove('invalid');
    errorElement.innerText = '';
}

function isEmptyInput(listInput) {
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

function checkEmail(input) {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim();

    let isEmailError = !regexEmail.test(input.value);
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
    }
    if (input.value.length > max) {
        showError(input, `${input.name} should not exceed ${max} characters`);
        return true;
    }
    return false;
}

form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isEmptyError = isEmptyInput([fullname, email, subject, message]);

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
        //123
        console.log("nok");
    } else {
        //123
        console.log("ok");
    }

});