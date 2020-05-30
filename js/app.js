let inputs = document.getElementById("inputsForm");

renderScene();

function clearInputForm(){
  inputs.innerHTML = '';
}

function removeValidityError(el){
 el.classList.remove('error');
 let errorMsg = el.previousSibling;
 if(errorMsg.tagName === 'SPAN'){
  console.log(errorMsg);
  errorMsg.remove();
 }
}

function showCubeForm(){
  clearInputForm();
  let form = document.createElement('form');

  let labelWidth = document.createElement('label');
  let inputWidth = document.createElement('input');
  let labelHeight = document.createElement('label');
  let inputHeight = document.createElement('input');
  let labelDepth = document.createElement('label');
  let inputDepth = document.createElement('input');
  let buttonSubmit = document.createElement('button');

  labelWidth.innerText = "Введите длинну стороны: ";
  labelHeight.innerText = "Введите высоту: ";
  labelDepth.innerText = "Введите глубину фигуры: ";

  inputWidth.oninput = () => removeValidityError(inputWidth);
  inputHeight.oninput = () => removeValidityError(inputHeight);
  inputDepth.oninput = () => removeValidityError(inputDepth);

  buttonSubmit.innerText = "Готово";
  buttonSubmit.setAttribute('class', 'submitBtn');
  buttonSubmit.onclick = () =>{
    let width = Number.parseFloat(inputWidth.value);
    let height = Number.parseFloat(inputHeight.value);
    let depth = Number.parseFloat(inputDepth.value);

    if(validateForm(inputDepth, inputHeight, inputWidth)){
      showCube(width, height, depth);
    }
  }

  form.appendChild(labelWidth);
  form.appendChild(inputWidth);
  form.appendChild(labelHeight);
  form.appendChild(inputHeight);
  form.appendChild(labelDepth);
  form.appendChild(inputDepth);
  inputs.appendChild(form);
  inputs.appendChild(buttonSubmit);
}

function showSphereForm(){
  clearInputForm();
  let form = document.createElement('form');

  let labelRadius = document.createElement('label');
  let inputRadius = document.createElement('input');
  let buttonSubmit = document.createElement('button');

  labelRadius.innerHTML = "Введите радиус: ";

  inputRadius.oninput = () => removeValidityError(inputRadius);

  buttonSubmit.innerText = "Готово";
  buttonSubmit.setAttribute('class', 'submitBtn');
  buttonSubmit.onclick = () =>{
    let radius = Number.parseFloat(inputRadius.value);

    if(validateForm(inputRadius)){
      showSphere(radius);
    }
  }

  form.appendChild(labelRadius);
  form.appendChild(inputRadius);
  inputs.appendChild(form);
  inputs.appendChild(buttonSubmit);
}

function showPyramidForm(){
  clearInputForm();
  let form = document.createElement('form');

  let labelRadius = document.createElement('label');
  let inputRadius = document.createElement('input');
  let labelHeight = document.createElement('label');
  let inputHeight = document.createElement('input');
  let labelAngles = document.createElement('label');
  let inputAngles = document.createElement('input');
  let buttonSubmit = document.createElement('button');

  labelRadius.innerHTML = "Введите радиус описаной окружности: ";
  labelHeight.innerHTML = "Введите высоту пирамиды: ";
  labelAngles.innerHTML = "Введите количество углов основания: ";

  inputRadius.oninput = () => removeValidityError(inputRadius);
  inputHeight.oninput = () => removeValidityError(inputHeight);
  inputAngles.oninput = () => removeValidityError(inputAngles);

  buttonSubmit.innerText = "Готово"
  buttonSubmit.setAttribute('class', 'submitBtn');
  buttonSubmit.onclick = () =>{
    let radius = Number.parseFloat(inputRadius.value);
    let height = Number.parseFloat(inputHeight.value);
    let angles = Number.parseFloat(inputAngles.value);

    if(validateForm(inputRadius, inputHeight, inputAngles)){
      showPyramid(radius, height, angles);
    }
  }

  form.appendChild(labelRadius);
  form.appendChild(inputRadius);
  form.appendChild(labelHeight);
  form.appendChild(inputHeight);
  form.appendChild(labelAngles);
  form.appendChild(inputAngles);
  inputs.appendChild(form);
  inputs.appendChild(buttonSubmit);
}

function showCube(width, height, depth){
  renderCube(width, height, depth);
}

function showSphere(radius){
  renderSphere(radius);
}

function showPyramid(radius, height, angles){
  renderPyramid(radius, height, angles);
}

function validateForm(){
  let inputsArray = Array.from(arguments);
  let validated;
  inputsArray.map((input)=>{
    removeValidityError(input);
    if(!input.value || Number.isNaN(Number.parseFloat(input.value))){
      input.setAttribute('class', 'error');
      let span = document.createElement('span');
      span.setAttribute('class', 'error');
      if(!input.value){
        span.innerText = 'Заполните поле';
      } else if(Number.isNaN(Number.parseFloat(input.value))){
        span.innerText = 'Введите число';
      }
      input.before(span);
      validated = false;
    } else{
      validated === false ? validated = false : validated = true;
    }
  })
  return validated;
}

