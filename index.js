const nameValueInput = document.getElementById('nameValueInput');
const addButton = document.getElementById('addButton');
const nameValueList = document.getElementById('nameValueList');
const sortByNameButton = document.getElementById('sortByNameButton');
const sortByValueButton = document.getElementById('sortByValueButton');
const deleteButton = document.getElementById('deleteButton');
const showAsXMLButton = document.getElementById('showAsXMLButton');

addButton.addEventListener('click', addNameValuePair);
sortByNameButton.addEventListener('click', sortList('text'));
sortByValueButton.addEventListener('click', sortList('value'));
deleteButton.addEventListener('click', deleteSelected);
showAsXMLButton.addEventListener('click', toXML);

const nameValueRegex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/;

function addNameValuePair() {
  const input = nameValueInput.value.trim();
  nameValueInput.value = '';
  if (input.match(nameValueRegex) !== null) {
    const option = document.createElement('option');
    option.text = input;
    nameValueList.add(option);
  } else {
    alert('Invalid Name/Value pair syntax!');
  }
}

function sortList(key) {
  return () => {
    const options = Array.from(nameValueList.options);
    options.sort((a, b) => a[key].localeCompare(b[key]));
    renderNameValueList(options);
  };
}

function deleteSelected() {
  const selectedOptions = Array.from(nameValueList.selectedOptions);
  selectedOptions.forEach(option => {
    option.remove();
  });
}

function renderNameValueList(options) {
  nameValueList.innerHTML = '';
  options.forEach(option => {
    nameValueList.add(option);
  });
}

function toXML() {
	const xml = document.createElement('NameValuePairs');
	const options = Array.from(nameValueList.options);
	const pairs = options.map(option => {
		const [name, value] = option.text.split('=');
		return `<NameValuePair><Name>${name}</Name><Value>${value}</Value></NameValuePair>`;
	});
	xml.innerHTML = pairs.join('');
	const xmlString = new XMLSerializer().serializeToString(xml);
	alert(xmlString);
}

