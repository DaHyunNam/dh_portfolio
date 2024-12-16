// 아코디언 기능
function accordionFun(selector, openIndex) {
  const containers = document.querySelectorAll(selector);

  containers.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    // 초기 활성화 처리
    if (typeof openIndex === "number" && openIndex >= 0 && openIndex < items.length) {
      items[openIndex].classList.add("is-active");
    }

    items.forEach((item) => {
      const itemBtn = item.querySelector(".accordion-tit button");
      if (!itemBtn) return;
      itemBtn.addEventListener("click", () => {
        // 현재 클릭한 아이템이 활성화 상태인지 확인
        const isActive = item.classList.contains("is-active");
        // 모든 아이템 비활성화
        items.forEach((i) => i.classList.remove("is-active"));
        // 현재 클릭한 아이템만 상태 토글
        if (!isActive) {
          item.classList.add("is-active");
        }
      });
    });
  });
}

// 기본 원형 그래프
function circleGraphType1(el, min, max, dataValue) {
  const svgType1 = document.querySelectorAll(el);
  if (svgType1) {
    svgType1.forEach((svg) => {
      const progressCircleType1 = svg.querySelector(".circle-progress");
      const radiusType1 = progressCircleType1.r.baseVal.value;
      const circumferenceType1 = (2 * Math.PI * radiusType1).toFixed(3);

      // 최대값보다 value값이 클 경우
      if (max <= dataValue) {
        dataValue = max;
      }
      const finalPercentValue = ((dataValue - min) / (max - min)) * 100;
      const offsetType1 = (circumferenceType1 * (1 - finalPercentValue / 100)).toFixed(3);

      progressCircleType1.style.setProperty("--barWidth", circumferenceType1);
      progressCircleType1.style.strokeDashoffset = offsetType1;

      const textElement = svg.parentElement.querySelector(".circlebar_txt");
      if (textElement) {
        textElement.textContent = `${dataValue.toLocaleString()}`;
      }
    });
  }
}

// 커스텀 단독 가로바
function basicBarFun(el, newWidth) {
  const myBarCustom = document.querySelectorAll(el);
  myBarCustom.forEach((bar) => {
    bar.style.width = newWidth + "%";
  });
}

// 커스텀 쌓이는 막대바
function stackBarFun(el, stackedArray) {
  const stackedBars = document.querySelectorAll(el);
  if (stackedBars) {
    stackedBars.forEach((stackedBar) => {
      const eachBars = stackedBar.querySelectorAll(".eachbar");
      eachBars.forEach((eachBar, index) => {
        const stackedNewWidth = stackedArray[index].width;
        const stackedNewBgColor = stackedArray[index].bgcolor;

        eachBar.style.setProperty("--stacked-width", stackedNewWidth + "%");
        eachBar.style.setProperty("--stacked-bg", stackedNewBgColor);

        const eachBarTxt = eachBar.querySelector(".eachbar-value");
        if (eachBarTxt) {
          eachBarTxt.innerHTML = stackedNewWidth + "%";
        }
      });
    });
  }
}
