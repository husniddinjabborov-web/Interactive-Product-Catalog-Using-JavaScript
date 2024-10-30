document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('productImage').src = 'https://picsum.photos/300/200?random=2';
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const ratingValue = this.getAttribute('data-value');
            updateRating(ratingValue);
        });
    });
});

function updateRating(star, rating) {
    const stars = star.parentElement.querySelectorAll('.star');
    stars.forEach((s, index) => {
        s.classList.toggle('selected', index < rating);
        s.innerHTML = index < rating ? '⭐' : '☆';
    });
}

function addLike(button) {
    if (button.classList.contains('liked')) return;
    button.classList.add('liked');
    const likeCount = document.createElement('span');
    likeCount.classList.add('like-count', 'ms-2');
    likeCount.style.color = "white";
    likeCount.innerText = '1';
    button.appendChild(likeCount);
}
let cartCount = 0;
let cartItems = [];

function toggleCart(button) {
    const productName = button.closest('.card-body').querySelector('.card-title').innerText;
    const productImage = button.closest('.card').querySelector('.card-img-top').src;
    const productPrice = button.closest('.card-body').querySelector('.fw-bold.text-danger').innerText;
    const productDiscountPrice = button.closest('.card-body').querySelector('.discount-price')?.innerText || '';
    
    const existingAlert = document.querySelector('.alert');

    
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-dismissible', 'fade', 'show');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.width = '90%';
    alertDiv.style.maxWidth = '400px';


    if (button.innerText === "Savatchaga qo'shish") {
        button.innerText = "Savatchada";
        button.classList.replace('btn-primary', 'btn-success');
        alertDiv.classList.add('alert-success', 'text-center');
        alertDiv.innerHTML = `Mahsulot savatchaga qo'shildi.`;


        cartItems.push({
            name: productName,
            image: productImage,
            price: productPrice,
            discountPrice: productDiscountPrice
        });
        cartCount++;
    } else {
        button.innerText = "Savatchaga qo'shish";
        button.classList.replace('btn-success', 'btn-primary');
        alertDiv.classList.add('alert-warning', 'text-center');
        alertDiv.innerHTML = `Mahsulot savatchadan olindi.`;

    
        const itemIndex = cartItems.findIndex(item => item.name === productName);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            cartCount--;
        }
    }

   
    document.getElementById("cartCount").innerText = cartCount;
    updateCartDropdown();

    
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 500);
    }, 1000);
}

function updateCartDropdown() {
    const cartDropdown = document.querySelector('.dropdown-menu');
    cartDropdown.innerHTML = '';

    if (cartItems.length === 0) {
        cartDropdown.innerHTML = '<li class="dropdown-item-text savatchaDown">Savatcha bo\'sh</li>';
    } else {
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'dropdown-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <div style="display: flex;">
                    <img src="${item.image}" alt="${item.name}" style="width: 200px; height: auto; margin-right: 10px;">
                    <div>
                        <strong>${item.name}</strong><br>
                        <span class="text-muted discount-price">${item.discountPrice}</span>
                        <span>${item.price}</span><br><br><br>
                        <button type="submit" class="btn btn-primary">Sotib olish</button>
                    </div>
                </div>
            `;
            cartDropdown.appendChild(listItem);
        });
    }
}


function selectSize(element, imageUrl, imageId) {
    const badges = element.parentElement.querySelectorAll('.size-badge');
    badges.forEach(badge => {
        badge.classList.remove('selected-size');
    });
    element.classList.add('selected-size');
    document.getElementById(imageId).src = imageUrl;
}
function selectColor(element, imageUrl, imageId) {
    const badges = element.parentElement.querySelectorAll('.color-badge');
    badges.forEach(badge => {
        badge.classList.remove('selected-color');
    });
    element.classList.add('selected-color');
    document.getElementById(imageId).src = imageUrl;
}