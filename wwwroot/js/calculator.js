document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay('0');
    }

    function appendNumber(number) {
        if (currentInput === '0' || currentInput === 0) currentInput = '';
        if (currentInput.includes('.') && number === '.') return;
        currentInput += number;
        updateDisplay(currentInput);
    }

    function chooseOperation(selectedOperation) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = selectedOperation;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let calculation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case 'add':
                calculation = prev + current;
                break;
            case 'subtract':
                calculation = prev - current;
                break;
            case 'multiply':
                calculation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert("Division by zero is not allowed.");
                    return;
                }
                calculation = prev / current;
                break;
            default:
                return;
        }
        currentInput = calculation.toString();
        operation = null;
        previousInput = '';
        updateDisplay(currentInput);
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.num) {
                appendNumber(button.dataset.num);
            } else if (button.dataset.operation) {
                if (button.dataset.operation === 'clear') {
                    clear();
                } else if (button.dataset.operation === 'equals') {
                    calculate();
                } else {
                    chooseOperation(button.dataset.operation);
                }
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if ((e.key >= 0 && e.key <= 9) || e.key === '.') appendNumber(e.key);
        if (e.key === 'Enter' || e.key === '=') calculate();
        if (e.key === 'Backspace') clear();
        if (e.key === '+') chooseOperation('add');
        if (e.key === '-') chooseOperation('subtract');
        if (e.key === '*') chooseOperation('multiply');
        if (e.key === '/') chooseOperation('divide');
    });

    clear(); // Initial clear to reset display on page load
});
