let isTicking = false; // <-- GLOBAL !

$(document).ready(function() {
    
    
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

});

function updateParallax(targetScrollY, stableVH, jordan, jason, jordanOffset, jasonOffset) {

    const stableScroll = (targetScrollY / window.innerHeight) * stableVH;
    const speed = 0.05;

    const jordanRect = jordan.getBoundingClientRect();
    const jasonRect = jason.getBoundingClientRect();
    const distance = jasonRect.left - jordanRect.right;

    if (distance <= 0) {
        isTicking = false;
        return;
    }

    jordan.style.transform =
        `translate(calc(-50% - ${jordanOffset - stableScroll * speed}px), 0px)`;

    jason.style.transform =
        `translate(calc(-50% + ${jasonOffset - stableScroll * speed}px),0px)`;

    isTicking = false;
}

function updateCenter(jordan, center) {
    document.documentElement.style.setProperty("--centerY", center + "px");
}
