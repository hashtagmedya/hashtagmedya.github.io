const loadHeader = () => {
    $(function(){
        $('#header-section').load('components/navbar.html', function(){
            document.Haptic.Basic.MobileMenu()
        })
    })
}