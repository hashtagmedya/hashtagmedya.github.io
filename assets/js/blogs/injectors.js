const createBlogURL = (id) => `blog.html?id=${id}`;
const createBlogsURL = (page) => `bloglar.html?sayfa=${page}`;

const injectBlogs = (blogs) => {
  blogs?.forEach(({ attributes: blog, id }) => {
    const blogContent = blog?.paragraphs?.[0]?.content;
    const username = blog?.users_permissions_user?.data?.attributes?.username;
    const createdAt = blog?.createdAt;

    $("#blogs-section").append(`
            <div class="bi-blog-feed-item-3">
                <div class="blog-img">
                    <img src=${createURL(
                      blog?.imageLandscape?.data?.attributes?.url
                    )} alt="" />
                </div>
                <div class="blog-meta text-uppercase">
                    <i class="fas fa-calendar-alt"></i> ${formatDate(createdAt)}
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
                        Daha fazla oku <i class="fal fa-long-arrow-right"></i
                    ></a>
                    </div>
                </div>
            </div>
            `);
  });
};

const injectPagination = (pageCount, currentPage) => {
  $("#blogs-section").append(`
    <div class="bi-pagination text-center ul-li">
        <ul id="pagination"></ul>
    </div>
    `);

  const doubleLeftElement = document.createElement("li");
  doubleLeftElement.innerHTML = `<a href=${createBlogsURL(
    1
  )}><i class="fal fa-chevron-double-left"></i></a>`;
  $("#pagination").append(doubleLeftElement);

  Array.from({ length: pageCount }).forEach((_, i) => {
    const currentPageElement = document.createElement("li");
    currentPageElement.innerHTML = `<a href=${createBlogsURL(i + 1)}>${
      i + 1
    }</a>`;
    i + 1 === currentPage && currentPageElement.classList.add("active");

    $("#pagination").append(currentPageElement);
  });

  const doubleRightElement = document.createElement("li");
  doubleRightElement.innerHTML = `<a href=${createBlogsURL(
    pageCount
  )}><i class="fal fa-chevron-double-right"></i></a>`;

  $("#pagination").append(doubleRightElement);
};
