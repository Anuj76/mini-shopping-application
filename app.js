class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  get totalAmount()
  {
    const sum=this.items.reduce((prevalue,currItem) =>{
      return prevalue+currItem.price;
    },0);
    return sum;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML=`<h2> Total: \$${this.totalAmount.toFixed(2)}</h2>`;
  }
  
  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    
    const orderNowBtn =cartEl.querySelector('button');
    orderNowBtn.addEventListener('click',()=>{
      if(this.totalAmount===0)
      {
        alert('YOUR CART IS EMPTY!');
      }
      else
      {
        alert('YOUR ORDER HAS BEEN PLACED.');
        console.log(this.items);
      }
    })
    
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'Pillow',
      'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
      'A soft pillow!',
      6.99
    ),
    new Product(
      'Carpet',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
      'A ancient carpet ',
      25.99
    ),
    new Product(
      'Bedsheet',
      'https://img1.exportersindia.com/product_images/bc-full/2021/3/6047400/double-bed-bedsheet-1616498805-5764796.jpeg',
      'Sleep well,live better',
      14.99
    ),
    new Product(
      'Watch',
      'https://www.titan.co.in/wps/wcm/connect/titan/844356e0-b759-4866-bc89-3e86bbd49c12/450x694_Midnight.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_90IA1H80OO8010QKMQAAEP2004-844356e0-b759-4866-bc89-3e86bbd49c12-nTD44Kk',
      'A Classic watch ',
      897.99
    ),
    new Product(
      'HP Laptop',
      'https://images.hindustantimes.com/tech/img/2021/12/17/1600x900/DSC_1300_1639757802261_1639757843934.jpg',
      'A laptop you can count on!',
      1200.99
    )
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  
  static addProductToCart(product) {
    this.cart.addProduct(product);
    alert("THE PRODUCT YOU HAVE BEEN SELECTED IS ADDED TO CART.")
  }
}

App.init();

