


// paso a paso:
/*


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

listContainer.addEventListener("click", (e) => {


  for (let i = 0; i < listContainer.children.length; i++) {
    const child = listContainer.children[i];
    child.classList.remove("is-active");
  }


  event.target.parentElement.classList.add("is-active");


  let hrefTarget = event.target.getAttribute("href");


  for (let i = 0; i < tabSection.length; i++) {
    let idSection = tabSection[i].getAttribute("id");
    const section = tabSection[i];

    if (`#${idSection}` !== hrefTarget) {
      section.classList.add("is-hidden")
    } else {
      section.classList.remove("is-hidden")
    }

  }

});


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
  console.log('Hola');
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
            <td>${raza.name}</td>
          </tr>`
  }, "")

}


const getBreedByValue = (value) => {
  return fetch(`https://api.thecatapi.com/v1/breeds/search?q=${value}`)
    .then(response => {
      return response.json()
    })
    .then(dataJSON => {
      // console.log(dataJSON)
      return dataJSON;
    })
}


// RAZAS paso a paso
/*
  1- traer todas las razas
  2- al cargar la pagina, mostrar TODAS las razas como cards.
  3- con  la info de las razas, hacer todo el select (con el id de la raza en value)
  4- cuando selecciono una option
    - traer info de la raza con fetch modificando la url con el value de la option
    - traer la imagen de esa raza modificando url con id de la raza
    
    -crear la card correspondiente a esa info e imagen 
*/

// RAZAS
const tagRazas = document.getElementById("tagRazas")
const selectBreedContainer = document.getElementById("breed-dropdown")




const loadOptions = (data) => {
  return data.reduce((accum, raza) => {
    return accum + `<option value="${raza.id}">${raza.name}</option>`
  }, "")


}

const getAllBreeds = () => {
  return fetch("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      return response.json()
    })
    .then(breedsData => {
      console.log(breedsData);

      return breedsData
    })
}


tagRazas.addEventListener("click", () => {
  getAllBreeds()
    .then(breeds => {
      selectBreedContainer.innerHTML = loadOptions(breeds)
      // HOLA SI, PORQUE NO SE ME MUESTRA SELECCIONADO??????, POR CONSOLA E MUESTRA QUE ESTA SELECCIONADO!!!
      selectBreedContainer.firstChild.setAttribute("selected", "true")
      console.log(selectBreedContainer.firstChild)

    })
  // .then(() => {
  //   selectBreedContainer.firstChild.setAttribute('selected', 'true')
  // })

})







// INICIALIZACION DE LA PAGINA  
function initialize() {
  showImagenRandom()
}


initialize()






// 