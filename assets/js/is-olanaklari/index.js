loadHeader();

(function () {
  fetch(createAPI("jobs?populate=requirements.text"))
    .then(async (response) => {
      const { data } = await response.json();
      return data;
    })
    .then((data) => {
      data.forEach(({ attributes: job }) => {
        const { position, seniority, logo, requirements, experienceOfYears } =
          job;
        $("#jobs-container").append(`
        <div
        class="col-lg-6 wow fadeInUp"
        data-wow-delay="300ms"
        data-wow-duration="1500ms"
      >
        <div
          class="bi-pricing-item-2"
          data-background="assets/img/bg/price-bg.jpg"
        >
          <div class="bi-pricing-title-2 headline pera-content">
            <span class="text-uppercase"> ${seniority} </span>
            <h3>${position}</h3>
            <h4>${experienceOfYears}</h4>
          </div>
          <div class="bi-price-list-area ul-li-block">
            <ul>
              ${requirements
            .map(
              (requirement) => `
                <li>
                  <i class="bi bi-check2"></i>
                  ${requirement.text}
                </li>
              `
            )
            .join("")}
            </ul>
          </div>
          <div class="bi-btn-2 bi-btn-area text-uppercase">
            <a
              class="bi-btn-main bi-btn-hover bi-btn-item"
              href="kariyer.html?title=${position}"
            >
              <span></span>Başvur</a
            >
          </div>
        </div>
      </div>
        `);
      });
      document.Haptic.Basic.BackgroundImage();
      document.Haptic.Basic.HapticAnimation();
    });
})();
