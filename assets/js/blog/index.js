(function () {
  const id = new URLSearchParams(window.location.search).get("id") || 1;
  fetch(
    createAPI(
      `blogs?filters[id][$eq]=${id}&populate=imageLandscape&populate=users_permissions_user.image&populate=users_permissions_user.links&populate=paragraphs.content&populate=blog_tag`
    )
  )
    .then(async (response) => {
      const responseParsed = await response.json();
      const blog = responseParsed.data?.[0]?.attributes;
      console.log(blog);
      if (!blog) {
        window.location.href = "404.html";
      }
      $(document).ready(function () {
        try {
          const {
            title,
            blog_tag: {
              data: {
                attributes: { text: blogTag },
              },
            },
            paragraphs,
            createdAt,
            imageLandscape: {
              data: {
                attributes: { url: imageLandscapeURL },
              },
            },
            users_permissions_user: {
              data: {
                attributes: {
                  username,
                  links,
                  description: userDescription,
                  image: {
                    data: {
                      attributes: { url: userImageURL },
                    },
                  },
                },
              },
            },
          } = blog;

          $("#bi-breadcrumbs").css(
            "background-image",
            `url(${createURL(imageLandscapeURL)})`
          );
          $("#bi-breadcrumbs").css("background-position", "center center");
          $("#bi-breadcrumbs").css("background-size", "cover");
          $("#bi-breadcrumbs").css("background-repeat", "no-repeat");

          $("#blog-detail-title").text(title);
          $("#blog-detail-meta").append(`
                <li>
                    <a><i class="fas fa-user"></i> ${username}</a>
                </li>
                <li>
                    <a><i class="fas fa-calendar-alt"></i> ${formatDate(
                      createdAt
                    )}</a
                    >
                </li>
            `);
          $("#blog-detail-img").attr("src", createURL(imageLandscapeURL));
          paragraphs.forEach((paragraph, i) => {
            $("#blog-detail-paragrapghs").append(`
                ${
                  i === 0
                    ? `<h3>${paragraph.title}</h3>`
                    : `<h4>${paragraph.title}</h4>`
                }
                <p>${paragraph.content}</p>
            `);
          });
          $("#blog-detail-tags").append(`<a href="">${blogTag}</a>`);

          $("#author-img").attr("src", createURL(userImageURL));
          $("#author-name").text(username);
          $("#author-description").text(userDescription || "Yazar hakkında");

          $("#author-socials").append(`
          ${
            links
              ? `
              ${
                links.instagram
                  ? `<a href="${links.instagram}" target="_blank"> <i class="fab fa-instagram"/></a>`
                  : ""
              }
              ${
                links.linkedin
                  ? `<a href="${links.linkedin}" target="_blank"> <i class="fab fa-linkedin-in"/></a>`
                  : ""
              }
              ${
                links.Facebook
                  ? `<a href="${links.Facebook}" target="_blank"> <i class="fab fa-facebook"/></a>`
                  : ""
              }
              ${
                links.youtube
                  ? `<a href="${links.youtube}" target="_blank"> <i class="fab fa-youtube"/></a>`
                  : ""
              }
          `
              : ""
          }
          `);
          document.Haptic.Basic.preloader();
        } catch (error) {
          console.error(error);
        }
      });
    })
    .catch(console.error);
})();
