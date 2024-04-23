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
      $(document).ready(function () {
        injectBlogs(blogs);
        injectPagination(pageCount, page);
      });
    })
    .catch(console.error);
})();
