const keys = document.querySelectorAll('.key');
const displayInput = document.getElementById('display-input');
const displayOutput = document.getElementById('display-output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value === "clear") {
			input = "";
			displayInput.textContent = "";
			displayOutput.textContent = "";
		} else if (value === "backspace") {
			input = input.slice(0, -1);
			displayInput.textContent = formatInput(input);
		} else if (value === "=") {
			let result = eval(formatForCalculation(input));
			displayOutput.textContent = formatOutput(result);
		} else if (value === "brackets") {
			if (input.indexOf("(") === -1 || (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))) {
				input += "(";
			} else if (input.indexOf("(") !== -1 && input.indexOf(")") === -1 || (input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))) {
				input += ")";
			}
			displayInput.textContent = formatInput(input);
		} else {
			if (validateInput(value)) {
				input += value;
				displayInput.textContent = formatInput(input);
			}
		}
	});
}

function formatInput(input) {
	return input.replace(/\*/g, ' x ').replace(/\//g, ' ÷ ');
}

function formatOutput(output) {
	return output.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function validateInput(value) {
	const lastChar = input.slice(-1);
	const operators = ["+", "-", "*", "/", "%"];

	if (value === "." && lastChar === ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(lastChar)) {
			input = input.slice(0, -1) + value;
			displayInput.textContent = formatInput(input);
			return false;
		}
	}
	return true;
}

function formatForCalculation(input) {
	return input.replace(/x/g, '*').replace(/÷/g, '/');
}
