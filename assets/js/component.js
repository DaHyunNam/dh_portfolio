// 아코디언 기능
function accordion(container, openIndex) {
  document.querySelectorAll(container).forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');

    // 초기 활성화 처리
    if (typeof openIndex === 'number' && items[openIndex]) {
      items[openIndex].classList.add('is-active');
    }

    // 클릭 이벤트 처리
    accordion.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;

      const item = button.closest('.accordion-item');
      if (!item) return;

      // 활성화 토글 처리
      const isActive = item.classList.contains('is-active');
      items.forEach(i => i.classList.remove('is-active')); // 전체 비활성화
      if (!isActive) item.classList.add('is-active'); // 클릭된 항목만 활성화
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

      progressCircleType1.style.setProperty("--barNum", offsetType1);
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
        const stackedName = stackedArray[index].name;
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
