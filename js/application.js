// _______________________________________________
// _______________________________________________
//               JQUERY
// _______________________________________________

$(document).ready(function() {

    // POP UP PANIER -> OUVERTURE/FEMETURE
    $(".all-purchase").click(function(){
        $("#purchase").show();
    });

    $("#close-purchase").click(function(){
        $("#purchase").hide();
    });
    // _________________________________________ 

    // BOUTON -> AFFICHAGE TOUS LES PRODUITS
    $("#button-all-product").click(function(){
        $("#all-biscuits,#all-cakes, #all-entremets, #all-tartes ").show();
    });
    // ___________________________________________


    // CATEGORIE -> AFFICHAGE  DES PRODUITS 
    $("#biscuits").click(function(){
        $("#all-biscuits").show();
    });

    $("#cakes").click(function(){
        $("#all-cakes").show();
    });

    $("#entremets").click(function(){
        $("#all-entremets").show();
    });

    $("#tartes").click(function(){
        $("#all-tartes").show();
    });
    // CATEGORIE -> FERMER AFFICHAGE  DES PRODUITS 
    $("#biscuits").click(function(){
        $("#all-cakes, #all-entremets, #all-tartes ").hide();
    });

    $("#cakes").click(function(){
        $("#all-biscuits, #all-entremets, #all-tartes ").hide();
    });

    $("#entremets").click(function(){
        $("#all-biscuits, #all-cakes, #all-tartes ").hide();
    });

    $("#tartes").click(function(){
        $("#all-biscuits, #all-cakes, #all-entremets ").hide();
    });



    // ___________________________________________________ 


    // ____AJOUTER ARTICLE PANIER 

    //________autre méthode de sélecteur enfant jquery
    // $(".product-content").on("click", "img", function (event) {
    //     alert('a');
    // });

    $(".product-content").children("img").click(function(){
        // récupère l'id du produit
        var id = $(this).attr('id'); 
        //récupère le titre + prix du produit 
        var title = $(this).prev().prev().text();
        var price = $(this).prev().text();
        //supprime le €
        price = price.slice(0,-1);
        PRODUCTS[id]++;
        //alert(PRODUCTS[id]);
        //console.log(PRODUCTS[id]);
        update_purchase();
    });



    // Valider le panier 
    function validatePurchase() {
        if ($(".count-product-purchase").text() === '0') {
            alert("Votre panier est vide !");
        } else {
            alert("Merci pour votre achat !");
            // Réinitialisation du panier
            for (let id in PRODUCTS) {
                PRODUCTS[id] = 0;                                
            }
            update_purchase();
        }
    }

    // rattache la fonction au bouton de validation
    // Fermeture de la POPUP panier
    $("#validate-purchase").click(function() {
        validatePurchase()
        $("#purchase").hide();
    });


});

// _______________________________________________
// _______________________________________________
//               VARIABLES GLOBALES
// _______________________________________________

// LISTE DE TOUS LES ID PRODUITS
var PRODUCTS = new Array();
PRODUCTS['add-product-01']=0;
PRODUCTS['add-product-02']=0;
PRODUCTS['add-product-03']=0;
PRODUCTS['add-product-04']=0;
PRODUCTS['add-product-05']=0;
PRODUCTS['add-product-06']=0;
PRODUCTS['add-product-07']=0;
PRODUCTS['add-product-08']=0;
PRODUCTS['add-product-09']=0;
PRODUCTS['add-product-10']=0;
PRODUCTS['add-product-11']=0;
PRODUCTS['add-product-12']=0;
PRODUCTS['add-product-13']=0;
PRODUCTS['add-product-14']=0;
PRODUCTS['add-product-15']=0;
PRODUCTS['add-product-16']=0;
PRODUCTS['add-product-17']=0;


// _______________________________________________
// _______________________________________________
//               JS
// _______________________________________________

// MISE A JOUR COMPTEUR PANIER 
function update_purchase(){
    let total = 0;
    for (var product in PRODUCTS) {
        let quantity = PRODUCTS[product];
        total += quantity;
        //console.log(PRODUCTS[product]);
    }
      $(".count-product-purchase").html('');
      $(".count-product-purchase").html(total);
}


// AFFICHER PRODUITS AU PANIER 

var CART = []  // liste détails panier

// Affichage du contenu panier
function updateCartDisplay(){
    let cartContent = "";
    let totalPrice = 0;

    // boucle pour chaque produit
    for (let id in PRODUCTS) {
        let quantity = PRODUCTS[id];
        if (quantity > 0 ) {
            // recupération des détails produits
            let title = $("#" + id).prev().prev().text();
            let price = parseFloat($("#" + id).prev().text().slice(0, -1)); // Supprime €

            // ajouter le produit au panier
            cartContent +=`
                <tr>
                    <td>${title}</td>
                    <td>${price} €</td>
                    <td>
                        ${quantity}
                        <button class="more-product" data-id="${id}">+</button>
                        <button class="less-product" data-id="${id}">-</button>
                    </td>
                    <td>
                        <img src="img/icon/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="" class="delete" data-id="${id}">
                    </td>
                    <td>${(price * quantity).toFixed(2)} €</td>
                </tr>
            `;
            // calcul total panier
            totalPrice += price * quantity ; 

        }
    }

    // Mise à jour affichage panier
    $(".list-product-add tbody").html(cartContent);
    $(".list-product-add tfoot td#total-price").text(totalPrice.toFixed(2) + " €");

}

// Appel de la fonction d'affichage à chaque ajout de produit
function update_purchase() {
    updateCartDisplay(); // afficher les produits
    let totalProducts = 0 ; 

    for (var product in PRODUCTS) {
        totalProducts += PRODUCTS[product];
    }

    $(".count-product-purchase").html(totalProducts);


        // ajouter un produit depuis le panier
        $(".more-product").click(function() {
            let id = $(this).data("id");
            PRODUCTS[id] ++ ;
            update_purchase();
        });
    
        // Enlever un produit depuis le panier
        $(".less-product").click(function() {
            let id = $(this).data("id");
            if (PRODUCTS[id] > 0) {
                PRODUCTS[id] -- ;
                update_purchase();
            }
        });
    
        //Supprimer un produit du panier 
        $(".delete").click(function() {
            let id = $(this).data("id");
            PRODUCTS[id] = 0 ; 
            update_purchase();
        });

}

