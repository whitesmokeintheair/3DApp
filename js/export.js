function saveFile (filename, data) {
  const blob = new Blob([data], {type: 'text/csv'});
  if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
  }
  else{
      var elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;        
      document.body.appendChild(elem);
      elem.click();        
      document.body.removeChild(elem);
  }
}

function saveAs(filename, data, type) {
  const fullFileName = filename.includes(type) ? filename : `${filename}.${type}`;
  saveFile(fullFileName, data)
}

function exportObj (filename, data) {
  const exporter = new THREE.OBJExporter();
  const obj = exporter.parse(data);
  saveAs(filename,obj,'obj')
}

function exportJson (filename, data) {
  const json = JSON.stringify(data)
  saveAs(filename,json,'json')
}