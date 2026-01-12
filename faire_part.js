let isTicking = false; // <-- GLOBAL !
let lastScrollY = 0;

$(document).ready(function() {
// scroll down au clic sur Details
  $("#DetailsButton").on("click", () => {
        // window.scrollBy({
        // top: window.innerHeight + (window.innerHeight * 0.5),
        // left: 0,
        // behavior: "smooth"
        //  }); 

        setTimeout( () => {
            console.log($("#Details").hasClass('show'));
            console.log("vfd");
            if ($("#Details").hasClass("show")) {
                window.scrollBy({
                top: window.innerHeight * 0.5,
                left: 0,
                behavior: "smooth"
                }); 

                // window.scrollBy(0, 110);
            }
        },400);
        
        
    });

});

window.addEventListener("load", () => {

    if (isIOS()) {
        const jordan = document.getElementById("ImgJordan");
        const jason = document.getElementById("ImgJason");
        const jordanOffset = jordan.offsetWidth / 1.5;
        const jasonOffset = jason.offsetWidth / 1.5;
        const center = window.visualViewport.height / 2 - (jordan.height/2); // - la moitié de la hauter de l'image
        
        jordan.style.transform = `translate(calc(-50% - ${jordanOffset}px), 0)`;
        jason.style.transform = `translate(calc(-50% + ${jasonOffset}px),0)`;   

            updateCenter(jordan, center);

        let stableVH = window.innerHeight;

        return;
    }
    initParallax();

    
});

document.addEventListener("DOMContentLoaded", () => {
  if (!isSamsungInternet()) return;

  if(window.matchMedia('(prefers-color-scheme: dark)').matches) {

    //   if (localStorage.getItem("samsungWarningSeen")) return;
    
      const warning = document.getElementById("samsung-warning");
      const closeBtn = document.getElementById("close-warning");
    
      warning.hidden = false;
    
      closeBtn.addEventListener("click", () => {
        warning.hidden = true;
        localStorage.setItem("samsungWarningSeen", "1");
       });
  }

});

function updateParallax(targetScrollY, stableVH, jordan, jason, jordanOffset, jasonOffset) {

    const stableScroll = (targetScrollY / window.innerHeight) * stableVH;
    const speed = 0.05;

    const jordanRect = jordan.getBoundingClientRect();
    const jasonRect = jason.getBoundingClientRect();
    const distance = jasonRect.left - jordanRect.right;

    const scrollingDown = targetScrollY > lastScrollY;

    // 🔒 Bloquer uniquement si elles se touchent ET qu'on descend
    if (distance <= 0 && scrollingDown) {
        isTicking = false;
        lastScrollY = targetScrollY;
        return;
    }

    jordan.style.transform =
        `translate(calc(-50% - ${jordanOffset - stableScroll * speed}px), 0px)`;

    jason.style.transform =
        `translate(calc(-50% + ${jasonOffset - stableScroll * speed}px), 0px)`;

    lastScrollY = targetScrollY;
    isTicking = false;
}

function updateCenter(jordan, center) {
    document.documentElement.style.setProperty("--centerY", center + "px");
}

function  initParallax() {
    const jordan = document.getElementById("ImgJordan");
    const jason = document.getElementById("ImgJason");
    const jordanOffset = jordan.offsetWidth / 1.5;
    const jasonOffset = jason.offsetWidth / 1.5;
    const center = window.visualViewport.height / 2 - (jordan.height/2); // - la moitié de la hauter de l'image
    
    jordan.style.transform = `translate(calc(-50% - ${jordanOffset}px), 0)`;
    jason.style.transform = `translate(calc(-50% + ${jasonOffset}px),0)`;   

        updateCenter(jordan, center);

    let stableVH = window.innerHeight;

    window.addEventListener("resize", () => {
        updateCenter(jordan, center);
    });



    let targetScrollY = 0;

    window.addEventListener("scroll", () => {
        targetScrollY = window.scrollY;

        if (!isTicking) {
            requestAnimationFrame(() => {
                updateParallax(targetScrollY, stableVH, jordan, jason, jordanOffset, jasonOffset);
            });
            isTicking = true;
        }
    });
}

function isSamsungInternet() {
  return /SamsungBrowser/i.test(navigator.userAgent);
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

