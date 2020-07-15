


// paso a paso:
/*
// ----------------------------------------------------------------------------------------------------------------


//  TABS PASO A PASO
1-al hacer click en la tab:
  -sacarle los is active a todos los li
  -agregarle is active al elemento clickeado
  -agregarle is hidden a todas las secciones
  - sacarle is hidden a la seccion que se clickeo
 */

// TABS

const listContainer = document.getElementById("list-container")
const tabSection = document.getElementsByClassName("tab-section")

function selectTab(hrefTarget, event) {
  for (let i = 0; i < listContainer.children.length; i++) {
    const child = listContainer.children[i];
    child.classList.remove("is-active");
  }
  const element = document.querySelector(`a[href='${hrefTarget}']`)
  element.parentElement.classList.add("is-active");

  for (let i = 0; i < tabSection.length; i++) {
    let idSection = tabSection[i].getAttribute("id");
    const section = tabSection[i];

    if (`#${idSection}` !== hrefTarget) {
      section.classList.add("is-hidden")
    } else {
      section.classList.remove("is-hidden")
    }
  }
}

listContainer.addEventListener("click", (e) => {
  let hrefTarget = event.target.getAttribute("href");
  selectTab(hrefTarget, e)
});

// ----------------------------------------------------------------------------------------------------------------


// RANDOM PASO A PASO
/*
1. cuando hago click en tag random
poner una imagen del endpoint en la card
2. cuando apreto el boton otro gatito:
  -primero poner loading en el boton
  -poner otra imagen en la card
  -cuando se carga la imagen sacar el loading del boton 
3. 
*/

// RANDOM
const tagRandom = document.getElementById("tagRandom");
const imgRandom = document.getElementById("imgRandom");
const btnRandomCat = document.getElementById("random-cat-btn")

const getImgRandom = () => {
  return fetch("https://api.thecatapi.com/v1/images/search/")
    .then(response => {
      return response.json()
    })
    .then(dataJSON => {
      return dataJSON

    })
}

const showImagenRandom = () => {
  return getImgRandom()
    .then((data) => {
      imgRandom.innerHTML = `<img src='${data[0].url}' id="cat-img" />`
    })
}



tagRandom.addEventListener("click", showImagenRandom)
btnRandomCat.addEventListener("click", () => {
  btnRandomCat.classList.add("is-loading")
  showImagenRandom().then(() => {
    btnRandomCat.classList.remove("is-loading")
  })
})

// ----------------------------------------------------------------------------------------------------------------


// BUSQUEDA RAZAS
/* paso a paso

  1.linkear el boton y el input
  2.al hacer submit , traer todas las opciones que se parezcan a lo que se busca (mostrar una lista con las opciones)
    - hacer fetch reemplazando parte de ls url 
    . con esa info 
  3.
*/
// BUSQUEDA RAZAS

const breedSearchInput = document.getElementById("breed-search-input")
const breedSearchForm = document.getElementById("breed-search-form")
const breedSearchBtn = document.getElementById("breed-search-btn")
const resultSearchBreedContainer = document.getElementById("breed-search-results")

breedSearchForm.addEventListener("submit", (event) => {
  event.preventDefault()
  breedSearchBtn.classList.add("is-loading")
  getBreedByValue(breedSearchInput.value)
    .then(info => {
      resultSearchBreedContainer.innerHTML = createTable(info)
      breedSearchBtn.classList.remove("is-loading")


    })
  breedSearchInput.value = "";
})

const createTable = (data) => {
  return data.reduce((accum, raza) => {
    return accum + `<tr>
            <td id="${raza.id}"> <a onclick="goToBreedsTab('${raza.id}')" href="#breeds">${raza.name}</a></td>
          </tr>`
  }, "")
}

function goToBreedsTab(id) {
  getAllBreeds(selectBreedContainer.children.length)
    .then((breeds) => {
      selectBreedContainer.innerHTML = loadOptions(breeds)
      selectBreedContainer.value = id
      createCard(selectBreedContainer.value)
      selectTab('#breeds')
    })
}



const getBreedByValue = (value) => {
  return fetch(`https://api.thecatapi.com/v1/breeds/search?q=${value}`)
    .then(response => {
      return response.json()
    })
    .then(dataJSON => {
      return dataJSON;
    })
}

// ----------------------------------------------------------------------------------------------------------------

// RAZAS paso a paso
/*
  1- traer todas las razas
  2- al cargar la pagina, mostrar TODAS las razas como cards.
    -mostrar la primera opcion como seleccionada
  3- con  la info de las razas, hacer todo el select (con el id de la raza en value)
  4- cuando selecciono una option
    - traer info de la raza con fetch modificando la url con el value de la option
    - traer la imagen de esa raza modificando url con id de la raza
    
    -crear la card correspondiente a esa info e imagen 
*/

