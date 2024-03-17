const API_KEY = "9cdf31dfc030437a8d7f529250585afd";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

 function bindData(articles){
    const cardscontainer = document.getElementById("cards-container");
    const card = document.getElementById("card-main");
    console.log(articles);
    cardscontainer.innerHTML="";
    articles.forEach((article) =>{
        if(!article.urlToImage) return;
    const cardclone = card.content.cloneNode(true);
    fillData(cardclone, article);
    cardscontainer.appendChild(cardclone);
 //   window.addEventListener("click",loadUrl(article.url));
    });
}
function fillData(cardclone,article){
    const newsLogo = cardclone.querySelector("#news-logo");
    const newsTitle = cardclone.querySelector("#news-content-title");
    const newsDesc = cardclone.querySelector("#news-content-description");
    const newsSource = cardclone.querySelector("#news-content-source");
    newsLogo.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.
        publishedAt);
        const newDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    newsSource.innerHTML = `${article.source.name} : ${newDate}`;
     cardclone.firstElementChild.addEventListener("click", ()=>{
       window.open(article.url,"blank");
     });
    }


let curSelectedNav = null;
function fetchNewsNode(query){
    fetchNews(query);
    const navItem = document.getElementById(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

 const newsSearch = document.getElementById("btn");
 const newsInput = document.getElementById("seach-input");

 newsSearch.addEventListener("click", ()=> {
    const inputquery = newsInput.value;
    if(!inputquery) return;
    fetchNews(inputquery);
    if(curSelectedNav) curSelectedNav.classList.remove('active');
    newsInput = "";
 })

 function reload(){
    window.location.reload();
 }