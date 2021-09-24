// Empecher erreur lorsque le panier est vide
function panierVide() {
  if (produitEnregistrerStorage == null || produitEnregistrerStorage == 0) {
    return true;
  } else {
    return false;
  }
}

// Declaration de la variable pour enregistrer dans le local storage
let produitEnregistrerStorage = JSON.parse(localStorage.getItem("produit"));

console.log(produitEnregistrerStorage);

// AFFICHER LES PRODUITS DU PANIER

// Selection de l'Id où injecter le code HTML
const showPanier = () => {
  const positionProduits = document.querySelector("#table-cart");

  console.log(positionProduits);
  // Si le panier est vide
  const panierVide = (produitEnregistrerStorage || []).length === 0;

  if (panierVide) {
    positionProduits.innerHTML = `
    <div class="container-panier-vide">
        <div>Votre panier est vide !</>
    </div>
    `;
  } else {
    // Si il n'est pas vide, afficher les produits selectionnés par le cient
    let tableauProduitPanier = `<table class="table">
    <thead>
    <tr>
      <th>Produit</th>
      <th>Vernis</th>
      <th>Quantite</th>
      <th>Prix</th>
    </tr>
    </thead>
    <tbody id="cart-tablebody">
    `;

    for (k = 0; k < produitEnregistrerStorage.length; k++) {
      console.log(produitEnregistrerStorage[k]);
      tableauProduitPanier =
        tableauProduitPanier +
        `
        
        <tr>
          <td class="th-produit">
            ${produitEnregistrerStorage[k].nomProduit}
            <img src="${produitEnregistrerStorage[k].imageProduit}"/>
          </td>
          <td class="th-produit">${
            produitEnregistrerStorage[k].vernisProduit
          }</td>
          <td class="th-produit"><button class="btnRetirerQt"><i class="fas fa-minus retirerArticle"></i></button> ${
            produitEnregistrerStorage[k].quantiteProduit
          } <button class="btnAjouterQt"><i class="fas fa-plus" "ajouterArticle></i></button></td>
          <td class="th-produit">${
            (produitEnregistrerStorage[k].prixProduit *
              produitEnregistrerStorage[k].quantiteProduit) /
            100
          }€</td>
        </tr>
        `;
    }

    tableauProduitPanier += `</tbody>
    </table>
    <div class="text-center">
      <button class="btn" id="reset-cart">Vider le panier</button>
    </div>
    `;

    // Ajout du HTML
    positionProduits.innerHTML = tableauProduitPanier;
  }
};

// RETIRER UNE QUANTITE
const connectBoutonRetirerQt = () => {
  let buttons = document.querySelectorAll(".btnRetirerQt");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const currentProduct = produitEnregistrerStorage[index];
      currentProduct.quantiteProduit -= 1;

      if (currentProduct.quantiteProduit <= 0) {
        produitEnregistrerStorage = produitEnregistrerStorage.filter(
          (produit) => produit.idProduit !== currentProduct.idProduit
        );
      }

      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistrerStorage)
      );
      window.location.reload();
    });
  });
};

// AJOUTER UNE QUANTITE

const connectBoutonAjouterQt = () => {
  let buttons = document.querySelectorAll(".btnAjouterQt");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const currentProduct = produitEnregistrerStorage[index];
      currentProduct.quantiteProduit += 1;

      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistrerStorage)
      );
      window.location.reload();
    });
  });
};

showPanier();
connectBoutonRetirerQt();
connectBoutonAjouterQt();

