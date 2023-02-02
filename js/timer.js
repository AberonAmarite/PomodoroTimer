import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";
import { addZero } from "./util.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
    let minutesText = Math.floor(seconds/60);
    let secondsText = seconds % 60;
    minutesElem.textContent = addZero(minutesText);
    secondsElem.textContent = addZero(secondsText);
};

export const startTimer = () => {
    state.timeLeft-=9;

    // show on the webpage

    showTime(state.timeLeft);

    if(state.timeLeft > 0 && state.isActive){
        state.timerId = setTimeout(startTimer, 1000);
        //TODO change this
        
    }
    if(state.timeLeft <= 0){
        
        if(state.status === 'work'){
            state.activeTodo.pomodoro += 1;

            if(state.activeTodo.pomodoro % state.count){
                state.status = "break";
            }else{
                state.status = "relax";
            }

            
        }else{
            state.status = 'work';
        }
        alarm();
        changeActiveBtn(state.status);
        state.timeLeft = state[state.status]*60;
        startTimer();
    }
};