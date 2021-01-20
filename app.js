const form = document.querySelector('.form');
const inputCollection = document.querySelectorAll('input');
let validator = false;

inputCollection.forEach(input => input.addEventListener('blur', (e) => {
  checkValidity(input);
}));

form.addEventListener('submit', (e) => {
  inputCollection.forEach(input => {
    checkValidity(input);
  });
  if(!validator) {
    inputCollection.forEach(input => {
      showError(input);
    });
    e.preventDefault();
  } else {
    console.log('Nice biba');
    e.preventDefault();
    form.reset();
  }
});

function showError(input) {
  const errorSpan = input.nextSibling.nextSibling;
  if(input.validity.valueMissing) {
    errorSpan.textContent = `You need to enter ${input.id}`;
  } else if(input.validity.typeMismatch) {
    errorSpan.textContent = `Entered value needs to be ${input.id}`;
  } else if(input.validity.tooShort) {
    errorSpan.textContent = `${input.id} should be at least ${ input.minLength } characters; you entered ${ input.value.length }.`;
  } else if(input.validity.rangeUnderflow || input.validity.rangeOverflow ) {
    errorSpan.textContent = `${input.id} should be 5 characters; you entered ${ input.value.length }.`;
  }
}

function checkValidity(input) {
  const errorSpan = input.nextSibling.nextSibling;
  if(input.validity.valid) {
    errorSpan.textContent = '';
    errorSpan.className = 'error';
    validator = true;
  } else {
    validator = false;
    showError(input);
  }

  if(input.className = 'password') {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=confirm]');
    if (confirm.value === password.value && password.value.length > 8) {
      errorSpan.textContent = '';
      errorSpan.className = 'error';
      validator = true;
    } else {
      confirm.nextSibling.nextSibling.textContent = `Passwords do not match`;
      validator = false;
    }
  }
}