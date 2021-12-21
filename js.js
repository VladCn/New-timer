const minutesJS =document.querySelector(".minutes input")
const secondsJS =document.querySelector(".seconds input")
// const input = document.querySelectorAll("input")
const settings = document.querySelector(".settings")
const start = document.querySelector(".start")
let msM = minutesJS.value;
let msS = secondsJS.value;
let intervalID;



settings.addEventListener("click", actionSett)
function actionSett(e){
    e.preventDefault();
    minutesJS.removeAttribute("disabled")
    secondsJS.removeAttribute("disabled")
    console.log(e)
}

minutesJS.addEventListener("input", actionMin)
function actionMin(e){
    e.preventDefault();
    if(e.target.value > 60){
        alert("Error")
        return e.target.value = 0;
    }
    msM = e.target.value
    console.log(msM)

}
console.log(msM)
secondsJS.addEventListener("input", actionSec)
function actionSec(e){
    e.preventDefault();
    msS = e.target.value
    console.log(msS)

}
function addLeadingZero(value){
    if(value.length <= 1){
        return value.padStart(2, '0')
    } return value
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
console.log(convertMs(3000))


function startF(){

    if(start.textContent === "pause"){
       if(intervalID) {
           msM = minutesJS.value;
           msS = secondsJS.value;
           clearInterval(intervalID)
           console.log(minutesJS.value)
       }
        start.textContent ="start"
        console.log(secondsJS.value)
        return secondsJS.value && minutesJS.value
    }
        start.textContent = "pause"

    console.log("MSSSSSSSS", msS)
    let newStart = msM*60*1000 + msS*1000
    const startTime = new Date().setMilliseconds(newStart + 1000)
    console.log(intervalID, 'console.log(intervalID)')

    intervalID = setInterval(() => {

        const currentTime =  startTime - Date.now();
        console.log(currentTime)
        if(currentTime < 0){
            return
        }

         minutesJS.value = convertMs(currentTime).minutes
         secondsJS.value = convertMs(currentTime).seconds
        console.log(secondsJS.value)
        minutesJS.value = addLeadingZero(minutesJS.value)
        secondsJS.value = addLeadingZero(secondsJS.value)


    }, 1000);

}

start.addEventListener("click", startF);