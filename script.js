const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllButton = document.getElementById('clear');
const filter = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  //   Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //   Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
  checkUI();
  itemInput.value = '';
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

function onClickClear(e) {
  const listButton = e.target.parentElement;
  if (listButton.classList.contains('remove-item')) {
    removeItem(listButton.parentElement);
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    checkUI();
  }
}

function clearAllList() {
  const items = itemList.querySelectorAll('li');
  items.forEach((item) => item.remove());
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
checkUI();
