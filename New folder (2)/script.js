/* NAVBAR SCROLL EFFECT */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* EXPENSE TRACKER LOGIC */
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
    category: category.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();

  text.value = '';
  amount.value = '';
}

function addTransactionDOM(t) {
  const sign = t.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.className = t.amount < 0 ? 'minus' : 'plus';

  item.innerHTML = `
    ${t.text} (${t.category})
    <span>${sign}₹${Math.abs(t.amount)}</span>
    <button onclick="removeTransaction(${t.id})">✖</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  balance.innerText = `₹${amounts.reduce((a,b)=>a+b,0).toFixed(2)}`;
  income.innerText = `₹${amounts.filter(v=>v>0).reduce((a,b)=>a+b,0).toFixed(2)}`;
  expense.innerText = `₹${(amounts.filter(v=>v<0).reduce((a,b)=>a+b,0)*-1).toFixed(2)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

form.addEventListener('submit', addTransaction);
init();
