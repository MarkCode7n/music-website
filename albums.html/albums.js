window.DefineWeb = window.DefineWeb || {};

window.addEventListener("load", function () {
    setTimeout(() => {
        document.querySelector(".loader").classList.add("loaded")
    }, null);
});

window.DefineWeb.Playlist = function () {
    !(() => {
        let audio, path, ext, IsPlaying, PlaylistTracks, PlayerElem, PLayingTrack;
        audio = new Audio;
        audio.volume = 0.13;
        path = "./audios/";
        ext = ".mp3";
        PlayerElem = document.getElementById("player");
        IsPlaying = false;
        // PlaylistTracks : [name,src]->
        PlaylistTracks = {
            "t1": ["Baby don't cry", "BABY_DONT_CRY000"],
            "t2": ["Not Afraid", "Eminem"],
            "t3": ["Lumba", "LUMBA"],
            "t4": ["Mysterious girl", "Mysterious_Girl"],
            "t5": ["Nutorious", "Nutorious"],
            "t6": ["Ssasa", "Ssasa"],
        }
        for (const key in PlaylistTracks) {
            //create
            const player__item = document.createElement("li");
            const Player__name = document.createElement("div");
            const play__btn = document.createElement("button");

            //add class
            player__item.classList.add("player__item");
            Player__name.classList.add("player__item-name");
            play__btn.classList.add("player__item-button");
            // play__btn.classList.add("play");

            //set id for the btn in order to play an audio with the id as the src
            play__btn.id = PlaylistTracks[key][1];

            //playing audio and switching tracks
            play__btn.addEventListener("click", (e) => {
                switchTrack(e);
            })
            //merge ans set created elements
            Player__name.textContent = PlaylistTracks[key][0]
            player__item.appendChild(Player__name);
            player__item.appendChild(play__btn);
            PlayerElem.appendChild(player__item);
        }
        audio.addEventListener("ended", () => {
            document.getElementById(PLayingTrack).classList.remove("pause");
            PLayingTrack = "";
            IsPlaying = false;
        })
        const switchTrack = (e) => {
            if (IsPlaying) {
                if (PLayingTrack !== e.target.id) {
                    IsPlaying = true;
                    document.getElementById(PLayingTrack).classList.remove("pause");
                    e.target.classList.add("pause");
                    audio.src = `${path}${e.target.id}${ext}`;
                    audio.play();
                } else {
                    audio.pause();
                    IsPlaying = false;
                    e.target.classList.remove("pause");
                }
            } else {
                e.target.classList.add("pause");
                IsPlaying = true;
                if (PLayingTrack !== e.target.id) {
                    audio.src = `${path}${e.target.id}${ext}`;
                }
                audio.play();
            }
            PLayingTrack = e.target.id;
        }
    })()
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
    }
}

window.addEventListener("DOMContentLoaded", () => {
    let playlist = window.DefineWeb.Playlist();
    let SetNavigationBar = window.DefineWeb.SetNavigationBar();
});

