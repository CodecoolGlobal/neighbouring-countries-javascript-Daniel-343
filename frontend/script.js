function optionElement(content) {
  return `<option>${content}</option>`;
}

function listCountriesIntoDropdown (data) {
  console.log(data);
  const selectElement = document.querySelector('#all select');
  console.log(selectElement);
  data.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}

function main () {
  /* global countries */
  listCountriesIntoDropdown(countries);
}
main();
