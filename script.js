const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0, mouseY = 0;
const segments = [];
const numSegments = 15; // Menos segmentos pra um dragão mais compacto
const segmentLength = 20; // Distância entre ossos
const ribLength = 15; // Tamanho das "costelas"

// Inicializa os segmentos
for (let i = 0; i < numSegments; i++) {
    segments.push({ x: 0, y: 0 });
}

// Atualiza posição do mouse
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function drawDragonHead(x, y) {
    // Desenha uma cabeça estilizada de dragão
    ctx.save();
    ctx.translate(x, y);
    
    // Crânio
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke(); // Glow ciano

    // Olhos
    ctx.beginPath();
    ctx.arc(-5, -5, 3, 0, Math.PI * 2);
    ctx.arc(5, -5, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Chifres
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(-20, -25);
    ctx.moveTo(10, -10);
    ctx.lineTo(20, -25);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move o primeiro segmento pro mouse
    segments[0].x = mouseX;
    segments[0].y = mouseY;

    // Move os outros segmentos
    for (let i = 1; i < numSegments; i++) {
        const dx = segments[i].x - segments[i-1].x;
        const dy = segments[i].y - segments[i-1].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        segments[i].x = segments[i-1].x + Math.cos(angle) * segmentLength;
        segments[i].y = segments[i-1].y + Math.sin(angle) * segmentLength;
    }

    // Desenha a coluna vertebral
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    for (let i = 1; i < numSegments; i++) {
        ctx.lineTo(segments[i].x, segments[i].y);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Desenha as costelas
    for (let i = 1; i < numSegments; i++) {
        const dx = segments[i].x - segments[i-1].x;
        const dy = segments[i].y - segments[i-1].y;
        const angle = Math.atan2(dy, dx);
        const perpAngle = angle + Math.PI / 2; // Perpendicular à coluna

        // Costela esquerda
        ctx.beginPath();
        ctx.moveTo(segments[i].x, segments[i].y);
        ctx.lineTo(
            segments[i].x + Math.cos(perpAngle) * ribLength,
            segments[i].y + Math.sin(perpAngle) * ribLength
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Costela direita
        ctx.beginPath();
        ctx.moveTo(segments[i].x, segments[i].y);
        ctx.lineTo(
            segments[i].x - Math.cos(perpAngle) * ribLength,
            segments[i].y - Math.sin(perpAngle) * ribLength
        );
        ctx.stroke();
    }

    // Desenha a cabeça no último segmento
    drawDragonHead(segments[numSegments-1].x, segments[numSegments-1].y);

    requestAnimationFrame(animate);
}

animate();
