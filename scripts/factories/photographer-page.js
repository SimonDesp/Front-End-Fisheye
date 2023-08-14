let currentImageIndex = 0;



function photographerPageFactory(photographer) {
  const { name, portrait, city, country, tagline, price } = photographer.information;
  const medias = photographer.medias;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {

    function trierParNom() {
      medias.sort((premier, second) => {
        return premier.title.localeCompare(second.title);
      });

      mettreAJourAffichage();
    }

    function trierParPopularite() {
      medias.sort((premier, second) => {
        return second.likes - premier.likes;
      });

      mettreAJourAffichage();
    }

    function trierParDate() {
      medias.sort((premier, second) => {
        return new Date(premier.date) - new Date(second.date);
      });

      mettreAJourAffichage();
    }

    function mettreAJourAffichage() {
      mediaContainer.innerHTML = '';
      createMedias();
    }

    function afficherModal() {
      const modalImage = modal.querySelector("#modal-image");
      const modalVideo = modal.querySelector("#modal-video");
      const selectedMedia = medias[currentImageIndex];

      if (selectedMedia.image) {
        modalImage.src = `assets/photographers/${name}/compresed/${selectedMedia.image}`;
        modalImage.style.display = "block";
        modalVideo.style.display = "none";
      } else if (selectedMedia.video) {
        modalImage.src = "";
        modalImage.style.display = "none";
        modalVideo.src = `assets/photographers/${name}/${selectedMedia.video}`;
        modalVideo.style.display = "block";
      }

      modal.style.display = "block";

      const modalflechegauche = document.querySelector(".modal-fleche-gauche");
      const modalflechedroite = document.querySelector(".modal-fleche-droite");

      modalflechegauche.addEventListener("click", montrerProchaineImage);
      modalflechedroite.addEventListener("click", montrerprecedenteImage);
    }

    function montrerProchaineImage() {
      if (currentImageIndex === 0) {
        currentImageIndex = medias.length - 1;
      } else {
        currentImageIndex--;
      }

      updateModalImage();
    }

    function montrerprecedenteImage() {
      if (currentImageIndex === medias.length - 1) {
        currentImageIndex = 0;
      } else {
        currentImageIndex++;
      }

      updateModalImage();
    }

    function updateModalImage() {
      const modalImage = modal.querySelector("#modal-image");
      const modalVideo = modal.querySelector("#modal-video");
      const selectedMedia = medias[currentImageIndex];

      if (selectedMedia.image) {
        modalImage.src = `assets/photographers/${name}/compresed/${selectedMedia.image}`;
        modalImage.style.display = "block";
        modalVideo.style.display = "none";
      } else if (selectedMedia.video) {
        modalImage.src = "";
        modalImage.style.display = "none";
        modalVideo.src = `assets/photographers/${name}/${selectedMedia.video}`;
        modalVideo.style.display = "block";
      }
    }

    function hideModal() {
      modal.style.display = "none";
    }

    function updateTotalLikes() {
      let totalLikes = 0;

      medias.forEach((element) => {
        totalLikes += element.likes;
      });

      compteurCoeur.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
    }

    const headerContainer = document.getElementsByClassName('photograph-header')[0];

    const div = document.createElement('div');
    div.classList.add('info');

    const h2 = document.createElement('h1');
    h2.textContent = name;
    h2.classList.add('name');

    const p2 = document.createElement('p');
    p2.textContent = `${city}, ${country}`;
    p2.classList.add('location');

    const p4 = document.createElement('p');
    p4.textContent = `${tagline}`;
    p4.classList.add('profil');
    p4.classList.add('tagline');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.classList.add('profile-image');
    img.setAttribute('aria-label', `image : ${name}`);

    div.appendChild(h2);
    div.appendChild(p2);
    div.appendChild(p4);
    headerContainer.appendChild(div);
    headerContainer.appendChild(img);

    // menu trier//
    const menuTrier = document.createElement('div');
    menuTrier.classList.add('menuTrier');

    const divTrier = document.createElement('div');
    divTrier.classList.add('DivTrier');
    divTrier.textContent = 'Trier par :';

    const menuDeroulant = document.createElement('ul');
    menuDeroulant.classList.add('menuDeroulant');

    const options = ['Popularité', 'Date', 'Nom'];

    options.forEach((option, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = option;
      li.appendChild(span);

      if (index === 0) {
        li.classList.add('active');
        const chevron = document.createElement('i');
        chevron.classList.add('fa-solid', 'fa-chevron-up');
        li.appendChild(chevron);

        chevron.addEventListener('click', () => {
          if (li.classList.contains('active')) {
            li.classList.remove('active');
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
            options.slice(1).forEach((opt, optIndex) => {
              menuDeroulant.children[optIndex + 1].style.display = 'none';
            });
          } else {
            li.classList.add('active');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');

            options.slice(1).forEach((opt, optIndex) => {
              menuDeroulant.children[optIndex + 1].style.display = 'list-item';
            });
          }
        });
      } else {
        li.style.display = 'none';
      }
      menuDeroulant.appendChild(li);
    });


    menuTrier.appendChild(divTrier);
    menuTrier.appendChild(menuDeroulant);

    document.body.appendChild(menuTrier);

    // Container media //
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('mediaContainer');

    function createMedias() {
      medias.forEach((element, index) => {
        const cardMediaPhoto = document.createElement('div');
        cardMediaPhoto.classList.add('cardMediaPhoto');

        const cardBas = document.createElement('div');
        cardBas.classList.add('card-bas');

        let media = null;

        if (element.image !== undefined) {
          media = document.createElement('img');
          media.setAttribute('src', `assets/photographers/${name}/compresed/${element.image}`);
          media.classList.add('imageMedia');
          media.setAttribute('aria-label', `photo : ${element.title}`);
        } else if (element.video !== undefined) {
          media = document.createElement('video');
          media.setAttribute('src', `assets/photographers/${name}/${element.video}`);
          media.setAttribute('controls', '');
          media.classList.add('videoMedia');
          media.setAttribute('aria-label', `photo : ${element.title}`);
        }

        if (media !== null) {
          media.classList.add('media');

          const mediaTitle = document.createElement('h2');
          mediaTitle.textContent = element.title;
          mediaTitle.classList.add('mediaTitle');

          const coeur = document.createElement('p');
          coeur.innerHTML = `${element.likes} <i class="fa-solid fa-heart like-heart" style="color: #911c1c;"></i>`;
          coeur.classList.add('coeur');

          coeur.addEventListener('click', function (event) {
            likemedia();
          });

          // Gérer le focus au clavier et ajouter des attributs ARIA pour les likes
          coeur.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
             likemedia();
            }
          });

          function likemedia() {
            if (coeur.classList.contains('liked')) {
              element.likes--;
              coeur.classList.remove('liked');
            } else {
              element.likes++;
              coeur.classList.add('liked');
            }
            coeur.innerHTML = `${element.likes} <i class="fa-solid fa-heart like-heart" style="color: #911c1c;"></i>`;
            updateTotalLikes();
          }

          // Ajouter tabindex pour les éléments interactifs
          media.setAttribute("tabindex", "0");
          mediaTitle.setAttribute("tabindex", "0");
          coeur.setAttribute("tabindex", "0");

          cardMediaPhoto.appendChild(media);
          cardBas.appendChild(mediaTitle);
          cardBas.appendChild(coeur);
          cardMediaPhoto.appendChild(cardBas);
          mediaContainer.appendChild(cardMediaPhoto);


          media.addEventListener('click', function (event) {
            if (event) {
              currentImageIndex = index;
              afficherModal();
            }
          });
          // rajoute au clic de addeventlistener
          media.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              currentImageIndex = index;
              afficherModal();
            }
          });
        }
      });
    }

    createMedias();

    // Compteur coeur et prix
    const divCoeur = document.createElement('div');
    divCoeur.classList.add('divCoeur');

    const compteurCoeur = document.createElement('p');
    compteurCoeur.classList.add('compteurCoeur');
    updateTotalLikes();

    const prix = document.createElement('p');
    prix.textContent = `${price}€ / jour`;
    prix.classList.add('prix');

    divCoeur.appendChild(compteurCoeur);
    divCoeur.appendChild(prix);

    document.body.appendChild(mediaContainer);
    document.body.appendChild(divCoeur);

    // Gestion du tri
    menuDeroulant.addEventListener('click', (event) => {
      const selectedOption = event.target.textContent;

      switch (selectedOption) {
        case 'Nom':
          trierParNom();
          break;
        case 'Popularité':
          trierParPopularite();
          break;
        case 'Date':
          trierParDate();
          break;
      }
    });

    // Modal
    var modal = document.getElementById("modal");
    var closeButton = document.getElementsByClassName("closecard")[0];

    // Ajouter des attributs ARIA pour la boîte modale
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        hideModal();
      }
    });

    // Ajouter le focus au clavier et l'accessibilité pour le bouton de fermeture de la boîte modale
    closeButton.addEventListener("click", hideModal);
    closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        hideModal();
      }
    });
    
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("aria-label", "Fermer la boîte modale");

    const form = document.querySelector('form');

    // Ajouter des étiquettes et des associations de contrôles de formulaire
    const prenomLabel = document.querySelector('label[for="prenom"]');
    const nomLabel = document.querySelector('label[for="nom"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const messageLabel = document.querySelector('label[for="message"]');

    prenomLabel.textContent = "Prénom";
    nomLabel.textContent = "Nom";
    emailLabel.textContent = "Email";
    messageLabel.textContent = "Message";

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const prenom = document.getElementById('prenom').value;
      const nom = document.getElementById('nom').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      console.log('Prénom :', prenom);
      console.log('Nom :', nom);
      console.log('Email :', email);
      console.log('Message :', message);
    });
  }

  return { getUserCardDOM };
}