// Ne pas afficher le formulaire lorsque le panier est vide
if (panierVide() == false) {
  // VIDER LE PANIER

  // Selection du bouton
  const boutonSupprimerPanier = document.querySelector("#reset-cart");

  // Suppression de la key "produit" dans le local storage
  boutonSupprimerPanier.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("produit");

    alert("Votre panier à bien été vidé");
    window.location.reload();
  });

  // TOTAL DU PANIER

  // Variable qui contient les prix du panier
  let prixPanierCalcul = [];

  // Récupération des prix dans le panier
  if (panierVide() == false) {
    for (let m = 0; m < produitEnregistrerStorage.length; m++) {
      let prixProduitsPanier =
        (produitEnregistrerStorage[m].prixProduit *
          produitEnregistrerStorage[m].quantiteProduit) /
        100;

      // Prix du panier dans la variable PrixPanierCalcul
      prixPanierCalcul.push(prixProduitsPanier);
    }
  }

  // Addition des prix (methode reduce)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotal = prixPanierCalcul.reduce(reducer, 0);

  // Affichage du prix
  const prixTotalSelect = document.querySelector(".subtotal");
  prixTotalSelect.innerHTML = `
    ${prixTotal}
  `;

  // FORMULAIRE

  // Afficher le formulaire
  const affichageFormulaireHTML = () => {
    // Selection du positionnement dans le DOM
    const positionnementForm = document.querySelector("#formulaire");

    positionnementForm.innerHTML = `
    <div id="formulaire-commande">
      <h2>
        Merci de renseigner le formulaire suivant pour valider votre commande
      </h2>
    
      <form class="p-3">
        <div class="mb-3">
          <label for="prenom" class="form-label">Prénom</label>
          <input class="form-control" type="text" id="prenom" name="prenom" required />
          <div id="alertPrenom" class="form-text"></div>
        </div>

        <div class="mb-3">
          <label for="nom" class="form-label">Nom</label>
          <input class="form-control" type="text" id="nom" name="nom" required />
          <div id="alertNom" class="form-text"></div>
        </div>

        <div class="mb-3">
          <label for="adresse" class="form-label">Adresse</label>
          <textarea class="form-control" type="text" id="adresse" required /> </textarea>
          <div id="alertAdresse" class="form-text"></div>
        </div>

        <div class="mb-3">
          <label for="ville" class="form-label">Ville</label>
          <input class="form-control" type="text" id="ville" name="ville" required />
          <div id="alertVille" class="form-text"></div>
        </div>

        <div class="mb-3">
          <label for="codepostal" class="form-label">Code Postal</label>
          <input class="form-control" type="number" id="codepostal" name="codepostal" required />
          <div id="alertCodePostal" class="form-text"></div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input class="form-control" type="text" id="email" name="email" required />
          <div id="alertEmail" class="form-text"></div>
        </div>

        <div class="text-center">
          <button class="btn" id="envoyerFormulaire" type="submit" name="envoyerFormulaire">Confimer la commande</button>
        </div>
      </form>
    </div>
    `;
  };
  affichageFormulaireHTML();

  // addEventListener sur le bouton de confirmation de formulaire
  // Selection du bouton
  const btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire");

  // addEventListener
  btnEnvoyerFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    // Recupération des valeurs du formulaire avec une classe

    class formulaireClass {
      constructor() {
        this.prenom = document.querySelector("#prenom").value;
        this.nom = document.querySelector("#nom").value;
        this.adresse = document.querySelector("#adresse").value;
        this.ville = document.querySelector("#ville").value;
        this.codepostal = document.querySelector("#codepostal").value;
        this.email = document.querySelector("#email").value;
      }
    }
    const formulaireValeurs = new formulaireClass();

    // CONTROLE SI LE FORMULAIRE EST CORRECTEMENT REMPLI
    const regExPrenomNomVille = (value) => {
      return /^([A-Za-z]{2,15})?([-]{0,1})?([A-Za-z]{2,15})$/.test(value);
    };

    const regExCodePostal = (value) => {
      return /^[0-9]{5}$/.test(value);
    };

    const regExEmail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };

    const regExAdresse = (value) => {
      return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    };

    function dataAlertChampTextVide(querySelectorId) {
      document.querySelector(`#${querySelectorId}`).textContent = "";
    }

    function dataAlertChamp(querySelectorId) {
      document.querySelector(`#${querySelectorId}`).textContent =
        "Veuillez remplir correctement le champ suivant";
    }

    // Contrôle prenom valide ou pas
    function controlePrenom() {
      const formPrenom = formulaireValeurs.prenom;
      return regExPrenomNomVille(formPrenom);
    }

    // Contrôle nom valide ou pas
    function controleNom() {
      const formNom = formulaireValeurs.nom;
      if (regExPrenomNomVille(formNom)) {
        return true;
      } else {
        return false;
      }
    }

    // Contrôle code postal valide ou pas
    function controleCodePostal() {
      const formCodePostal = formulaireValeurs.codepostal;
      if (regExCodePostal(formCodePostal)) {
        return true;
      } else {
        return false;
      }
    }

    // Contrôle email valide ou pas
    function controleEmail() {
      const formEmail = formulaireValeurs.email;
      if (regExEmail(formEmail)) {
        return true;
      } else {
        return false;
      }
    }

    // Contrôle adresse valide ou pas
    function controleAdresse() {
      const formAdresse = formulaireValeurs.adresse;
      if (regExAdresse(formAdresse)) {
        return true;
      } else {
        return false;
      }
    }

    // Contrôle ville valide ou pas
    function controleVille() {
      const formVille = formulaireValeurs.ville;
      if (regExPrenomNomVille(formVille)) {
        return true;
      } else {
        return false;
      }
    }

    // Afficher texte "Veuillez remplir correctement le champ suivant" si nécessaire
    controlePrenom() == true
      ? dataAlertChampTextVide("alertPrenom")
      : dataAlertChamp("alertPrenom");
    controleNom() == true
      ? dataAlertChampTextVide("alertNom")
      : dataAlertChamp("alertNom");
    controleAdresse() == true
      ? dataAlertChampTextVide("alertAdresse")
      : dataAlertChamp("alertAdresse");
    controleVille() == true
      ? dataAlertChampTextVide("alertVille")
      : dataAlertChamp("alertVille");
    controleEmail() == true
      ? dataAlertChampTextVide("alertEmail")
      : dataAlertChamp("alertEmail");
    controleCodePostal() == true
      ? dataAlertChampTextVide("alertCodePostal")
      : dataAlertChamp("alertCodePostal");

    //Si tous les contrôles sont OK
    if (
      controlePrenom() &&
      controleNom() &&
      controleCodePostal() &&
      controleEmail() &&
      controleAdresse() &&
      controleVille()
    ) {
      // Placement dans le local storage
      // des valeurs du formulaire :
      localStorage.setItem(
        "formulaireValeurs",
        JSON.stringify(formulaireValeurs)
      );
      // et du prix total :
      localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

      //Valeurs du formulaire et produits sélectionnés à envoyer vers le serveur
      const aEnvoyerServeur = {
        products: produitEnregistrerStorage.map((product) => product.idProduit),
        contact: {
          firstName: formulaireValeurs.prenom,
          lastName: formulaireValeurs.nom,
          address: formulaireValeurs.adresse,
          city: formulaireValeurs.ville,
          email: formulaireValeurs.email,
        },
        prixTotal: prixTotal,
      };

      //  Envoie de l'objet aEnvoyerServeur vers le serveur
      const promiseEnvoieServeur = fetch(
        "http://localhost:3000/api/furniture/order",
        {
          method: "POST",
          body: JSON.stringify(aEnvoyerServeur),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      promiseEnvoieServeur.then(async (response) => {
        try {
          const contenu = await response.json();

          if (response.ok) {
            // Recupération de l'ID
            console.log("id de la réponse");
            console.log(contenu.orderId);

            // Mettre l'id dans le local storage
            localStorage.setItem("responseOrderId", contenu.orderId);

            // Redirection page confirmation de commande
            window.location = "confirmation_commande.html";
          } else {
            alert(`Erreur du serveur : erreur ${response.status}`);
          }
        } catch (e) {
          alert(`Erreur du serveur ${e}`);
        }
      });
    } else {
      alert("Merci de correctement remplir le formulaire");
    }
  });

  // Laisser le contenu du local storage dans le formulaire

  // Récupération de la key pour la mettre dans une variable
  const dataLocalStorage = localStorage.getItem("formulaireValeurs");

  const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

  // Fonction => champ de formulaire rempli par les valeurs du local storage
  function remplirInputDepuisLocalStorage(input) {
    if (dataLocalStorageObjet == null) {
      console.log("le local storage est null");
    } else {
      document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
    }
  }

  remplirInputDepuisLocalStorage("prenom");
  remplirInputDepuisLocalStorage("nom");
  remplirInputDepuisLocalStorage("adresse");
  remplirInputDepuisLocalStorage("ville");
  remplirInputDepuisLocalStorage("codepostal");
  remplirInputDepuisLocalStorage("email");
}
