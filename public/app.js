// Initialize counter from localStorage or default to 0
let count = parseInt(localStorage.getItem('counter')) || 0;

const countDisplay = document.getElementById('count-display');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const resetBtn = document.getElementById('reset-btn');

function updateDisplay() {
    countDisplay.textContent = count;
    localStorage.setItem('counter', count);
}

plusBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});

minusBtn.addEventListener('click', () => {
    count--;
    updateDisplay();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

// Initial display update
updateDisplay();

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
