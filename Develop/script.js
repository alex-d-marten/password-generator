// Assignment code here
var minLength = 8;
var maxLength = 128;

var inputPasswordLength = function() {
  var passwordLength = window.prompt("How long would you like your password to be? Please enter between 8 and 128 characters.");
  
  // validation logic for password length
  if (passwordLength === null || passwordLength < minLength || passwordLength > maxLength || !(Number.isInteger(passwordLength))) {
    window.alert("You need to provide a valid response! Please enter a whole number between 8 and 128.")
    return inputPasswordLength();
  }
  
  else {
    localStorage.setItem("passwordLength", passwordLength);
  }

}
inputPasswordLength();

// grab passwordLength from localStorage and store globally
var passwordLength = localStorage.getItem("passwordLength");
console.log(passwordLength);

var userInput = function() {
  if (userClick) {
    var passwordLength = window.prompt("How long would you like your password to be? Please select between 8 and 128 characters.")
  }
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
