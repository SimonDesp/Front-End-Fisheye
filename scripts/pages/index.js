async function getPhotographers() {
  return fetch('data/photographers.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erreur lors de la récupération des données.');
      }
    })
    .then(data => {
      const photographers = data.photographers;
      return photographers
    })
    .catch(error => {
      console.error(error);
    });

}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

function init() {
  getPhotographers().then(photographers => {
    displayData(photographers);
  });
};

init();
