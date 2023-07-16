(function () {
  // house를 이동시켜서 스크롤 했을 때 wall 움직이도록 구현
  const houseElem = document.querySelector('.house');
  let maxScrollValue = document.body.offsetHeight - window.innerHeight; // 전체 문서 높이 - 현재 창 높이 = 스크롤 범위

  window.addEventListener('scroll', function () {
    // console.log(scrollY / maxScrollValue); : 얼마나 스크롤 했는지 비율로 구하기
    const zMove = (scrollY / maxScrollValue) * 980 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`; // 'translateZ(' + zMove + 'vw)';
  });
})();
