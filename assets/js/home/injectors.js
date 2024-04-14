/**
 *  @description Injects the given data into the home page
 * @param {[{name: string, field: string, image: {data: {attributes: {url: string}}}, links: {instagram: string, linkedin: string, Facebook: string, youtube: string}}]} employees
 * @returns
 */

const injectEmployees = (employees) =>
  employees.map(({ name, field, image, links }, index) =>
    $("#team-section-list").append(`
<div class="swiper-slide" data-hash=${index}>
<div class="wow fadeInUp"  data-wow-delay="400ms" data-wow-duration="1200ms">
        <div class="bi-team-item-2 text-center">
            <div class="bi-team-img-shape position-relative">
                <span class="team-shape shape_1 position-absolute"><img src="assets/img/icon/tm-shape3.png" alt=""></span>
                <span class="team-shape shape_2 position-absolute"><img src="assets/img/icon/tm-shape6.png" alt=""></span>
                <div class="bi-team-img">
                    <img src=${createURL(image.data.attributes.url)}></img>
                </div>
            </div>
            <div class="bi-team-text headline">
                <h3><a href="team-single.html">${name}</a></h3>
                <span>${field}</span>
            </div>
            <div class="bi-team-social ul-li">
                ${
                  links
                    ? `<ul>
                    ${
                      links.instagram
                        ? `<li><a href="${links.instagram}" target="_blank"> <i class="fab fa-instagram"/></a></li>`
                        : ""
                    }
                    ${
                      links.linkedin
                        ? `<li><a href="${links.linkedin}" target="_blank"> <i class="fab fa-linkedin-in"/></a></li>`
                        : ""
                    }
                    ${
                      links.Facebook
                        ? `<li><a href="${links.Facebook}" target="_blank"> <i class="fab fa-facebook"/></a></li>`
                        : ""
                    }
                    ${
                      links.youtube
                        ? `<li><a href="${links.youtube}" target="_blank"> <i class="fab fa-youtube"/></a></li>`
                        : ""
                    }
                </ul>`
                    : ""
                }
            </div>
        </div>
    </div>
    </div>
    `)
  );
/**
 * @description Injects the slider into the home page
 */
const injectSlider = () => {
  new Swiper(".team-section-swiper", {
    autoplay: {
      delay: 0,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    freeMode: true,
    centeredSlides: true,
    loop: true,
    speed: 5000,
    slidesPerView: 3,
    spaceBetween: 30,
    resizeObserver: true,
  });
};
