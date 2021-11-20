// Assignment code here
// declare global variables
var minLength = 8;
var maxLength = 128;
var password = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var lowerCaseLetters = alphabet.split('');
var upperCaseLetters = alphabet.toUpperCase();
upperCaseLetters = upperCaseLetters.split('');
var numbers = '123456789'.split('');
var specialCharacters = "'`~!@#$%^&*()_-=+<>,./?[]{}\|;:".split('');

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
  // array initiation for user character preferences
  var desiredCharacters = [];

  // using a confirm approach. Ok provides true and Cancel provides false.

  // lowercase confirm
  desiredCharacters[0] = window.confirm("Do you want LOWERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // uppercase confirm
  desiredCharacters[1] = window.confirm("Do you want UPPERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // numbers confirm
  desiredCharacters[2] = window.confirm("Do you want NUMBERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // special characters confrim
  desiredCharacters[3] = window.confirm("Do you want SPECIAL CHARACTERS? Select 'Ok' if so, if you do not then select 'Cancel'");
  // convert array to string so it can be stored with localStorage under key "desiredCharacters"
  desiredCharacters = JSON.stringify(desiredCharacters);
  localStorage.setItem("desiredCharacters", desiredCharacters);
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // declare password as empty array to prevent any issues upon page refresh
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
    // random number variable to decide which character/number to generate
    var charSelector = Math.random();

    // random number for array multiplier to provide random character/number
    var arrayMultiplier = Math.random();

    // if and else if statements for character selection
    if(desiredCharacters[0] && charSelector < 0.25) {
      // generate a random lowercase value and store it in password

      // determine random index value to select from array
      var characterIndex = Math.floor(arrayMultiplier*lowerCaseLetters.length);

      // store randome character in variable from characterIndex
      var randomCharacter = lowerCaseLetters[characterIndex];

      // save to localStorage
      localStorage.setItem("randomCharacter", randomCharacter);
    } else if (desiredCharacters[1] && charSelector > 0.25 && charSelector < 0.50) {
      // generate a random uppercase value and store it in password
      var characterIndex = Math.floor(arrayMultiplier*upperCaseLetters.length );
      var randomCharacter = upperCaseLetters[characterIndex];
      localStorage.setItem("randomCharacter", randomCharacter);
    } else if(desiredCharacters[2] && charSelector > 0.50 && charSelector < 0.75) {
      // generate a random number from 1-9 and store it in password
      var characterIndex = Math.floor(arrayMultiplier*numbers.length);
      var randomCharacter = numbers[characterIndex];
      localStorage.setItem("randomCharacter", randomCharacter);
    } else if (desiredCharacters[3] && charSelector > 0.75) {
      // generate a random special character and store it in password
      var characterIndex = Math.floor(arrayMultiplier*specialCharacters.length);
      var randomCharacter = specialCharacters[characterIndex];
      localStorage.setItem("randomCharacter", randomCharacter);
    }

    // retrieve randomCharacter from the localStorage
    var randomCharacter = localStorage.getItem("randomCharacter");

    // push character to password array
    password.push(randomCharacter);

    // convert password array to string so to store with localStorage but as a new variable
    var passwordString = password.join('');
    localStorage.setItem("passwordString", passwordString);
  }
  // remove password from local storage to prevent errors upon page refresh
  localStorage.removeItem("password");

  // retrieve passwordString from local storage and set as password string
  password = localStorage.getItem("passwordString");
  // var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Ideas for refactor
  // Make a function for the for loop as lots of code repeated here
  // go through comments and slim down if possible
  // brainstorm some more