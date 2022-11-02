var fullname = document.querySelector('#fullname');
var email = document.querySelector('#email');
var subject = document.querySelector('#subject');
var message = document.querySelector('#message');
var form = document.forms.form;

function showError(input,message) {
    let inputElement = input.parentElement;
    let errorElement = inputElement.querySelector('.form-message');

    inputElement.classList.add('error');
    errorElement.innerText = message;
    
}

function showSuccess(input) {
    let inputElement = input.parentElement;
    let errorElement = inputElement.querySelector('.form-message');

    inputElement.classList.add('error');
    errorElement.innerText ='';
    
}

function isEmptyInput(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()
        if(input.value==""){
            showError(input,`Please fill out your ${input.name}.`)
            isEmptyError = true;
        }
        else{
            showSuccess(input)
        }
    }); 
    return isEmptyError;
}

function checkEmail(input) {
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();

  let isEmailError = !regexEmail.test(input.value);
  if (!isEmailError) {
    showSuccess()
  }
  else {
    showError(input,"Email invalid")
  }
  return isEmailError;
}

function checkLength( input, min, max) {

    input.value = input.value.trim();

    if (input.value.length < min) {
        showError(input,`${input.name} should not shorter than ${min} characters`)
        return true 
    }
    if (input.value.length > max) {
        showError(input,`${input.name} should not exceed ${max} characters`)
        return true
    }
    return false
}

form.addEventListener('submit',function(e) {

    e.preventDefault();

    let isEmptyError = isEmptyInput([fullname,email,subject,message]);
    let isEmailError = checkEmail(email);
    let issubjectLengthError = checkLength(subject,50,250);

    let isfullNameLengthError = checkLength(fullname,1,100);
    let isemailLengthError = checkLength(email,1,100);
    let ismessageLengthError = checkLength(message,1,500);

    if (isEmptyError || isEmailError || issubjectLengthError || isfullNameLengthError || isemailLengthError ||ismessageLengthError ) {
        //123
    }
    else {
        //123
    }
  
});