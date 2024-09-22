const countryImage = document.querySelector(".country-flag");
const countryCommonName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const borderCountriesContent = document.querySelector(".border-countries");
const themeChanger = document.querySelector(".theme-changer");
const themeIcon = document.querySelector(".theme-changer .icon");
const themeName = document.querySelector(".theme-changer .name");

const countryName = new URLSearchParams(window.location.search).get("name");
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then(
  (res) =>
    res.json().then(([country]) => {
      countryImage.src = country.flags.svg;
      countryImage.alt = country.flags.alt ?? `${country.name.common} flag`;
      countryCommonName.innerText = country.name.common;
      nativeName.innerText = country.name.nativeName
        ? Object.values(country.name.nativeName)[0].common
        : "Nill";
      population.innerText = country.population.toLocaleString("en-IN");
      region.innerText = country.region;
      subRegion.innerText = country.subregion ?? "Nill";
      capital.innerText = country.capital ? country.capital.join(", ") : "Nill";
      domain.innerText = country.tld ? country.tld.join(", ") : "Nill";
      currencies.innerText = country.currencies
        ? Object.values(country.currencies)[0].name
        : "Nill";
      languages.innerText = country.languages
        ? Object.values(country.languages).join(", ")
        : "Nill";

      country.borders
        ? country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderCountry]) => {
                const anchorTag = document.createElement("a");
                anchorTag.innerText = borderCountry.name.common;
                anchorTag.href = `../countryDetails/countryDetails.html?name=${borderCountry.name.common}`;
                borderCountriesContent.append(anchorTag);
              });
          })
        : borderCountriesContent.append("Nill");
    })
);

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
