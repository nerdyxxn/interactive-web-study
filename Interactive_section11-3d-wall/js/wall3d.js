(function () {
  // house를 이동시켜서 스크롤 했을 때 wall 움직이도록 구현
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar');
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight; // 전체 문서 높이 - 현재 창 높이 = 스크롤 범위
  }

  window.addEventListener('scroll', function () {
    // console.log(scrollY / maxScrollValue); : 얼마나 스크롤 했는지 비율로 구하기
    const scrollPer = scrollY / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`; // 'translateZ(' + zMove + 'vw)';

    // 스크롤 비율만큼 progress-bar width 채워지도록 처리
    barElem.style.width = scrollPer * 100 + '%';
  });

  // 창크기 변경될 때마다 maxScrollValue 갱신되도록 처리해야 사이즈 변동되도 정상 작동함
  window.addEventListener('resize', resizeHandler);
  resizeHandler();
})();
