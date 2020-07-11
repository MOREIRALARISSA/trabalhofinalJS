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
  let error = true;

  let arrayCodigo = document.querySelectorAll("#tDados tr");
  let arrayId = [];
  arrayCodigo.forEach( codigo => {
    arrayId.push(codigo.id)
  });

  if (codigo.value === "") {
    codigo.style.border = "3px solid red";
    codigoValida.innerHTML = "Favor preencher o nome.";
    error = false;
  } else if (arrayId.indexOf(codigo.value) > -1) {
    codigo.style.border = "3px solid yellow";
    codigoValida.innerHTML = "Código já cadastrado";
    error = false;
  } else {
    codigo.style.borderColor = "unset";
    
  }

  if (nome.value === "") {
    nome.style.border = "3px solid red";
    nomeValida.innerHTML = "Favor preencher o nome.";
    error = false;
  } else {
    nome.style.borderColor = "unset";
    
  }

  if (cep.value === "") {
    cep.style.border = "3px solid red";
    cepValida.innerHTML = "Favor preencher o CEP.";
    error = false;
  } else {
    cep.style.borderColor = "unset";
    
  }

  if (rua.value === "") {
    rua.style.border = "3px solid red";
    ruaValida.innerHTML = "Favor preencher a rua.";
    error = false;
  } else {
    rua.style.borderColor = "unset";
    
  }

  if (numero.value === "") {
    numero.style.border = "3px solid red";
    numeroValida.innerHTML = "Favor preencher o número.";
    error = false;
  } else {
    numero.style.borderColor = "unset";
    
  }

  if (bairro.value === "") {
    bairro.style.border = "3px solid red";
    bairroValida.innerHTML = "Favor preencher o bairro.";
    error = false;
  } else {
    bairro.style.borderColor = "unset";
    
  }

  if (cidade.value === "") {
    cidade.style.border = "3px solid red";
    cidadeValida.innerHTML = "Favor preencher a cidade.";
    error = false;
  } else {
    cidade.style.borderColor = "unset";
    
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
  let arrayCadastro = [];

  if (localStorage.hasOwnProperty("cadastro")) {
    arrayCadastro = JSON.parse(localStorage.getItem("cadastro"));
  }

  let gravacao = {
    codigo: codigo.value,
    nome: nome.value,
    cep: cep.value.replace("-", ""),
    numero: numero.value,
  };

  arrayCadastro.push(gravacao);

  localStorage.setItem("cadastro", JSON.stringify(arrayCadastro));
}

btnEnviar.addEventListener("click", () => {
  if (FormValidate()) {
    gravar();
    listar();
    limpaForm()
  };
});

function listar() {
  let table = "";
  let lista = JSON.parse(localStorage.getItem("cadastro"));
  lista.forEach((cadastro) => {
    table += `
  <tr id="${cadastro.codigo}">
  <td>
      <div>${cadastro.codigo}</div>
  </td>
  <td>
      <div>${cadastro.nome}</div>
  </td>
  <td>
      <div class="action-buttons">
          <button id="btnInfo_${cadastro.codigo}" type="button" class="btn btn-info">Detalhes</button>
          <button id="btnExcluir_${cadastro.codigo}" type="button" class="btn btn-danger">Excluir</button>
       </div>
  </td>
  </tr>`;
  });
  tDados.innerHTML = table;
  eventoExcluir();
  eventoExibir();
}

window.addEventListener("load", () => {
  if (localStorage.hasOwnProperty("cadastro")) {
    listar();
  };
});

function eventoExcluir() {
  let btnExcluir = document.querySelectorAll(".btn-danger");
  btnExcluir.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let idArray = event.target.id;
      let id = idArray.split("_");
      excluir(id[1]);
    });
  });
};

function excluir(codigo) {
  let arrayObject = JSON.parse(localStorage.getItem('cadastro'));
  let object = arrayObject.find(cadastro => cadastro.codigo == codigo);
  let objectIndex = arrayObject.indexOf(object);
  arrayObject.splice(objectIndex, 1);
  localStorage.setItem('cadastro', JSON.stringify(arrayObject));
  document.getElementById(codigo).remove();
  
};

function eventoExibir() {
  let btnExibe = document.querySelectorAll(".btn-info");
  btnExibe.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let idArray = event.target.id;
      let id = idArray.split("_");
      exiba(id[1]);
    });
  });
};

function exiba(codigo) {
  document.getElementById("modalInfo").style.opacity = "1";
  document.getElementById("modalInfo").style.display = "block";
  let object = JSON.parse(localStorage.getItem("cadastro"));
  let dados = object.find(cadastro => cadastro.codigo == codigo)
  let cep = JSON.parse(localStorage.getItem(dados.cep));
  modalUserName.innerHTML = dados.nome;
  modalUserId.innerHTML = dados.codigo;
  modalStreet.innerHTML = cep.logradouro;
  modalHouseNumber.innerHTML = dados.numero;
  modalNeighborhood.innerHTML = cep.bairro;
  modalCity.innerHTML = cep.localidade;
  modalZipCode.innerHTML = dados.cep;
};

btnFechar.addEventListener("click", () => {
  document.getElementById("modalInfo").style.opacity = "0";
  document.getElementById("modalInfo").style.display = "none";
});

function limpaForm() {
  codigo.value = "";
  nome.value = "";
  cep.value = "";
  rua.value = "";
  numero.value = "";
  bairro.value = "";
  cidade.value = "";
};
AddInputFocusEvent();
