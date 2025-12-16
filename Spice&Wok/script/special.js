let cart = [];

window.onload = function () {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart(); 
    }

    fetch('../xml/specials.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const products = xmlDoc.getElementsByTagName("product");
            const container = document.getElementById("specials-container");

            for (let i = 0; i < products.length; i++) {
                const name = products[i].getElementsByTagName("name")[0].textContent.trim();
                const price = parseFloat(products[i].getElementsByTagName("price")[0].textContent);
                const image = products[i].getElementsByTagName("image")[0].textContent.trim();

                const productDiv = document.createElement("div");
                productDiv.className = "product";
                productDiv.id = name;

                productDiv.innerHTML = `
                    <img src="${image}" alt="${name}" />
                    <div class="overlay">
                      <p class="product-name">${name}</p>
                      <button class="add-to-cart" data-name="${name}" data-price="${price}" data-image="${image}">Add to Cart</button>
                    </div>
                `;

                container.appendChild(productDiv);
            }

            addToCartButtons();
        })
        .catch(error => console.error("Error loading XML:", error));
};

function addToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            const image = this.getAttribute("data-image");

            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }
            alert("Item added to cart");
            saveCart();
            renderCart();
        });
    });
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "item";

        cartItem.innerHTML = `
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

        cartContainer.appendChild(cartItem);
    });

    setupQuantityButtons();
}

function setupQuantityButtons() {
    document.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            cart[index].quantity++;
            saveCart();
            renderCart();
        });
    });

    document.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
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


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
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

//reviews-------------------------------------------------------------------------------------------------------------------------------------------------------------
let reviews = [];
    let currentIndex = 0;

    function loadReviews() {
        fetch('../xml/reviews.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const reviewNodes = xml.getElementsByTagName("review");

                for (let i = 0; i < reviewNodes.length; i++) {
                    const text = reviewNodes[i].getElementsByTagName("text")[0].textContent;
                    const author = reviewNodes[i].getElementsByTagName("author")[0].textContent;
                    reviews.push({ text, author });
                }

                if (reviews.length > 0) {
                    displayReview();
                    setInterval(displayReview, 4000);
                }
            })
            .catch(error => {
                document.getElementById("reviewText").textContent = "Failed to load reviews.";
                console.error("Error loading XML:", error);
            });
    }

    function displayReview() {
        const review = reviews[currentIndex];
        const reviewBox = document.getElementById("reviewBox");
        reviewBox.style.opacity = 0;

        setTimeout(() => {
            document.getElementById("reviewText").textContent = `"${review.text}"`;
            document.getElementById("reviewAuthor").textContent = `— ${review.author}`;
            reviewBox.style.opacity = 1;
            currentIndex = (currentIndex + 1) % reviews.length;
        }, 500);
    }

    loadReviews();


    
//add to cart---------------------------------------------------------------------------------------------------------------------------------------------------------
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








