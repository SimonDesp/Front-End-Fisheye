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
      while (mediaContainer.firstChild) {
        mediaContainer.firstChild.remove();
      }
      createMedias()
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

    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.classList.add('name');

    const p2 = document.createElement('p');
    p2.textContent = `${city}, ${country}`;
    p2.classList.add('location');

    const p4 = document.createElement('p');
    p4.textContent = `${tagline}`;
    p4.classList.add('tagline');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.classList.add('profile-image');

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

    const defaultOption = document.createElement('li');
    defaultOption.textContent = options[0];
    defaultOption.classList.add('active');
    menuDeroulant.appendChild(defaultOption);

    options.slice(1).forEach((option) => {
      const li = document.createElement('li');
      li.textContent = option;
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
        } else if (element.video !== undefined) {
          media = document.createElement('video');
          media.setAttribute('src', `assets/photographers/${name}/${element.video}`);
          media.setAttribute('controls', '');
          media.classList.add('videoMedia');
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
            if (coeur.classList.contains('liked')) {
              element.likes--;
              coeur.classList.remove('liked');
            } else {
              element.likes++;
              coeur.classList.add('liked');
            }

            coeur.innerHTML = `${element.likes} <i class="fa-solid fa-heart like-heart" style="color: #911c1c;"></i>`;

            updateTotalLikes();
          });

          cardMediaPhoto.appendChild(media);
          cardBas.appendChild(mediaTitle);
          cardBas.appendChild(coeur);
          cardMediaPhoto.appendChild(cardBas);
          mediaContainer.appendChild(cardMediaPhoto);
        }
        // Ajouter un gestionnaire d'événements pour ouvrir la modale lors du clic sur l'image ou la vidéo
        media.addEventListener('click', function (event) {
          currentImageIndex = index;
          afficherModal();
        });
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

    // modal
    var modal = document.getElementById("modal");
    var closeButton = document.getElementsByClassName("closecard")[0];

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        hideModal();
      }
    });

    closeButton.addEventListener("click", hideModal);

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Récupérer les valeurs des champs
      const prenom = document.getElementById('prenom').value;
      const nom = document.getElementById('nom').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Afficher les valeurs dans la console
      console.log('Prénom :', prenom);
      console.log('Nom :', nom);
      console.log('Email :', email);
      console.log('Message :', message);

    });

  }

  return { getUserCardDOM };
}
