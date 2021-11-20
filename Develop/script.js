// Assignment code here
// declare variables and constants
var minLength = 8;
var maxLength = 128;
var password = [];
// adding a space in the beginning makes the first element of the array blank which is helpful for random selection of all array elements
var alphabet = " abcdefghijklmnopqrstuvwxyz";
var lowerCaseLetters = alphabet.split('');
var upperCaseLetters = alphabet.toUpperCase();
upperCaseLetters = upperCaseLetters.split('');
var numbers = ' 123456789'.split('');
var specialCharacters = " '`~!@#$%^&*()_-=+<>,./?[]{}\|;:".split('');

var inputPasswordLength = function() {
  var passwordLength = window.prompt("How long would you like your password to be? Please enter between 8 and 128 characters.");
  var decimalCheck = (passwordLength - Math.floor(passwordLength));
  // validation logic for password length
  if (passwordLength === null) {
    window.alert("You need to provide a valid response! Please enter a whole number between 8 and 128.");
    return inputPasswordLength();
  }
  else if (passwordLength < minLength || passwordLength > maxLength) {
    window.alert("You have entered a number outside the acceptable range. Please enter a whole number between 8 and 128.");
    return inputPasswordLength();
  }
  else if (decimalCheck !== 0 || decimalCheck === NaN) {
    window.alert("You have entered a decimal or text, please enter a whole number between 8 and 128!")
    return inputPasswordLength();
  }
  else {
    localStorage.setItem("passwordLength", passwordLength);
  }

}

var inputCharacters = function() {
  var desiredCharacters = [];
  desiredCharacters[0] = window.confirm("Do you want LOWERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  desiredCharacters[1] = window.confirm("Do you want UPPERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  desiredCharacters[2] = window.confirm("Do you want NUMBERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  desiredCharacters[3] = window.confirm("Do you want SPECIAL CHARACTERS? Select 'Ok' if so, if you do not then select 'Cancel'");
  desiredCharacters = JSON.stringify(desiredCharacters);
  localStorage.setItem("desiredCharacters", desiredCharacters);

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = [];
  // run prompt functions for user input
  inputPasswordLength();
  inputCharacters();

  // retrieve users prompt answers from local storage
  var passwordLength = localStorage.getItem("passwordLength");
  var desiredCharacters = localStorage.getItem("desiredCharacters");

  // convert desiredCharacters string back to an array
  desiredCharacters = JSON.parse(desiredCharacters);

  // password generation logic
  for (var i = 0; i < passwordLength; i++) {
    charSelector = 0.23;
    // Math.random();
    arrayMultiplier = Math.random();
    // need to store the randomly selected characters and then make a string out of it somehow
    // Array.join('') may work to combine an array to one continuous string
    // Array.push() adds new element to array

    if(desiredCharacters[0] && charSelector < 0.25) {
      // generate a random lowercase value and store it in password
      // var passwordCharacter;
      var characterIndex = Math.floor(arrayMultiplier*lowerCaseLetters.length + 1);
      var randomCharacter = lowerCaseLetters[characterIndex];
      // debugger;
      // console.log(passwordCharacter);
      localStorage.setItem("randomCharacter", randomCharacter);
    }

    var randomCharacter = localStorage.getItem("randomCharacter");
    password.push(randomCharacter);
    passwordString = password.join('');

    localStorage.setItem("passwordString", passwordString);
    console.log(passwordText);
    // else if(desiredCharacters[1] && charSelector > 0.25 && charSelector < 0.50) {
    //   // generate a random uppercase value and store it in password
    // }
    // else if(desiredCharacters[2] && charSelector > 0.50 && charSelector < 0.75) {
    //   // generate a random number from 1-9 and store it in password
    // }
    // else if (desiredCharacters[3] && charSelector > 0.75) {
    //   // generate a random special character and store it in password
    // }
  }
  localStorage.removeItem("password");
  // An idea for getting random values is to do some math. Whatever the value of the array is you can do Math.random * [The Array] + 1
  // to get a random value then use Math.floor to get a whole number which can be used to access array
  // one fallback is you won't ever hit the 0 value
  // an option to resolve this is to make the 0 value nothing by adding a space



  password = localStorage.getItem("passwordString");
  // var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);