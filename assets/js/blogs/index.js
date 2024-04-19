(function () {
  const currentPage =
    new URLSearchParams(window.location.search).get("sayfa") || 1;
  fetch(
    createAPI(
      `blogs?populate=imageLandscape&populate=users_permissions_user.image&populate=paragraphs.content&pagination[pageSize]=6&pagination[page]=${currentPage}&sort=createdAt:desc`
    )
  )
    .then(async (response) => {
      const responseParsed = await response.json();
      const blogs = responseParsed.data;
      const {
        meta: {
          pagination: { page, pageSize, pageCount, total },
        },
      } = responseParsed;
      console.log(responseParsed, blogs, page, pageSize, pageCount, total);
      $(document).ready(function () {
        blogs?.forEach(({ attributes: blog, id }) => {
          const blogContent = blog?.paragraphs?.[0]?.content;
          const username =
            blog?.users_permissions_user?.data?.attributes?.username;
          const createdAt = blog?.createdAt;

          const createBlogURL = (id) => `blog.html?id=${id}`;
          $("#blogs-section").append(`
              <div class="bi-blog-feed-item-3">
                  <div class="blog-img">
                      <img src=${createURL(
                        blog?.imageLandscape?.data?.attributes?.url
                      )} alt="" />
                  </div>
                  <div class="blog-meta text-uppercase">
                      <i class="fas fa-calendar-alt"></i> ${formatDate(
                        createdAt
                      )}
                  </div>
                  <div class="blog-text headline pera-content">
                      <h3><a href=${createBlogURL(id)}>${blog?.title}</a></h3>
                      <p style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                          ${blogContent}
                      </p>
                  </div>
                  <div
                      class="blog-author-more d-flex justify-content-between align-items-center flex-wrap"
                  >
                      <div class="blog-author d-flex align-items-center">
                      <div class="inner-img">
                          <img src="assets/img/testimonial/test-1.jpg" alt="" />
                      </div>
                      <div class="inner-text">${username}</div>
                      </div>
                      <div class="blog-more text-uppercase">
                      <a href=${createBlogURL(id)}>
                          Read More <i class="fal fa-long-arrow-right"></i
                      ></a>
                      </div>
                  </div>
              </div>
              `);
        });

        const createHref = (id) => `bloglar.html?sayfa=${id}`;

        $("#blogs-section").append(`
        <div class="bi-pagination text-center ul-li">
            <ul id="pagination"></ul>
        </div>
        `);

        const doubleLeftElement = document.createElement("li");
        doubleLeftElement.innerHTML = `<a href=${createHref(
          1
        )}><i class="fal fa-chevron-double-left"></i></a>`;
        $("#pagination").append(doubleLeftElement);

        Array.from({ length: pageCount }).forEach((_, i) => {
          const currentPageElement = document.createElement("li");
          currentPageElement.innerHTML = `<a href=${createHref(i + 1)}>${
            i + 1
          }</a>`;
          i + 1 === page && currentPageElement.classList.add("active");

          $("#pagination").append(currentPageElement);
        });

        const doubleRightElement = document.createElement("li");
        doubleRightElement.innerHTML = `<a href=${createHref(
          pageCount
        )}><i class="fal fa-chevron-double-right"></i></a>`;

        $("#pagination").append(doubleRightElement);
      });
    })
    .catch(console.error);
  /**
      
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li>
                          <a href="#"><i class="fal fa-chevron-double-right"></i></a>
                        </li>
       */
})();
