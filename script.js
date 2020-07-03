// const AddInputBlurEvent = () => {};

const FormValidate = () => {
  let error = false;

  if (!codigo.value) {
    codigo.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher o nome.';
  } else {
    codigo.style.borderColor = "unset";
    error = true;
  }

  if (!nome.value) {
    nome.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher o nome.';
  } else {
    nome.style.borderColor = "unset";
    error = true;
  }

  if (!cep.value) {
    cep.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher o CEP.';
  } else {
    cep.style.borderColor = "unset";
    error = true;
  }

  if (!rua.value) {
    rua.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher a rua.';
  } else {
    rua.style.borderColor = "unset";
    error = true;
  }

  if (!numero.value) {
    numero.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher o número.';
  } else {
    numero.style.borderColor = "unset";
    error = true;
  }

  if (!bairro.value) {
    bairro.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher o bairro.';
  } else {
    bairro.style.borderColor = "unset";
    error = true;
  }

  if (!cidade.value) {
    cidade.style.borderColor = "red";
    // id.innerHTML = 'Favor preencher a cidade.';
  } else {
    cidade.style.borderColor = "unset";
    error = true;
  }
};

salvar.addEventListener("click", () => {
  if (!FormValidate()) {
    console.log("Validado!");
  }
});
