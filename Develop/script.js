// Assignment code here
// declare global variables
var minLength = 8;
var maxLength = 128;
var password = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var lowerCaseLetters = alphabet.split('');
var upperCaseLetters = alphabet.toUpperCase();
upperCaseLetters = upperCaseLetters.split('');
var numbers = '0123456789'.split('');
var specialCharacters = "'`~!@#$%^&*()_-=+<>,./?[]{}\|;:".split('');
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

var inputPasswordLength = function() {
  // prompt user for desired password length and store as variable
  var passwordLength = window.prompt("How long would you like your password to be? Please enter between 8 and 128 characters.");
  // quick math check, if any remainder then it will be nonzero. Or if a string will be NaN.
  var decimalCheck = (passwordLength - Math.floor(passwordLength));
  // validation logic for password length

  // Preventing null entries
  if (passwordLength === null) {
    window.alert("You need to provide a valid response! Please enter a whole number between 8 and 128.");
    return inputPasswordLength();
  }
  // setting range to 8-128
  else if (passwordLength < minLength || passwordLength > maxLength) {
    window.alert("You have entered a number outside the acceptable range. Please enter a whole number between 8 and 128.");
    return inputPasswordLength();
  }
  // preventing decimals and string entries
  else if (decimalCheck !== 0 || decimalCheck === NaN) {
    window.alert("You have entered a decimal or text, please enter a whole number between 8 and 128!")
    return inputPasswordLength();
  }
  // If all seems good store password length in localStorage
  else {
    localStorage.setItem("passwordLength", passwordLength);
  }
};

