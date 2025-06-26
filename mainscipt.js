window.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll(".nav-link");

    sections.forEach((section) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 100;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});


  document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
    link.addEventListener('click', function () {
      const nav = document.getElementById('navbarSupportedContent');
      const bsCollapse = bootstrap.Collapse.getInstance(nav);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  });


  const toggleButton = document.querySelector('.navbar-toggler');
  const toggleIcon = document.getElementById('toggle-icon');
  const navbarCollapse = document.getElementById('navbarSupportedContent');

  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
    });
  });

  document.getElementById('cart-icon')?.addEventListener('click', () => {
    bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
  });

  document.querySelector('form')?.addEventListener('submit', () => {
    bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
  });






const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add");
addCartButtons.forEach(button => { 
    button.addEventListener("click", event => {
        const productBox = event.currentTarget.closest(".card");
        addToCart(productBox);

    });
    
    });

    const cartContent = document.querySelector(".cart-content");
    const addToCart = productBox => {
        const productImgSrc = productBox.querySelector("img").src;
        const productTitle = productBox.querySelector(".carts-title").textContent;
        const productPrice = productBox.querySelector(".price").textContent;

        const cartItems = cartContent.querySelectorAll(".cart-product-title");

        for (let item of cartItems) {
            if (item.textContent.trim().toLowerCase() === productTitle.trim().toLowerCase()) {
                alert("This item is already in the cart.");
                return;
            }
        }
        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");
        cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
      <div class="cart-detail">
        <h2 class="cart-product-title">${productTitle} </h2>
        <span class="cart-price">₹${productPrice}</span>
        <div class="cart-quantity">
          <button id="decrement">-</button>
          <span class="number">1</span>
          <button id="increment">+</button>
        </div>
      </div>
      <i class='bx bx-trash cart-remove'></i>
      `;

      cartContent.appendChild(cartBox);
    

cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();

    updateCartCount(-1);

    updateTotalPrice();
});

cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = numberElement.textContent;

    if(event.target.id === "decrement" && quantity > 1) {
        quantity--;
        if (quantity === 1) {
            decrementButton.style.color = "#999";

        }
    }
    else if (event.target.id === "increment") {
        quantity++;
        decrementButton.style.color === "#333"
    }

    numberElement.textContent = quantity;

    updateTotalPrice();
});

updateCartCount(1);


updateTotalPrice();


};

const updateTotalPrice =  () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");

       const price = parseFloat(priceElement.textContent.replace("₹", "").trim());
        const quantity = parseInt(quantityElement.textContent);
        
        total += price * quantity;

    });

    totalPriceElement.textContent = `₹${total}`;
};

let cartItemCount = 0;

const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("your cart is empty. please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    
});

 function goToCheckout() {
      window.location.href = "checkout.html";
    }


const buyNowButtons = document.querySelectorAll(".bttn-buyy");

buyNowButtons.forEach(button => {
  button.addEventListener("click", () => {
    const cardBody = button.closest(".card-body");
    const titleElement = cardBody.querySelector(".carts-title");

    if (titleElement) {
      const productTitle = titleElement.textContent.trim();
      alert(`Thank you for choosing: ${productTitle}`);
    } else {
      alert("Thank you for your purchase!");
    }
  });
});

 const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert("The message was sent successfully!");
    form.reset();
    
  });



 document.addEventListener("DOMContentLoaded", function () {
  const toggleIcon = document.getElementById("toggle-icon");
  const navbarCollapse = document.getElementById("navbarSupportedContent");

  if (toggleIcon && navbarCollapse) {
    navbarCollapse.addEventListener("show.bs.collapse", function () {
      toggleIcon.textContent = "✖";
    });

    navbarCollapse.addEventListener("hide.bs.collapse", function () {
      toggleIcon.textContent = "≡";
    });
  }
});


function goToCheckout(productTitle = "", productPrice = "") {
  const cartBoxes = document.querySelectorAll(".cart-box");
  if (cartBoxes.length > 0) {
    
    let productList = [];
    let total = 0;

    cartBoxes.forEach(cartBox => {
      const title = cartBox.querySelector(".cart-product-title").textContent.trim();
      const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace("₹", "").replace(",", "").trim());
      const quantity = parseInt(cartBox.querySelector(".number").textContent);

      productList.push(`${title} x${quantity}`);
      total += price * quantity;
    });

    sessionStorage.setItem("productName", productList.join(", "));
    sessionStorage.setItem("totalPrice", `₹${total}`);
  } else {
    
    sessionStorage.setItem("productName", productTitle);
    sessionStorage.setItem("totalPrice", `₹${productPrice}`);
  }

  window.location.href = "checkout.html";
}



const buyNowButtonss = document.querySelectorAll(".bttn-buyy");

buyNowButtonss.forEach(button => {
  button.addEventListener("click", () => {
    const cardBody = button.closest(".card-body");
    const title = cardBody.querySelector(".carts-title").textContent.trim();
    const price = cardBody.querySelector(".price").textContent.replace(/[^\d]/g, ""); 

    goToCheckout(title, price); 
  });
});
