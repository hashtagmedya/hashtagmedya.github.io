loadHeader();

(function () {
  let categories = null;
  let params = new URL(document.location).searchParams;

  fetch(createAPI("project-subcategories"))
    .then(async (response) => {
      const { data } = await response.json();

      document.getElementById("filters").style.display = "flex";
      document.getElementById("filters-loading").style.display = "none";

      categories = data;
      injectCategories(data);
      return fetch(
        createAPI("projects?populate[0]=image&populate=project_subcategory")
      );
    })
    .then(async (response) => {
      const { data } = await response.json();
      $("#bi-portfolio-feed-item-wrapper").removeClass("d-none");
      $("#bi-portfolio-feed-item-wrapper-loading").addClass("d-none");

      injectProjects(data);

      let subCategoryId = params.get("subCategoryId") || "all";
      document.Haptic.Basic.PortfolioFilterImage(subCategoryId);
      document.Haptic.Basic.preloader();
    });
})();
