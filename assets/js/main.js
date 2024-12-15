document.addEventListener('DOMContentLoaded', function () {
  // 스크롤 시, header에 이중클래스 추가
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  let scrollTimeout;

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > lastScrollTop) {
      // 스크롤 내릴 때
      header.classList.add('is-active');
    } else {
      // 스크롤 올릴 때
      header.classList.remove('is-active');
    }
    if (scrollTop === 0) {
      header.classList.remove('is-active');
    }
  });

  // 배너 애니메이션 효과
  const restart = () => {
    const blocks = document.querySelector('.banner-item');
    const newBlocks = blocks.cloneNode(true);
    document.body.removeChild(blocks);
    document.body.appendChild(newBlocks);
  };

  // 키워드 클릭 시 키워드 동일한 프로젝트 보여주기
  const techChips = document.querySelectorAll('.techlist-item .chip:not(.react)');
  const projectItems = document.querySelectorAll('.project .project-item');
  const totalButton = document.querySelector('.chip.total');
  const reactButton = document.querySelector('.chip.react');

  // 모든 project-item을 보이게 설정
  function showAllProjects() {
    projectItems.forEach(item => {
      item.style.display = 'block';
    });
  }

  // 모든 chip에서 is-active 제거
  function clearActiveClass() {
    techChips.forEach(chip => {
      chip.classList.remove('is-active');
    });
  }
  // react 버튼 클릭 시 alert 띄우기
  reactButton.addEventListener('click', function () {
    alert('React는 스터디 중입니다!');
  });

  // chip 클릭 시
  techChips.forEach(chip => {
    chip.addEventListener('click', function () {
      const chipText = chip.textContent.toLowerCase();

      // total 버튼 클릭 시
      if (chip.classList.contains('total')) {
        clearActiveClass(); // 모든 chip의 is-active 제거
        chip.classList.add('is-active'); // total에 is-active 추가
        showAllProjects();  // 모든 project-item 표시
        return;
      }

      // 특정 chip 클릭 시
      if (chip.classList.contains('is-active')) {
        // 이미 활성화된 chip을 클릭하면 필터 초기화
        chip.classList.remove('is-active');
        showAllProjects();
      } else {
        // 다른 chip 활성화 및 필터 적용
        clearActiveClass();
        chip.classList.add('is-active');

        // chip의 텍스트와 동일한 project-footer의 chip만 표시
        projectItems.forEach(item => {
          const chipsInProject = item.querySelectorAll('.project-footer .chip');
          const matchChip = Array.from(chipsInProject).some(projectChip =>
            projectChip.textContent.toLowerCase() === chipText
          );
          item.style.display = matchChip ? 'block' : 'none';
        });
      }
    });
  });

});
