const parentDiv = document.querySelector(".countries-content .row");
const selectBox = document.querySelector("#select-box");
const searchBar = document.querySelector("#search-bar");
const themeChanger = document.querySelector(".theme-changer");
const themeIcon = document.querySelector(".theme-changer .icon");
const themeName = document.querySelector(".theme-changer .name");

for (let i = 0; i < 8; i++) {
  const shimmerItems = `<div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
  <a class="shimmer-box">
    <div class="shimmer-image"></div>
    <div class="shimmer-text">
      <h2></h2>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </a>
</div>`;
  parentDiv.insertAdjacentHTML("beforeend", shimmerItems);
}

let countriesData = [];
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((countries) => {
    countriesData = countries;
    countriesApend(countries);
  })
  .catch((error) => {
    parentDiv.innerHTML =
      "<p class='something-wrong'>Something went wrong. Please try again later.</p>";
    console.error("Error fetching country data:", error);
  });

selectBox.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res) =>
    res.json().then((regionCountries) => {
      countriesApend(regionCountries);
    })
  );
});

searchBar.addEventListener("input", (e) => {
  const filterValue = countriesData.filter((countryData) =>
    countryData.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  if (filterValue.length) {
    countriesApend(filterValue);
  } else {
    parentDiv.innerHTML = `<p class="no-country-found">No Country Found Of This Name</p>`;
  }
});

function countriesApend(countries) {
  parentDiv.innerHTML = "";
  countries.forEach((country) => {
    const listItems = `<div class="col-12 col-sm-6 col-lg-4 col-xxl-3 d-flex">
              <a class="list-box" href="./countryDetails/countryDetails.html?name=${
                country.name.common
              }">
                <img src="${country.flags.svg}" alt="${
      country.flags.alt ?? `${country.name.common} flag`
    }" />
                <div class="list-details">
                  <h2>${country.name.common}</h2>
                  <ul>
                    <li>Population: <span>${new Intl.NumberFormat(
                      "en-IN"
                    ).format(country.population)}</span></li>
                    <li>Region: <span>${country.region}</span></li>
                    <li>Capital: <span>${country.capital?.join(
                      ", "
                    )}</span></li>
                  </ul>
                </div>
              </a>
            </div>`;
    parentDiv.insertAdjacentHTML("beforeend", listItems);
  });
}

let themeData = localStorage.getItem("themeChanger");
let jsonData = JSON.parse(themeData);

themeName.innerText = jsonData?.themeName ?? "Dark Mode";
themeIcon.innerHTML = jsonData?.themeIcon ?? `<i class="bi bi-moon"></i>`;
let darkMode = jsonData?.darkMode ?? "true";

jsonData?.darkModeClass
  ? document.body.classList.add("dark-mode")
  : document.body.classList.remove("dark-mode");
themeChanger.addEventListener("click", () => {
  let themeChanger;
  if (darkMode) {
    themeChanger = {
      themeName: "Light Mode",
      themeIcon: `<i class="bi bi-sun"></i>`,
      darkModeClass: true,
      darkMode: false,
    };
    localStorage.setItem("themeChanger", JSON.stringify(themeChanger));
  } else {
    themeChanger = {
      themeName: "Dark Mode",
      themeIcon: `<i class="bi bi-moon"></i>`,
      darkModeClass: false,
      darkMode: true,
    };
    localStorage.setItem("themeChanger", JSON.stringify(themeChanger));
  }
  themeData = localStorage.getItem("themeChanger");
  jsonData = JSON.parse(themeData);
  themeName.innerText = jsonData?.themeName;
  themeIcon.innerHTML = jsonData?.themeIcon;
  darkMode = jsonData?.darkMode;
  jsonData.darkModeClass
    ? document.body.classList.add("dark-mode")
    : document.body.classList.remove("dark-mode");
});
