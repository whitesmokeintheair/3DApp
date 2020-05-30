// Logic function
async function importJson (file) {
  return new Promise(function(resolve) {
    const fileread = new FileReader();
      fileread.onload = function(e) {
      console.log(e)
      const content = e.target?.result;
      // console.log(content);
      const json = content && JSON.parse(content.toString()); // Array of Objects.
      console.log(json); // You can index every object
      resolve(json)
    };

    fileread.readAsText(file);
  })
}

//HTML components
function importJsonButton (type, callback) {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.setAttribute('accept', '.json')
  fileInput.setAttribute('style', 'display: none')
  fileInput.id = 'import'
  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file.name.includes(type)) {
      const msg = 'Ви обрали файл, що не відповідає данній фігурі, оберіть інший файл!'
      console.error(msg)
      return alert(msg)
    }
    const res = await importJson(file)
    callback(res)
  }

  const fileLabel = document.createElement('label')
  fileLabel.htmlFor = fileInput.id
  fileLabel.innerText = "Імпортувати дані з JSON";
  fileLabel.setAttribute('style', 'padding: .5rem 1rem;');

  const importButton = document.createElement('button')
  importButton.setAttribute('class', 'submitBtn');
  importButton.setAttribute('style', 'padding-x: 0;');
  importButton.appendChild(fileLabel)
  importButton.appendChild(fileInput)

  return importButton
}

const importCubeData = (callback) => importJsonButton('cube', callback)
const importSphereData = (callback) => importJsonButton('sphere', callback)
const importPyramidData = (callback) => importJsonButton('pyramid', callback)