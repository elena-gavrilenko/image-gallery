console.log(
  "самопроверка  60\n\nВёрстка +10\n-на странице есть несколько фото и строка поиска +5\n-в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n\nПри загрузке приложения на странице отображаются полученные от API изображения +10\n\nЕсли в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n\nПоиск +30\n-при открытии приложения курсор находится в поле ввода +5\n-есть placeholder +5\n-автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n-поисковый запрос можно отправить нажатием клавиши Enter +5\n-после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n-в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5"
);
const imgBlock = document.querySelector(".main");
const input = document.querySelector(".search__input");
const button = document.querySelector(".search__magGlass");

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}
function showData(data) {
  data.results.map((elem) => {
    let img = `<img class="main__img" src="${elem.urls.regular}" alt="some picture"></img>`;
    imgBlock.insertAdjacentHTML("afterbegin", img);
  });
}
let textContent = "";

function call(event) {
  event.preventDefault();
  imgBlock.innerHTML = "";
  textContent = input.value;
  let url = `https://api.unsplash.com/search/photos?query=${textContent}&per_page=20&orientation=landscape&extras=url_m&client_id=HyHOlYbnoBPQa43-1kr2SOYpdjoBuysDUTI_87xItgE`;
  getData(url);
}
button.addEventListener("click", (event) => {
  call(event);
});
input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && input.value) {
    call(event);
  } else if (event.keyCode === 13 && !input.value) {
    imgBlock.innerHTML = "";
    url = `https://api.unsplash.com/search/photos?query=cat&per_page=20&orientation=landscape&extras=url_m&client_id=HyHOlYbnoBPQa43-1kr2SOYpdjoBuysDUTI_87xItgE`;
    getData(url);
  }
});
function getLocalStorage() {
  textContent = localStorage.getItem("textContent");
  if (textContent) {
    input.value = textContent;
    imgBlock.innerHTML = "";
    url = `https://api.unsplash.com/search/photos?query=${textContent}&per_page=20&orientation=landscape&extras=url_m&client_id=HyHOlYbnoBPQa43-1kr2SOYpdjoBuysDUTI_87xItgE`;
    getData(url);
  } else {
    const url1 =
      "https://api.unsplash.com/search/photos?query=cat&per_page=20&orientation=landscape&extras=url_m&client_id=HyHOlYbnoBPQa43-1kr2SOYpdjoBuysDUTI_87xItgE";

    getData(url1);
  }
}
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  localStorage.setItem("textContent", textContent);
}
window.addEventListener("beforeunload", setLocalStorage);
