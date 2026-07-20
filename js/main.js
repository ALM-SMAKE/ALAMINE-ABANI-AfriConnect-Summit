// bouton retour en haut//
const topBtn = document.getElementById("topBtn");

if (topBtn) {

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

}

//Apparition des sections au défilement//

const sections = document.querySelectorAll(".fade-up");

if (sections.length > 0) {

    function afficherSections() {

        sections.forEach(function (section) {

            const position = section.getBoundingClientRect().top;

            if (position < window.innerHeight - 100) {

                section.classList.add("show");

            }

        });

    }

    afficherSections();

    window.addEventListener("scroll", afficherSections);

}

//Menu hamburger//

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-toggle");

if (menu && menuBtn) {

    menuBtn.addEventListener("click", function () {

        menu.classList.toggle("active");

    });

    const liens = document.querySelectorAll(".menu a");

    liens.forEach(function (lien) {

        lien.addEventListener("click", function () {

            menu.classList.remove("active");

        });

    });

}

//Fermer le menu après un clic//

const liens = document.querySelectorAll(".menu a");

liens.forEach(function(lien){

    lien.addEventListener("click", function(){

        menu.classList.remove("active");

    });

});

//chargement//

const loader = document.querySelector(".loader");

if (loader) {

    window.addEventListener("load", function () {

        setTimeout(function () {

            loader.style.display = "none";

        }, 400);

    });

}

//formulaires//

const form = document.getElementById("registrationForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valide = true;

        document.querySelectorAll(".error").forEach(function (erreur) {

            erreur.textContent = "";

        });

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const message = document.getElementById("message");

        const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nom.value.trim() === "") {

            nom.nextElementSibling.textContent =
            "Veuillez saisir votre nom.";

            valide = false;

        }

        if (prenom.value.trim() === "") {

            prenom.nextElementSibling.textContent =
            "Veuillez saisir votre prénom.";

            valide = false;

        }

        if (email.value.trim() === "") {

            email.nextElementSibling.textContent =
            "Veuillez saisir votre email.";

            valide = false;

        }
        else if (!emailValide.test(email.value)) {

            email.nextElementSibling.textContent =
            "Adresse email invalide.";

            valide = false;

        }

        if (telephone.value.trim() === "") {

            telephone.nextElementSibling.textContent =
            "Veuillez saisir votre téléphone.";

            valide = false;

        }

        if (message.value.trim().length < 20) {

            message.nextElementSibling.textContent =
            "Le message doit contenir au moins 20 caractères.";

            valide = false;

        }

        if (valide) {

            alert("Inscription enregistrée avec succès !");

            form.reset();

        }

    });

}

//compteurs//
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

        element.textContent = debut.toLocaleString();

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

    const observer = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                lancerCompteurs();

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.5

    });

    observer.observe(stats);

}


// compte a rebour//

const jours = document.getElementById("jours");
const heures = document.getElementById("heures");
const minutes = document.getElementById("minutes");
const secondes = document.getElementById("secondes");

if (jours && heures && minutes && secondes) {

    const dateEvenement = new Date("2026-10-15T09:00:00").getTime();

    function mettreAJourCompteARebours() {

        const maintenant = Date.now();

        const difference = dateEvenement - maintenant;

        if (difference <= 0) {

            jours.textContent = "00";
            heures.textContent = "00";
            minutes.textContent = "00";
            secondes.textContent = "00";

            clearInterval(interval);

            return;

        }

        const j = Math.floor(difference / (1000 * 60 * 60 * 24));

        const h = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const m = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const s = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );

        jours.textContent = String(j).padStart(2, "0");
        heures.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        secondes.textContent = String(s).padStart(2, "0");

    }

    mettreAJourCompteARebours();

    const interval = setInterval(mettreAJourCompteARebours, 1000);

}