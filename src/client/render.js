// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState, getUserName, getUserColor } from './state';
import { Sprite } from './sprite';


const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
let sprite = new Sprite('sprites.png', [0, 0], [39, 39], 16, [0, 1]);
setCanvasDimensions();


function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 1200 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, bullets } = getCurrentState();
  if (!me) {
    return;
  }



  // Draw background
  renderBackground(me.x, me.y);

  // Draw boundaries
  context.strokeStyle = 'violet';
  context.lineWidth = 1;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // Draw all bullets
  bullets.forEach(renderBullet.bind(null, me));

  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

function renderBackground() {
  context.fillStyle = context.createPattern(getAsset('terrain.png'), 'repeat');
  context.fillRect(0, 0, canvas.width, canvas.height);
}
var lastTime = 0;
// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;

  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  // Draw ship
  context.save();
  context.translate(canvasX - 20, canvasY - 20);
  sprite.update(dt);
  sprite.render(context);
  //context.rotate(direction);
  /*context.drawImage(
    getAsset('bullet.svg'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );*/
  lastTime = now;
  context.restore();

  // Draw health bar
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );

  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );

  context.strokeStyle = getUserColor();
  context.strokeText(getUserName(), canvasX - 20, canvasY - 30);

}

function renderBullet(me, bullet) {
  const { x, y } = bullet;

  context.beginPath();
  context.fillStyle = 'gold';
    context.arc(
       canvas.width / 2 + x - me.x,
       canvas.height / 2 + y - me.y,
       BULLET_RADIUS, 0, Math.PI * 2
     );
  context.fill();
  context.closePath();
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground();
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
