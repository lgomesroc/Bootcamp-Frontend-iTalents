class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.history = [];
    }

    addToResult(value) {
        this.currentValue += value;
        this.updateDisplay();
    }

    deleteLast() {
        this.currentValue = this.currentValue.slice(0, -1);
        this.updateDisplay();
    }

    setOperation(op) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculateResult();
        }
        this.operation = op;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    calculateResult() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;

        result = this.operation === '+' ? prev + current :
                 this.operation === '-' ? prev - current :
                 this.operation === '*' ? prev * current :
                 this.operation === '/' ? prev / current : '';
        
        this.history.push(`${this.previousValue} ${this.operation} ${this.currentValue} = ${result}`);
        this.currentValue = result;
        this.operation = null;
        this.previousValue = '';
        this.updateDisplay();
        this.updateHistory();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('result').value = this.currentValue;
    }

    updateHistory() {
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = this.history.map(entry => `<p>${entry}</p>`).join('');
    }
}

const calculator = new Calculator();
