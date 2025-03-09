const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const filter = document.getElementById('filter');

// On page reload display items from local storage to the DOM
function displayItems() {
  let itemLocalStorage = getItemFromLocalStorage();
  itemLocalStorage.forEach((item) => addItemDOM(item));
  checkUI();
}

function addItem(e) {
  e.preventDefault();
  let newItem = itemInput.value;
  //   Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  newItem = newItem[0].toUpperCase() + newItem.slice(1);
  //   Add new item to DOM
  addItemDOM(newItem);
  // Add new item to local storage
  addItemLocalStorage(newItem);
  checkUI();
  itemInput.value = '';
}

function addItemDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(buttonClass) {
  const button = document.createElement('button');
  button.className = buttonClass;
  const icon = addIcon('fa-solid fa-square-minus');
  button.appendChild(icon);
  return button;
}
function addIcon(iconClass) {
  const icon = document.createElement('i');
  icon.className = iconClass;
  return icon;
}

function addItemLocalStorage(item) {
  const itemLocalStorage = getItemFromLocalStorage();
  itemLocalStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemLocalStorage));
}

function getItemFromLocalStorage() {
  let itemFromLocalStorage;
  if (localStorage.getItem('items') === null) {
    itemFromLocalStorage = [];
  } else {
    itemFromLocalStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemFromLocalStorage;
}

// Remove each item from DOM
function onClickClear(e) {
  const listButton = e.target.parentElement;
  if (listButton.classList.contains('remove-item')) {
    removeItem(listButton.parentElement);
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();
    // Remove item from local storage
    removeItemFromLocalStorage(item.textContent);
    checkUI();
  }
}
// Remove each item from local storage
function removeItemFromLocalStorage(item) {
  let itemLocalStorage = getItemFromLocalStorage();
  itemLocalStorage = itemLocalStorage.filter((i) => i !== item);
  if (itemLocalStorage.length === 0) {
    localStorage.removeItem('items');
  } else {
    localStorage.setItem('items', JSON.stringify(itemLocalStorage));
  }
}
function clearAllList() {
  // Remove all elements from DOM
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => item.remove());
  // Remove all elements from local storage
  localStorage.removeItem('items');
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearAllButton.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearAllButton.style.display = 'block';
    filter.style.display = 'block';
  }
}

function onFocus() {
  itemInput.style.outline = '2px solid #ade8f4';
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', onClickClear);
clearAllButton.addEventListener('click', clearAllList);
itemInput.addEventListener('focus', onFocus);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
