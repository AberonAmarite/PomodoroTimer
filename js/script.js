import { initControl } from "./control.js";
import { state } from "./state.js";


const initPomodoro = () => {
    initControl();

    state.activeTodo = {
        id: 'default',
        pomodoro: 0,
        title: 'Pomodoro',
    }
};

initPomodoro();