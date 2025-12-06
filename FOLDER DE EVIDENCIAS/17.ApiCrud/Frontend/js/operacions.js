function CreateNewItem(event){
event.preventDefault();
const name = document.getElementById('newItemName').value;
const price = parseFloat(document.getElementById('newItemPrice').value);
const description = parseInt(document.getElementById('newItemStock').value);
const category_id = document.getElementById('newItemCategory').value;


    let id = category_id+1;

const newItem = {
    name: name,
    price: price,
    stock: description,
    category_id: category_id }


fetch('/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
})

.then(response => response.json())
.then(data => {
    console.log('Producto:', data);
   
   
})
.catch((error) => {
    console.error('Error al crear el producto', error);
})}