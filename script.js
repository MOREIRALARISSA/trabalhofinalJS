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

  if (!codigo.value) {
    codigo.style.border = "3px solid red";
    codigoValida.innerHTML = "Favor preencher o nome.";
  } else {
    codigo.style.borderColor = "unset";
    error = true;
  }

  if (!nome.value) {
    nome.style.borderColor = "3px solid red";
    nomeValida.innerHTML = "Favor preencher o nome.";
  } else {
    nome.style.borderColor = "unset";
    error = true;
  }

  if (!cep.value) {
    cep.style.borderColor = "3px solid red";
    cepValida.innerHTML = "Favor preencher o CEP.";
  } else {
    cep.style.borderColor = "unset";
    error = true;
  }

  if (!rua.value) {
    rua.style.borderColor = "3px solid red";
    ruaValida.innerHTML = "Favor preencher a rua.";
  } else {
    rua.style.borderColor = "unset";
    error = true;
  }

  if (!numero.value) {
    numero.style.borderColor = "3px solid red";
    numeroValida.innerHTML = "Favor preencher o número.";
  } else {
    numero.style.borderColor = "unset";
    error = true;
  }

  if (!bairro.value) {
    bairro.style.borderColor = "3px solid red";
    bairroValida.innerHTML = "Favor preencher o bairro.";
  } else {
    bairro.style.borderColor = "unset";
    error = true;
  }

  if (!cidade.value) {
    cidade.style.borderColor = "3px solid red";
    cidadeValida.innerHTML = "Favor preencher a cidade.";
  } else {
    cidade.style.borderColor = "unset";
    error = true;
  }
};

const LoadCepData = (cep) => {
  fetch(`viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((json) => {
      let dadosCep = json;
      console.log(dadosCep);
      rua.value = dadosCep.logradouro;
      bairro.value = dadosCep.bairro;
      cidade.value = dadosCep.localidade;
    });
};

cep.addEventListener("keyup", (event) => {
  if (cep.value.length === 5) {
    let b = cep.value.padEnd(6, "-");
    cep.value = b;
  }
  if (cep.value.length === 9) {
    let newCep = cep.value.replace("-", "");

    LoadCepData(newCep);
  }
});

btnEnviar.addEventListener("click", () => {
  clickCount++;
  if (FormValidate()) {
  }
});

AddInputFocusEvent();
