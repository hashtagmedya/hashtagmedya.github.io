loadHeader();

(function () {
  let projectDetail = null;
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  fetch(
    createAPI(
      `project-details?filters[id][$eq]=${projectId}&populate=bannerBgImage&populate=projectImage&populate=from&populate=to&populate=paragraphs.content&populate=project&populate=projectInfo.project_category&populate=projectInfo.links`
    )
  ).then(async (response) => {
    const { data } = await response.json();
    if (data.length === 0) {
      window.location.href = "404.html";
    }
    projectDetail = data[0]?.attributes;
    const projectInfo = projectDetail.projectInfo;
    console.log(projectDetail);

    $("#project-title").text(projectDetail.title);
    $("#navigation-from")
      .text(projectDetail.from.text)
      .attr("href", projectDetail.from.to);
    $("#navigation-to").text(projectDetail.to.text);

    $("#bi-breadcrumbs").attr(
      "data-background",
      createURL(projectDetail.bannerBgImage.data.attributes.url)
    );
    $("#project-image").attr(
      "src",
      createURL(projectDetail.projectImage.data.attributes.url)
    );

    const projectInfoHandlers = [
      {
        title: "Client",
        info: projectInfo.client,
      },
      {
        title: "Category",
        info: projectInfo.project_category.data.attributes.text,
      },
      {
        title: "Start date",
        info: projectInfo.startDate,
      },
      {
        title: "End date",
        info: projectInfo.endDate,
      },
      {
        title: "Project link",
        info: projectInfo.projectLink,
      },
      {
        title: "Budget",
        info: projectInfo.budget,
      },
    ];
    projectInfoHandlers.forEach((handler) => {
      if (handler.info)
        $("#project-info").append(`
        <li>
        <span class="title">${handler.title}:</span>
        <span class="info">${handler.info}</span>
        </li>
    `);
    });

    const getProjectLinkContainer = (href, children) =>
      `<a href="${href}" target="_blank">${children}</a>`;

    const projectLinksHandlers = [
      {
        predicate: () => projectInfo.links.instagram,
        handler: () =>
          getProjectLinkContainer(
            projectInfo.links.instagram,
            '<i class="fab fa-instagram"></i>'
          ),
      },
      {
        predicate: () => projectInfo.links.facebook,
        handler: () =>
          getProjectLinkContainer(
            projectInfo.links.facebook,
            '<i class="fab fa-facebook"></i>'
          ),
      },
      {
        predicate: () => projectInfo.links.linkedin,
        handler: () =>
          getProjectLinkContainer(
            projectInfo.links.linkedin,
            '<i class="fab fa-linkedin-in"></i>'
          ),
      },
      {
        predicate: () => projectInfo.links.youtube,
        handler: () =>
          getProjectLinkContainer(
            projectInfo.links.youtube,
            '<i class="fab fa-youtube"></i>'
          ),
      },
    ];

    projectLinksHandlers.forEach((handler) => {
      if (handler.predicate())
        $("#project-info-social-media").append(handler.handler());
    });
    document.Haptic.Basic.BackgroundImage();
  });
})();