// RAZAS
const tagRazas = document.getElementById("tagRazas")
const selectBreedContainer = document.getElementById("breed-dropdown")
const cardContainer = document.getElementById('breed-card')



const getAllBreeds = () => {
  return fetch("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      return response.json()
    })
    .then(breedsData => {

      return breedsData
    })
}


const loadOptions = (data) => {
  return data.reduce((accum, raza) => {
    return accum + `<option value="${raza.id}">${raza.name}</option>`
  }, "")


}


tagRazas.addEventListener("click", () => {
  getAllBreeds()
    .then((breeds) => {
      selectBreedContainer.innerHTML = loadOptions(breeds)
      selectBreedContainer.firstChild.setAttribute("selected", "true")
      createCard(selectBreedContainer.firstChild.value)
    })


})

selectBreedContainer.addEventListener("change", (event) => {
  createCard(event.target.value)
})

const createCard = (id) => {
  return getBreedById(id)
    .then(breed => enhanceBreedWithImage(breed))
    .then(enahanceBreed => BreedCard({ breed: enahanceBreed }))
    .then(card => render(cardContainer, card))
}

function getBreedById(id) {
  return fetch(`https://api.thecatapi.com/v1/breeds/${id}`)
    .then(response => response.json())
}

function getBreedImageById(id) {
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
    .then(response => response.json())
    .then(dataJSON => dataJSON[0].url)
}

// object => object
function enhanceBreedWithImage(breed) {
  return getBreedImageById(breed.id)
    .then(image => ({ ...breed, image }))
}

function BreedCard(props) {
  return (
    `<div class="columns is-gapless">
          <div class="column">
            <figure class="image">
              <img src="${props.breed.image}" alt="Placeholder image" id="breed-img" />
            </figure>
          </div>
          <div class="column">
            <div class="content p-1">
              <h1 id="breed-name">${props.breed.name}</h1>
                <p id=" breed-description">
                ${props.breed.description}
                </p>
                <div class="tags" id="breed-temperament">
                  ${stringToSpan(props.breed.temperament)}
                </div>
            </div>
          </div>
        </div>
      </div>`

  )
}

function stringToSpan(string) {
  return string.split(",").reduce((accum, elem) => {
    return accum + `<span class="tag">${elem}</span>`
  }, "")
}

function render(container, content) {
  container.innerHTML = content
}

// ----------------------------------------------------------------------------------------------------------------


// BUSQUEDA CON FILTROS paso a paso
/*
1- traer todas las breeds getAllBreeds
traer cada imagen por id y ...
2. meterle todas las imagenes a todas las breeds, con map
3. de ahi hacer las cards 
4. crear filtros y crear las cards a medida que se le van agregando
filtro, filter -every
 
 
 
*/
// BUSQUEDA CON FILTROS

const tagBreedFilters = document.getElementById("tagBreedFilters");
const breedResults = document.getElementById("breed-results")
const filterContainer = document.getElementById("filterContainer")




let arrayBreedsWithImg;

function getAllBreedsWithImg() {
  return getAllBreeds()
    .then(breeds => {
      const promises = breeds.map((breed) => {
        return enhanceBreedWithImage(breed)
      })
      return Promise.all(promises)
    })
    .then(breeds => {
      arrayBreedsWithImg = breeds
      return breeds
    })
}

const createFilterCards = (arrayBreeds) => {
  return arrayBreeds.reduce((accum, breed) => {
    return accum + `
              <div class="column is-4">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${breed.image}" />
        </figure>
      </div>
      <div class="card-content">
        <p class="title is-5">${breed.name}</p>
      </div>
    </div>
  </div>`

  }, "")
}
const filteredBreedsArray = (allBreeds, filterValues) => {
  return allBreeds.filter(breed => {
    return filterValues.every(valor => {
      return breed[valor]
    })
  })
}



tagBreedFilters.addEventListener("click", () => {
  getAllBreedsWithImg()
    .then(() => {
      render(breedResults, createFilterCards(arrayBreedsWithImg))
    })
})

let filterValuesArray = [];
filterContainer.addEventListener("change", (event) => {
  let idTarget = event.target.id
  if (filterValuesArray.indexOf(idTarget) === -1) {
    filterValuesArray.push(idTarget);
  } else {
    filterValuesArray.splice(filterValuesArray.indexOf(idTarget), 1)
  }

  render(breedResults, createFilterCards(filteredBreedsArray(arrayBreedsWithImg, filterValuesArray)))


})




// INICIALIZACION DE LA PAGINA  
function initialize() {
  showImagenRandom()
}


initialize()






// 