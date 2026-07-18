// bouton retour en haut//
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

//Apparition des sections au défilement//

const sections = document.querySelectorAll(".fade-up");

window.addEventListener("scroll", function () {

    sections.forEach(function(section){

        const position = section.getBoundingClientRect().top;

        if(position < window.innerHeight - 100){
            section.classList.add("show");
        }

    });

});

//Menu hamburger//

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-toggle");

menuBtn.addEventListener("click", function(){

    menu.classList.toggle("active");

});

//Fermer le menu après un clic//

const liens = document.querySelectorAll(".menu a");

liens.forEach(function(lien){

    lien.addEventListener("click", function(){

        menu.classList.remove("active");

    });

});

//chargement//

const loader = document.querySelector(".loader");

window.addEventListener("load", function(){

    setTimeout(function(){

        loader.style.display = "none";

    },400);

});

//formulaires//

const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let valide = true;

    document.querySelectorAll(".error").forEach(function(erreur){

        erreur.textContent = "";

    });

    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const telephone = document.getElementById("telephone");
    const message = document.getElementById("message");

    if(nom.value.trim() === ""){

        nom.nextElementSibling.textContent = "Veuillez saisir votre nom.";

        valide = false;

    }

    if(prenom.value.trim() === ""){

        prenom.nextElementSibling.textContent = "Veuillez saisir votre prénom.";

        valide = false;

    }

    if(email.value.trim() === ""){

        email.nextElementSibling.textContent = "Veuillez saisir votre email.";

        valide = false;

    }
    else if(!email.value.includes("@")){

        email.nextElementSibling.textContent = "Adresse email invalide.";

        valide = false;

    }

    if(telephone.value.trim() === ""){

        telephone.nextElementSibling.textContent = "Veuillez saisir votre téléphone.";

        valide = false;

    }

    if(message.value.trim().length < 20){

        message.nextElementSibling.textContent =
        "Le message doit contenir au moins 20 caractères.";

        valide = false;

    }

    if(valide){

        alert("Inscription enregistrée avec succès !");

        form.reset();

    }

});

let compteursLances = false;

function compteur(id, fin) {

    const element = document.getElementById(id);

    if (!element) return;

    let debut = 0;

    const increment = Math.ceil(fin / 100);

    const interval = setInterval(function () {

        debut += increment;

        if (debut >= fin) {
            debut = fin;
            clearInterval(interval);
        }

        element.textContent = debut;

    }, 20);

}

function lancerCompteurs() {

    if (compteursLances) return;

    compteur("participants", 500);
    compteur("intervenants", 30);
    compteur("pays", 20);

    compteursLances = true;

}

const stats = document.querySelector(".stats");

if (stats) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                lancerCompteurs();

            }

        });

    }, {
        threshold: 0.5
    });

    observer.observe(stats);

}