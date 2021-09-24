// http://localhost:3000/api/furniture

// REQUETE API
const fetchProducts = async () => {
  const results = await fetch("http://localhost:3000/api/furniture");

  return results.json();
};

// MONTRER LES PRODUITS
const showProducts = async () => {
  const dataProducts = await fetchProducts();
  const results = document.getElementById("results");

  results.innerHTML = dataProducts
    .map(
      (product) =>
        `
                <a class="selection_produits" href="./product.html?id=${
                  product._id
                }">
                    <li class="liste_produits">
                        <img class="photo_produits" src="${product.imageUrl}" />
                        <h3 class="name_produits">${product.name}</h3>
                        <div class="price_produits">${product.price / 100}€</i>
                        </div>
                    </li>
                </a>
            `
    )
    .join("");
};

showProducts();
