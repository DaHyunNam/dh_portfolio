// 아코디언 기능
export const accordion = (container, openIndex) => {
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
};

// 기본 원형 그래프
export const circleGraphType1 = (el, min, max, dataValue) => {
  const svgType1 = document.querySelectorAll(el);
  if (svgType1) {
      svgType1.forEach((svg)=> {
          const progressCircleType1 = svg.querySelector(".circle-progress");
          // const dataValueType1 = svg.getAttribute("data-value");
          const radiusType1 = progressCircleType1.r.baseVal.value;
          const circumferenceType1 = (2 * Math.PI * radiusType1).toFixed(3);

          // 최대값보다 value값이 클 경우(ui 넘치기때문에 최대값까지만 가도록 작업)
          if (max <= dataValue) {
              dataValue = max;
          }
          // 백분율을 계산 (MIN과 MIN 범위 내에서)
          const finalPercentValue = ((dataValue - min) / (max - min)) * 100;
          const offsetType1 = (circumferenceType1 * (1 - finalPercentValue / 100)).toFixed(3);

          progressCircleType1.style.setProperty("--barNum", offsetType1);
          progressCircleType1.style.setProperty("--barWidth", circumferenceType1);
          progressCircleType1.style.strokeDashoffset = offsetType1;

          const textElement = svg.parentElement.querySelector(".circlebar_txt");
          if (textElement) {
              textElement.textContent = `${dataValue.toLocaleString()}`;
          }
      })
  }
};

// 커스텀 단독 가로바
export const basicBarFun = (el, newWidth) => {
  const myBarCustom = document.querySelectorAll(el);
  
  myBarCustom.forEach((bar) => {
      // 단독 가로바의 width값 설정
      bar.style.width = newWidth + "%";
  });
};

// 커스텀 쌓이는 막대바
export const stackBarFun = (el,stackedArray) => {
  const stackedBars = document.querySelectorAll(el);
  if (stackedBars) {
      console.log(stackedBars);
      stackedBars.forEach((stackedBar) => {
          const eachBars = stackedBar.querySelectorAll(".eachbar");

          // 각 막대 값 배열로 넣기
          eachBars.forEach((eachBar, index) => {
              // stackedName : eachBar에서 사용할 문구이름
              const stackedName = stackedArray[index].name;
              // stackedNewWidth : eachBar의 width값
              const stackedNewWidth = stackedArray[index].width;
              eachBar.style.setProperty("--stacked-width", stackedNewWidth + "%");
              // stackedNewWidth : eachBar의 배경색
              const stackedNewBgColor = stackedArray[index].bgcolor;
              eachBar.style.setProperty("--stacked-bg", stackedNewBgColor);

              stackedArray.push({ name: stackedName, width: stackedNewWidth, bgcolor: stackedNewBgColor });

              const eachBarTxt = eachBar.querySelector(".eachbar-value");
              if (eachBarTxt) {
                  eachBarTxt.innerHTML = stackedNewWidth + "%";
              }
          });
      });
  }
};