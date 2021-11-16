// Assignment code here
var passwordLength = window.prompt("How long would you like your password to be? Please enter between 8 and 128 characters.");
localStorage.setItem("passwordLength", passwordLength);






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
