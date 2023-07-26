(function () {
  const stageElem = document.querySelector('.stage');
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar');
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight; // 전체 문서 높이 - 현재 창 높이 = 스크롤 범위
  }

  window.addEventListener('scroll', function () {
    // house를 이동시켜서 스크롤 했을 때 wall 움직이도록 구현
    // console.log(scrollY / maxScrollValue); : 얼마나 스크롤 했는지 비율로 구하기
    const scrollPer = scrollY / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`; // 'translateZ(' + zMove + 'vw)';

    // 스크롤 비율만큼 progress-bar width 채워지도록 처리
    barElem.style.width = scrollPer * 100 + '%';
  });

  // 마우스 위치에 따라 stage 회전시켜서 시점 변환
  window.addEventListener('mousemove', function (e) {
    // e.clientX, e.clientY : 마우스 위치 가져오기
    // 중심 기준을 0으로 잡고 왼쪽으로 이동하면 -1에 수렴, 오른쪽으로 이동하면 +1에 수렴
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;

    stageElem.style.transform =
      'rotateX(' + mousePos.y * 5 + 'deg) rotateY(' + mousePos.x * 5 + 'deg)';
  });

  // 창크기 변경될 때마다 maxScrollValue 갱신되도록 처리해야 사이즈 변동되도 정상 작동함
  window.addEventListener('resize', resizeHandler);

  // stage 클릭했을 때 Character 추가되도록 설정
  window.addEventListener('click', function (e) {
    // 클릭한 위치를 character의 CSS left 값으로 설정
    new Character({
      // 객체(info)의 속성으로 필요한 값 전달
      xPos: (e.clientX / window.innerWidth) * 100,
    });
  });

  resizeHandler();
})();
