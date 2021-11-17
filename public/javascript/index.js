const charactersAPI = new APIHandler('http://localhost:8000');


function createCards(response) {
  let charactersElement = document.getElementsByClassName("characters-container") 
  if (charactersElement[0].children.length>0) {
    for (let i=0; i<charactersElement[0].children.length; i++){
      charactersElement[0].removeChild(charactersElement[0].children[0])
    }
  }

  for (let i=0; i<response.data.length; i++) {
    
    let characterInfo = document.createElement("div")
    characterInfo.setAttribute("class", "character-info")

    let characterId = document.createElement("div")
    characterId.setAttribute("class", "id")
    characterId.innerHTML = "Id:"
    let characterIdInfo = document.createElement("span")
    characterIdInfo.innerHTML = response.data[i].id
    characterId.appendChild(characterIdInfo)
    characterInfo.appendChild(characterId)

    let characterName = document.createElement("div")
    characterName.setAttribute("class", "name")
    characterName.innerHTML = "Name:"
    let characterNameInfo = document.createElement("span")
    characterNameInfo.innerHTML = response.data[i].name
    characterName.appendChild(characterNameInfo)   
    characterInfo.appendChild(characterName)     

    let characterOccupation = document.createElement("div")
    characterOccupation.setAttribute("class", "occupation")
    characterOccupation.innerHTML = "Occupation:"
    let characterOccupationInfo = document.createElement("span")
    characterOccupationInfo.innerHTML = response.data[i].occupation
    characterOccupation.appendChild(characterOccupationInfo)   
    characterInfo.appendChild(characterOccupation)    

    let characterCartoon = document.createElement("div")
    characterCartoon.setAttribute("class", "cartoon")
    characterCartoon.innerHTML = "Is a Cartoon?"
    let characterCartoonInfo = document.createElement("span")
    characterCartoonInfo.innerHTML = response.data[i].cartoon
    characterCartoon.appendChild(characterCartoonInfo)   
    characterInfo.appendChild(characterCartoon)   

    let characterWeapon = document.createElement("div")
    characterWeapon.setAttribute("class", "cartoon")
    characterWeapon.innerHTML = "Weapon:"
    let characterWeaponInfo = document.createElement("span")
    characterWeaponInfo.innerHTML = response.data[i].weapon
    characterWeapon.appendChild(characterWeaponInfo)   
    characterInfo.appendChild(characterWeapon)   
    

    
    charactersElement[0].appendChild(characterInfo)
  }

}

function createSingleCard(response) {
  let charactersElement = document.getElementsByClassName("characters-container") 
  if (charactersElement[0].children.length>0) {
    for (let i=0; i<charactersElement[0].children.length; i++){
      charactersElement[0].removeChild(charactersElement[0].children[0])
    }
  }


    
    let characterInfo = document.createElement("div")
    characterInfo.setAttribute("class", "character-info")

    let characterId = document.createElement("div")
    characterId.setAttribute("class", "id")
    characterId.innerHTML = "Id:"
    let characterIdInfo = document.createElement("span")
    characterIdInfo.innerHTML = response.data.id
    characterId.appendChild(characterIdInfo)
    characterInfo.appendChild(characterId)

    let characterName = document.createElement("div")
    characterName.setAttribute("class", "name")
    characterName.innerHTML = "Name:"
    let characterNameInfo = document.createElement("span")
    characterNameInfo.innerHTML = response.data.name
    characterName.appendChild(characterNameInfo)   
    characterInfo.appendChild(characterName)     

    let characterOccupation = document.createElement("div")
    characterOccupation.setAttribute("class", "occupation")
    characterOccupation.innerHTML = "Occupation:"
    let characterOccupationInfo = document.createElement("span")
    characterOccupationInfo.innerHTML = response.data.occupation
    characterOccupation.appendChild(characterOccupationInfo)   
    characterInfo.appendChild(characterOccupation)    

    let characterCartoon = document.createElement("div")
    characterCartoon.setAttribute("class", "cartoon")
    characterCartoon.innerHTML = "Is a Cartoon?"
    let characterCartoonInfo = document.createElement("span")
    characterCartoonInfo.innerHTML = response.data.cartoon
    characterCartoon.appendChild(characterCartoonInfo)   
    characterInfo.appendChild(characterCartoon)   

    let characterWeapon = document.createElement("div")
    characterWeapon.setAttribute("class", "cartoon")
    characterWeapon.innerHTML = "Weapon:"
    let characterWeaponInfo = document.createElement("span")
    characterWeaponInfo.innerHTML = response.data.weapon
    characterWeapon.appendChild(characterWeaponInfo)   
    characterInfo.appendChild(characterWeapon)   
    

    
    charactersElement[0].appendChild(characterInfo)

}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then( response => {
        createCards(response)
      })
      .catch(error =>  {
        console.log(error)
      })

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    charactersAPI
    .getOneRegister(document.getElementById("character-id").value)
    .then(response => {
      createSingleCard(response)
    })
    .catch(error =>  {
      console.log(error)
    })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    charactersAPI
    .deleteOneRegister(document.getElementById("character-id-delete").value)
    .then(response => {
      document.getElementById('delete-one').setAttribute("class", "delete-one active")
    })
    .catch(error =>  {
      document.getElementById('delete-one').setAttribute("class", "delete-one error")
    })
  });
  ;

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    let characterInfo = {
      name: document.getElementById("cr-name").value,
      occupation: document.getElementById("cr-occupation").value,
      weapon: document.getElementById("cr-weapon").value,
      cartoon: document.getElementById("cr-cartoon").checked,
    }

    
    charactersAPI
    .createOneRegister(characterInfo)
    .then(response => {
      document.getElementById("send-data-cr").setAttribute("class", "active")
    })
    .catch(error =>{
      document.getElementById("send-data-cr").setAttribute("class", "error")
    })
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    let characterInfo = {
      name: document.getElementById("ed-name").value,
      occupation: document.getElementById("ed-occupation").value,
      weapon: document.getElementById("ed-weapon").value,
      cartoon: document.getElementById("ed-cartoon").checked,
    }

    
    charactersAPI
    .updateOneRegister(document.getElementById("chr-id").value, characterInfo)
    .then(response => {
      document.getElementById("send-data-ed").setAttribute("class", "active")
    })
    .catch(error =>{
      document.getElementById("send-data-ed").setAttribute("class", "error")
    })
  });
});
