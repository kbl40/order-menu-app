import { menuArray } from './data.js'

const modal = document.getElementById('modal')
const orderForm = document.getElementById('order-form')

let hasPizza = false
let hasBurger = false
let hasBeer = false

// Event listener for 'clicks' to add or remove order items
document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    } else if(e.target.id === "order-btn") {
        handleOrderClick()
    }
})

// Function to handle adding an item to an order
function handleAddClick(menuId) {
    //document.getElementById('order-summary-area').classList.add('flex')
    document.getElementById('order-summary-area').classList.remove('hidden')
    
    console.log(menuId)
    if (menuId === "0") {
        menuArray[0].quantity += 1
        hasPizza = true
    } else if (menuId === "1") {
        menuArray[1].quantity += 1
        hasBurger = true
    } else if (menuId === "2") {
        menuArray[2].quantity += 1
        hasBeer = true
    }
    
    renderOrder()
}

// Function to handle removing items from an order
function handleRemoveClick(menuId) {
    console.log(menuId)
    if (menuId === "0") {
        menuArray[0].quantity = 0
        hasPizza = false
    } else if (menuId === "1") {
        menuArray[1].quantity = 0
        hasBurger = false
    } else if (menuId === "2") {
        menuArray[2].quantity = 0
        hasBeer = false
    }
    
    let totalQuantity = menuArray[0].quantity + menuArray[1].quantity + menuArray[2].quantity
    if (totalQuantity === 0) {
        document.getElementById('order-summary-area').classList.remove('flex')
        document.getElementById('order-summary-area').classList.add('hidden')
    }
    
    renderOrder()
}

function handleOrderClick() {
    console.log("Click")
    modal.style.display = 'inline'
}

orderForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const orderFormData = new FormData(orderForm)
    const fullName = orderFormData.get('fullName')
    
    modal.style.display = 'none'
    
    let orderOutputHmtl = `
    <div class="thank-you-message">
        <p>Thanks, ${fullName}! Your order is on its way!</p>
    </div>
    `
    
    document.getElementById('order-summary-area').innerHTML = orderOutputHmtl
    
    orderForm.reset()
})

// Programmatically generate interactive menu html
function getOrderInputHtml() {
    let inputHtml = ''
    let ingredientString = ''
    
    menuArray.forEach(function(menuItem) {
        menuItem.ingredients.forEach(function(ingredient) {
            ingredientString += ingredient + ', '
        })
        const stringLength = ingredientString.length
        ingredientString = ingredientString.slice(0, stringLength - 2)
        
        inputHtml += `
            <div class="menu-item">
                <div class="menu-item-inner">
                    <div class="menu-item-container">
                        <p class="menu-img">${menuItem.emoji}</p>
                        <div class="menu-item-info">
                            <h2 class="menu-item-title">${menuItem.name}</h2>
                            <p class="menu-item-ingredients">${ingredientString}</p>
                            <p class="menu-item-price">$${menuItem.price}</p>
                        </div>
                    </div>
                    <span class="menu-item-add">
                        <i class="fa-solid fa-plus" data-add="${menuItem.id}"></i>
                    </span>
                </div>
            </div>
        `
        ingredientString = ''
    })
    return inputHtml
}

// 
function getOrderOutputHtml() {
    let outputHtml = '<h2 class="order-section-title">Your Order</h2>'
    let totalPrice = 0
    
    menuArray.forEach(function(item) {
        totalPrice += item.price * item.quantity
        
        if (item.quantity != 0) {
            outputHtml += `
                <div class="order-item" id="item-${item.id}">
                    <div class="order-item-controls">
                        <span class="menu-item-title">${item.name}</span>
                        <span class="remove-item" data-remove="${item.id}">Remove</span>
                    </div>
                    <p class="price">$${item.price * item.quantity}</p>
                </div>
            `
        }
        
    })
    outputHtml += `
        <div class="order-summary">
            <span class="order-summary-text">Total Price:</span>
            <span class="price">$${totalPrice}</span>
        </div>
        <button class="order-btn" id="order-btn">Complete order</button>
    `
    return outputHtml
}

function render() {
    document.getElementById('order-input-area').innerHTML = getOrderInputHtml()
}

function renderOrder() {
    document.getElementById('order-summary-area').innerHTML = getOrderOutputHtml()
}

render()