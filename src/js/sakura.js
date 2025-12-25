/**
 * Sakura Petal Generator
 */
export function initSakura() {
    const container = document.getElementById('sakura-container');
    if (!container) return;

    // Start immediately without scroll trigger
    startSakura(container);
}

function startSakura(container) {
    const petalCount = 12; // Adjusted count for single play
    let maxDuration = 0;

    for (let i = 0; i < petalCount; i++) {
        const duration = createPetal(container);
        if (duration > maxDuration) {
            maxDuration = duration;
        }
    }

    // Cleanup after animation ends (max duration + buffer)
    setTimeout(() => {
        container.innerHTML = '';
    }, (maxDuration + 10) * 1000);
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    // Randomize initial properties (smaller sizes)
    const size = Math.random() * 8 + 4; // 4px to 12px (Even smaller)
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 10 + 20; // 20s to 30s (Very slow)
    const delay = Math.random() * 10; // 0s to 10s (Spread out the start)
    const swayDuration = Math.random() * 4 + 4; // 4s to 8s

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s, ${swayDuration}s`;
    petal.style.animationDelay = `${delay}s, 0s`;

    container.appendChild(petal);

    return duration + delay;
}
