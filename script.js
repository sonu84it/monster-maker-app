const canvas = document.getElementById('monsterCanvas');
const ctx = canvas.getContext('2d');

document.getElementById('generateBtn').addEventListener('click', generateMonster);
document.getElementById('downloadBtn').addEventListener('click', downloadMonster);

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMonster() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bodyShapes = ['circle', 'square', 'triangle'];
  const eyeStyles = ['normal', 'happy', 'angry'];
  const mouthStyles = ['smile', 'frown', 'open'];
  const colors = ['#71c7ec', '#f5b942', '#e15b9c', '#98de5b'];

  const body = randomChoice(bodyShapes);
  const eyes = randomChoice(eyeStyles);
  const mouth = randomChoice(mouthStyles);
  const color = randomChoice(colors);

  drawBody(body, color);
  drawEyes(eyes);
  drawMouth(mouth);
}

function drawBody(type, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (type === 'circle') {
    ctx.arc(100, 110, 80, 0, Math.PI * 2);
  } else if (type === 'square') {
    ctx.rect(30, 40, 140, 140);
  } else if (type === 'triangle') {
    ctx.moveTo(100, 30);
    ctx.lineTo(170, 170);
    ctx.lineTo(30, 170);
    ctx.closePath();
  }
  ctx.fill();
  ctx.stroke();
}

function drawEyes(style) {
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  // Left eye
  ctx.beginPath();
  ctx.arc(70, 90, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Right eye
  ctx.beginPath();
  ctx.arc(130, 90, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#000';
  if (style === 'normal') {
    ctx.beginPath();
    ctx.arc(70, 90, 5, 0, Math.PI * 2);
    ctx.arc(130, 90, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (style === 'happy') {
    ctx.beginPath();
    ctx.arc(70, 90, 5, 0, Math.PI * 2);
    ctx.arc(130, 90, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.arc(70, 85, 3, 0, Math.PI * 2);
    ctx.arc(130, 85, 3, 0, Math.PI * 2);
    ctx.stroke();
  } else if (style === 'angry') {
    ctx.save();
    ctx.translate(70, 90);
    ctx.rotate(-0.5);
    ctx.beginPath();
    ctx.rect(-5, -2, 10, 4);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(130, 90);
    ctx.rotate(0.5);
    ctx.beginPath();
    ctx.rect(-5, -2, 10, 4);
    ctx.fill();
    ctx.restore();
  }
}

function drawMouth(style) {
  ctx.strokeStyle = '#333';
  ctx.fillStyle = '#333';
  ctx.lineWidth = 2;
  if (style === 'smile') {
    ctx.beginPath();
    ctx.arc(100, 130, 30, 0, Math.PI);
    ctx.stroke();
  } else if (style === 'frown') {
    ctx.beginPath();
    ctx.arc(100, 150, 30, Math.PI, Math.PI * 2);
    ctx.stroke();
  } else if (style === 'open') {
    ctx.beginPath();
    ctx.arc(100, 140, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

function downloadMonster() {
  const link = document.createElement('a');
  link.download = 'monster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Generate one on load
generateMonster();
