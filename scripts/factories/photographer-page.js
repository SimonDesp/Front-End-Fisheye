class PhotographerCardInformation {
  constructor(photographerInformation) {
    const { name, portrait, city, country, tagline, price } = photographerInformation;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.assetMedia = `assets/photographers/`
  }

  display() {
    const picture = this.assetMedia + this.portrait
    const headerContainer = document.getElementById('photograph-header');

    const div = document.createElement('div');
    div.classList.add('info');

    const h2 = document.createElement('h1');
    h2.textContent = this.name;
    h2.classList.add('name');

    const p2 = document.createElement('p');
    p2.textContent = `${this.city}, ${this.country}`;
    p2.classList.add('location');

    const p4 = document.createElement('p');
    p4.textContent = `${this.tagline}`;
    p4.classList.add('profil');
    p4.classList.add('tagline');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.classList.add('profile-image');
    img.setAttribute('aria-label', `image : ${this.name}`);

    div.appendChild(h2);
    div.appendChild(p2);
    div.appendChild(p4);
    headerContainer.appendChild(div);
    headerContainer.appendChild(img);
  }
}

class DisplayMenuTrier {
  constructor(medias, instanceDisplayMedias) {
    this.medias = medias;
    this.instanceDisplayMedias = instanceDisplayMedias;
  }

  displayMenuTrier() {
    const menuTrier = document.createElement('div');
    menuTrier.classList.add('menuTrier');

    const divTrier = document.createElement('div');
    divTrier.classList.add('DivTrier');
    divTrier.textContent = 'Trier par :';

    const menuDeroulant = document.createElement('ul');
    menuDeroulant.classList.add('menuDeroulant');

    const options = ['Popularité','Popularité', 'Date', 'Nom'];

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

    // Gestion du tri
    menuDeroulant.addEventListener('click', (event) => {
      const selectedOption = event.target.textContent;

      switch (selectedOption) {
        case 'test':
          break;
        case 'Nom':
          this.trierParNom();
          break;
        case 'Popularité':
          this.trierParPopularite();
          break;
        case 'Date':
          this.trierParDate();
          break;
      }
    });
  }

  trierParNom() {
    const testOption = document.querySelector('.menuDeroulant li:first-child');
    testOption.querySelector('span').textContent = 'Nom';

    this.medias.sort((premier, second) => {
      return premier.title.localeCompare(second.title);
    });

    this.mettreAJourAffichage();
  }

  trierParPopularite() {
    const testOption = document.querySelector('.menuDeroulant li:first-child');
    testOption.querySelector('span').textContent = 'Popularité';

    this.medias.sort((premier, second) => {
      return second.likes - premier.likes;
    });

    this.mettreAJourAffichage();
  }

  trierParDate() {
    const testOption = document.querySelector('.menuDeroulant li:first-child');
    testOption.querySelector('span').textContent = 'Date';

    this.medias.sort((premier, second) => {
      return new Date(premier.date) - new Date(second.date);
    });

    this.mettreAJourAffichage();
  }

  mettreAJourAffichage() {
    this.instanceDisplayMedias.containerMedia.innerHTML = '';
    this.instanceDisplayMedias.createMedias();
  }
}

class FormContact {
  constructor() {
    this.form = document.querySelector('form');
    this.prenomLabel = document.querySelector('label[for="prenom"]');
    this.nomLabel = document.querySelector('label[for="nom"]');
    this.emailLabel = document.querySelector('label[for="email"]');
    this.messageLabel = document.querySelector('label[for="message"]');

    this.modalContactElement = document.getElementById("contact_modal");
    this.closeContact = this.modalContactElement.querySelector(".close-contact");
    this.closeContact.setAttribute("tabindex", "0");
    this.closeContact.addEventListener("click", () => this.hideContactModal());
    this.closeContact.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.hideContactModal();
      }
    });

    this.setupForm();
  }

  setupForm() {
    this.prenomLabel.textContent = "Prénom";
    this.nomLabel.textContent = "Nom";
    this.emailLabel.textContent = "Email";
    this.messageLabel.textContent = "Message";

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      const prenom = document.getElementById('prenom').value;
      const nom = document.getElementById('nom').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (prenom.length < 2) {
        alert("Le champ Prénom doit comporter au moins 2 caractères.");
        return;
      }

      if (nom.length < 2) {
        alert("Le champ Nom doit comporter au moins 2 caractères.");
        return;
      }

      if (!email.match(emailRegex)) {
        alert("Veuillez entrer une adresse e-mail valide.");
        return;
      }

      if (message.length < 10) {
        alert("Le champ Message doit comporter au moins 10 caractères.");
        return;
      }

      console.log('Prénom :', prenom);
      console.log('Nom :', nom);
      console.log('Email :', email);
      console.log('Message :', message);
    });

  }



  hideContactModal() {
    this.modalContactElement.style.display = "none";
  }
}

