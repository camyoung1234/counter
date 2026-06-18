class Counter {
    constructor(suffix, storageKey) {
        this.storageKey = storageKey;
        this.count = parseInt(localStorage.getItem(this.storageKey)) || 0;

        this.display = document.getElementById(`count-display-${suffix}`);
        this.plusBtn = document.getElementById(`plus-btn-${suffix}`);
        this.minusBtn = document.getElementById(`minus-btn-${suffix}`);
        this.resetBtn = document.getElementById(`reset-btn-${suffix}`);

        this.init();
    }

    init() {
        this.plusBtn.addEventListener('click', () => this.increment());
        this.minusBtn.addEventListener('click', () => this.decrement());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    increment() {
        this.count++;
        this.updateDisplay();
    }

    decrement() {
        this.count--;
        this.updateDisplay();
    }

    reset() {
        this.count = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.count;
        localStorage.setItem(this.storageKey, this.count);
    }
}

// Initialize two counters
const counter1 = new Counter('1', 'counter-1');
const counter2 = new Counter('2', 'counter-2');

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
