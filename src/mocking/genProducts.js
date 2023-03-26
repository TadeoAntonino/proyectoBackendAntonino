import { faker } from "@faker-js/faker";

faker.locale = "es";

function generateProducts() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: 300,
    id: faker.database.mongodbObjectId(),
    code: faker.random.alphaNumeric(12),
    category: faker.commerce.department(),
  };
}

const products = [];

for (let i = 0; i < 100; i++) {
  products.push(generateProducts());
}

generateProducts();
console.log(products);

export default function renderMockProducts(req, res) {
  res.render("mockingProducts", { products: products });
}
