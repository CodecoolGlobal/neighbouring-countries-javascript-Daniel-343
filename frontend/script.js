function optionElement(content) {
  return `<option>${content}</option>`;
}

function listCountriesIntoDropdown (data) {
  const selectElement = document.getElementById('all');
  const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  sorted.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}






/* global countries */
const loadEvent = function () {
  // Main
  listCountriesIntoDropdown(countries);
};
window.addEventListener('load', loadEvent);
