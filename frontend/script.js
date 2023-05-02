function optionElement(content) {
  return `<option>${content}</option>`;
}

function listCountriesIntoDropdown (data) {
  console.log(data);

  const selectElement = document.getElementById('all');
  console.log(selectElement);

  data.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}

/* global countries */
const loadEvent = function () {
  // Main
  listCountriesIntoDropdown(countries);
};
window.addEventListener('load', loadEvent);
