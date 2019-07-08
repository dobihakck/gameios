// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';

function onMouseInput(e) {
  //handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
//  handleInput(touch.clientX, touch.clientY);
}

function handleInput(key) {
  //const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(key);
}

function setKey(event) {
    var code = event.keyCode;
    var key;

    switch(code) {
    case 32:
        key = 'SPACE'; break;
    case 37:
        key = 'LEFT'; break;
    case 38:
        key = 'UP'; break;
    case 39:
        key = 'RIGHT'; break;
    case 40:
        key = 'DOWN'; break;
    default:
        // Convert ASCII codes to letters
        key = String.fromCharCode(code);
    }
    handleInput(key);
}


export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
  window.addEventListener('keydown', setKey);

}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', setKey);
}
