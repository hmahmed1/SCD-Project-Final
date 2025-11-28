document.addEventListener("DOMContentLoaded", function () {
  var addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  var slidebar = document.getElementById("slidebar");
  var closeBtn = document.querySelector(".close-btn");
  var checkoutBtn = document.getElementById("checkout-btn");
  var itemNameDisplay = document.getElementById("item-name");
  var itemPriceDisplay = document.getElementById("item-price");
  var itemImage = document.getElementById("item-image");
  var quantityInput = document.getElementById("quantity");
  var flavorSelect = document.getElementById("flavor");
  var sliderAddToCartBtn = document.getElementById("slider-add-to-cart-btn");
  var cartCountDisplay = document.getElementById("cart-count");
  var cartItemsList = document.getElementById("cart-items-list");
  var cartBody = document.getElementById("cart-body");
  var cartTotal = document.getElementById("cart-total");
  var proceedToCheckoutBtn = document.getElementById("proceed-to-checkout-btn");

  // Retrieve cart data from localStorage or initialize as empty
  var cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  var itemData = {
    "Family Combo": { price: 29.99, image: "Menu_images/deal1.jpg" },
    "Pizza Party": { price: 15.99, image: "Menu_images/deal2.jpg" },
    "Party Platter": { price: 12.99, image: "Menu_images/deal3.jpg" },
    "Spring Rolls": { price: 4.99, image: "Menu_images/springroll.jpg" },
    "Garlic Bread": { price: 3.99, image: "Menu_images/garlicbread.jpg" },
    Bruschetta: { price: 5.49, image: "Menu_images/burschetta.jpg" },
    "Cheese Burger": { price: 7.99, image: "Menu_images/burger1.jpg" },
    "Bacon Burger": { price: 8.99, image: "Menu_images/burger2.jpg" },
    "Veggie Burger": { price: 6.99, image: "Menu_images/veggieburger.jpg" },
    Margherita: { price: 9.99, image: "Menu_images/pizza1.jpg" },
    Pepperoni: { price: 11.99, image: "Menu_images/pizza2.jpg" },
    "Veggie Delight": { price: 10.99, image: "Menu_images/pizza3.jpg" },
    "Spaghetti Bolognese": { price: 12.99, image: "Menu_images/pasta 1.jpg " },
    "Fettuccine Alfredo": { price: 13.99, image: "Menu_images/pasta2.jpg" },
    "Carbonara": { price: 14.99, image: "Menu_images/pasta3.jpg" },
    "Fried Rice": { price: 8.99, image: "Menu_images/rice1.jpg" },
    "Chicken Biryani": { price: 10.99, image: "Menu_images/rice2.jpg" },
    "Vegetable Pulao": { price: 7.99, image: "Menu_images/rice3.jpg" },
    "Chocolate Cake": { price: 5.99, image: "Menu_images/dessert1.jpg" },
    "Ice Cream Sundae": { price: 4.99, image: "Menu_images/dessert2.jpg" },
    "Cheesecake": { price: 6.99, image: "Menu_images/dessert3.jpg" },
    "Coffee": { price: 2.99, image: "Menu_images/coffee.jpg" },
    "Fresh Juice": { price: 3.99, image: "Menu_images/Drink3.jpg" },
    "Soda": { price: 1.99, image: "Menu_images/soda.jpg" },
    "BBQ Ribs": { price: 15.99, image: "Menu_images/bbqribs.jpg" },
    "BBQ Chicken": { price: 12.99, image: "Menu_images/bbq chicken.jpg" },
    "Grilled Veggies": { price: 10.99, image: "Menu_images/grillveggies.jpg" },
  };

  // Update cart count display
  function updateCartCount() {
    cartCountDisplay.textContent = cartData.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }

  // Save cart data to localStorage
  function saveCartData() {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  // Render cart items (for cart.html)
  function renderCart() {
    if (!cartBody || !cartTotal) return;

    cartBody.innerHTML = ""; // Clear cart body
    let total = 0;

    cartData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
        <td><button onclick="removeItem(${index})" style="color: white; background-color: red; border: none; padding: 5px 10px; cursor: pointer;">Remove</button></td>
      `;
      cartBody.appendChild(row);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Remove item from cart (for cart.html)
  window.removeItem = function (index) {
    cartData.splice(index, 1);
    saveCartData();
    renderCart();
    updateCartCount();
  };

  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      var itemName = event.target.getAttribute("data-item");

      if (itemData[itemName]) {
        itemNameDisplay.textContent = itemName;
        itemPriceDisplay.textContent =
          "$" + itemData[itemName].price.toFixed(2);
        slidebar.style.width = "300px"; // Slidebar opens from the right
        itemImage.src = itemData[itemName].image;
        itemImage.alt = itemName;
      } else {
        console.error("Item data not found for: ", itemName);
      }
    });
  });

  if (sliderAddToCartBtn) {
    sliderAddToCartBtn.addEventListener("click", function () {
      var itemName = itemNameDisplay.textContent;
      var itemPrice = parseFloat(itemData[itemName].price);
      var itemQuantity = parseInt(quantityInput.value) || 1; // Default to 1 if empty
      var itemFlavor = flavorSelect.value || "Default";

      var cartItem = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        flavor: itemFlavor,
        image: itemData[itemName].image,
      };

      // Check if item already exists in cart and update quantity
      var existingItem = cartData.find((item) => item.name === itemName);
      if (existingItem) {
        existingItem.quantity += itemQuantity;
      } else {
        cartData.push(cartItem);
      }

      saveCartData();
      updateCartCount();
      slidebar.style.width = "0"; // Close the slidebar
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      slidebar.style.width = "0";
    });
  }

    // Check if the user is logged in
    function isUserLoggedIn() {
      const loggedInUser = localStorage.getItem("loggedInUser");
      return loggedInUser !== null; // If loggedInUser exists in localStorage, the user is logged in
    }
  
    // Redirect to login page if not logged in
    function handleCheckout() {
      if (!isUserLoggedIn()) {
        // Save intended redirect path to localStorage
        localStorage.setItem("redirectPath", "/checkout");
        alert("Please log in before proceeding to checkout.");
        window.location.href = "/login"; // Redirect to the login page
      } else {
        window.location.href = "/checkout"; // Redirect to the checkout page if logged in
      }
    }
  
    // Attach checkout event listeners
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", handleCheckout);
    }
  
    if (proceedToCheckoutBtn) {
      proceedToCheckoutBtn.addEventListener("click", handleCheckout);
    }


  // Initialize the cart count on page load
  updateCartCount();

  // Render the cart if on cart.html
  renderCart();
});
