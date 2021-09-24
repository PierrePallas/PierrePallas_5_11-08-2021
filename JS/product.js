// Récupération de l'ID
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Modification URL + ID
const fetchProduct = async () => {
  const result = await fetch("http://localhost:3000/api/furniture/" + id);

  return result.json();
};

// Affichage du produit par ID
const showProduct = (dataProduct) => {
  const product = document.getElementById("product");
  const varnishList = dataProduct.varnish
    .map(
      (varnish) => `
        <option value="${varnish}">${varnish}</option>
        `
    )
    .join("");

  product.innerHTML = `
            <h3 class="name-product" id="name">${dataProduct.name}</h3>
            <img class="product-photo" src="${
              dataProduct.imageUrl
            }" alt="photo montrant ${dataProduct.name}" />
            <p class="description-product">Description : ${
              dataProduct.description
            }</p>
            <p class="price-product" id="price">Prix : ${
              dataProduct.price / 100
            }€</i></p>
            <p>
                <label for="varnish-select">Choisisssez un vernis</label>
                <select class="select-box" id="select-varnish" name="varnish" id="varnish-select">
                    <option value="">--Selectionnez votre vernis--</option>
                    ${varnishList}
                </select>
            </p>
            <p>
                <label for="q">Quantité :</label> 
                <select id="qt" name="q">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </p>   
            <div class="text-center"
                <p><button class="button-cart" id="add-to-cart">Ajouter au panier</button></p>
            </div>
            `;
};

// Gestion de l'ajout au panier

const showPanier = (dataProduct) => {
  const idVernis = document.querySelector("#select-varnish");
  const idQt = document.querySelector("#qt");

  const envoyerAuPanier = document.querySelector("#add-to-cart");

  envoyerAuPanier.addEventListener("click", (event) => {
    event.preventDefault();

    const choixVernis = idVernis.value;
    const choixQuantite = parseInt(idQt.value);

    let optionsProduit = {
      nomProduit: dataProduct.name,
      idProduit: id,
      prixProduit: dataProduct.price,
      imageProduit: dataProduct.imageUrl,
      vernisProduit: choixVernis,
      quantiteProduit: choixQuantite,
    };
    console.log(optionsProduit);

    // Declaration de la variable pour enregistrer dans le local storage

    let produitEnregistrerStorage = JSON.parse(localStorage.getItem("produit"));

    // Fonction pour ajouter un produit dans le LS
    const ajouterProduitLS = () => {
      // Ajouter dans le tableau les valeurs choisies par le client
      produitEnregistrerStorage.push(optionsProduit);
      // Transformation en format JSON et envoie dans la key "produit"
      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistrerStorage)
      );
    };

    // Vérification si il y a déjà des produits enregistrés dans le local storage

    if (produitEnregistrerStorage) {
      ajouterProduitLS();
    }

    // Sinon
    else {
      // Création d'un tableau
      produitEnregistrerStorage = [];
      ajouterProduitLS();
    }
  });
};

const main = async () => {
  const dataProduct = await fetchProduct();
  showProduct(dataProduct);
  showPanier(dataProduct);
};

main();
