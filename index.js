// Function to rend the park on the page:
const renderOnePark = (park) => {
  // Get the individual properties of the park
  const { name, location, description, established, area, rating } = park;

  const content = `
    <section class="park-display">
      <h2>${name}</h2>
      <div class="location-display">${location}</div>
      <div class="description-display">${description}</div>
      <button class="rate-button" title="Add to Favourites">&#9734;</button>
      <div class="stats">
        <div class="established-display stat">
          <h3>Established</h3>
          <div class="value">${established}</div>
        </div>
        <div class="area-display stat">
          <h3>Area</h3>
          <div class="value">${area}</div>
        </div>
        <div class="rating-display stat">
          <h3>Rating</h3>
          <div class="value">${rating}</div>
        </div>
      </div>
    </section>
  `;
  return content;
};

const render = () => {
  // Get the parent element
  const main = document.querySelector("main");

  // Empty the parent element
  main.innerHTML = "";

  // Get the parks HTML
  const content = parks.map(renderOnePark).join("");

  // Set the `innerHTML` of parent element
  main.innerHTML = content;
};

const submitHandler = (event) => {
  event.preventDefault();

  const form = document.querySelector("#park-form");
  const formData = new FormData(form);
  // Keep track of if any errors are found
  let hasErrors = false;

  formData.forEach((value, key) => {
    let errorId = `#${key}-error`;
    if (value.trim() === "") {
      document.querySelector(errorId).style.display = "block";
      hasErrors = true;
    } else {
      document.querySelector(errorId).style.display = "none";
    }
  });

  // if there are no errors
  if (!hasErrors) {
    // Create an empty object
    const park = {
      name: formData.get("name"),
      location: formData.get("location"),
      description: formData.get("description"),
      established: formData.get("established"),
      area: formData.get("area"),
      rating: formData.get("rating"),
    };
    parks.push(park);
    render();
  }
};

// function to handle favorite button clicks
const favoriteButtonClickHandler = (event) => {
  // check that the target of the event (the actual element that was clicked) is a button
  if (event.target && event.target.nodeName == "BUTTON") {
    const park = event.target.parentNode;
    park.style.backgroundColor = "#c8e6c9";
  }
};

// function for sorting by name
const sortByName = (parkA, parkB) => {
  const parkAName = parkA.name;
  const parkBName = parkB.name;
  if (parkAName < parkBName) {
    return -1;
  } else if (parkAName > parkBName) {
    return 1;
  } else {
    return 0;
  }
};

// function for sorting by rating
const sortByRating = (parkA, parkB) => {
  const parkARating = parkA.rating;
  const parkBRating = parkB.rating;
  return parkBRating - parkARating;
};

// function for handling the nameSorter click
const nameSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByName);

  render();
};

// function to handle the ratingSorter click
const ratingSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByRating);

  render();
};

// the point where all the code starts
const main = () => {
  // select the nameSorter link
  const nameSorter = document.querySelector("#name-sorter");

  // add an event listener
  nameSorter.addEventListener("click", nameSorterClickHandler);

  // select the ratingSorter link
  const ratingSorter = document.querySelector("#rating-sorter");

  // add an event listener
  ratingSorter.addEventListener("click", ratingSorterClickHandler);

  // select all the buttons for all the parks
  const main = document.querySelector("main");

  // Add fav button event handler to the main (this is event delegation)
  main.addEventListener("click", favoriteButtonClickHandler);

  // get the form element
  const form = document.querySelector("#park-form");

  // attach the submit handler
  form.addEventListener("submit", submitHandler);

  render();
};

// Add event listener for DOMContentLoaded
window.addEventListener("DOMContentLoaded", main);
