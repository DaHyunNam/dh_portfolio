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