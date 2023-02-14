import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";
import { showTodo, updateTodo } from "./todo.js";
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
    const countdown = new Date().getTime() + state.timeLeft * 1000;
    state.timerId = setInterval(() => {
        state.timeLeft -= 1;

        showTime(state.timeLeft);

        if (state.timeLeft > 0 && state.isActive) return;

        clearTimeout(state.timerId);

        if (state.status === 'work') {
            state.activeTodo.pomodoro += 1;
            console.log('state.activeTodo: ', state.activeTodo);

            updateTodo(state.activeTodo);
            showTodo();
            if (state.activeTodo.pomodoro % state.count) {
                state.status = "break";
            } else {
                state.status = "relax";
            }

        } else {
            state.status = 'work';
        }
        alarm();
        changeActiveBtn(state.status);
        state.timeLeft = state[state.status] * 60;
        startTimer();
        
    }, 1000);

};