function getPhotographerbyId(id) {
  fetch('data/photographers.json')
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
      displayPhotographerPage(photographer);
    })
    .catch(error => {
      console.error(error);
    });
}


function displayPhotographerPage(photographer) {

  const photographerUIFactory = new PhotographerUIFactory(photographer);
  photographerUIFactory.displayPage();
}

function init() {
  let params = (new URL(document.location)).searchParams;
  let specificId = parseInt(params.get('id'));

  getPhotographerbyId(specificId)
}

init();
