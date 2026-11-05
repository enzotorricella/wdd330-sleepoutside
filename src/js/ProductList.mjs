import { renderListWithTemplate } from "./utils.mjs";

const fallbackImages = {
  "989CG":
    "/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
  "880RT":
    "/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
};

function productCardTemplate(product) {
  const imagePath = product.Image.replace("../images/", "/images/");

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${imagePath}" alt="${product.Name}" data-product-id="${product.Id}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true,
    );

    this.listElement.querySelectorAll("img").forEach((image) => {
      image.addEventListener(
        "error",
        () => {
          const fallbackImage = fallbackImages[image.dataset.productId];
          if (fallbackImage) {
            image.src = fallbackImage;
          }
        },
        { once: true },
      );
    });
  }
}
