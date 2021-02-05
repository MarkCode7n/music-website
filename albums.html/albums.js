window.DefineWeb = window.DefineWeb || {};

window.addEventListener("load", function () {
    setTimeout(() => {
        document.querySelector(".loader").classList.add("loaded")
    }, null);
});

window.DefineWeb.Playlist = function () {
    !(() => {
        let audio, path, ext, IsPlaying, PlaylistTracks1, PlaylistTracks2, PlaylistTracks3, PLayingTrack;
        audio = new Audio;
        audio.volume = 0.13;
        path = "./audios/";
        ext = ".mp3";
        // checking for fallbacks for our extension ".mp3"
        /** 
         * @ext = mp3 || others
         */
        let agent = navigator.userAgent.toLocaleLowerCase()
        if (agent.indexOf("firefox") !== -1 || agent.indexOf("opera") != -1) {
            ext = ".ogg"
        }
        IsPlaying = false;


        // PlaylistTracks1 : [name,src]->
        PlaylistTracks1 = {
            "t1": ["Baby don't cry", "BABY_DONT_CRY000"],
            "t2": ["Not Afraid", "Eminem"],
            "t3": ["Lumba", "LUMBA"],
            "t4": ["Mysterious girl", "Mysterious_Girl"],
            "t5": ["Nutorious", "Nutorious"],
            "t6": ["Ssasa", "Ssasa"],
        }
        //..
        PlaylistTracks2 = {
            "t1": ["Baby don't cry", "BABY_DONT_CRY000"],
            "t2": ["Not Afraid", "Eminem"],
            "t3": ["Lumba", "LUMBA"],
            "t4": ["Mysterious girl", "Mysterious_Girl"],
            "t5": ["Nutorious", "Nutorious"],
            "t6": ["Ssasa", "Ssasa"],
        }
        //..
        PlaylistTracks3 = {
            "t1": ["Baby don't cry", "BABY_DONT_CRY000"],
            "t2": ["Not Afraid", "Eminem"],
            "t3": ["Lumba", "LUMBA"],
            "t4": ["Mysterious girl", "Mysterious_Girl"],
            "t5": ["Nutorious", "Nutorious"],
            "t6": ["Ssasa", "Ssasa"],
        }

        //..
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
        //..
        const KeyInTracks = (PTrack, appendingElement) => {
            for (const key in PTrack) {
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
                play__btn.id = PTrack[key][1];

                //playing audio and switching tracks
                play__btn.addEventListener("click", (e) => {
                    switchTrack(e);
                })
                //merge and set created elements
                Player__name.textContent = PTrack[key][0]
                player__item.appendChild(Player__name);
                player__item.appendChild(play__btn);
                appendingElement.appendChild(player__item);
            }
        }

        KeyInTracks(PlaylistTracks1, document.getElementById("player1"))
        KeyInTracks(PlaylistTracks2, document.getElementById("player2"))
        KeyInTracks(PlaylistTracks3, document.getElementById("player3"))
        audio.addEventListener("ended", () => {
            document.getElementById(PLayingTrack).classList.remove("pause");
            PLayingTrack = "";
            IsPlaying = false;
        })
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