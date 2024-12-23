gsap.registerPlugin(Flip, ScrollTrigger);

// 모바일
function isMobile() {
    return window.innerWidth <= 767;
}

// section01 (pc, mo 동일)
function animateSection01() {
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
}

// section02 (pc, mo 상이)
function animateSection02() {
    if (isMobile()) {
        const boxes = document.querySelectorAll(".section02 .project-btm .box");

        gsap.set(boxes, { opacity: 0, y: 50 });

        // 각 box
        gsap.to(boxes, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".section02",
                start: "top 70%",
                end: "bottom top",
                toggleActions: "play none none reverse",
                scrub: 0.5,
            },
        });
    } else {
        // 좌우 스크롤
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
                trigger: ".section02",
                start: "top top",
                end: () => {
                    const boxes = document.querySelectorAll(".project-btm .box");
                    const boxCount = boxes.length;
                    const boxWidth = 700;
                    const padding = 20;
                    const projectTop = document.querySelector(".project-top");
                    const totalWidth = boxCount * (boxWidth + padding * 2);
                    return "+=" + (totalWidth - window.innerWidth + projectTop.offsetHeight + 20);
                },
                scrub: true,
                pin: ".section02",
                anticipatePin: 1,
            },
        });
    }
}

// section04
function animateSection04() {
    if (isMobile()) {
        gsap.from(".section04 .about-top", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".section04",
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
        });
        gsap.from(".section04 .about-btm .imgbox", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".section04 .about-btm",
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });
        gsap.from(".section04 .about-btm .box", {
            y: 100, 
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".section04 .about-btm",
                start: "top 50%",
                toggleActions: "play none none reverse",
            },
        });
    } else {
        gsap.from(".section04 .about-top", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".section04",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
        gsap.from(".section04 .about-btm .imgbox", {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".section04 .about-btm",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
        gsap.from(".section04 .about-btm .box", {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".section04 .about-btm",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    }
}

// section05 (텍스트 복사 - pc,mo 동일)
function loopHorizontalScroll() {
    const list = document.querySelector(".section05 ol");
    const items = Array.from(list.children);
    const listWidth = list.offsetWidth;

    items.forEach((item) => {
        const clone = item.cloneNode(true);
        list.appendChild(clone);
    });
}

//section05 (pc,mo 동일)
function animateSection05() {
    gsap.from(".section05", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".section05",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });
}

//전체 section05 (pc,mo 동일)
function animateSection05Wrapper() {
    loopHorizontalScroll(); 
    animateSection05(); 
}

animateSection01();
animateSection02();
animateSection04();
animateSection05Wrapper();