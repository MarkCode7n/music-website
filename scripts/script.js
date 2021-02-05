window.DefineWeb = window.DefineWeb || {};


$(window).on("load", function () {
    setTimeout(() => {
        document.querySelector(".loader").classList.add("loaded")
    }, null);
});
window.DefineWeb.Text = function () {
    init();

    function init() {
        $(".birth-date").text(new Date().toDateString());
    }

}

window.DefineWeb.Player = function () {
    let playlist, lent, audio, current;
    init();

    function init() {
        playlist = [{
            __id: 1,
            id: "track-a",
            name: "",
            title: "mysterious girl",
            sub_title: "john doe",
            bg: "/assets/audio-tracks/images/0cb013f5e6922d82f340929bcb7008db.jpg",
            path: "/assets/audio-tracks/track-a-mysterious girl.mp3",
            dur: "",
        }, {
            __id: 2,
            id: "track-b",
            name: "",
            title: "lumba",
            sub_title: "john doe",
            bg: "/assets/audio-tracks/images/333eb7fd5c22464329c1f9ea6bec9d71.jpg",
            path: "/assets/audio-tracks/track-b-(R)Artist - LUMBA.mp3",
            dur: "",
        }, {
            __id: 3,
            id: "track-c",
            name: "",
            title: "not afraid",
            sub_title: "john doe",
            bg: "/assets/audio-tracks/images/385256a1598ca1d158934e7d3dd8bc6d.jpg",
            path: "/assets/audio-tracks/track-c-01 eminem.mp3",
            dur: "",
        }, {
            __id: 4,
            id: "track-d",
            name: "",
            title: "sasa",
            sub_title: "john doe",
            bg: "assets/audio-tracks/images/58c71b1334c0e81bb94649b700d3b446.jpg",
            path: "/assets/audio-tracks/track-d-02 sasa.mp3",
            dur: "",
        }, {
            __id: 5,
            id: "track-e",
            name: "",
            title: "nutorious",
            sub_title: "john doe",
            bg: "/assets/audio-tracks/images/a62ae9f2ab9646736f14627936c7f587.jpg",
            path: "/assets/audio-tracks/track-e-01 nutorious.mp3",
            dur: "",
        }, {
            __id: 6,
            id: "track-f",
            name: "",
            title: "baby don't cry",
            sub_title: "john doe",
            bg: "/assets/audio-tracks/images/e0488d84a4542865f42b9fc564fd4f89.jpg",
            path: "/assets/audio-tracks/track-f-2PAC-BABY DONT CRY000.mp3",
            dur: "",
        }, ];
        const playBtn = document.querySelector(".play");
        audio = new Audio();
        audio.src = playlist[0].path;
        $(".albums__container-header").css({
            "background": `linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)), url(${playlist[0].bg})center/cover no-repeat`,
        });
        $(".h_main-title").text(playlist[0].title);
        $(".h_sub-title").text(playlist[0].sub_title);
        $(".h_duration").text(playlist[0].dur);
        $(".l_duration").text(playlist.dur);

        audio.volume = 0.10;
        current = 0;
        lent = playlist.length - 1;
        $(".prev").on("click", () => {
            prev();
            play__music(playlist[current], audio);
            return false;
        });
        $(".play").on("click", () => {
            play__click();
            return false;
        });
        $(".next").on("click", () => {
            next();
            play__music(playlist[current], audio);
        });
        let vol__el = document.querySelector(".timeline-volume i");
        vol__el.addEventListener("click", () => {
            audio.muted = !audio.muted;
            if (audio.muted) {
                vol__el.className = "";
                vol__el.className = "fa fa-volume-down";
            } else {
                vol__el.className = "";
                vol__el.className = "fa fa-volume-up";
            }
        });

        function play__music(music, player) {
            player.src = music.path;
            $(".h_main-title").text(music.title);
            $(".h_sub-title").text(music.sub_title);
            $(".h_duration").text(music.dur);
            $(".albums__container-header").css({
                "background": `linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)), url(${music.bg})center/cover no-repeat`,
            });
            playBtn.className = "";
            playBtn.className = "play pause";

            audio.load();
            audio.play();
        }
        audio.addEventListener("ended", () => {
            next();
            play__music(playlist[current], audio)
        })
        audio.addEventListener("loadeddata", () => {
            $(".h_length").text(get__from__num(audio.duration))
        })

        function play__click() {
            if (audio.paused) {

                playBtn.className=""
                playBtn.className="play pause"
                audio.play();
            } else {
                playBtn.className=""
                playBtn.className="play"
                audio.pause();
            }
        }

        function prev() {
            current--;
            if (current < 0) current = 0;
        }

        function next() {
            current++;
            if (current > lent) current = 0;
        }

        $(".audio").on("click", (e) => {
            const music__id = e.currentTarget.dataset.musicId;
            if (music__id != undefined) {
                by__id(music__id);
            }
            return false;
        });
        const timeline = document.querySelector(".timeline-div")
        timeline.addEventListener("click", (e) => {
            const timeline__width = window.getComputedStyle(timeline).width;
            const time__to__seek = e.offsetX / parseInt(timeline__width) * audio.duration;
            audio.currentTime = time__to__seek;
        }, false)
        setInterval(() => {
            $(".timeline-drag").css({
                "width": `${audio.currentTime/audio.duration*100}%`
            });
            $(".h_duration").text(get__from__num(audio.currentTime))
        }, 500);

        function get__from__num(num) {
            let seconds = parseInt(num);
            let minutes = parseInt(seconds / 60);
            seconds -= minutes * 60;
            let hours = parseInt(minutes / 60);
            minutes -= hours * 60;
            if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2,0)}`;
            return `${String(hours).padStart(2,0)}:${minutes}:${String(seconds % 60).padStart(2,0)}`
        }

        function by__id(id) {
            let track__id = undefined;
            $.each(playlist, function (indexInArray, valueOfElement) {
                if (valueOfElement.id == id) {
                    track__id = indexInArray;
                }
            });

            if (track__id != undefined) {
                current = track__id;
                play__music(playlist[current], audio)
            }
        }
    }
}

window.DefineWeb.Forms = function () {
    init();

    function init() {
        document.forms[0].setAttribute("autocomplete", "off")
        const inputs = document.querySelectorAll("#add-c");

        function callFC() {
            let parent = this.parentNode;
            $(parent).addClass("focus");
        }

        function blurFC() {
            let parent = this.parentNode;
            if (this.value === "") $(parent).removeClass("focus");
        }
        inputs.forEach((inp) => {
            $(inp).on("focus", callFC);
            $(inp).on("blur", blurFC);
        })
    }
}
window.DefineWeb.AnimateBlogBtns = function () {
    init();

    function init() {
        let all__btns = document.querySelectorAll(".ann-btn");
        all__btns.forEach((btn) => {
            btn.addEventListener("mouseover", () => {
                btn.classList.add("animate");
            })
            btn.addEventListener("mouseout", () => {
                btn.classList.remove("animate");
            })
        })
    }

}
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
        !(() => {
            const __sections__ = document.querySelectorAll("section[id]");
            window.addEventListener("scroll", (e) => {
                let scroll_y = this.pageYOffset;
                __sections__.forEach(sect => {
                    const sect_height = sect.offsetHeight;
                    const sect_top = sect.offsetTop - 50;
                    const sect_id = sect.getAttribute("id");

                    if (scroll_y > sect_top && scroll_y <= sect_top + sect_height)
                        document.querySelector(`.nav__list a[href*=${sect_id}]`).classList.add("activated");
                    else
                        document.querySelector(`.nav__list a[href*=${sect_id}]`).classList.remove("activated");
                })
            })
        })()


    }
}

window.DefineWeb.AnimationOnScroll = function () {
    init();

    function init() {
        let LClass = document.querySelector(".loader");
        const __sr__ = new ScrollReveal({
            origin: "top",
            distance: "80px",
            duration: 1500,
            reset: false,
        });
        //===HOME===
        // if (LClass.style.top = "-100%") {
        __sr__.reveal("#home", {
            delay: 200
        })
        __sr__.reveal(".scroll-to", {})
        __sr__.reveal('.about__img', {
            delay: 300
        })
        // console.log(__sr__)
        // }
        //===ABOUT===
        __sr__.reveal('.about__container-title', {
            delay: 200
        })
        __sr__.reveal('.about__container-title-desc', {
            delay: 400
        })
        __sr__.reveal('.about__container-bbc', {
            delay: 500
        })
        __sr__.reveal('.about__container-signature', {
            delay: 500
        })
        __sr__.reveal('.about__container-socials', {
            delay: 500
        })

        //===ALBUMS===
        __sr__.reveal(".albums__container-big-image", {})
        __sr__.reveal(".albums__container-album-title", {})
        __sr__.reveal(".albums__container-album-desc", {})
        __sr__.reveal(".albums__container-music-gallery", {
            delay: 500
        })
        __sr__.reveal(".album_btn_div", {})
        //===GALLERY===
        __sr__.reveal(".gallery__container", {
            origin: "left",
            duration: 200,
            delay: 300
        })
        //===BLOGS===
        __sr__.reveal("#card-a", {
            origin: "left"
        })
        __sr__.reveal("#card-b", {
            origin: "top"
        })
        __sr__.reveal("#card-c", {
            origin: "right"
        })
        //===CONTACT===
        __sr__.reveal(".contact-info", {})
        __sr__.reveal(".contact-form", {})
    }
}
$(document).ready(function () {
    let loader = window.DefineWeb.Text();
    let player = window.DefineWeb.Player();
    let forms = window.DefineWeb.Forms();
    let AnimateBlogBtns = window.DefineWeb.AnimateBlogBtns()
    let SetNavigationBar = window.DefineWeb.SetNavigationBar();
    let AnimationOnScroll = window.DefineWeb.AnimationOnScroll();
    $("#lightgallery").lightGallery();
})