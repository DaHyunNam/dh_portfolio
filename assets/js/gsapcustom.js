
gsap.registerPlugin(Flip, ScrollTrigger);

// section01
let layouts = ["final", "plain", "columns"],
    container = document.querySelector(".section01 .container"),
    curLayout = 0;

const originalTexts = {
    active01: document.querySelector(".section01 .text03.text03-active01").textContent,
    active02: document.querySelector(".section01 .text03.text03-active02").textContent,
};

function nextState() {
    if (layouts[(curLayout + 1) % layouts.length] === "columns") {
        document.querySelector(".section01 .text03.text03-active01").textContent = "Nice to meet you";
        document.querySelector(".section01 .text03.text03-active02").textContent = "";
    } else {
        document.querySelector(".section01 .text03.text03-active01").textContent = originalTexts.active01;
        document.querySelector(".section01 .text03.text03-active02").textContent = originalTexts.active02;
    }

    const state = Flip.getState(".section01 .text03, .section01 .text01, .section01 .text02", { props: "color,backgroundColor", simple: true });

    container.classList.remove(layouts[curLayout]);
    curLayout = (curLayout + 1) % layouts.length;
    container.classList.add(layouts[curLayout]);

    Flip.from(state, {
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: curLayout === 0,
        simple: true,
        onEnter: (elements, animation) => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, delay: animation.duration() - 0.1 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
    });

    gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);
}

gsap.delayedCall(1, nextState);

// section02
gsap.to(".introduce-btm", {
    x: () => -document.querySelector(".introduce-btm").scrollWidth + window.innerWidth,
    ease: "none",
    scrollTrigger: {
        trigger: ".section02",
        start: "top top",
        end: () => "+=" + (document.querySelector(".introduce-btm").scrollWidth - window.innerWidth + document.querySelector(".introduce-top").offsetHeight), // 가로 스크롤 끝까지
        scrub: true,
        pin: ".section02",
        anticipatePin: 1,
    },
});
