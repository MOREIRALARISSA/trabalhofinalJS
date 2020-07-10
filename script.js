const AddInputFocusEvent = () => {
  var inputList = document.querySelectorAll(".form-group input");
  inputList.forEach((input) => {
    let inputId = document.querySelector(`#${input.id}`);
    inputId.addEventListener("focus", (event) => {
      let siblingId = event.target.nextElementSibling.id;
      let sibling = document.querySelector(`#${siblingId}`);

      let elementId = event.target.id;
      let element = document.querySelector(`#${elementId}`);

      element.style.borderColor = "unset;";
      sibling.innerHTML = "";
    });
  });
};

const FormValidate = () => {
  let error = false;

  if (codigo.value === "") {
    codigo.style.border = "3px solid red";
    codigoValida.innerHTML = "Favor preencher o nome.";
  } else if (localStorage.hasOwnProperty(codigo.value)) {
    codigo.style.border = "3px solid yellow";
    codigoValida.innerHTML = "Código já cadastrado";
  } else {
    codigo.style.borderColor = "unset";
    error = true;
  }

  if (nome.value === "") {
    nome.style.border = "3px solid red";
    nomeValida.innerHTML = "Favor preencher o nome.";
  } else {
    nome.style.borderColor = "unset";
    error = true;
  }

  if (cep.value === "") {
    cep.style.border = "3px solid red";
    cepValida.innerHTML = "Favor preencher o CEP.";
  } else {
    cep.style.borderColor = "unset";
    error = true;
  }

  if (rua.value === "") {
    rua.style.border = "3px solid red";
    ruaValida.innerHTML = "Favor preencher a rua.";
  } else {
    rua.style.borderColor = "unset";
    error = true;
  }

  if (numero.value === "") {
    numero.style.border = "3px solid red";
    numeroValida.innerHTML = "Favor preencher o número.";
  } else {
    numero.style.borderColor = "unset";
    error = true;
  }

  if (bairro.value === "") {
    bairro.style.border = "3px solid red";
    bairroValida.innerHTML = "Favor preencher o bairro.";
  } else {
    bairro.style.borderColor = "unset";
    error = true;
  }

  if (cidade.value === "") {
    cidade.style.border = "3px solid red";
    cidadeValida.innerHTML = "Favor preencher a cidade.";
  } else {
    cidade.style.borderColor = "unset";
    error = true;
  }

  return error;
};

const LoadCepViaCep = (cep) => {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((json) => {
      let dadosCep = json;

      rua.value = dadosCep.logradouro;
      bairro.value = dadosCep.bairro;
      cidade.value = dadosCep.localidade;

      localStorage.setItem(cep, JSON.stringify(dadosCep));
    });
};

const LoadCepLocalStorage = (cep) => {
  let cepObject = JSON.parse(localStorage.getItem(cep));
  rua.value = cepObject.logradouro;
  bairro.value = cepObject.bairro;
  cidade.value = cepObject.localidade;
};

cep.addEventListener("keyup", (event) => {
  if (cep.value.length === 5) {
    let b = cep.value.padEnd(6, "-");
    cep.value = b;
  }

  if (cep.value.length === 9) {
    let newCep = cep.value.replace("-", "");

    if (localStorage.hasOwnProperty(newCep)) {
      LoadCepLocalStorage(newCep);
    } else {
      LoadCepViaCep(newCep);
    }
  }
});

function gravar() {
  let gravacao = {
    codigo: codigo.value,
    nome: nome.value,
    cep: cep.value.replace("-", ""),
    numero: numero.value
    };
    localStorage.setItem(codigo.value, JSON.stringify(gravacao));
};

btnEnviar.addEventListener("click", () => {
  if (FormValidate()) {
    gravar()
    listar()
  }
});

function listar() {
  let table = "";
  let lista = JSON.parse(localStorage.getItem("23"));
  table = `
  <tr id="${lista.codigo}">
  <td>
      <div>${lista.codigo}</div>
  </td>
  <td>
      <div>${lista.nome}</div>
  </td>
  <td>
      <div class="action-buttons">
          <button id="btnInfo_${lista.codigo}" type="button" class="btn btn-info">Detalhes</button>
          <button id="btnExcluir_${lista.codigo}" type="button" class="btn btn-danger">Excluir</button>
       </div>
  </td>
</tr>`
  tDados.innerHTML = table;
};

function eventoExcluir() {
  let btnExcluir = document.querySelectorAll(".btn-danger");
  btnExcluir.forEach(btn => {
    btn.addEventListener("click", (event) => {
      let idArray = event.target.id;
      let id = idArray.split("_");
      excluir(id[1])
    });
  });
};

function excluir(codigo) {
  localStorage.removeItem(codigo);
  document.getElementById(codigo).remove();
};

function eventoExibir() {
 let btnExibe = document.querySelectorAll(".btn-info");
 btnExibe.forEach(btn => {
  btn.addEventListener("click", (event) => {
    let idArray = event.target.id;
    let id = idArray.split("_");
    exiba(id[1])
  });
 });
};

function exiba(codigo) {
  document.getElementById("modalInfo").style.opacity = "1";
  document.getElementById("modalInfo").style.display = "block";
  let dados = JSON.parse(localStorage.getItem(codigo));
  modalUserName.innerHTML = dados.nome;
  modalUserId.innerHTML = dados.codigo;
  modalStreet.innerHTML = dados.rua;
  modalHouseNumber.innerHTML = dados.numero;
  modalNeighborhood.innerHTML = dados.bairro;
  modalCity.innerHTML = dados.cidade;
  modalZipCode.innerHTML = dados.cep;
};

btnFechar.addEventListener("click", () => { 
  document.getElementById("modalInfo").style.opacity = "0";
  document.getElementById("modalInfo").style.display = "none";
});

listar();
eventoExcluir();
eventoExibir();
AddInputFocusEvent();
