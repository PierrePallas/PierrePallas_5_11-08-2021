// http://localhost:3000/api/furniture

// Page Acceuil
// const titre_produits = document.querySelector('.liste_produits')
// const prix_produits = document.querySelector('.prix_produits')
// const img_produits = document.querySelector('.img_produits')



// API REQUEST
const fetchProduits = async() => {
    const results = await fetch(
        "http://localhost:3000/api/furniture")
        
    return results.json()
};

const showProduits = async() => {
    const listeProduits = await fetchProduits();
    console.log(listeProduits)
    const results = document.getElementById('results');

    results.innerHTML = (

        listeProduits
        .map(produit => (

            `
                <a class="selection_produits" href="./product.html?id=${produit._id}">
                    <li class="liste_produits">
                        <img class="photo_produits" src="${produit.imageUrl}" />
                        <h3 class="name_produits">${produit.name}</h3>
                        <div class="price_produits">${produit.price}<i class="fas fa-euro-sign"></i>
                        </div>
                    </li>
                </a>
            `

        )).join('')
    )
};

showProduits();











// Récupération des produits 
// fetch("http://localhost:3000/api/furniture")
// .then((res) => res.json())
// .then ((data) => { 
//     titre_produits.textContent = data.map(elt => elt.name)
//     prix_produits.textContent = data.map(elt => elt.price)
// });


// Affichage de la liste des produits


// Page de personnalisation du produits




// .then ((data) => console.log (data.map(elt => elt.price)));