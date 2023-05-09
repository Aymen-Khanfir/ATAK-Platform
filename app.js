// form elements
const forms = {
  login: document.getElementById("login-form"),
  signUp: document.getElementById("sign-up-form"),
  forgotPw: document.getElementById("forgot-pw-form"),
};

// buttons
const buttons = {
  login: document.getElementById("login-btn"),
  loginBtn: document.getElementById("auth-form-btn"),
  signUp: document.getElementById("sign-up-btn"),
  signBtn: document.getElementById("auth-sign-up-btn"),
  forgotPw: document.getElementById("forgot-pw-btn"),
  forgotBtn: document.getElementById("auth-reset-btn"),
  cancelPwReset: document.getElementById("cancel-pw-reset-btn"),
};

// inputs
const inputs = {
  loginEmail: document.getElementById("login-email"),
  loginPassword: document.getElementById("login-password"),
  signUpFirstName: document.getElementById("sign-up-first-name"),
  signUpLastName: document.getElementById("sign-up-last-name"),
  signUpEmail: document.getElementById("sign-up-email"),
  signUpPassword: document.getElementById("sign-up-password"),
  signUpPasswordConfirm: document.getElementById("sign-up-password-confirm"),
  forgotPwEmail: document.getElementById("forgot-pw-email"),
};

// submit buttons events
buttons.loginBtn.addEventListener("click", (e) => {
  if (
    validatePasswordLength(inputs.loginPassword) &&
    validateEmail(inputs.loginEmail)
  ) {
    alert("You have sucssessfuly login");
    e.preventDefault();
    clearInputsAndErrors();
  } else {
    e.preventDefault();
  }
});

buttons.forgotBtn.addEventListener("click", (e) => {
  if (validateEmail(inputs.forgotPwEmail)) {
    alert("Email has been sended! Please check out your Email to confirm");
    e.preventDefault();
  } else {
    e.preventDefault();
  }
});

buttons.signBtn.addEventListener("click", (e) => {
  if (
    validateNameField(inputs.signUpFirstName) &&
    validateNameField(inputs.signUpLastName) &&
    validatePasswordLength(inputs.signUpPassword) &&
    validatePasswordLength(inputs.signUpPasswordConfirm) &&
    validateEmail(inputs.signUpEmail) &&
    validatePasswordsMatch()
  ) {
    alert("You have sucssessfuly signed up");
    clearInputsAndErrors();
    e.preventDefault();
  } else {
    e.preventDefault();
  }
});

// switch to the active form
function switchForm(formToRemove, formToAdd) {
  clearInputsAndErrors();
  formToRemove.classList.remove("active");
  setTimeout(() => {
    formToAdd.classList.add("active");
  }, 50);
}

// switch form event listners
buttons.signUp.addEventListener("click", () => {
  document.title = "Sign Up"
  switchForm(forms.login, forms.signUp)
}
);

buttons.forgotPw.addEventListener("click", () => {
  document.title = "Reset Password";
  switchForm(forms.login, forms.forgotPw)
}
);

buttons.cancelPwReset.addEventListener("click", () => {
  document.title = "Log In"
  switchForm(forms.forgotPw, forms.login)
}
);

buttons.login.addEventListener("click", () => {
  document.title = "Log In"
  switchForm(forms.signUp, forms.login)
}
);

// show and hide error messages
function showError(input, message) {
  const errorMsg = document.getElementById(`${input.id}-error`);
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function hideError(input) {
  const errorMsg = document.getElementById(`${input.id}-error`);
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
}

// clear inputs and errors when switching between forms
function clearInputsAndErrors() {
  for (const inputKey in inputs) {
    const input = inputs[inputKey];
    input.value = "";
    hideError(input);
  }
}

// validate email
function validateEmail(input) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (input.value.length <= 0 && !emailRegex.test(input.value)) {
    showError(input, "Please enter a valid email address");
    return false;
  } else {
    hideError(input);
    return true;
  }
}

// validate pw is 8 characters or more
function validatePasswordLength(input) {
  if (input.value.length < 8) {
    showError(input, "Password must be longer than 8 characters");
    return false;
  } else {
    hideError(input);
    return true;
  }
}

// check passwords match on signup
function validatePasswordsMatch() {
  const password = inputs.signUpPassword;
  const passwordConfirm = inputs.signUpPasswordConfirm;

  if (password.value.length <= 0 || password.value !== passwordConfirm.value) {
    showError(inputs.signUpPassword, "Passwords do not match!");
    return false;
  } else {
    hideError(inputs.signUpPassword);
    return true;
  }
}

// check user has entered first/last name when signing up
function validateNameField(input) {
  const error = input.id.toLowerCase().includes("first")
    ? "Please enter your first name"
    : "Please enter your last name";
  if (input.value.length === 0) {
    showError(input, error);
    return false;
  } else {
    hideError(input);
    return true;
  }
}

// use the blur event to check for errors
inputs.loginEmail.addEventListener("blur", () =>
  validateEmail(inputs.loginEmail)
);

inputs.signUpEmail.addEventListener("blur", () =>
  validateEmail(inputs.signUpEmail)
);

inputs.forgotPwEmail.addEventListener("blur", () =>
  validateEmail(inputs.forgotPwEmail)
);

inputs.loginPassword.addEventListener("blur", () =>
  validatePasswordLength(inputs.loginPassword)
);

inputs.signUpPassword.addEventListener("blur", () => {
  validatePasswordLength(inputs.signUpPassword);
  validatePasswordsMatch();
});

inputs.signUpPasswordConfirm.addEventListener("blur", () =>
  validatePasswordsMatch()
);

inputs.signUpFirstName.addEventListener("blur", () =>
  validateNameField(inputs.signUpFirstName)
);

inputs.signUpLastName.addEventListener("blur", () =>
  validateNameField(inputs.signUpLastName)
);
