const countries = [
  "Germany",
  "Austria",
  "Switzerland",
  "Czech Republic",
  "Hungary",
  "France",
  "Italy",
  "Spain",
  "Croatia",
  "Greece",
];

const countryDropDown = document.getElementById("countryDropDown");
const mynotes = document.getElementById("impnotes");
let planA;
window.addEventListener("DOMContentLoaded", (event) => {
  try {
    countryDropDown.innerHTML = countries
      .map((country) => {
        return `   <option value="${country}">${country}</option>`;
      })
      .join("");

    planA = JSON.parse(localStorage.getItem("Plan")) || Plan; //Plan is default plan from plan.js file
    console.log("PLan=>", planA);
    displayCityNames(countries[0]);
  } catch (error) {
    console.log(error);
  }
});

const displayCityNames = (inputCountry) => {
  console.log(inputCountry);
  const cardTitle = document.getElementById("card-title");
  const cityList = document.getElementById("cityList");
  const flag = document.getElementById("flag");

  let result = planA.find(({ country }) => {
    return country === inputCountry;
  });
  console.log(result);
  if (result === undefined) {
    cardTitle.innerText = `0 Places`;
    cityList.innerHTML = "";
    return;
  }
  //change the flag dynamically
  flag.src = `https://flagcdn.com/${result.countryCode}.svg`;

  //populate the places
  cardTitle.innerText = `${result.places.length} Places`;

  cityList.innerHTML = result.places
    .map((item) => {
      return `<li class="list-group-item">
              <input
                class="form-check-input mr-2"
                type="checkbox"
                ${item.visited == "yes" ? "checked" : ""}
                id=${item.id}
                onclick="deleteItm(${item.id},'${inputCountry}')"
              />
              <label class="form-check-label" for="flexCheckDefault">
                <a
                  href=${item.gMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 ${item.name}</a
                >
              </label>
            </li>`;
    })
    .join("");
  mynotes.value = result.notes || "";
};

countryDropDown.addEventListener("change", (e) => {
  displayCityNames(e.target.value);
});

const deleteItm = (i_id, i_country) => {
  let countryIdx, placeIdx;
  let resultObj = planA.find(({ country }, idx) => {
    countryIdx = idx;
    return country === i_country;
  });

  let targetPlace = resultObj.places.find(({ id }, idx) => {
    placeIdx = idx;
    return id === i_id;
  });

  const checked = document.getElementById(`${i_id}`).checked;
  let newObj = {
    id: targetPlace.id,
    name: targetPlace.name,
    visited: checked ? "yes" : "no",
    gMapLink: "https://maps.google.com",
  };

  planA[countryIdx].places.splice(placeIdx, 1, newObj);

  console.table(planA);
  localStorage.setItem("Plan", JSON.stringify(planA));
};

document.getElementById("btn-save").addEventListener("click", (e) => {
  let notes = document.getElementById("impnotes").value;
  console.log(notes);
  //get obj from localstorage
  let myplan = JSON.parse(localStorage.getItem("Plan")) || Plan;

  //find country obj and append the notes to save
  let resultObj = myplan.find(({ country }) => {
    return (country = countryDropDown.value);
  });

  resultObj.notes = notes;
  localStorage.setItem("Plan", JSON.stringify(myplan));
  console.log(myplan);
});
