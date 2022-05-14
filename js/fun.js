'use strict'

let startBtn = document.getElementById('start'),

    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    
    
    expensesItem = document.getElementsByClassName('expenses-item'),

    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),

    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],

    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
    
let money, time;

expensesItemBtn.disabled = true; //по началу разрешаем плокировку кнопок
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

startBtn.addEventListener('click', function(){ //мы кликаем на кнопку и запускается...

    time = prompt("Введите дату в формате YYYY-MM-DD", ""); //спрашиваем про время
    money = +prompt("Ваш бюджет на месяц?", ""); //про деньги

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", ""); //проверяем на численное значение
    }

    appData.budget = money; //записываем в масштабный объект
    appData.timeData = time; //аналогично
    budgetValue.textContent = money.toFixed(); //записываем в графу доход + округляем


    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;// но тут мы после главной разрешаем им нажиматься
});

expensesItemBtn.addEventListener('click', function(){
    let sum = 0; //все наши ценники

    for (let i = 0; i < expensesItem.length; i++) { // c  помощью expensesItem.length получим количесвто элементов в пс массиве
        let a = expensesItem[i].value, // все начнется с 0 элемента [i]
            b = expensesItem[++i].value; //++i мы получим новое было 0 станет 1

        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b; //тут мы проверяем опять
            sum += +b;//к сумме прибавляем каждый раз b
        } else {
            i = i - 1;
        }

    }
    expensesValue.textContent = sum; //помещаем сумму в этот раздельчик
});

optionalExpensesBtn.addEventListener('click', function() {

    for (let i = 0; i <= optionalExpensesItem.length; i++) { //пока не закончатся делаются
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt; //в масштабный объект
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ',  '; 
    }; // из аппдаты и каждый следующий элемент + ,
});

countBudgetBtn.addEventListener('click', function(){

    if (appData.budget != undefined) { //если не будет известен бюджет
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;//учли и обяз затраты
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Ошибочка...!";
        }
    } else { //то это напишется там
        dayBudgetValue.textContent = 'Произошла ошибка(';
        alert('Для начала введите ваш бюджет на месяц. Нажмите кнопку "Начать расчет"');
    } 
});

chooseIncome.addEventListener('input', function(){ //вводя их мы сразу справа получим
    let items =  chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
 
});

checkSavings.addEventListener('click', function(){ //для кнопки 
    if (appData.savings == true){ //если он стоит тру то надо выкл.
        appData.savings = false; //превращаем в фолс
    } else {
        appData.savings = true; //если и это нет то обратно)
    }
});

chooseSum.addEventListener('input', function(){
    if (appData.savings == true) {  // знак сравнения ==
        let sum = +chooseSum.value, //то что вводится сразу записывается в сум
            percent = +choosePercent.value;
    
        appData.monthIncome = (sum / 100 / 12 * percent); //для месяца
        appData.yearIncome = (sum / 100  * percent); //для года

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);//округляем до 1
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1); // цифры после ,

    } 
});

choosePercent.addEventListener('input', function(){
    if (appData.savings == true) {// знак сравнения ==
        let sum = +chooseSum.value, //то что вводится сразу записывается в сум
        percent = +choosePercent.value;

    appData.monthIncome = (sum / 100 / 12 * percent);
    appData.yearIncome = (sum / 100  * percent);

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    } 
});


let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [], //[]- Так как это массив а не объект
    timeData: time,
    savings: false, //не ставим ; так как правило
};
