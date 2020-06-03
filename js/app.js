let inputs = document.getElementById("inputsForm");

renderScene();

function clearInputForm(){
  inputs.innerHTML = '';
}

function removeValidityError(el){
 el.classList.remove('error');
 let errorMsg = el.previousSibling;
 if(errorMsg.tagName === 'SPAN'){
  console.error(errorMsg);
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
  let importButton = importCubeData(({ width, height, depth }) => {
    inputWidth.value = width
    inputHeight.value = height
    inputDepth.value = depth
    renderCubeAndExportButtons(width, height, depth)
  })

  let renderCubeAndExportButtons = (width, height, depth) => {
    const filename = `cube-${width}-${height}-${depth}`
    importButton.remove()
    saveJsonButton(filename, { width, height, depth })
    saveObjButton(filename)
    showCube(width, height, depth)
  }

  labelWidth.innerText = "Введіть довжину сторони: ";
  labelHeight.innerText = "Введіть висоту: ";
  labelDepth.innerText = "Введіть глибину фігури: ";

  inputWidth.oninput = () => removeValidityError(inputWidth);
  inputHeight.oninput = () => removeValidityError(inputHeight);
  inputDepth.oninput = () => removeValidityError(inputDepth);

  buttonSubmit.innerText = "Створити";
  buttonSubmit.setAttribute('class', 'submitBtn');
  buttonSubmit.onclick = () =>{
    let width = Number.parseFloat(inputWidth.value);
    let height = Number.parseFloat(inputHeight.value);
    let depth = Number.parseFloat(inputDepth.value);

    if(validateForm(inputDepth, inputHeight, inputWidth)){
      renderCubeAndExportButtons(width, height, depth)
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
  inputs.appendChild(importButton)
}

function showSphereForm(){
  clearInputForm();
  let form = document.createElement('form');

  let labelRadius = document.createElement('label');
  let inputRadius = document.createElement('input');
  let buttonSubmit = document.createElement('button');
  let importButton = importJsonButton(({ radius }) => {
    inputRadius.value = radius
    renderSphereAndExportButtons(radius)
  })

  let renderSphereAndExportButtons = (radius) => {
    importButton.remove()
    const filename = `sphere-${radius}`
    saveJsonButton(filename, { radius })
    saveObjButton(filename)
    showSphere(radius);
  }

  labelRadius.innerHTML = "Введіть радіус: ";

  inputRadius.oninput = () => removeValidityError(inputRadius);

  buttonSubmit.innerText = "Створити";
  buttonSubmit.setAttribute('class', 'submitBtn');
  buttonSubmit.onclick = () =>{
    let radius = Number.parseFloat(inputRadius.value);

    if(validateForm(inputRadius)){
      renderSphereAndExportButtons(radius)
    }
  }

  form.appendChild(labelRadius);
  form.appendChild(inputRadius);
  inputs.appendChild(form);
  inputs.appendChild(buttonSubmit);
  inputs.appendChild(importButton)
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
  let importButton = importPyramidData(({ radius, height, angles }) => {
    inputRadius.value = radius
    inputHeight.value = height
    inputAngles.value = angles
    renderPyramidAndExportButtons(radius, height, angles)
  })

  let renderPyramidAndExportButtons = (radius, height, angles) => {
    importButton.remove()
    showPyramid(radius, height, angles);
    const filename = `pyramid-${radius}-${height}-${angles}`
    saveJsonButton(filename, { radius, height, angles })
    saveObjButton(filename)
  }

  labelRadius.innerHTML = "Введіть радіус описаної окружності: ";
  labelHeight.innerHTML = "Введіть висоту піраміди: ";
  labelAngles.innerHTML = "Введите кількість кутів основи: ";

  inputRadius.oninput = () => removeValidityError(inputRadius);
  inputHeight.oninput = () => removeValidityError(inputHeight);
  inputAngles.oninput = () => removeValidityError(inputAngles);

  buttonSubmit.innerText = "Створити"
  buttonSubmit.setAttribute('class', 'submitBtn');
  buttonSubmit.onclick = () =>{
    let radius = Number.parseFloat(inputRadius.value);
    let height = Number.parseFloat(inputHeight.value);
    let angles = Number.parseFloat(inputAngles.value);

    if(validateForm(inputRadius, inputHeight, inputAngles)){
      renderPyramidAndExportButtons(radius, height, angles)
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
  inputs.appendChild(importButton)
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
        span.innerText = 'Обов\'язкове поле';
      } else if(Number.isNaN(Number.parseFloat(input.value))){
        span.innerText = 'Введіть число';
      }
      input.before(span);
      validated = false;
    } else{
      validated === false ? validated = false : validated = true;
    }
  })
  return validated;
}

