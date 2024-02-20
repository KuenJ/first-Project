//뉴스를 갖고오는 함수를 만들어본다

const API_KEY = `2ec45c7187284dd788b1a5e90c678bdc`; //API KEY는 자주쓰이니깐 따로빼서 위에 선언을해준다 .
let newsList = []; //newsList를 전역해 선언해준모습원래는아래에서 지역변수로 선언했으나 워낙많이사용되니빼주었다.
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  //자바스크립트는 개발자가 필요로하는 많은 함수들 제공해줌

  const response = await fetch(url); //url 호출하는것 fetch안에 호출하고싶은 url 을 호출하면된다.

  const data = await response.json(); //우리가 받은 url을 json 타입으로 변환하는 것이다. 객체를 텍스트화하는 서버통신할때 많이사용.

  newsList = data.articles; //뉴스는  여러곳에 쓰이니깐 전역변수로 선언하고 재할당만해준모습.

  //이곳에 쓰인이유는  newslist에 값이저장된게 확인이되고나서야 그려야 보여주기때문이다 .

  console.log("ddddd", newsList);
  render();
};

const render = () => {
  const newsHtml = newsList.map(
    (news) => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src="${news.urlToImage}"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name}*${news.publishedAt}</div>
          </div>
        </div>`
  ); // 이 newsHtml을 어딘가에보여줄것이기때문에 미리  선언

  document.getElementById("news-board").innerHTML = newsHtml; //newsHtml을 붙혀넣을것이다.   news-board라는 html section 에 기사들을보여준다  그곳에 id도 news-board여야한다 ..
};
getLatestNews();
