// Initialize the shopping list array and load items from localStorage if available
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Get DOM elements
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const shoppingListContainer = document.getElementById('shoppingList');
const clearListButton = document.getElementById('clearListButton');

// Function to render the shopping list from the array
function renderShoppingList() {
  // Clear the existing list
  shoppingListContainer.innerHTML = '';

  // Render each item
  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    if (item.purchased) li.classList.add('purchased');

    // Create list content
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="actions">
        <button class="mark-purchased">Mark Purchased</button>
        <button class="edit-item">Edit</button>
        <button class="delete-item">Delete</button>
      </div>
    `;

    // Event listener to mark item as purchased
    li.querySelector('.mark-purchased').addEventListener('click', () => markAsPurchased(index));
    
    // Event listener to edit item
    li.querySelector('.edit-item').addEventListener('click', () => editItem(index));

    // Event listener to delete item
    li.querySelector('.delete-item').addEventListener('click', () => deleteItem(index));

    shoppingListContainer.appendChild(li);
  });

  // Save list to localStorage
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to add a new item to the list
function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false });
    itemInput.value = ''; // Clear the input field
    renderShoppingList();
  }
}

// Function to mark an item as purchased
function markAsPurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  renderShoppingList();
}

// Function to edit an item
function editItem(index) {
  const newName = prompt('Edit item:', shoppingList[index].name);
  if (newName) {
    shoppingList[index].name = newName.trim();
    renderShoppingList();
  }
}

// Function to delete an item
function deleteItem(index) {
  alert("Are you sure you want to delete the item!!");
  shoppingList.splice(index, 1);
  renderShoppingList();
}

// Function to clear the entire list
function clearList() {
  alert("Are you sure you want to clear item!!");
  shoppingList = [];
  renderShoppingList();
}

// Event listener for the "Add Item" button
addItemButton.addEventListener('click', addItem);

// Event listener for the "Clear List" button
clearListButton.addEventListener('click', clearList);

// Initial render of the shopping list
renderShoppingList();
