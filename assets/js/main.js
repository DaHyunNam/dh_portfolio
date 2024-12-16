// 스크롤 시, header에 이중클래스 추가
function setupHeaderScroll() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  if (!header) return; 

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // 스크롤 내릴 때
      header.classList.add('is-active');
    } else if (scrollTop === 0) {
      header.classList.remove('is-active');
    }
  });
}

// 배너 애니메이션 효과
function setupBannerRestart() {
  const restart = () => {
    const blocks = document.querySelector('.banner-item');
    if (!blocks) return; 

    const parent = blocks.parentNode; // banner-item의 부모 요소
    if (!parent) return;

    const newBlocks = blocks.cloneNode(true); // banner-item와 모든 자식 복사
    parent.removeChild(blocks); // 부모 요소를 통해 기존 요소 제거
    parent.appendChild(newBlocks); // 부모 요소에 복제된 요소 추가
  };

  restart();
}

// 키워드 필터
function setupKeywordFiltering() {
  const techChips = document.querySelectorAll('.techlist-item .chip');
  const projectItems = document.querySelectorAll('.project .project-item');
  const totalButton = document.querySelector('.chip.total');
  
  if (!techChips || !projectItems || !totalButton) return;

  // 모든 프로젝트 보이기
  function showAllProjects() {
    projectItems.forEach(item => {
      item.style.display = 'block';
    });
  }

  // 모든 active 클래스 제거
  function clearActiveClass() {
    techChips.forEach(chip => {
      chip.classList.remove('is-active');
    });
  }

  // Chip 클릭 이벤트 설정
  techChips.forEach(chip => {
    chip.addEventListener('click', function () {
      const chipValue = this.dataset.value; // 클릭된 chip의 데이터 값 참조

      // Total 버튼 클릭 시 모든 프로젝트 보이기
      if (chip.classList.contains('total')) {
        clearActiveClass(); 
        chip.classList.add('is-active');
        showAllProjects();
        return;
      }

      // 특정 chip 클릭 시 필터링
      if (chip.classList.contains('is-active')) {
        // 활성화된 chip을 클릭하면 필터 초기화
        chip.classList.remove('is-active');
        showAllProjects();
      } else {
        // 다른 chip 활성화 및 필터 적용
        clearActiveClass();
        chip.classList.add('is-active');

        // chip의 data-value와 동일한 프로젝트 아이템만 표시
        projectItems.forEach(item => {
          const chipsInProject = item.querySelectorAll('.project-footer .chip');
          const matchChip = Array.from(chipsInProject).some(projectChip =>
            projectChip.dataset.value === chipValue
          );
          item.style.display = matchChip ? 'block' : 'none';
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setupHeaderScroll();
  setupBannerRestart();
  setupKeywordFiltering();

  accordionFun(".acc-default",0);
  circleGraphType1(".circlebar-js1", 0, 100, 50);
  circleGraphType1(".circlebar-js2", 0, 100, 80);
  basicBarFun(".bar-js", 70);
  stackBarFun(".stackedbar-js", [
    { name: "국어", width: 30, bgcolor: "#88C721" },
    { name: "영어", width: 30, bgcolor: "#FCC946" },
    { name: "수학", width: 40, bgcolor: "#5CA7FF" }
  ]);
});

