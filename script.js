const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// default values
let curve = 10;
let branchPointCurve = 20;
let startX = canvas.width / 2;
let startY = canvas.height - 80;
let len = 200;
let angle = 0;
let branchWidth = 10;
let numLeaves = 15;
let branchColor = 'brown';
let leavesColor = 'pink';
generateButton.addEventListener('click', generateRandomTree);

/**
 *
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} len
 * @param {Number} angle
 * @param {Number} branchWidth
 * @param {string} branchColor
 * @param {string} leavesColor
 */
function drawTree(
  startX,
  startY,
  len,
  angle,
  branchWidth,
  branchColor,
  leavesColor,
  numLeaves = 15,
) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = branchColor;
  ctx.fillStyle = leavesColor;
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180); //convert to radians
  ctx.moveTo(0, 0);
  // ctx.lineTo(0, -len); //grow upwards
  // branchPointCurve = Math.random() * 20 + 10;
  if (angle > 0) {
    ctx.bezierCurveTo(
      branchPointCurve,
      -len / 2,
      branchPointCurve,
      -len / 2,
      0,
      -len,
    );
  } else {
    ctx.bezierCurveTo(
      branchPointCurve,
      -len / 2,
      -branchPointCurve,
      -len / 2,
      0,
      -len,
    );
  }
  ctx.stroke(); //stroke the path

  //in pixels
  if (len < numLeaves) {
    ctx.beginPath();
    ctx.arc(0, -len, 10, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  drawTree(
    0,
    -len,
    len * 0.75,
    angle + curve,
    branchWidth * 0.6,
    branchColor,
    leavesColor,
    numLeaves,
  );
  drawTree(
    0,
    -len,
    len * 0.75,
    angle - curve,
    branchWidth * 0.6,
    branchColor,
    leavesColor,
    numLeaves,
  );

  ctx.restore();
}

drawTree(startX, startY, len, angle, branchWidth, branchColor, leavesColor);

function generateRandomTree() {
  const { width, height } = canvas;
  startX = width / 2;
  startY = height - 80;
  len = Math.floor(Math.random() * 100) + 100;
  angle = 0;
  branchWidth = Math.floor(Math.random() * 30) + 5;
  branchColor = `rgba(${Math.random() * 255}, ${Math.random() *
    255}, ${Math.random() * 255})`;
  leavesColor = `rgba(${Math.random() * 255}, ${Math.random() *
    255}, ${Math.random() * 255})`;
  curve = Math.random() * 10 + 10;
  branchPointCurve = Math.random() * 50;
  generateButton.style.background = branchColor;

  ctx.clearRect(0, 0, width, height);
  updateForm();
  drawTree(startX, startY, len, angle, branchWidth, branchColor, leavesColor);
}

function updateForm() {
  document.querySelector('#branchWidth').value = branchWidth;
  document.querySelector('#angle').value = angle;
  document.querySelector('#len').value = len;
  document.querySelector('#leavesLength').value = -numLeaves;
}

function onChange({ target }) {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
  let { value } = target;
  value = Number(value);
  switch (target.id) {
    case 'branchWidth':
      branchWidth = value;
      break;
    case 'angle':
      angle = value;
      break;
    case 'len':
      len = value;
      break;
    case 'leavesLength':
      numLeaves = -value;
      break;
  }
  drawTree(
    startX,
    startY,
    len,
    angle,
    branchWidth,
    branchColor,
    leavesColor,
    numLeaves,
  );
}
