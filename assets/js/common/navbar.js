loadHeader();

(async function () {
  const { data: subCategories } = await (
    await fetch(createAPI("project-subcategories?populate=project_category"))
  ).json();

  const { data: categories } = await (
    await fetch(createAPI("project-categories"))
  ).json();

  const groupedCategories = categories.reduce((acc, category) => {
    const contextSubcategories = subCategories.filter(
      (subCategory) =>
        subCategory.attributes.project_category.data.id === category.id
    );
    acc.push({
      text: category.attributes.text,
      id: category.id,
      subCategories: contextSubcategories.map((subCategory) => ({
        text: subCategory.attributes.text,
        id: subCategory.id,
      })),
    });
    return acc;
  }, []);

  // Desktop inject
  $(document).ready(function () {
    const $categoriesMenu = $("#categories-menu-desktop");
    const $categoriesMenuMobile = $("#categories-menu-mobile");
    groupedCategories.map((category) => {
      $categoriesMenu.append(`
      <li class="dropdown">
      <a href="#">${category?.text}</a>
      ${
        category.subCategories.length > 0
          ? `
    <ul
      class="dropdown-menu clearfix"
      style="width: 20rem !important"
    >
      ${category.subCategories
        .map(
          (subCategory) =>
            `<li><a href="portfolio.html?subCategoryId=${subCategory.id}&subCategory=${subCategory.text}">${subCategory.text}</a></li>`
        )
        .join("")}
    </ul>`
          : undefined
      }

    </li>
      `);
    });
  });
})();
