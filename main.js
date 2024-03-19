// 각 '뽑기' 버튼에 대한 이벤트 리스너 설정
document.querySelectorAll(".drawButton").forEach((button) => {
  button.addEventListener("click", function () {
    var buttonIndex = this.getAttribute("data-index"); // 버튼 인덱스 가져오기
    this.disabled = true; // 버튼 비활성화
    drawRandom(buttonIndex); // 해당 인덱스로 뽑기 함수 호출
  });
});
function retry() {
  location.href = "./";
}

// 이미지 선택 결과를 저장하는 배열
var selectedItems = [];

function drawRandom(buttonIndex) {
  var intervalDelay = 50;
  var speedUpFactor = 0.9;
  var slowDownFactor = 1.1;
  var count = 0;
  var maxCount = Math.floor(Math.random() * 10 + 20);
  var start = 0;
  var items = Array(2)
    .fill()
    .map((_, i) => start + i + 1);

  function drawItem() {
    var randomIndex = Math.floor(Math.random() * items.length);
    var selectedItem = items[randomIndex];

    if (count >= maxCount - 1) {
      setTimeout(function () {
        document.getElementById("image" + buttonIndex).src =
          "./heroes/" + selectedItem + ".png";
        selectedItems[buttonIndex - 1] = selectedItem;

        // 마지막 항목을 변경한 후, 모든 항목이 변경되었는지 확인하고 1초 후에 checkJackpot 함수를 호출
        if (
          selectedItems.filter((item) => item !== undefined).length ===
          document.querySelectorAll(".drawButton").length
        ) {
          setTimeout(checkJackpot, 2000); // 2초 지연 후 Jackpot 검사
        }
      }, intervalDelay);
    } else {
      document.getElementById("image" + buttonIndex).src =
        "./heroes/" + selectedItem + ".png";
        setTimeout(checkJackpot, 500000);
    }

    count++;
    if (count < maxCount / 2) {
      intervalDelay *= speedUpFactor;
    } else {
      intervalDelay *= slowDownFactor;
    }
    if (count < maxCount) {
      setTimeout(drawItem, intervalDelay);
    }
  }
  drawItem();
}

// Jackpot 검사
function checkJackpot() {
  if (new Set(selectedItems).size === 1) {
    Swal.fire({
      icon: 'success',                         // Alert 타입
      title: '뽑기를 성공히였습니다.',         // Alert 제목
  });
  } else {
    Swal.fire({
      icon: 'error',                         // Alert 타입
      title: '다시 한번 도전해보세요.',         // Alert 제목
  });
  }
}