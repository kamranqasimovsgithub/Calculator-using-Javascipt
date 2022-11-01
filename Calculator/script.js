const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingforSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click', function(e){
    let element = e.target;
    let value = element.value;

    if(!element.matches('button')) return;

    
    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':        
            handleOperator(value);
            break;
        case 'clear':
            clear();
            break;
        case '.':
            inputDecimal();
            break;
        default:
            inputNumber(element.value);
    };
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if( operator && waitingforSecondValue){
        operator = nextOperator;
        return;
    }
    if(firstValue === null){
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingforSecondValue = true;
    operator = nextOperator;

}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }else if(operator === '-'){
        return first - second;        
    }else if(operator === '*'){
        return first * second;        
    }else if(operator === '/'){
        return first / second;        
    }else{
        return second;       
    }
}

function inputNumber(num){
    if(waitingforSecondValue){
        displayValue = num;
        waitingforSecondValue = false;
    }else{
        displayValue = displayValue === '0' ? num : displayValue + num ;
    }
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
}


function clear(){
    displayValue = '0' ;
}