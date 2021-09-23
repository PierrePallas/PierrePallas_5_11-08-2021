// Récupération de l'ID de la commande situé dans le local storage
const responseOrderId = localStorage.getItem("responseOrderId");
console.log(`responseOrderId : ${responseOrderId}`);

// Récupération prix total de la commande
const prixTotal = localStorage.getItem("prixTotal");
console.log(`prixTotal : ${prixTotal}`);

// Structure HTML confirmation commande
// Selection élément du DOM
const positionConfirmation = document.querySelector("#containerConfirmation");

const structureConfirmation = `
    <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">Confirmation de la commande</h5>
          <p class="card-text">Merci pour votre confiance ! <span>Récapitulatif :</span></p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Votre identifiant de commande est le : ${responseOrderId}</li>
            <li class="list-group-item">Pour un prix total de : ${prixTotal}€</li>
          </ul>
          <a href="index.html" class="btn btn-primary">Quitter cette page</a>
        </div>
    </div>
`;

// Injection HTML
positionConfirmation.insertAdjacentHTML("afterbegin", structureConfirmation);


// Effacer le local storage
function removeLocalStorage(key){
    localStorage.removeItem(key);
};

removeLocalStorage("prixTotal");
removeLocalStorage("produit");
removeLocalStorage("responseOrderId");

// Retour page d'accueil si rechargement de la page
if(responseOrderId == null || prixTotal == null){
    window.location.href="index.html"
};