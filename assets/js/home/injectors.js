/**
 *  @description Injects the given data into the home page
 * @param {[{name: string, field: string, image: {data: {attributes: {url: string}}}, links: {instagram: string, linkedin: string, Facebook: string, youtube: string}}]} employees
 * @returns
 */

const injectEmployees = (employees) => {
  employees.map(({ name, field, image, links }, index) =>
    $("#team-section-list").append(`
    <div class="swiper-slide" data-hash=${index}>
    <div class="wow fadeInUp" data-wow-duration="1200ms">
        <div class="bi-team-item-2 text-center">
            <div class="bi-team-img-shape position-relative">
                <span class="team-shape shape_1 position-absolute"><img src="assets/img/icon/tm-shape3.png" alt=""></span>
                <span class="team-shape shape_2 position-absolute"><img src="assets/img/icon/tm-shape6.png" alt=""></span>
                <div class="bi-team-img" onclick="${
                  links ? `window.open('${links.linkedin}', '_blank')` : ""
                }"  style="cursor: pointer;">
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
};
/**
 * @description Injects the slider into the home page
 */
const injectSlider = () => {
  new Swiper(".team-section-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 1000,
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
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    initialSlide: 1,
  });
};

const injectBlogs = (blogs) => {
  const createHref = (id) => `blog.html?id=${id}`;

  blogs.forEach((blog) => {
    const {
      id,
      attributes: {
        title,
        createdAt,
        imageHome: {
          data: {
            attributes: { url: imageURL },
          },
        },
        blog_tag: {
          data: {
            attributes: { text: blogTag },
          },
        },
        users_permissions_user: user,
      },
    } = blog;

    $("#blogs-section").append(`
    <div
      class="col-lg-4 col-md-6 wow fadeInUp"
      data-wow-delay="100ms"
      data-wow-duration="1200ms"
    >
      <div class="bi-blog-item-2">
        <div class="blog-img-area position-relative">
          <div class="blog-img">
            <img src=${createURL(imageURL)} alt="" />
          </div>
        </div>
        <div class="bi-blog-text headline">
          <div class="blog-meta text-uppercase">
            <a href=${createHref(id)}>${blogTag}</a>
            <a href=${createHref(id)}>${formatDate(createdAt)}</a>
          </div>
          <h3>
            <a href="blog-single.html">${title}</a>
          </h3>
          <a class="read_more text-uppercase" href=${createHref(id)}>
            DEVAMINI OKU<i class="fas fa-plus-circle"></i>
          </a>
        </div>
      </div>
    </div>
`);
  });
};
