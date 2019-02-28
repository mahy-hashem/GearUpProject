//Changes the content inside a card into the details from a product
function populateCards(product, card) {
    $(card).children("img").attr({
        "src": product.src,
        "alt": product.name,
        "title": product.name
    });
    $(card).children(".card-body").children("h5").text(product.name);
    $(card).children(".card-body").children("p").text(product.price + " EGP");
    $(card).children(".card-body").children("a").attr("href", product.href);
}

//Hides all cards
function flush() {
    $(".card").hide();
}

//Takes in an array of products and then adds them to cards by using the function populalteCards
function showCards(productArr) {
    flush();
    for (var i = 1; i < productArr.length + 1; i++) {
        populateCards(productArr[i - 1], $(".product" + i));
        $(".product" + i).fadeIn();
    }
}

/* Use only the functions below*/

//Filter by the type of product ("bags, "shoes", "sunglasses")
function filterType(products, type) {
    productType = [];
    if (type == "bags")
        productType = products[0];
    else if (type == "shoes")
        productType = products[1];
    else if (type == "sunglasses")
        productType = products[2];

    showCards(productType)
}

//Filters by category (as they are in the products.js file)
function filterCategory(products, category) {
    var filteredItems = []
    products.forEach(function (e) {
        e.forEach(function (i) {
            if (i.category == category)
                filteredItems.push(i)
        })
    })

    showCards(filteredItems);
}

//Creates cards for all products in the product list
function showAll(products) {
    var items = []
    products.forEach(function (e) {
        e.forEach(function (i) {
            items.push(i)
        })
    })

    showCards(items);
}

//Search really
function search(products, key) {
    var filteredItems = []
    var lowKey = key.toLowerCase();
    products.forEach(function (e) {
        e.forEach(function (i) {
            if (i.name.toLowerCase().includes(lowKey) || i.id.toLowerCase().includes(lowKey) || i.category.toLowerCase().includes(lowKey))
                filteredItems.push(i)
        })
    })

    showCards(filteredItems);
}

//Listeners & Filters
/*$(".dropdown-bags").on("click", function (e) {
    filterType(products, "bags")
});*/

$('.filter button').click(function (e) {
    switch(e.currentTarget.id){
        case "1":
            filterType(products, "bags");
            break;
        case "2":
            filterCategory(products, "Crossbody Bags");
            break;
        case "3":
            filterCategory(products, "Tote Bags");
            break;
        case "4":
            filterCategory(products, "Handbags");
            break;
        case "5":
            filterCategory(products, "Backpack");
            break;
        case "6":
            filterType(products, "shoes");
            break;            
        case "7":
            filterCategory(products, "Flat");
            break;            
        case "8":
            filterCategory(products, "Heels");
            break;            
        case "9":
            filterType(products, "sunglasses");
            break;
        default:
         console.log("default");
    }
})

$(".search-form").on("submit", function (s) {
    var searchQuery = $("#search").val();
    search(products, searchQuery);
    console.log("submittt");
})

// Page load
showAll(products);

// FEATURE NOT IMPLEMENTED
// 3OMAL YASHTAGHALOON
populateDropdown(categories)
