const socket = io();

socket.on('listChange', (data) => {
    console.log(data)
    updateList(data);
})

const listProducts = document.getElementById('listProducts');

const updateList = (list) => {
    listProducts.innerHTML = '';
    list.forEach((item) => {
        const product = document.createElement('div');
        product.innerHTML = `
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <p>Price: ${item.price}</p>
                        <p>id: ${item.id}</p>
                        <p>code :${item.code}</p>
                        <p>Stock:${item.stock}</p>
                    `;
        listProducts.appendChild(product);
    })
}