
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


  // CHIARI
  // const filterJobs = (item) => {
  //   show = true

  //   if (filters.indexOf(item) !== -1) {
  //     filters.splice(filters.indexOf(item), 1)
  //   } else {
  //     filters.push(item)
  //   }

  //   if (filters.length === 0) {
  //     show = false
  //     jobList(jobs)
  //   }

  //   if (show) {
  //     const tags = filters.map(i => {
  //       return `<span class="card__tag">${i}</span>`
  //     }).join("")

  //     search.innerHTML = `${tags}`
  //     search.classList.remove("hide")
  //   } else {
  //     search.innerHTML = ""
  //     search.classList.add("hide")
  //   }

  //   let jobsFiltered = jobs.filter((job) => {
  //     return filters.every(filtro => {
  //       return [
  //         job.role,
  //         job.level,
  //         ...(job.languages || []),
  //         ...(job.tools || []),
  //       ].includes(filtro)
  //     })
  //   })


  //   jobList(jobsFiltered)
  // }



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


// BELU
// close.addEventListener("click", function () {
//   modalContent.classList.remove("active");
//   ofertasTrabajo(trabajos);
//   displayTag.innerHTML = "";

// });


