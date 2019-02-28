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

//Search 
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

$(".search-form").on("submit", function (s) {
    s.preventDefault();
    var searchQuery = $("#search").val();
    search(products, searchQuery);
})

//Constructing the filtering dropdown menu
function listIncludes(list, str) {
    for (var i = 0; i < list.length; i++) {
        if ($(list[i]).hasClass(str))
            return true;
    }
    return false;
}

function createFilteringMenu(products) {
    var button, category; 
    var buttons = [];
    for (var i = 0; i < products.length; i++) {
        var types = [] 
        for (var j = 0; j < products[i].length; j++) {
            category = products[i][j].category;
            
            if (!listIncludes(types, category)) { 
                button = document.createElement("button"); 
                $(button).addClass("dropdown-item" + " " + category); 
                $(button).text(category); 
                types.push(button); 
            }
        } 
        buttons.push(types);
    }
    
    productsString.forEach(function(e){
        var header = document.createElement("h6");
        $(header).addClass("dropdown-header" + " " + "dropdown-title-" + e);
        $(header).text(e);
        $(header).css("text-transform","capitalize");
        $(".filter .dropdown-menu").append(header);           
    })

    for(var i =0; i<buttons.length; i++){
        buttons[i].forEach(function (button) {
            $(".filter .dropdown-title-"+productsString[i]).append(button);
            $(button).on('click', function () {
                filterCategory(products, $(button).text());
            });
        })
    }   
}

// Back to top button event
$(window).scroll(function(){
    if($(window).scrollTop()> 300){
         $(".toTop").fadeIn(200);
    }else{
        $(".toTop").fadeOut(100);
    }
});

// Page load
showAll(products);
createFilteringMenu(products);

// Navbar links

$(".nav-allItems").click(function() {
    showAll(products)
  
})

$(".nav-bags").click(function() {
    showCards(bags);
});


$(".nav-shoes").click(function(){
    showCards(shoes);
})

$(".nav-sunglasses").click(function() {
    showCards(sunglasses);
})
