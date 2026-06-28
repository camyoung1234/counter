class Counter {
    constructor(suffix, storageKey) {
        this.storageKey = storageKey;
        this.targetStorageKey = `${storageKey}-target`;
        this.count = parseInt(localStorage.getItem(this.storageKey)) || 0;
        this.target = parseInt(localStorage.getItem(this.targetStorageKey)) || 0;

        this.display = document.getElementById(`count-display-${suffix}`);
        this.targetDisplay = document.getElementById(`target-display-${suffix}`);
        this.plusBtn = document.getElementById(`plus-btn-${suffix}`);
        this.minusBtn = document.getElementById(`minus-btn-${suffix}`);
        this.resetBtn = document.getElementById(`reset-btn-${suffix}`);

        this.init();
    }

    init() {
        this.plusBtn.addEventListener('click', () => this.increment());
        this.minusBtn.addEventListener('click', () => this.decrement());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.targetDisplay.addEventListener('input', () => {
            const cleanValue = this.targetDisplay.textContent.replace(/[^0-9]/g, '');
            this.target = parseInt(cleanValue) || 0;
            localStorage.setItem(this.targetStorageKey, this.target);
        });

        this.targetDisplay.addEventListener('focus', () => {
            const range = document.createRange();
            range.selectNodeContents(this.targetDisplay);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });

        this.targetDisplay.addEventListener('blur', () => {
            this.updateDisplay();
        });

        this.targetDisplay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.targetDisplay.blur();
            }
        });

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
        if (document.activeElement !== this.targetDisplay) {
            this.targetDisplay.textContent = this.target;
        }
        localStorage.setItem(this.storageKey, this.count);
        localStorage.setItem(this.targetStorageKey, this.target);
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
