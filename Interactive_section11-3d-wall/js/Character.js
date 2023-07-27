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

  // scrollState : 스크롤중인지 아닌지 확인하는 속성
  this.scrollState = false;
  // 마지막 스크롤 위치
  this.lastScrollTop = 0;

  this.xPos = info.xPos;
  this.speed = 0.3;

  // 방향 설정
  this.direction;
  // 좌우 이동 중인지 아닌지 확인
  this.runningState = false;
  // requestAnimationFrame가 리턴하는 값 저장할 속성
  this.rafId;

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
      // 빈번하게 발생하는 스크롤 이벤트 안에서 동작을 효율적으로 수행하기 위해 setTimeout & clearTimeout 매커니즘 활용
      // 따라서, 스크롤 중일 때는 running 클래스 추가하는 이벤트 한 번만 발생하도록 설정
      // 스크롤 중에는 계속 clearTimeout 실행되기 때문에 setTimeout 실행되지 않음 -> 스크롤 멈췄을 때 0.5초 후 setTimeout 로직 수행
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add('running');
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove('running');
      }, 500);

      // 마지막 스크롤 위치와 현재 스크롤 위치를 비교
      //   console.log('lastScrollTop: ' + self.lastScrollTop);
      //   console.log('scrollY: ' + scrollY);

      if (self.lastScrollTop > scrollY) {
        // 마지막 스크롤 위치가 현재 스크롤 위치보다 크면 스크롤 올림 (후진)
        self.mainElem.setAttribute('data-direction', 'backward');
      } else {
        // 작으면 스크롤 내림 (전진)
        self.mainElem.setAttribute('data-direction', 'forward');
      }

      self.lastScrollTop = scrollY;
    });

    // 키보드 키마다 고유의 keycode값 존재 -> left: 37 / right: 39
    // 이를 활용해 캐릭터의 좌우 움직임 구현
    window.addEventListener('keydown', function (e) {
      if (self.runningState) return;

      if (e.key === 'ArrowLeft') {
        // 왼쪽
        self.direction = 'left';
        self.mainElem.setAttribute('data-direction', 'left');
        self.mainElem.classList.add('running');
        self.run(self);
        self.runningState = true;
      } else if (e.key === 'ArrowRight') {
        // 오른쪽
        self.direction = 'right';
        self.mainElem.setAttribute('data-direction', 'right');
        self.mainElem.classList.add('running');
        self.run(self);
        self.runningState = true;
      }
    });

    window.addEventListener('keyup', function (e) {
      self.mainElem.classList.remove('running');

      // requestAnimationFrame cancle 처리
      cancelAnimationFrame(self.rafId);
    });
  },
  // 키 누르면 speed 값만큼씩 이동하도록 구현
  run: function (self) {
    if (self.direction == 'left') {
      self.xPos -= self.speed;
    } else if (self.direction == 'right') {
      self.xPos += self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }

    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + '%';

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  },

  // bind를 사용한 방법
  // run: function () {
  //     const self = this;
  //
  //     if (self.direction == 'left') {
  //         self.xPos -= self.speed;
  //     } else if (self.direction == 'right') {
  //         self.xPos += self.speed;
  //     }
  //
  //     if (self.xPos < 2) {
  //         self.xPos = 2;
  //     }
  //
  //     if (self.xPos > 88) {
  //         self.xPos = 88;
  //     }
  //
  //     self.mainElem.style.left = self.xPos + '%';
  //
  //     self.rafId = requestAnimationFrame(self.run.bind(self));
  // }
};
