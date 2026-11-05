import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const tentDataSource = new ProductData("tents");
const productListElement = document.querySelector(".product-list");
const productList = new ProductList(
  "tents",
  tentDataSource,
  productListElement,
);

productList.init();
