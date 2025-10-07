let display = document.getElementById('display');
let history = [];

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);

    const entry = `${expression} = ${result}`;
    history.push(entry);
    saveHistory();
    updateHistoryDisplay();

    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function saveHistory() {
  localStorage.setItem('calcHistory', JSON.stringify(history));
}

function loadHistory() {
  const saved = localStorage.getItem('calcHistory');
  if (saved) {
    history = JSON.parse(saved);
  }
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  history.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function toggleHistory() {
  const container = document.getElementById('historyContainer');
  const btn = document.getElementById('toggleHistoryBtn');

  if (container.style.display === 'none') {
    container.style.display = 'block';
    btn.textContent = 'Ocultar historial';
  } else {
    container.style.display = 'none';
    btn.textContent = 'Mostrar historial';
  }
}

loadHistory();

// Escuchar eventos de teclado
document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    // Números del 0 al 9 o punto
    appendToDisplay(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    event.preventDefault(); // Evita que se envíe un formulario si lo hay
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Escape') {
    clearDisplay();
  }
});