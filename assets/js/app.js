var contentBox = document.querySelector('#main-content');
var imgViewerElement = document.querySelector('.image-viewer');
var overlayElement = document.querySelector('.overlay')
var imgProduct = document.getElementsByClassName('img');
var apiLink = 'https://api.jsonbin.io/v3/b/644e56719d312622a354e9ad';
var imageProduct = '';
var closeBtn = document.getElementById('close')

function start() {
    getProduct(loadItem)
}


function getProduct(callback) {
    fetch(apiLink)
    .then(function(apiContent) {
        return apiContent.json();
    })
    .then(callback);
};

function createProduct(data, callback) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(apiLink, options)
    .then(function(response) {
        response.json();
    })
    .then(callback)
}


function deleteProduct(id) {
    var options = {
        method: 'Delete',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(apiLink + '/' + id, options)
    .then(function(response) {
        response.json();
    })
    .then(function() {
        var productWillDelete = document.querySelector(`.product.${id}`);
        productWillDelete.remove();
    })
}

function loadItem(productsArr) {
    console.log(productsArr);
    var htmls = productsArr.record.map(function(item, index) {
        var title = item.title;
        var brand = item.brand;
        var dsc = item.description;
        var price = item.price;
        var category = item.category;
        var discount = item.discountPercentage;
        var img = item.thumbnail;
        var id = item.id;
        return `<div class="product ${id}">
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

    productsArr.forEach(function(item, index) {
        var img = item.thumbnail;
        imgProduct[index].onclick = function(e) {
            imgViewerElement.classList.add('show');
            overlayElement.innerHTML = `<img src="${img}">`
        }
    })
    
    closeBtn.onclick = function(e) {
        imgViewerElement.classList.remove('show');
    }

    overlayElement.onclick = function(e) {
        imgViewerElement.classList.remove('show');
    }

    document.onkeyup = function(e) {
        if (e.which == 27) {
            imgViewerElement.classList.remove('show');
        }
    }
}

function handleForm() {
    btnSubmitButton.onclick = function(e) {
        // e.PreventDefault();
        var name = document.querySelector('input[name="name"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var dsc = document.querySelector('input[name="dsc"]').value;
        var discount = document.querySelector('input[name="discount"]').value;
        var brand = document.querySelector('input[name="brand"]').value;
        var category = document.querySelector('input[name="category"]').value;
        var imgLink = document.querySelector('input[name="img-link"]').value;
        var formData = {
            title: name,
            price: price,
            description: dsc,
            discountPercentage: discount,
            brand: brand,
            category: category,
            thumbnail: imgLink,
        }

        createProduct(formData, function() {
            getProduct(loadItem)
        });
    }

    btnDeleteButton.onclick = function(e) {
        // e.PreventDefault();
        var idDelete = document.querySelector('input[name="delete"]').value
        deleteProduct(idDelete);
    }
}
