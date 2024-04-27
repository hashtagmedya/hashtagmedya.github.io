loadHeader();

(function () {
  fetch(createAPI("jobs?populate=logo&populate=badges.text"))
    .then(async (response) => {
      const { data } = await response.json();
      return data;
    })
    .then((data) => {
      data.forEach(({ attributes: job }) => {
        const { title, description, logo, badges } = job;
        $("#jobs-container").append(`
        <div class="job-card-container">
        <div class="job-card-logo">
          <img
            src="${createURL(logo.data.attributes.url)}"
            alt="job"
          />
        </div>
        <div class="job-card-title"> ${title} </div>
        <div class="job-card-description">
          <p>
            ${description}
          </p>
        </div>
        <div class="job-badges">
            ${badges
              .map((badge) => `<span class="badge">${badge.text}</span>`)
              .join("")}
        </div>
        <div class="job-apply">
          <a
            href="kariyer.html?${title}"
            class="btn btn-primary"
            style="color: white"
            >Başvur</a
          >
        </div>
      </div>
        `);
      });
      data.forEach(({ attributes: job }) => {
        const { title, description, logo, badges } = job;
        $("#jobs-container").append(`
        <div class="job-card-container">
        <div class="job-card-logo">
          <img
            src="${createURL(logo.data.attributes.url)}"
            alt="job"
          />
        </div>
        <div class="job-card-title"> ${title} </div>
        <div class="job-card-description">
          <p>
            ${description}
          </p>
        </div>
        <div class="job-badges">
            ${badges
              .map((badge) => `<span class="badge">${badge.text}</span>`)
              .join("")}
        </div>
        <div class="job-apply">
          <a
            href="kariyer.html?${title}"
            class="btn btn-primary"
            style="color: white"
            >Başvur</a
          >
        </div>
      </div>
        `);
      });
    });
})();
