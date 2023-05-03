function optionElement(content) {
  return `<option>${content}</option>`;
}

/**
 * This function puts all our countries from a database by their name to a dropdown.
 * @constructor
 * @param {Array} data - Database
 */
function listCountriesIntoDropdown (data) {
  const selectElement = document.getElementById('all');
  const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  sorted.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}

/**
 * This function will draw the received data out to the screen with DOM manipulation.
 * @constructor
 * @param {string} countryName - A name of a country.
 */
function drawCountryData(countryName) {
  // Get data
  const thisCountry = [];
  countries.forEach((country) => {
    if (country.name.common === countryName) {
      thisCountry.push(country.flags.svg);
      thisCountry.push(country.name.common);
      thisCountry.push(country.capital);
      thisCountry.push(country.region);
      thisCountry.push(country.subregion);
    }
  });

  // Put data in HTML tags
  document.getElementById('flag').src = `${thisCountry[0]}`;
  document.getElementById('commonName').innerHTML = `${thisCountry[1]}`;
  document.getElementById('capitalCity').innerHTML = `${thisCountry[2]}`;
  document.getElementById('region').innerHTML = `${thisCountry[3]}`;
  document.getElementById('subRegion').innerHTML = `${thisCountry[4]}`;
}

/**
 * This function checks if a selected country is selected in the dropdown
 */
function checkSelectedCountry () {
  const selectElement = document.getElementById('all');
  selectElement.addEventListener('change', function (event) {

    const isDisplay = document.getElementById('isDisplay');
    if (event.target.value !== 'Select a country from the list') isDisplay.style.display = 'block';
    else isDisplay.style.display = 'none';

    drawCountryData(event.target.value);
  });
}

/* global countries */
const loadEvent = function () {
  // Main
  listCountriesIntoDropdown(countries);
  checkSelectedCountry();
};
window.addEventListener('load', loadEvent);
