const injectProjects = (projects) => {
  projects.forEach((project) => {
    const {
      attributes: {
        title: projectTitle,
        subtitle: projectSubtitle,
        image: {
          data: {
            attributes: { url: projectImageURL },
          },
        },
        project_subcategory: {
          data: {
            id: categoryId,
            attributes: { text },
          },
        },
      },
    } = project;
    const element = document.createElement("div");
    element.classList.add("bi-portfolio-item-3");
    element.classList.add("filtr-item");
    element.setAttribute("data-category", categoryId);
    element.setAttribute("data-sort", "Busy streets"); //TODO: Change this
    element.innerHTML = `
              <div class="bi-portfolio-img-text-3 position-relative">
                <div class="portfolio-img">
                  <img src="${createURL(projectImageURL)}" alt="" />
                </div>
                <a
                  class="porfolio-icon position-absolute d-flex align-items-center justify-content-center"
                >
                  <i class="fal fa-search"></i
                ></a>
                <div class="portfolio-text headline position-absolute">
                  <span><a>${projectTitle}</a></span>
                  <h3><a>${projectSubtitle}</a></h3>
                  <a
                    class="more_btn position-absolute d-flex align-items-center justify-content-center"
                    ><i class="fal fa-long-arrow-right"></i
                  ></a>
                </div>
              </div>
            `;
    element.addEventListener("click", () => {
      window.location.href = `proje-detay.html?id=${project.id}`;
    });
    $("#bi-portfolio-feed-item-wrapper").append(element);
  });
};

const injectCategories = (categories) => {
  let params = new URL(document.location).searchParams;
  let subCategoryId = params.get("subCategoryId") || "all";

  const listItem = document.createElement("div");
  listItem.classList.add("filtr-button");
  subCategoryId === "all" && listItem.classList.add("filtr-active");
  listItem.setAttribute("data-filter", "all");
  listItem.innerText = "Hepsı";

  listItem.addEventListener("click", () => {
    window.history.pushState
      ? window.history.pushState(null, null, `?subCategoryId=all`)
      : (window.location.hash = `?subCategoryId=all`);
  });
  $("#filters").append(listItem);
  categories.forEach((category, i) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("data-filter", category?.id);
    listItem.classList.add("filtr-button");
    parseInt(subCategoryId) === parseInt(category?.id) &&
      listItem.classList.add("filtr-active");
    listItem.innerText = category?.attributes?.text;
    listItem.addEventListener("click", () => {
      window.history.pushState
        ? window.history.pushState(
            null,
            null,
            `?subCategoryId=${category.id}&subCategoryIdName=${category.attributes.text}`
          )
        : (window.location.hash = `?subCategoryId=${category.id}&subCategoryIdName=${category.attributes.text}`);
    });
    $("#filters").append(listItem);
  });
};
