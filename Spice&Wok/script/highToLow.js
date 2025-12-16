//indian ----------------------------------------------------------------------------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];
renderCart();

fetch('../xml/highToLow.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");

        const appetizers = xml.getElementsByTagName('Appetizers')[0].getElementsByTagName('product');
        const mains = xml.getElementsByTagName('MainCourse')[0].getElementsByTagName('product');
        const desserts = xml.getElementsByTagName('Desserts')[0].getElementsByTagName('product');

        const container1 = document.getElementById('Appetizers-container');
        const container2 = document.getElementById('Main-container');
        const container3 = document.getElementById('Dessert-container');

        renderProducts(appetizers, container1);
        renderProducts(mains, container2);
        renderProducts(desserts, container3);
    })
    .catch(error => {
        console.error("Error loading products.xml:", error);
    });

function renderProducts(products, container) {
    for (let i = 0; i < products.length; i++) {
        const item = products[i];
        const name = item.getElementsByTagName('name')[0].textContent;
        const price = item.getElementsByTagName('price')[0].textContent;
        const image = item.getElementsByTagName('image')[0].textContent;
        const description = item.getElementsByTagName('discription')[0].textContent;

        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';
        mealDiv.innerHTML = `
            <div class="text"> 
                ${name}<br>
                <div id="description">${description}</div><br>
                <span id="price">Rs. ${price}</span>
            </div>
            <button class="add-to-cart">Add to cart</button> 
            <img src="${image}" alt="${name}" id="meal-img">
        `;

        const button = mealDiv.querySelector('.add-to-cart');
        button.addEventListener('click', () => {
            addToCart(name, price, image);
            alert("Item added to cart");
        });

        container.appendChild(mealDiv);
    }
}

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price: parseFloat(price),
            image,
            quantity: 1
        });
    }
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="${item.name}" id="cart-img">
            </div>
            <div class="itemname">${item.name}</div>
            <div class="totalprice">Rs. <span class="price">${(item.price * item.quantity).toFixed(2)}</span></div>
            <div class="quantity">
                <span class="minus" data-index="${index}"><img src="images/minnus.svg" alt="remove_item"></span>
                <span class="noofitems">${item.quantity}</span>
                <span class="plus" data-index="${index}"><img src="images/plus.svg" alt="add_item"></span>
            </div>
            <hr class="hr-cart">
        `;
        cartContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `<p>Total: Rs. ${total.toFixed(2)}</p>`;

    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            cart[index].quantity++;
            saveCart();
            renderCart();
        });
    });

    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
            renderCart();
        });
    });
}
//filtering in menu page -------------------------------------------------------------------------------------------------------------------------------------------------
function navigatePage() {
    let dropdown = document.getElementById("sort");
    let selectedValue = dropdown.value;

    if (selectedValue) {
        window.location.href = selectedValue; 
    }
}

//add to cart--------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const sideCart = document.querySelector(".sidecart"); 
    const cartButton = document.getElementById("cart"); 
    const closeCartButton = document.querySelector(".close"); 
    
  
    function showCart() {
        sideCart.style.display = "block";
    }

    
    function hideCart() {
        sideCart.style.display = "none";
    }

    if (cartButton) cartButton.addEventListener("click", showCart);
    if (closeCartButton) closeCartButton.addEventListener("click", hideCart);
    


});



//sticky navigation bar------------------------------------------------------------------------------------------------------------------------------------------------
window.addEventListener("scroll", function(){
    const course = document.querySelector(".course");

    if(window.scrollY > 256){
        course.style.position = "fixed";
        course.style.top = "auto";
        course.style.bottom = "786px";
    }
    else{
        course.style.position = "absolute";
        course.style.top = "220px";
        course.style.bottom = "auto";
    }
});

//scroll to section-------------------------------------------------------------------------------------------------------------------------------------------------
function scrollToSection(sectionid) {
    const element = document.getElementById(sectionid);
    if (element) {
        const yOffset = -320; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}
