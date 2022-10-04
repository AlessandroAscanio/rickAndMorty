const cardContainer = document.querySelector('[data-js="wrapper"]')

let page = 1

 const fetchData = async () => {
  const url = `https://rickandmortyapi.com/api/character?page=${page}`

  try {
    const response = await fetch(url)

    if(!response.ok) {
      throw new Error('Não foi possível obter os dados da Rick and Mory API')
    }

    return response.json()
  } catch ({name, error}){
    alert(`${name}: ${error}`)
  }
}

const getCharacters = async () => await fetchData()

const showCaracters = async () => {
  const {results} = await getCharacters()

  let characterTemplate = results
    .map(({image, name, status, species, gender, location}) => {
      return `
      <div class="card">
        <img src="${image}" alt="">
        <div class="info">
          <h2>${name}</h2>
          <span>status: ${status}</span>
          <span>species: ${species}</span>
          <span>gender: ${gender}</span>
          <span>location: ${location.name}</span>
        </div>
      </div>
      `
    })
    .join('')

  cardContainer.innerHTML += characterTemplate
} 

showCaracters()

const getNextCharacters = () => {
  page++
  showCaracters()
}

const showNextCaracters = () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement
  const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -10

  if(isPageBottomAlmostReached) {
    getNextCharacters()
  }
}

window.addEventListener('scroll', showNextCaracters)