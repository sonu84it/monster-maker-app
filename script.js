const canvas = document.getElementById('monsterCanvas');
const ctx = canvas.getContext('2d');

document.getElementById('generateBtn').addEventListener('click', generateMonster);
document.getElementById('downloadBtn').addEventListener('click', downloadMonster);

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMonster() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bodyShapes = ['circle', 'square', 'triangle', 'oval', 'diamond', 'star', 'blob'];
  const eyeStyles = ['normal', 'happy', 'angry', 'cross', 'spiral', 'sleepy'];
  const mouthStyles = ['smile', 'frown', 'open', 'crooked', 'fangs', 'grimace'];
  const colors = ['#71c7ec', '#f5b942', '#e15b9c', '#98de5b', '#ff6666', '#9966ff', '#66ff66', '#666666', '#cc0000'];
  const hornStyles = ['curved', 'straight', 'stubby'];

  const body = randomChoice(bodyShapes);
  const eyes = randomChoice(eyeStyles);
  const mouth = randomChoice(mouthStyles);
  const color = randomChoice(colors);
  const horns = randomChoice(hornStyles);

  drawBody(body, color);
  drawHorns(horns);
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
  } else if (type === 'oval') {
    ctx.ellipse(100, 110, 70, 90, 0, 0, Math.PI * 2);
  } else if (type === 'diamond') {
    ctx.moveTo(100, 30);
    ctx.lineTo(170, 110);
    ctx.lineTo(100, 190);
    ctx.lineTo(30, 110);
    ctx.closePath();
  } else if (type === 'star') {
    const points = 5;
    const outerRadius = 80;
    const innerRadius = 40;
    const cx = 100;
    const cy = 110;
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = cx + Math.cos(angle - Math.PI / 2) * r;
      const y = cy + Math.sin(angle - Math.PI / 2) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  } else if (type === 'blob') {
    ctx.moveTo(100, 30);
    ctx.bezierCurveTo(150, 20, 180, 60, 170, 100);
    ctx.bezierCurveTo(190, 160, 140, 200, 100, 190);
    ctx.bezierCurveTo(60, 200, 10, 160, 30, 100);
    ctx.bezierCurveTo(20, 60, 50, 20, 100, 30);
    ctx.closePath();
  }
  ctx.fill();
  ctx.stroke();
}

function drawHorns(style) {
  ctx.strokeStyle = '#333';
  ctx.fillStyle = '#333';
  ctx.lineWidth = 2;
  if (style === 'curved') {
    ctx.beginPath();
    ctx.moveTo(60, 40);
    ctx.quadraticCurveTo(50, 10, 70, 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(140, 40);
    ctx.quadraticCurveTo(150, 10, 130, 20);
    ctx.stroke();
  } else if (style === 'straight') {
    ctx.beginPath();
    ctx.moveTo(80, 40);
    ctx.lineTo(80, 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120, 40);
    ctx.lineTo(120, 10);
    ctx.stroke();
  } else if (style === 'stubby') {
    ctx.beginPath();
    ctx.moveTo(80, 40);
    ctx.lineTo(75, 20);
    ctx.lineTo(85, 20);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(120, 40);
    ctx.lineTo(115, 20);
    ctx.lineTo(125, 20);
    ctx.closePath();
    ctx.fill();
  }
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
  } else if (style === 'cross') {
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(65, 85); ctx.lineTo(75, 95);
    ctx.moveTo(75, 85); ctx.lineTo(65, 95);
    ctx.moveTo(125, 85); ctx.lineTo(135, 95);
    ctx.moveTo(135, 85); ctx.lineTo(125, 95);
    ctx.stroke();
  } else if (style === 'spiral') {
    const drawSpiral = (cx) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = i * 0.4;
        const r = 2 + i * 2;
        const x = cx + Math.cos(angle) * r;
        const y = 90 + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };
    ctx.strokeStyle = '#000';
    drawSpiral(70);
    drawSpiral(130);
  } else if (style === 'sleepy') {
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(60, 90); ctx.lineTo(80, 90);
    ctx.moveTo(120, 90); ctx.lineTo(140, 90);
    ctx.stroke();
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
  } else if (style === 'crooked') {
    ctx.beginPath();
    ctx.moveTo(70, 140);
    ctx.lineTo(130, 150);
    ctx.stroke();
  } else if (style === 'fangs') {
    ctx.beginPath();
    ctx.arc(100, 140, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(90, 140); ctx.lineTo(95, 150); ctx.lineTo(100, 140);
    ctx.moveTo(110, 140); ctx.lineTo(105, 150); ctx.lineTo(100, 140);
    ctx.fill();
  } else if (style === 'grimace') {
    ctx.beginPath();
    ctx.rect(70, 135, 60, 20);
    ctx.stroke();
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(80 + i * 12, 135);
      ctx.lineTo(80 + i * 12, 155);
      ctx.stroke();
    }
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
