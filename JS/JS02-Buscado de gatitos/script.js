const menu = document.querySelector("ul");
const tabSection = document.querySelectorAll(".tab-section");

menu.addEventListener("click", (e) => {

  let target_a = e.target; //esto es el "a" - enlace
  let target_li = e.target.parentElement; //esto es el "li"

  //le saco la clase is-active al primer item menu
  menu.firstElementChild.classList.remove('is-active');

  displayTab(target_li)
  displaySection(target_a)
});

let selectedTab;
const displayTab = (tab) => {

  if (selectedTab) { // remove is-active from last selectedTab
    selectedTab.classList.remove('is-active');
  }
  selectedTab = tab;
  selectedTab.classList.add('is-active');

};

const displaySection = (link) => {
  tabSection.forEach(tab => {
    //le saco el # al href asi queda la palabra pelada
    let newLink = link.hash.substring(1);

    if (tab.id === newLink) {
      tab.classList.remove('is-hidden');
    }
    else {
      tab.classList.add('is-hidden');
    }
  });

};

const btnRandom = document.getElementById("random-cat-btn");
const imgRandom = document.getElementById("cat-img");

btnRandom.addEventListener("click", () => {
  btnRandom.classList.add("is-loading")
  getRandom()
});

const getRandom = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search/");
  const data = await response.json();

  //Aca tednriamos q manejar los errores
  // if(!response.ok){
  //     alert("algo salio mal")
  // }

  imgRandom.src = data[0].url;

};

//esto es una fx onload en la imagen. cuadno se termina de cargar le saca la clase is-loading
const stopIsLoading = () => {
  btnRandom.classList.remove("is-loading")
};

const btnSearch = document.getElementById("breed-search-btn");
const searchInput = document.getElementById("breed-search-input");
const table = document.getElementById("breed-search-results");
const select = document.getElementById("breed-dropdown");


const getBreed = async (value) => {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const data = await response.json();
  const breeds = data.filter(element => (element.name.toLowerCase()).includes(value.toLowerCase()))

  table.innerHTML = breeds.reduce((acc, item) => {
    return acc + `
      <tr>
        <td>${item.name}</td>
      </tr>
     `
  }, "")
};


searchInput.addEventListener('keyup', () => {
  getBreed(searchInput.value)

})


const showOptions = async () => {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const data = await response.json();

  select.innerHTML = data.reduce((acc, item) => {
    return acc + `<option value=${item.id}>${item.name}</option>`
  }, "")

  // select.firstChild.setAttribute('selected', 'true')
}


const card = document.getElementById('card-body')
const image = document.getElementById('breed-img')


const updateCardInfo = async () => {
  const responseInfo = await fetch(`https://api.thecatapi.com/v1/breeds/${select.value}`);
  const info = await responseInfo.json();

  let temperament = info.temperament.split(",")
  temperament.reduce((acc, t) => {
    acc + `<span class=" tag">${t}</span>`
  }, '')


  card.innerHTML =
    `
    <h1 id="breed-name">${info.name}</h1>

    <p id="breed-description">
    ${info.description}
    </p>
    <div class="tags" id="breed-temperament">
    ${temperament}
    </div>
  `
}

const updateCardImg = async () => {
  const responseImg = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${select.value}`);
  const img = await responseImg.json();
  image.src = img[0].url
}

let breedsWithImg
const result = document.getElementById("breed-results")

const getInfo = async () => {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const data = await response.json();

  let img = [];
  for (let item of data) {

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${item.id}`);
    const data = await response.json();
    img.push(data[0].url)

  }

  // console.log(img)
  breedsWithImg = data.map((breed, index) => {

    return { ...breed, img: img[index] }


  })

}

const initBreedsWithFilters = async () => {
  await getInfo();
  // console.log(breedsWithImg)
  createCards(breedsWithImg);
}

const createCards = (breeds) => {

  const cards = breeds.reduce((acc, cat) => {
    return acc + `
    <div class="column is-6">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="${cat.img}" />
        </figure>
      </div>
      <div class="card-content">
        <p class="title is-5">${cat.name}</p>
      </div>
    </div>
  </div>
    `
  }, '')

  result.innerHTML = cards
}




// BELU

// const fIlterOptions = document.getElementById("filter_content")
// // y les asigne evento si se hace click:
// fIlterOptions.addEventListener("click", (e) => {

//   let targetID = e.target.id  //esto es el input value, ej: "hairless"
//   //console.log(e.target.id, e.target.checked )
//   let targetIfChecked = e.target.checked

//   applyFilter(targetID, targetIfChecked)
// });




const filters = document.querySelectorAll('.breed-filter')

console.log(filters)

let arrCards = []

filters.forEach(filter => {

  filter.addEventListener('click', (event) => {
    const { value, checked } = event.target;

    if (checked) {
      arrCards.push(value)
    }
    else {
      let index = arrCards.indexOf(value)
      arrCards.splice(index, 1)
    }
    console.log(arrCards)
  })
});

// targetID -> me retorna los valroes "hairless", etc

// targetIfChecked -> si fija si esta tildado y devuelve true or false


/*
- para actualizar la info de una raza, usar el endpoint: https://api.thecatapi.com/v1/breeds/:id, donde `:id` es el id del value del select, por ejemplo https://api.thecatapi.com/v1/breeds/beng
- la imagen la obtenemos de https://api.thecatapi.com/v1/images/search?breed_ids=raza_id, donde `raza_id` es el id de la raza
- al cargar la página, actualizar la info de la raza con la primera raza de la consulta
*/
/*
let breedFull

const response = await fetch("https://api.thecatapi.com/v1/breeds");
const data = await response.json();

let arrUrlImg =[];

let arrID = data.map(item => {
    return item.id
})

for(let id of arrID){

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`);
    const data = await response.json();
    arrUrlImg.push(data[0].url)
    
}

let i= 0;
for (item in data){

  breedFull = data
  breedFull[item].url = arrUrlImg[i]
  i++
}
*/
showOptions()
  .then(updateCardImg)
  .then(updateCardInfo)

initBreedsWithFilters()

/*
- para actualizar la info de una raza, usar el endpoint: https://api.thecatapi.com/v1/breeds/:id, donde `:id` es el id del value del select, por ejemplo https://api.thecatapi.com/v1/breeds/beng
- la imagen la obtenemos de https://api.thecatapi.com/v1/images/search?breed_ids=raza_id, donde `raza_id` es el id de la raza
- al cargar la página, actualizar la info de la raza con la primera raza de la consulta
*/
/*
let breedFull

const response = await fetch("https://api.thecatapi.com/v1/breeds");
const data = await response.json();

let arrUrlImg =[];

let arrID = data.map(item => {
    return item.id
})

for(let id of arrID){

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`);
    const data = await response.json();
    arrUrlImg.push(data[0].url)

}

let i= 0;
for (item in data){

  breedFull = data
  breedFull[item].url = arrUrlImg[i]
  i++
}
*/

/*
- para actualizar la info de una raza, usar el endpoint: https://api.thecatapi.com/v1/breeds/:id, donde `:id` es el id del value del select, por ejemplo https://api.thecatapi.com/v1/breeds/beng
- la imagen la obtenemos de https://api.thecatapi.com/v1/images/search?breed_ids=raza_id, donde `raza_id` es el id de la raza
- al cargar la página, actualizar la info de la raza con la primera raza de la consulta
*/