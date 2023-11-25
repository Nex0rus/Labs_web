function hidePreloader(preloader) {
  preloader.style.display = "none"
}

function showError(venueReviews) {
  let errorElement = document.createElement("div")
  errorElement.innerText = "⚠ Что-то пошло не так"
  errorElement.classList.add("error", "h2-text")
  venueReviews.appendChild(errorElement)
}

function fetchData(venueReviews, preloader) {
  let lastRequestId = localStorage.getItem("lastRequestId")
  if (lastRequestId == null) {
    lastRequestId = 1
  } else {
    lastRequestId += 1
  }
  localStorage.setItem("lastRequestId", lastRequestId)
  let randomNum = Math.floor(Math.random() * 100 + Math.random() * lastRequestId) % 30;
  fetch("https://my.api.mockaroo.com/reviews.json/" + randomNum + "?key=f01fa360")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was error");
      }
      return response.json();
    })
    .then(data => {
        hidePreloader(preloader);
        data.forEach(reviewObj => {
          let reviewElement = document.createElement("div")
          reviewElement.classList.add("review")
          reviewElement.innerHTML = `
            <div class="user">
              <img class="user__photo" src=${reviewObj.avatar} alt="Аватар">
              <h3 class="user__name default-text">${reviewObj.username}</h3>
            </div>
            <p class="review__text paragraph-text">${reviewObj.review}</p>
          `;
          venueReviews.appendChild(reviewElement)
        });
    })
    .catch(function () {
      hidePreloader(preloader);
      showError(venueReviews);
    });
}

window.addEventListener("load", function() {
  let venueReviewsList = document.querySelectorAll(".venue-reviews");
  venueReviewsList.forEach(venueReviews => {
    let preloader = document.createElement("div");
    preloader.classList.add("preloader");
    venueReviews.appendChild(preloader);
    fetchData(venueReviews, preloader);
  });
});
