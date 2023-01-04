// 알라딘 API키: 	ttbdms89451016001
const api_key = "ttbdms89451016001";
let searchBtn = document.querySelectorAll(".input-button");
let searchInputArea = document.querySelector("#search-input");

// 사이드바 만들기,,, 다른 방법으로 만들기
let side = document.querySelector(".sidebar");

side.addEventListener("click", () => {
  // for문으로 나중에 고쳐보기
  side.classList.toggle("open");
  let content = `
  <i class="fa-solid fa-bars"></i>
  <div class="item">menu1</div>
  <div class="item">menu2</div>
  <div class="item">menu3</div>
  <div class="item">menu4</div>`;
  side.innerHTML = content;
});
for (var i = 0; i < searchBtn.length; i++) {
  searchBtn[i].addEventListener("click", search);
}

// 검색하기 * 시간 되면 나중에 function안에 다른 function 빼기,,
function search() {
  let searchArea = searchInputArea.value;
  const url = `https://cors-anywhere.herokuapp.com/https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${api_key}&Query=""${searchArea}""&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

  // 받아올 책 배열로 넣기 위해 배열 만들기
  let bookList = [];
  // 검색 후 보여줄 board

  //api 받아서 책정보 bookList 배열에 넣기
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      bookList = data.item;
      console.log(bookList);
      render(bookList);
    });
  // 값을 불러올 때마다 내용 없애주기
  searchResult = document.querySelector("#search-result");
  searchResult.innerHTML = "";
  // 검색 결과 실행할 함수 만들기
  function render(bookList) {
    if (bookList.length != 0) {
      bookList.forEach((book) => {
        let books = `<label>
        <input type="checkbox">
        <div class="book-inpoBox">
        <img class="img" src="${book.cover}" />
        <div class="book-inpo">
        <p><b>제목:</b> ${book.title}</p>
        <p><b>저자:</b> ${book.author}</p>
        <p><b>출판사:</b> ${book.publisher}</p>
        </div>
        </div>
        <hr />
        </label>`;
        searchResult.innerHTML += books;
      });
    } else {
      let books = `<div class="non-search" >검색결과가 없습니다<div>`;
      searchResult.innerHTML = books;
    }
  }
}
