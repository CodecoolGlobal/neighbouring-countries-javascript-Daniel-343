let SELECTED_COUNTRY = '';
const SORTEDCOUNTRY = sorting(countries);

function optionElement(content) {
  return `<option value="${content}">${content}</option>`;
}

/**
 * This function puts all our countries from a database by their name to a dropdown.
 * @constructor
 * @param {Array} data - Database
 */
function listCountriesIntoDropdown () {
  const selectElement = document.getElementById('all');
  SORTEDCOUNTRY.forEach((country) => {
    selectElement.insertAdjacentHTML('beforeend', optionElement(country.name.common));
  });
}

function sorting(data){
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
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

    SELECTED_COUNTRY = event.target.value;
    drawCountryData(event.target.value);
  });
}

function neighbour(searchedBy){
  let border;
  const showedCountry = document.getElementById('commonName').innerHTML;
  countries.forEach((country) => {
    if (showedCountry === country.name.common){
      border = country.borders;
    }
  });
  console.log(border);
  const bordersObject = fromBorderToObject(border);
  console.log(searchedBy);
  const sortedBorders = bordersObject.sort((a, b) => b[`${searchedBy}`] - a[`${searchedBy}`]);
  console.log(sortedBorders);
  drawCountryData(sortedBorders[0].name.common);
  changeSelectedText(sortedBorders[0].name.common);
}

function fromBorderToObject(border){
  const result = [];
  for (let i = 0; i < border.length; i++){
    countries.forEach((country) => {
      if (country.cca3 === border[i]){
        result.push(country);
      }
    });
  }
  return result;
}

function changeSelectedText(text){ //text a megjelenített ország név
  const selectElement = document.getElementById('all');
  for (let i = 0; i < SORTEDCOUNTRY.length; i++){
    if (SORTEDCOUNTRY[i].name.common === text){
      selectElement.selectedIndex = i + 1;
    }
  }
}

/* global countries */
const loadEvent = function () {
  // Main
  listCountriesIntoDropdown();
  checkSelectedCountry();

  const arr = [document.getElementById('population'), document.getElementById('area')];
  for (let i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', (event)=>{
      console.log(event.target.id);
      neighbour(event.target.id);
    });
  }

};
window.addEventListener('load', loadEvent);
