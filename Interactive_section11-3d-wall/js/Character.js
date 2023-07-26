function Character(info) {
  // this를 사용하는 것은 Character 생성자를 통해서 만들어낼 인스턴스 객체의 속성으로 쓰겠다는 의미
  this.mainElem = document.createElement('div');
  this.mainElem.classList.add('character');
  this.mainElem.innerHTML = `
        <div class="character-face-con character-head">
        <div class="character-face character-head-face face-front"></div>
        <div class="character-face character-head-face face-back"></div>
        </div>
        <div class="character-face-con character-torso">
        <div class="character-face character-torso-face face-front"></div>
        <div class="character-face character-torso-face face-back"></div>
        </div>
        <div class="character-face-con character-arm character-arm-right">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
        </div>
        <div class="character-face-con character-arm character-arm-left">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
        </div>
        <div class="character-face-con character-leg character-leg-right">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
        </div>
        <div class="character-face-con character-leg character-leg-left">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
        </div>`;

  // 캐릭터 놓이는 곳 위치에 추가
  document.querySelector('.stage').appendChild(this.mainElem);

  this.mainElem.style.left = info.xPos + '%';
  this.init();
}

// 스크롤 했을 때 Character에 running 클래스 추가하는 메소드 작성
// 객체가 공통으로 사용하는 속성이나 메소드는 prototype 객체에 만들기
Character.prototype = {
  constructor: Character,
  init: function () {
    // 이벤트 핸들러 내부에서 this를 사용하면 this = window를 가리킴
    // 우리는 window가 아닌 Character에 접근해야 하기 때문에 이벤트 핸들러 밖에서 미리 this를 변수에 담아둔 다음에 사용함
    const self = this;

    window.addEventListener('scroll', function () {
      self.mainElem.classList.add('running');
    });
  },
};
