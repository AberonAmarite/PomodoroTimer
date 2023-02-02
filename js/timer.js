import { alarm } from "./alarm.js";
import { state } from "./state.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const showTime = (seconds) => {
    let minutesText = Math.floor(seconds/60);
    let secondsText = seconds % 60;
    minutesElem.textContent = minutesText < 10 ? '0'+minutesText: minutesText;
    secondsElem.textContent = secondsText < 10 ? '0'+secondsText: secondsText;
};

export const startTimer = () => {
    

    // show on the webpage

    showTime(state.timeLeft);

    if(state.timeLeft > 0 && state.isActive){
        state.timerId = setTimeout(startTimer, 1000);
        state.timeLeft--;
    }
    if(state.timeLeft <= 0){
        // signal that no time is left
        alarm();
    }
};