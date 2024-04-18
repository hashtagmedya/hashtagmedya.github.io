//http://localhost:1337/api/projects?pagination[page]=1&pagination[pageSize]=10&populate[0]=image&populate=project_category

fetch(createAPI("home?populate[0]=employees.image&populate=employees.links"))
  .then(async (response) => {
    const { data } = await response.json();

    const employees = data.attributes.employees;

    $(document).ready(function () {
      injectEmployees(employees);
      injectEmployees(employees);
      injectSlider();
    });
  })
  .catch(console.error);

fetch(
  createAPI(
    "blogs?filters[featured][$eq]=true&populate=imageHome&populate=blog_tag.text&populate=users_permissions_user.image&pagination[pageSize]=6"
  )
)
  .then(async (response) => {
    const { data: blogs } = await response.json();
    $(document).ready(function () {
      injectBlogs(blogs);
    });
  })
  .catch(console.error);
