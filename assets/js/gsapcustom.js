
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
        document.querySelector(".section01 .text03.text03-active01").textContent = "WELCOME";
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
gsap.to(".project-btm", {
    x: () => {
        const boxes = document.querySelectorAll(".project-btm .box");
        const boxCount = boxes.length;
        const boxWidth = 700;
        const padding = 20;
        const totalWidth = boxCount * (boxWidth + padding * 2); // 박스들의 총 길이 계산
        return -(totalWidth - window.innerWidth + 20); // 음수로 설정해야지 왼쪽으로 스크롤 가능
    },
    ease: "none",
    scrollTrigger: {
        trigger: ".section02", // 스크롤 트리거를 설정할 요소
        start: "top top", // 스크롤 시작 위치 (".section02" 상단이 화면 상단과 만날 때)
        end: () => {
            const boxes = document.querySelectorAll(".project-btm .box");
            const boxCount = boxes.length;
            const boxWidth = 700;
            const padding = 20;
            const projectTop = document.querySelector(".project-top");
            const totalWidth = boxCount * (boxWidth + padding * 2);
            return "+=" + (totalWidth - window.innerWidth + projectTop.offsetHeight + 20); // 가로 스크롤 거리(totalWidth - window.innerWidth) , `projectTop.offsetHeight`를 추가하여 상단 영역의 높이도 포함
        },
        scrub: true, // 스크롤과 애니메이션을 동기화
        pin: ".section02", // ".section02"를 고정 (핀)
        anticipatePin: 1, // 핀을 미리 잡아주는 정도 설정 (부드러운 애니메이션)
    },
});
