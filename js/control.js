import { state } from "./state.js";
import { startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');

export const initControl = () => {
    btnStart.addEventListener('click', ()=>{
        if(state.isActive){
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Start';
        }else{
            state.isActive = true;
            btnStart.textContent = 'Pause';
            startTimer();
        }
        
        
        
        
    });
};

