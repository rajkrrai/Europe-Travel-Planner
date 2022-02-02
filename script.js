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

const countryDropDown = document.getElementById("dropdown-menu");
let planA;
window.addEventListener("DOMContentLoaded", (event) => {
  countryDropDown.innerHTML = countries
    .map((country) => {
      return `   <option value="${country}">${country}</option>`;
    })
    .join("");

  // displayCityNames;
  planA = JSON.parse(localStorage.getItem("Plan")) || Plan;
  console.log("PLan=>", planA);
  displayCityNames(countries[0]);
});

const displayCityNames = (inputCountry) => {
  // console.log(inputCountry);
  const cardTitle = document.getElementById("card-title");
  const cityList = document.getElementById("cityList");
  const flag = document.getElementById("flag");

  let result = planA.find(({ country }) => {
    return country === inputCountry;
  });

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
};

countryDropDown.addEventListener("change", (e) => {
  // console.log("select country is:", e.target.value);

  displayCityNames(e.target.value);
});

const deleteItm = (i_id, i_country) => {
  let countryIdx, placeIdx;
  // console.log("checked id", i_id, i_country);
  Plan;
  let resultObj = planA.find(({ country }, idx) => {
    // console.log("targetPlace", idx);
    countryIdx = idx;
    return country === i_country;
  });
  // console.log("resultObj", resultObj);
  let targetPlace = resultObj.places.find(({ id }, idx) => {
    console.log("targetPlace index", idx);
    placeIdx = idx;
    return id === i_id;
  });
  console.log("targetPlace", targetPlace);
  const checked = document.getElementById(`${i_id}`).checked;

  if (checked) {
    console.log("item checked");
    let newObj = {
      id: targetPlace.id,
      name: targetPlace.name,
      visited: "yes",
      gMapLink: "https://maps.google.com",
    };

    planA[countryIdx].places.splice(placeIdx, 1, newObj);

    // console.table(planA);
    localStorage.setItem("Plan", JSON.stringify(planA));
  } else {
    console.log("item unchecked");
    let newObj = {
      id: targetPlace.id,
      name: targetPlace.name,
      visited: "no",
      gMapLink: "https://maps.google.com",
    };

    planA[countryIdx].places.splice(placeIdx, 1, newObj);
    localStorage.setItem("Plan", JSON.stringify(planA));
  }
};
