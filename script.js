document.addEventListener('DOMContentLoaded', () => {
    const binary1Input = document.getElementById('binary1');
    const binary2Input = document.getElementById('binary2');
    const operatorSelect = document.getElementById('operator');
    const calculateBtn = document.getElementById('calculate');
    const resultDisplay = document.getElementById('result');
    const errorContainer = document.getElementById('error');
    const historyList = document.getElementById('history-list');
    
    let calculationHistory = [];

    // Validate binary input
    function isValidBinary(binaryStr) {
        return /^[01]+$/.test(binaryStr);
    }

    // Convert binary to decimal
    function binaryToDecimal(binaryStr) {
        return parseInt(binaryStr, 2);
    }

    // Convert decimal to binary
    function decimalToBinary(decimalNum) {
        return decimalNum.toString(2);
    }

    // Perform calculation
    function calculate() {
        const binary1 = binary1Input.value;
        const binary2 = binary2Input.value;
        const operator = operatorSelect.value;

        // Clear previous error
        errorContainer.style.display = 'none';
        errorContainer.textContent = '';

        // Validate inputs
        if (!binary1 || !binary2) {
            showError('Please enter both binary numbers');
            return;
        }

        if (!isValidBinary(binary1) || !isValidBinary(binary2)) {
            showError('Please enter valid binary numbers (only 0s and 1s)');
            return;
        }

        const num1 = binaryToDecimal(binary1);
        const num2 = binaryToDecimal(binary2);
        let result;

        try {
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        showError('Division by zero is not allowed');
                        return;
                    }
                    result = Math.floor(num1 / num2);
                    break;
                default:
                    showError('Invalid operator selected');
                    return;
            }

            if (result < 0) {
                showError('Negative results are not supported in binary');
                return;
            }

            const binaryResult = decimalToBinary(result);
            resultDisplay.textContent = binaryResult;

            // Add to history
            const historyEntry = {
                operation: `${binary1} ${operator} ${binary2}`,
                result: binaryResult,
                timestamp: new Date().toLocaleTimeString()
            };
            calculationHistory.unshift(historyEntry);
            updateHistory();

        } catch (error) {
            showError('An error occurred during calculation');
            console.error(error);
        }
    }

    // Display error message
    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        resultDisplay.textContent = '00000000';
    }

    // Update history display
    function updateHistory() {
        historyList.innerHTML = '';
        calculationHistory.forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="history-operation">${entry.operation} = ${entry.result}</span>
                <span class="history-time">${entry.timestamp}</span>
            `;
            historyList.appendChild(li);
        });
    }

    // Event listeners
    calculateBtn.addEventListener('click', calculate);

    // Allow Enter key to trigger calculation
    [binary1Input, binary2Input].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
});