// function to gather character specifications
var inputCharacters = function() {
  // using a confirm approach. Ok provides true and Cancel provides false.
  // lowercase confirm
  confirmLower = window.confirm("Do you want LOWERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // uppercase confirm
  confirmUpper = window.confirm("Do you want UPPERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // numbers confirm
  confirmNumber = window.confirm("Do you want NUMBERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // special characters confrim
  confirmSpecial = window.confirm("Do you want SPECIAL CHARACTERS? Select 'Ok' if so, if you do not then select 'Cancel'");

  if (!confirmLower && !confirmUpper && !confirmNumber && !confirmSpecial) {
    window.alert("You must choose at least one option. Try again!")
    inputCharacters();
  }

  // convert array to string so it can be stored with localStorage under key "desiredCharacters"
  localStorage.setItem("confirmLower", confirmLower);
  localStorage.setItem("confirmUpper", confirmUpper);
  localStorage.setItem("confirmNumber", confirmNumber);
  localStorage.setItem("confirmSpecial", confirmSpecial);
};

// Function for random characters
var characterGeneration = function(characterArray) {
  var arrayMultiplier = Math.random();
  var characterIndex = Math.floor(arrayMultiplier*characterArray.length);
  var randomCharacter = characterArray[characterIndex];
  localStorage.setItem("randomCharacter", randomCharacter);
};

var threePrompts = function(firstConfirm, secondConfirm, thirdConfirm, varOne, varTwo, varThree) {
  var charSelector = Math.random();
  if(firstConfirm && charSelector <= 0.33) {
    characterGeneration(varOne);
  } 
  else if (secondConfirm && charSelector > 0.33 && charSelector <= 0.66) {
    characterGeneration(varTwo);
  } 
  else if(thirdConfirm && charSelector > 0.66) {
    characterGeneration(varThree);
  } 
};

var twoPrompts = function(firstConfirm, varOne, varTwo) {
  var charSelector = Math.random();
  if(firstConfirm && charSelector <=0.5) {
    characterGeneration(varOne);
  }
  else {
    characterGeneration(varTwo);
  }
};

var allFourPrompts = function() {
  var charSelector = Math.random();
  if(confirmLower && charSelector <= 0.25) {
    characterGeneration(lowerCaseLetters);
  } 
  else if (confirmUpper && charSelector > 0.25 && charSelector <= 0.50) {
    characterGeneration(upperCaseLetters);
  } 
  else if(confirmNumber && charSelector > 0.50 && charSelector <= 0.75) {
    characterGeneration(numbers);
  } 
  else if (confirmSpecial && charSelector > 0.75) {
    characterGeneration(specialCharacters);
  }
}

var lessThanFourPrompts = function() {
  var password = [];
  var passwordLength = localStorage.getItem("passwordLength");
  var confirmLower = localStorage.getItem("confirmLower");
  var confirmUpper = localStorage.getItem("confirmUpper");
  var confirmNumber = localStorage.getItem("confirmNumber");
  var confirmSpecial = localStorage.getItem("confirmSpecial");

  for (var i = 0; i < passwordLength; i++) {
    console.log(confirmLower && confirmUpper && confirmNumber && confirmSpecial);
    if(confirmLower === true && confirmUpper === true && confirmNumber === true && confirmSpecial === true) {
      allFourPrompts();
    }
    // no numbers
    else if(!confirmNumber) {
      threePrompts(confirmLower, confirmUpper, confirmSpecial, lowerCaseLetters, upperCaseLetters, specialCharacters);
    }
    // no special
    else if(!confirmSpecial) {
      threePrompts(confirmLower, confirmUpper, confirmNumber, lowerCaseLetters, upperCaseLetters, numbers);
    }
    // no upper
    else if(!confirmUpper) {
      threePrompts(confirmLower, confirmNumber, confirmSpecial, lowerCaseLetters, numbers, specialCharacters);
    }
    // no lower
    else if(!confirmLower) {
      threePrompts(confirmUpper, confirmNumber, confirmSpecial, upperCaseLetters, numbers, specialCharacters);
    }
    // lower and upper only
    else if(confirmLower === true && confirmUpper === true) {
      twoPrompts(confirmLower, lowerCaseLetters, upperCaseLetters);
    }
    // lower and number only
    else if(confirmLower === true && confirmNumber === true) {
      twoPrompts(confirmLower, lowerCaseLetters, numbers);
    }
    // lower and special only
    else if(confirmLower === true && confirmSpecial === true) {
      twoPrompts(confirmLower, lowerCaseLetters, specialCharacters);
    }
    // upper and special only
    else if(confirmUpper === true && confirmSpecial === true) {
      twoPrompts(confirmUpper, upperCaseLetters, specialCharacters);
    }
    // upper and number only
    else if(confirmUpper === true && confirmNumber === true) {
      twoPrompts(confirmUpper, upperCaseLetters, numbers);
    }
    // number and special only
    else if(confirmNumber === true && confirmSpecial === true) {
      twoPrompts(confirmNumber, numbers, specialCharacters);
    }
    // If only lower desired
    else if (confirmLower) {
      characterGeneration(lowerCaseLetters);
    }
    // If only upper desired
    else if (confirmUpper) {
      characterGeneration(upperCaseLetters);
    }
    // If only numbers desired
    else if (confirmNumber) {
      characterGeneration(numbers);
    }
    // If only special characters desired
    else if (confirmSpecial) {
      characterGeneration(specialCharacters);
    }
    // retrieve randomCharacter from the localStorage
    var randomCharacter = localStorage.getItem("randomCharacter");

    // push character to password array
    password.push(randomCharacter);

    // convert password array to string so to store with localStorage but as a new variable
    var passwordString = password.join('');
    localStorage.setItem("passwordString", passwordString);
  }
};


// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");
  var password = [];
  // passwordText.textContent = "";
  // run prompt functions for user input
  inputPasswordLength();
  inputCharacters();
  lessThanFourPrompts();

  // retrieve passwordString from local storage and set as password string
  password = localStorage.getItem("passwordString");
  passwordText.value = password;
  localStorage.removeItem("passwordString");
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Ideas for refactor
  // Make a function for the for loop as lots of code repeated here
  // Need to have if statements for each case and they all need to be unique for that case type. And if someone selects cancel for all options it should prompt user and have them try again