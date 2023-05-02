function optionElement(content) {
  return `<option>${content}</option>`;
}

function listCountriesIntoDropdown (data) {
  console.log(data);

  const selectElement = document.getElementById('all');

  const sorted = data.sort((a, b) => a.name.common - b.name.common);
  sorted.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}

function drawCountryData(countryName) {
  // Get data
  let thisCountry = [];
  countries.forEach(country => {
    if (country.name.common === countryName) {
      thisCountry.push(country.name.common);
      thisCountry.push(country.capital);
      thisCountry.push(country.region);
      thisCountry.push(country.subregion);
    }
  });

  // Draw HTML tags

}

function checkSelectedCountry () {
  const selectElement = document.getElementById('all');
  const countryID = document.getElementById('country');
  selectElement.addEventListener('change', function (event) {
    //countryID.textContent = `Kiválasztott ország: ${event.target.value}`;
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
