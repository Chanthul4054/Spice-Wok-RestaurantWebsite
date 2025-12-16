
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


//add to cart -------------------------------------------------------------------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];
renderCart();

fetch('../xml/products.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");

        const appetizers = xml.getElementsByTagName('Appetizers')[0].getElementsByTagName('product');
        const mains = xml.getElementsByTagName('MainCourse')[0].getElementsByTagName('product');
        const desserts = xml.getElementsByTagName('Desserts')[0].getElementsByTagName('product');

        const container1 = document.getElementById('appetizers-container');
        const container2 = document.getElementById('main-container');
        const container3 = document.getElementById('dessert-container');

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
    alert("Item added to cart");
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



//show alert message-------------------------------------------------------------------------------------------------------------------------------------------------
function reviewSubmitAlert(){
    alert("review submitted successfully");
}
function newsletterSubscriptionAlert(){
    alert("Subscribed to newsletter successfully");
}
function orderSuccessfulAlert(){
    alert("Order placed successfully");
}

function promoCodeAlert(){
    const promoCode = document.getElementById("code").value;

    if(promoCode.length !== 0)
        alert("promo code applied successfully \n Your next order will be 10% off");
}

 

  //form validation------------------------------------------------------------------------------------------------------------------------------------------------------
 document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("payment-form");
    const cardSection = document.getElementById("card-details");
    const paypalSection = document.getElementById("paypal-details");

    const radios = document.querySelectorAll('input[name="payment"]');

    cardSection.style.display = "none";
    paypalSection.style.display = "none";

    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.value === "card") {
          cardSection.style.display = "block";
          paypalSection.style.display = "none";
        } else if (radio.value === "paypal") {
          cardSection.style.display = "none";
          paypalSection.style.display = "block";
        } else {
          cardSection.style.display = "none";
          paypalSection.style.display = "none";
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const number = document.getElementById("Number").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      const paymentMethod = document.querySelector('input[name="payment"]:checked');
      const terms = document.getElementById("terms").checked;

      if (!name || !number || !email || !address) {
        alert("Please fill in all required fields (Name, Phone, Email, Address).");
        return;
      }
      if (number.length !== 10) {
        alert("Phone number must be 10 digits.");
        return;
      }

  
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
      }

      if (paymentMethod.value === "card") {
        const cardNumber = document.getElementById("cardnumber").value.trim();
        const expiry = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!cardNumber || !expiry || !cvv) {
          alert("Please fill in all credit card details.");
          return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
          alert("Card number must be 16 digits.");
          return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
          alert("Expiry must be in MM/YY format.");
          return;
        }

        if (!/^\d{3}$/.test(cvv)) {
          alert("CVV must be 3 digits.");
          return;
        }
      }

      if (paymentMethod.value === "paypal") {
        const paypalEmail = document.getElementById("paypalEmail").value.trim();
        if (!paypalEmail) {
          alert("Please enter your PayPal email.");
          return;
        }
        if (!paypalEmail.match(emailPattern)) {
          alert("Please enter a valid PayPal email.");
          return;
        }
      }

      if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
      }

      alert("Payment submitted successfully! 🍽️");
      location.reload();
      form.submit(); 
      
    });
});


  






    