class ModalImageVideo {
  constructor(name, medias) {
    this.name = name;
    this.medias = medias;
    this.currentImageIndex = 0;
    this.modalElement = document.getElementById("modal");
    this.modalImage = this.modalElement.querySelector("#modal-image");
    this.modalVideo = this.modalElement.querySelector("#modal-video");
    this.modalFlecheGauche = this.modalElement.querySelector(".modal-fleche-gauche");
    this.modalFlecheDroite = this.modalElement.querySelector(".modal-fleche-droite");
    this.modalFlecheGauche.setAttribute("tabindex", "0");
    this.modalFlecheDroite.setAttribute("tabindex", "0");
    this.closecardButton = this.modalElement.querySelector(".closecard");
    this.closecardButton.setAttribute("tabindex", "0");

    const closecard = this.modalElement.querySelector(".closecard");
    closecard.addEventListener("click", () => this.hideModal());
    this.modalFlecheGauche.addEventListener("click", () => this.montrerProchaineImage());
    this.modalFlecheDroite.addEventListener("click", () => this.montrerPrecedenteImage());

     this.modalFlecheGauche.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.montrerProchaineImage();
      }
    });

    this.modalFlecheDroite.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.montrerPrecedenteImage();
      }
    });

    this.closecardButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.hideModal();
      }
    });

  }

  afficherModal(index) {
    this.currentImageIndex = index;
    const selectedMedia = this.medias[this.currentImageIndex];

    if (selectedMedia.image) {
      this.modalImage.src = `assets/photographers/${this.name}/compresed/${selectedMedia.image}`;
      this.modalImage.style.display = "block";
      this.modalVideo.style.display = "none";
    } else if (selectedMedia.video) {
      this.modalImage.style.display = "none";
      this.modalVideo.src = `assets/photographers/${this.name}/${selectedMedia.video}`;
      this.modalVideo.style.display = "block";
    }

    this.modalElement.style.display = "block";
    this.closecardButton.focus();

  }

  montrerProchaineImage() {
    if (this.currentImageIndex === 0) {
      this.currentImageIndex = this.medias.length - 1;
    } else {
      this.currentImageIndex--;
    }

    this.updateModalImage();
  }

  montrerPrecedenteImage() {
    if (this.currentImageIndex === this.medias.length - 1) {
      this.currentImageIndex = 0;
    } else {
      this.currentImageIndex++;
    }

    this.updateModalImage();
  }

  updateModalImage() {
    const selectedMedia = this.medias[this.currentImageIndex];
    if (selectedMedia.image) {
      this.modalImage.src = `assets/photographers/${this.name}/compresed/${selectedMedia.image}`;
      this.modalImage.style.display = "block";
      this.modalVideo.style.display = "none";
    } else if (selectedMedia.video) {
      this.modalImage.src = "";
      this.modalImage.style.display = "none";
      this.modalVideo.src = `assets/photographers/${this.name}/${selectedMedia.video}`;
      this.modalVideo.style.display = "block";
    }
  }

  hideModal() {
    this.modalElement.style.display = "none";
  }
}

