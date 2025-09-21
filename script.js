const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0, mouseY = 0;
const segments = []; // Partes do esqueleto
const numSegments = 20; // Quantos "ossos"
const segmentLength = 10;

// Inicializa os segmentos
for (let i = 0; i < numSegments; i++) {
    segments.push({ x: 0, y: 0 });
}

// Atualiza posição do mouse
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move o primeiro segmento pro mouse
    segments[0].x = mouseX;
    segments[0].y = mouseY;

    // Move os outros segmentos pro anterior
    for (let i = 1; i < numSegments; i++) {
        const dx = segments[i].x - segments[i-1].x;
        const dy = segments[i].y - segments[i-1].y;
        const angle = Math.atan2(dy, dx);
        segments[i].x = segments[i-1].x + Math.cos(angle) * segmentLength;
        segments[i].y = segments[i-1].y + Math.sin(angle) * segmentLength;
    }

    // Desenha o esqueleto (linhas brancas, tipo osso)
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    for (let i = 1; i < numSegments; i++) {
        ctx.lineTo(segments[i].x, segments[i].y);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Desenha "cabeça" (um círculo no final, tipo crânio de dragão)
    ctx.beginPath();
    ctx.arc(segments[numSegments-1].x, segments[numSegments-1].y, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'red'; // Ou imagem de crânio se quiser
    ctx.fill();

    requestAnimationFrame(animate);
}

animate();
