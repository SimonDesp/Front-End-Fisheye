function photographerPageFactory(photographer) {
  const { name, portrait, city, country, tagline, price } = photographer.information;
  const medias = photographer.medias;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
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

    medias.forEach((element) => {
      const cardMediaPhoto = document.createElement('div');
      cardMediaPhoto.classList.add('cardMediaPhoto');

      const cardBas = document.createElement('div');
      cardBas.classList.add('card-bas');

      let media = null

      if (element.image !== undefined){
        media = document.createElement('img');
        media.setAttribute('src', `assets/photographers/${name}/${element.image}`);
        media.classList.add('imageMedia');
      }
      else if (element.video !== undefined){
        media = document.createElement('video');
        media.setAttribute('src', `assets/photographers/${name}/${element.video}`);
        media.classList.add('videoMedia');
      }

      if (media !== null) {
        media.classList.add('media');

        const mediaTitle = document.createElement('h2');
        mediaTitle.textContent = element.title;
        mediaTitle.classList.add('mediaTitle');

        const coeur = document.createElement('p');
        coeur.innerHTML = `${element.likes} <i class="fa-solid fa-heart" style="color: #911c1c;"></i>`;
        coeur.classList.add('coeur');

        cardMediaPhoto.appendChild(media);
        cardBas.appendChild(mediaTitle);
        cardBas.appendChild(coeur);
        cardMediaPhoto.appendChild(cardBas);
        mediaContainer.appendChild(cardMediaPhoto);
      }

    });

    // Compteur coeur et prix
    const divCoeur = document.createElement('div');
    divCoeur.classList.add('divCoeur');

    let sommeLikes = 0;

    medias.forEach((element) => {
      sommeLikes += element.likes;
    });

    const compteurCoeur = document.createElement('p');
    compteurCoeur.innerHTML = `${sommeLikes} <i class="fa-solid fa-heart"></i>`;
    compteurCoeur.classList.add('compteurCoeur');

    const prix = document.createElement('p');
    prix.textContent = `${price}€ / jour`;
    prix.classList.add('prix');

    divCoeur.appendChild(compteurCoeur);
    divCoeur.appendChild(prix);

    document.body.appendChild(mediaContainer);
    document.body.appendChild(divCoeur);

  }

  return { getUserCardDOM };
}
