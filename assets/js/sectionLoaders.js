const loadHeader = () => {
  $(function () {
    $("#header-section").load("components/navbar.html", function () {
      document.Haptic.Basic.MobileMenu();
    });
  });
};

const loadFooter = () => {
  $(function () {
    $("#footer-section").load("components/footer.html", function () {
      document.Haptic.Basic.BackgroundImage();
    });
  });
};