class DisplayMedias {
  constructor(name, medias, price) {
    this.name = name;
    this.medias = medias;
    this.price = price;
    this.containerMedia = document.createElement('div');
    this.containerMedia.classList.add('mediaContainer');
    this.modalInstance = new ModalImageVideo(name, medias);
  }

  updateTotalLikes() {
    let totalLikes = 0;
    this.medias.forEach((element) => {
      totalLikes += element.likes;
    });
    this.compteurCoeur.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
  }

  createMedias() {
    this.medias.forEach((element, index) => {
      const cardMediaPhoto = document.createElement('div');
      cardMediaPhoto.classList.add('cardMediaPhoto');

      const cardBas = document.createElement('div');
      cardBas.classList.add('card-bas');

      let media = null;

      if (element.image !== undefined) {
        media = document.createElement('img');
        media.setAttribute('src', `assets/photographers/${this.name}/compresed/${element.image}`);
        media.classList.add('imageMedia');
        media.setAttribute('aria-label', `photo : ${element.title}`);
      } else if (element.video !== undefined) {
        media = document.createElement('video');
        media.setAttribute('src', `assets/photographers/${this.name}/${element.video}`);
        media.setAttribute('controls', '');
        media.classList.add('videoMedia');
        media.setAttribute('aria-label', `video : ${element.title}`);
      }

      if (media !== null) {
        media.classList.add('media');

        const mediaTitle = document.createElement('h2');
        mediaTitle.textContent = element.title;
        mediaTitle.classList.add('mediaTitle');

        const coeur = document.createElement('p');
        coeur.innerHTML = `${element.likes} <i class="fa-solid fa-heart like-heart" style="color: #911c1c;"></i>`;
        coeur.classList.add('coeur');

        coeur.addEventListener('click', () => {
          this.likeMedia(element, coeur);
        });

        coeur.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            this.likeMedia(element, coeur);
          }
        });

        media.setAttribute("tabindex", "0");
        mediaTitle.setAttribute("tabindex", "0");
        coeur.setAttribute("tabindex", "0");

        cardMediaPhoto.appendChild(media);
        cardBas.appendChild(mediaTitle);
        cardBas.appendChild(coeur);
        cardMediaPhoto.appendChild(cardBas);
        this.containerMedia.appendChild(cardMediaPhoto);

        media.addEventListener('click', () => {
          this.modalInstance.afficherModal(index);
        });

        media.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            this.modalInstance.afficherModal(index);
          }
        });
      }
    });
  }


  likeMedia(element, coeur) {
    if (coeur.classList.contains('liked')) {
      element.likes--;
      coeur.classList.remove('liked');
    } else {
      element.likes++;
      coeur.classList.add('liked');
    }
    coeur.innerHTML = `${element.likes} <i class="fa-solid fa-heart like-heart" style="color: #911c1c;"></i>`;
    this.updateTotalLikes();
  }

  displayLikesAndPrice() {
    this.createMedias()
    const divCoeur = document.createElement('div');
    divCoeur.classList.add('divCoeur');

    this.compteurCoeur = document.createElement('p');
    this.compteurCoeur.classList.add('compteurCoeur');
    this.updateTotalLikes();

    const prix = document.createElement('p');
    prix.textContent = `${this.price}€ / jour`;
    prix.classList.add('prix');

    divCoeur.appendChild(this.compteurCoeur);
    divCoeur.appendChild(prix);

    const body = document.querySelector('body');
    body.appendChild(divCoeur);
    body.appendChild(this.containerMedia);
  }
}

class PhotographerUIFactory {
  constructor(photographer) {
    this.medias = photographer.medias;
    this.assetMedia = `assets/photographers/`;
    this.displayMedias = new DisplayMedias(photographer.information.name, photographer.medias, photographer.information.price);
    this.PhotographerCardInformation = new PhotographerCardInformation(photographer.information);
    this.MenuTrier = new DisplayMenuTrier(this.medias, this.displayMedias);
    this.formContact = new FormContact();
  }

  displayPage() {
    this.PhotographerCardInformation.display();
    this.MenuTrier.displayMenuTrier();
    this.displayMedias.displayLikesAndPrice();

  }
}
