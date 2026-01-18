// JOMO EATERY - Order System JavaScript
// Simple, clean JavaScript for cart functionality

// Cart data
let cart = [];

// Menu items data
const menuItems = {
    'item-1': { name: 'Pasta Carbonara', price: 28.00, image: 'images/pasta_carbonara_1768749575350.png' },
    'item-2': { name: 'Grilled Chicken Steak', price: 32.00, image: 'images/grilled_chicken_1768749592405.png' },
    'item-3': { name: 'Gourmet Beef Burger', price: 26.00, image: 'images/beef_burger_1768749610325.png' },
    'item-4': { name: 'Fish & Chips', price: 30.00, image: 'images/grilled_chicken_1768749592405.png' },
    'item-5': { name: 'Chocolate Cake', price: 18.00, image: 'images/chocolate_cake_1768749625682.png' },
    'item-6': { name: 'Tiramisu', price: 16.00, image: 'images/tiramisu_1768749643750.png' },
    'item-7': { name: 'Butter Croissant', price: 8.00, image: 'images/croissant_1768749660024.png' },
    'item-8': { name: 'Cappuccino', price: 12.00, image: 'images/cappuccino_1768749675034.png' },
    'item-9': { name: 'Café Latte', price: 12.00, image: 'images/cappuccino_1768749675034.png' },
    'item-10': { name: 'Iced Latte', price: 13.00, image: 'images/iced_latte_1768749689942.png' },
    'item-11': { name: 'Mocha', price: 14.00, image: 'images/cappuccino_1768749675034.png' },
    // NEW ITEMS
    'item-12': { name: 'Ribeye Steak', price: 99.00, image: 'images/grilled_chicken_1768749592405.png' },
    'item-13': { name: 'Smoked Salmon Toast', price: 36.00, image: 'images/beef_burger_1768749610325.png' },
    'item-14': { name: 'Crispy Chicken & Waffle', price: 28.00, image: 'images/grilled_chicken_1768749592405.png' },
    'item-15': { name: 'Aglio Olio', price: 24.00, image: 'images/pasta_carbonara_1768749575350.png' },
    'item-16': { name: 'New York Cheesecake', price: 20.00, image: 'images/chocolate_cake_1768749625682.png' },
    'item-17': { name: 'Chocolate Brownie', price: 15.00, image: 'images/chocolate_cake_1768749625682.png' },
    'item-18': { name: 'Blueberry Muffin', price: 10.00, image: 'images/croissant_1768749660024.png' },
    'item-19': { name: 'Double Espresso', price: 8.00, image: 'images/cappuccino_1768749675034.png' },
    'item-20': { name: 'Iced Green Tea', price: 10.00, image: 'images/iced_latte_1768749689942.png' },
    'item-21': { name: 'Fresh Orange Juice', price: 15.00, image: 'images/iced_latte_1768749689942.png' }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    setupCartButtons();
    setupCheckoutForm();
    updateCartDisplay();
});

// Setup add to cart buttons
function setupCartButtons() {
    const checkboxes = document.querySelectorAll('.add-to-cart-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const itemId = this.id;

            if (this.checked) {
                addToCart(itemId);
            } else {
                removeFromCart(itemId);
            }
        });
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems[itemId];

    if (!item) return;

    // Check if item already in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: itemId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    updateCartDisplay();
    showNotification(`${item.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(itemId);
            // Uncheck the checkbox
            const checkbox = document.getElementById(itemId);
            if (checkbox) checkbox.checked = false;
        }

        updateCartDisplay();
    }
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart display
function updateCartDisplay() {
    const cartBody = document.querySelector('.cart-body');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalAmount = document.querySelector('.cart-total-amount');
    const cartEmpty = document.querySelector('.cart-empty');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update total
    const total = calculateTotal();
    cartTotalAmount.textContent = `RM ${total.toFixed(2)}`;

    // Show/hide empty cart message
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        // Remove all cart items
        const existingItems = cartBody.querySelectorAll('.cart-item');
        existingItems.forEach(item => item.remove());
    } else {
        cartEmpty.style.display = 'none';

        // Clear existing cart items
        const existingItems = cartBody.querySelectorAll('.cart-item');
        existingItems.forEach(item => item.remove());

        // Add cart items
        cart.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        </div>
                        <div class="cart-item-price">RM ${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeItemCompletely('${item.id}')" title="Remove">&times;</button>
                </div>
            `;

            cartBody.insertAdjacentHTML('beforeend', cartItemHTML);
        });
    }
}

