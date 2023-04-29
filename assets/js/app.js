var contentBox = document.querySelector('#main-content');
var imgViewerElement = document.querySelector('.image-viewer');
var overlayElement = document.querySelector('.overlay')
var imgProduct = document.getElementsByClassName('img');
var apiLink = 'https://dummyjson.com/products';
var imageProduct = '';
var closeBtn = document.getElementById('close')

fetch(apiLink)
.then(function(apiContent) {
    return apiContent.json();
})
.then(function(products) {
    var productsArr = products.products
    loadItem(productsArr);
})

function loadItem(arr) {
    var htmls = arr.map(function(item, index) {
        var title = item.title;
        var brand = item.brand;
        var dsc = item.description;
        var price = item.price;
        var category = item.category;
        var discount = item.discountPercentage;
        var img = item.thumbnail;
        return `<div class="product">
        <div class="product-item discount">-${discount}%</div>
        <div class="product-img"><img class="img" src="${img}"></div>
        <div class="product-content">
        <div class="product-item title">${title}</div>
        <div class="product-item brand">${brand}</div>
        <div class="product-item category">${category}</div>
        <div class="product-item dsc">${dsc}</div>
        </div>
        <div class="product-footer">
        <div class="product-item price">$${price}</div>
        <div class="product-item btn">Buy</div>
        </div>
        </div>`


    })

    html = htmls.join(' ')
    contentBox.innerHTML = html;   

    arr.forEach(function(item, index) {
        var img = item.thumbnail;
        imgProduct[index].onclick = function(e) {
            imgViewerElement.classList.add('show');
            overlayElement.innerHTML = `<img src="${img}">`
        }
    })
    
    closeBtn.onclick = function(e) {
        imgViewerElement.classList.remove('show');
    }

    document.onkeyup = function(e) {
        if (e.which == 27) {
            imgViewerElement.classList.remove('show');
        }
    }
}

