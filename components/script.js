const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sMarca = document.querySelector('#m-marca')
const sModelo = document.querySelector('#m-modelo')
const sAno = document.querySelector('#m-ano')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sMarca.value = itens[index].marca
    sModelo.value = itens[index].Modelo
    sAno.value = itens[index].ano
    id = index
  } else {
    sMarca.value = ''
    sModelo.value = ''
    sAno.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.marca}</td>
    <td>${item.modelo}</td>
    <td>R$ ${item.ano}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sMarca.value == '' || sModelo.value == '' || sAno.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].marca = sMarca.value
    itens[id].modelo = sModelo.value
    itens[id].ano = sAno.value
  } else {
    itens.push({'marca': sMarca.value, 'modelo': sModelo.value, 'ano': sAno.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
