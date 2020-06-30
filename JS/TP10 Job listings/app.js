
const cardContainer = document.querySelector("#card-container");
const filtros = []

const tags = (array) => {
  return array.reduce((accum, item) => {
    return accum + `<span onclick = "filtrar('${item}')" id="${item}"  class="card__tag">${item}</span>`
  }, "");
}

const filtrar = (item) => {
  if (filtros.indexOf(item) === -1) {
    filtros.push(item)
    // document.querySelectorAll(`#${item}`).classlist.add("card__tag--selected")
  }
  else {
    filtros.splice(filtros.indexOf(item), 1)
  }

  if (filtros === []) {
    ofertasDeTrabajo(jobListing)
  }


  const trabajos = jobListing.filter((trabajo) => {
    return filtros.every(filtro => {
      return [
        trabajo.role,
        trabajo.level,
        ...(trabajo.languages || []),
        ...(trabajo.tools || [])
      ].includes(filtro)
    })

  })

  ofertasDeTrabajo(trabajos)
}



const ofertasDeTrabajo = (trabajos) => {
  cardContainer.innerHTML = trabajos.reduce((accum, trabajo) => {
    return accum + `<div class="card card--selected">
    <div class="card__column card__column--left">
      <img src="${trabajo.logo}" alt="${trabajo.company}" class="card__img">
      <div class="card__info">
      <h2 class="card__subtitle">
      <span class="card__subtitle__texts">${trabajo.company}</span>
            ${isNew(trabajo)}
            ${isFeatured(trabajo)}
          </h2>
          <h2 class="card__title">
            ${trabajo.position}
            </h2>
          <div class="card__detail">
            <p class="card__detail__item">${trabajo.postedAt}</p>
            <p class="card__detail__item">${trabajo.contract}</p>
            <p class="card__detail__item">${trabajo.location}</p>
            </div>
        </div>
        </div>
      <div class="card__column card__column--rigth">
    
      
        ${tags(
      [
        trabajo.role,
        trabajo.level,
        ...(trabajo.languages || []),
        ...(trabajo.tools || [])
      ])}
      
      
      </div>
      </div>`
  }, "");
};

const isNew = (job) => {
  if (job.new) {
    return `<span class="badge badge--primary">New!</span>`
  } else {
    return ""
  }
}
const isFeatured = (job) => {
  if (job.featured) {
    return '<span class="badge badge--black">Featured!</span>'
  } else {
    return ""
  }
}



ofertasDeTrabajo(jobListing)





