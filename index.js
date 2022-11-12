// Mandatory libraries
var chash = require('js-sha256');
var QRCode = require('qrcode')



let input = {
    seedBrute: "123456"
}



motd()

function createSeed(roundedDate) {
    // Concatenate the brute seed string and the rounded UTC Date, and gen a SHA256 Hash
    let result = chash(input.seedBrute + roundedDate)
    return result
}
function getFullDate(){
    let fullDate = new Date()
    return fullDate
}
function motd(){
    console.log(` 🔐 Welcome to TFA.JS`)
    console.log(` 💻 Developed by github.com/mavinsi`)
    console.log("")
    console.log(` 🗝️ Your Seed: ${input.seedBrute}`)
    console.log(` ⏰ Actual Date: ${getFullDate()}`)

}
function getRoundedTime() {
    // Create and return the current date but rounded
    let fullDate = new getFullDate()
    let roundedDate = new Date()

    if (fullDate.getSeconds() < 30) {
        roundedDate.setSeconds(0)
    } else {
        roundedDate.setSeconds(30)
    }
  
    return roundedDate
}

function authCode(input) {
    let cleanHash = input.replace(/\D/g, '')
    console.log("")

    return cleanHash.substring(0, 6)
}


setTimeout(function(){
    let myVar = setInterval(function () { timer() }, 1000);

function timer() {
    console.clear()
    let finalTFA = authCode(createSeed(getRoundedTime()))
    
    console.log(` ⌚ Changing in ${30 - (getFullDate().getSeconds() - getRoundedTime().getSeconds())} seconds!`)
  
    console.log(` 🔑 TFA Code: ${finalTFA.slice(0,3)}-${finalTFA.slice(3)}`)
    console.log("")
    QRCode.toString(finalTFA, { type: 'terminal' }, function (err, url) {
        console.log(url)
    })
}

}, 5000);




