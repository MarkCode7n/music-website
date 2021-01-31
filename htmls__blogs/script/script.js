window.DefineWeb = window.DefineWeb || {};

$(window).on("load",function () { 
    setTimeout(() => {
        let Is_loading = $(".loader").addClass("loaded") || $(window).unload(function () {
            $(".loader").addClass("loaded");
            document.body.style.overflow = "hidden";
            return Is_loading;
        });
    }, 0);
});
window.DefineWeb.SetNavigationBar = function () {
    init();

    function init() {

        !(function () {
            let IsPressed = false;


            $("#toggleNav").click(function (e) {
                e.preventDefault();
                if (!IsPressed) {
                    $(".navigation-bar__menu").css("right", `${0}%`);
                    IsPressed = true;
                } else {

                    $(".navigation-bar__menu").css("right", `${-100}%`);
                    IsPressed = false;
                }
            })
            const nav__links = document.querySelectorAll(".nav__link");
            nav__links.forEach(link => link.addEventListener("click", function () {
                $(".navigation-bar__menu").css("right", `${-100}%`);
                IsPressed = false;
            }));
        })();



    }
}
$(document).ready(function(){
    let setNav =window.DefineWeb.SetNavigationBar();
})