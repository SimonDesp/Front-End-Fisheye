function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.classList.add('photographer-card');
    const link = document.createElement('a');
    link.href = `photographer.html?id=${id}`;
    link.classList.add('hidden-link-decoration');
    link.style.textDecoration = 'none';
    link.setAttribute('role', 'lien vers la page du photoghe');
    link.setAttribute('aria-label', `${name}, ${city}, ${country}, photographer profile`);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}'s profile picture`);
    img.classList.add('profile-image');

    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.classList.add('name');

    const p2 = document.createElement('p');
    p2.textContent = `${city}, ${country}`;
    p2.classList.add('location');

    const p4 = document.createElement('p');
    p4.textContent = `${tagline}`;
    p4.classList.add('tagline');

    const p5 = document.createElement('p');
    p5.textContent = `${price}€/jour`;
    p5.classList.add('price');

    const idElement = document.createElement('p');
    idElement.textContent = `${id}`;
    idElement.classList.add('id-photographer');

    link.appendChild(article);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p2);
    article.appendChild(p4);
    article.appendChild(p5);
    article.appendChild(idElement);

    return link;
  }

  return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}
