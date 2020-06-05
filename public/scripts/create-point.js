
//Dados da Entidade:

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(response => response.json()) //por retornar somente uma linha o (response) => { return response.json() } pode ser trocado por response => response.json() //Essa linha serve para transformar os dados em JSON
    .then(states => {
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //S{} é interpolação, só é possível realizar interpolações se estiverem estre crases `` 
        }
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(response => response.json())
    .then(cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta:

const itemsToCollect = document.querySelectorAll(".items-grid li") //pega todos os li's

for ( const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]") 

let selectedItems = []

function handleSelectedItem (event) {
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim pegar os selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    //se já estiver selecionado, 
    if(alreadySelected >= 0){ //>= 0 pois quando não tá selecionado ele recebe o valor -1
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {//se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId) //o push é usado para adicionar
    }
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}