// Remove item completely
function removeItemCompletely(itemId) {
    removeFromCart(itemId);
    const checkbox = document.getElementById(itemId);
    if (checkbox) checkbox.checked = false;
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-accent);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup checkout form
function setupCheckoutForm() {
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            if (cart.length === 0) {
                e.preventDefault();
                showNotification('Your cart is empty!');
            }
        });
    }

    // Handle place order button
    const placeOrderBtn = document.querySelector('a[href="#confirmation"]');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate form
            const form = document.querySelector('.checkout-form');
            const name = document.getElementById('co-name').value;
            const email = document.getElementById('co-email').value;
            const phone = document.getElementById('co-phone').value;
            const orderType = document.getElementById('co-type').value;
            const payment = document.getElementById('co-payment').value;

            if (!name || !email || !phone || !orderType || !payment) {
                showNotification('Please fill in all required fields!');
                return;
            }

            // Generate receipt
            generateReceipt(name, email, phone, orderType, payment);

            // Show confirmation
            window.location.href = '#confirmation';

            // Clear cart after a delay
            setTimeout(() => {
                cart = [];
                updateCartDisplay();
                // Uncheck all checkboxes
                document.querySelectorAll('.add-to-cart-checkbox').forEach(cb => cb.checked = false);
            }, 1000);
        });
    }
}

// Generate and download receipt
function generateReceipt(name, email, phone, orderType, paymentMethod) {
    const orderNumber = 'JE' + Date.now().toString().slice(-6);
    const orderDate = new Date().toLocaleString();
    const total = calculateTotal();
    const sst = total * 0.06; // 6% SST
    const serviceCharge = total * 0.10; // 10% service charge
    const grandTotal = total + sst + serviceCharge;

    // Create receipt HTML
    let receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Receipt - ${orderNumber}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .receipt {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #8B6F47;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #8B6F47;
            margin: 0;
            font-size: 2em;
        }
        .header p {
            color: #666;
            margin: 5px 0;
        }
        .order-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 4px;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .info-label {
            font-weight: bold;
            color: #8B6F47;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th {
            background: #8B6F47;
            color: white;
            padding: 12px;
            text-align: left;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }
        .text-right {
            text-align: right;
        }
        .totals {
            margin-left: auto;
            width: 300px;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
        }
        .grand-total {
            border-top: 2px solid #8B6F47;
            margin-top: 10px;
            padding-top: 10px;
            font-size: 1.2em;
            font-weight: bold;
            color: #8B6F47;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
        }
        .print-btn {
            background: #8B6F47;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin: 20px 0;
        }
        .print-btn:hover {
            background: #6B5237;
        }
        @media print {
            body {
                background: white;
                margin: 0;
                padding: 0;
            }
            .print-btn {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h1>JOMO EATERY</h1>
            <p>Kuala Nerus, Terengganu</p>
            <p>Phone: +60 9-XXX XXXX | Email: info@jomoeatery.com</p>
        </div>
        
        <h2 style="text-align: center; color: #8B6F47;">ORDER RECEIPT</h2>
        
        <div class="order-info">
            <div>
                <div class="info-item">
                    <span class="info-label">Order Number:</span> ${orderNumber}
                </div>
                <div class="info-item">
                    <span class="info-label">Date:</span> ${orderDate}
                </div>
                <div class="info-item">
                    <span class="info-label">Order Type:</span> ${orderType.toUpperCase()}
                </div>
            </div>
            <div>
                <div class="info-item">
                    <span class="info-label">Customer Name:</span> ${name}
                </div>
                <div class="info-item">
                    <span class="info-label">Email:</span> ${email}
                </div>
                <div class="info-item">
                    <span class="info-label">Phone:</span> ${phone}
                </div>
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Price</th>
                    <th class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Add cart items
    cart.forEach(item => {
        receiptHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">RM ${item.price.toFixed(2)}</td>
                    <td class="text-right">RM ${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
        `;
    });

    receiptHTML += `
            </tbody>
        </table>
        
        <div class="totals">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>RM ${total.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>SST (6%):</span>
                <span>RM ${sst.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Service Charge (10%):</span>
                <span>RM ${serviceCharge.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
                <span>GRAND TOTAL:</span>
                <span>RM ${grandTotal.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
            <p>Thank you for dining with us!</p>
            <p style="font-size: 0.9em; margin-top: 20px;">
                This is a computer-generated receipt.<br>
                For inquiries, please contact us at info@jomoeatery.com
            </p>
        </div>
        
        <div style="text-align: center;">
            <button class="print-btn" onclick="window.print()">Print Receipt</button>
        </div>
    </div>
</body>
</html>
    `;

    // Open receipt in new window
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .qty-btn {
        background: var(--color-accent);
        color: white;
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.2s;
    }
    
    .qty-btn:hover {
        background: var(--color-primary);
        transform: scale(1.1);
    }
    
    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 8px 0;
    }
    
    .cart-item-remove {
        background: #EF4444;
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        transition: all 0.2s;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    .cart-item-remove:hover {
        background: #DC2626;
        transform: scale(1.1);
    }
    
    .cart-item {
        position: relative;
    }
`;
document.head.appendChild(style);
