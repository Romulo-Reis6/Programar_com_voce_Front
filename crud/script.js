const itemsContainer = document.getElementById('items-container');
const clearDbBtn = document.getElementById('clear-db-btn');
const itemForm = document.getElementById('item-form');
const itemNameInput = document.getElementById('item-name');
const itemDescriptionTextarea = document.getElementById('item-description');

// Lista de objetos simulando dados iniciais
const itemsStorange = localStorage.getItem('items');
let items = itemsStorange !== null ? JSON.parse(itemsStorange) : [];

// Função para renderizar os itens na página
function renderItems() {
  itemsContainer.innerHTML = '';

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const name = document.createElement('h2');
    name.classList.add('name');
    name.textContent = item.name;

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = item.description;

    itemDiv.appendChild(name);
    itemDiv.appendChild(description);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
        document.querySelector('#form-btn').classList.toggle('hidden');
        const editBtnForm = document.querySelector('#form-btn-edit');
        editBtnForm.classList.toggle('hidden');
        editBtnForm.addEventListener('click', () => editItem(item.id));
    });

    itemDiv.appendChild(editBtn);

    // Botão de remover item
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn');
    removeBtn.textContent = 'Remover';
    removeBtn.addEventListener('click', () => removeItem(item.id));

    itemDiv.appendChild(removeBtn);

    itemsContainer.appendChild(itemDiv);
  });
}

// Função para adicionar novo item
function addItem(name, description) {
  const newItem = {
    id: Date.now(), // Simulação de ID único
    name: name,
    description: description
  };
  items.push(newItem);
  localStorage.setItem('items', JSON.stringify(items));
  renderItems();
}

function editItem(itemId) {
    const itemIndex = items.findIndex(item => item.id === itemId);
    const name = document.querySelector('#item-name')
    const description = document.querySelector('#item-description');
    
    const editedItem = {
        id: itemId,
        name: name.value,
        description: description.value
    }
    items.splice(itemIndex, 1, editedItem);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
    name.value = '';
    description.value = '';
    document.querySelector('#form-btn-edit').classList.toggle('hidden');
    document.querySelector('#form-btn').classList.toggle('hidden');
}

// Função para remover item
function removeItem(itemId) {
  items = items.filter(item => item.id !== itemId);
  localStorage.setItem('items', JSON.stringify(items));
  renderItems();
}

// Evento de submit do formulário para adicionar novo item
itemForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = itemNameInput.value.trim();
  const description = itemDescriptionTextarea.value.trim();
  if (name && description) {
    addItem(name, description);
    itemNameInput.value = '';
    itemDescriptionTextarea.value = '';
  }
});

// Evento de clique para limpar o banco de dados (localStorage)
clearDbBtn.addEventListener('click', function() {
  localStorage.removeItem('items');
  items = [];
  renderItems(); // Limpa os itens da página
});

// Renderizar itens iniciais
renderItems();