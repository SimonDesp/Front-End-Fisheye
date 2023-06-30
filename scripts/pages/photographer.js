async function getPhotographerbyId(id) {
  return fetch('data/photographers.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erreur lors de la récupération des données.');
      }
    })
    .then(data => {
      const photographer = {
        information: {},
        medias: [],
      }
      data.photographers.forEach((info) => {
        if (id === info.id) {
          photographer.information = info
        }
      })
      data.media.forEach((info) => {
        if (id === info.photographerId) {
          photographer.medias.push(info)
        }
      })

      return photographer
    })
    .catch(error => {
      console.error(error);
    });
}


async function displayData(photographer) {
  const photographerSection = document.querySelector(".photograph-header");
  const photographerFactory = photographerPageFactory(photographer);
  photographerFactory.getUserCardDOM();

}

function init() {
  let params = (new URL(document.location)).searchParams;
  let specificId = parseInt(params.get('id'));

  getPhotographerbyId(specificId).then(photographer => {
    displayData(photographer);
  });
}

init();
