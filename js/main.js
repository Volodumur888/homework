window.addEventListener("load", Init);
var countryLang = "ua";
function Init() {
	let url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
	let category = ["sport", "science", "health", "entertainment", "technology", "business"];
	console.log("init");
	Request(url, GetCurrency);
	for (i=0;i<category.length; i++){
		NewsRequest(countryLang, category[i], GetNews);
	}
}
$("input[type=button]").on("click",function (){
		countryLang=$(this).val();
		Init();
	});
function NewsRequest(countryLang, category, callback) {
	var url = `https://newsapi.org/v2/top-headlines?country=${countryLang}&category=${category}&apiKey=38a60776992a40faa83f9d95a79a429a`;
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			var errStatus = xhr.status;
			var errText = xhr.statusText;
			console.log(errStatus + ": " + errText);
		}
		else {
			var data = JSON.parse(xhr.responseText);
			callback(category, data);
		}
	};
}
function Request(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			var errStatus = xhr.status;
			var errText = xhr.statusText;
			console.log(errStatus + ": " + errText);
		}
		else {
			var data = JSON.parse(xhr.responseText);
			callback(data);
    		}
  	};
}
function GetCurrency(data) {
	///console.log("GetCurrency: ", data);
	let currency = document.querySelector("#currency");
	for (let i = 0; i < data.length; i++) {
		let ccy = document.createElement("div");
		ccy.className = "ccy";
		ccy.innerHTML = data[i].ccy;
		currency.appendChild(ccy);
		let base_ccy = document.createElement("div");
		base_ccy.className = "base_ccy";
		base_ccy.innerHTML = data[i].base_ccy;
		currency.appendChild(base_ccy);
		let buy = document.createElement("div");
		buy.className = "buy";
		buy.innerHTML = data[i].buy;
		currency.appendChild(buy);
		let sale = document.createElement("div");
		sale.className = "sale";
		sale.innerHTML = data[i].sale;
		currency.appendChild(sale);
		//console.log(data[i].ccy, " ", data[i].base_ccy, " buy: ", data[i].buy, " sale: ", data[i].sale);
	}
}
function GetNews(category, data) {
	console.log(data.articles);
	var news = document.querySelector('#'+category);
	for (let i = 0; i < 5; i++) {
		let h3 = document.createElement("h3");
		h3.className = "newsTitle";
		h3.innerHTML = data.articles[i].title;
		news.appendChild(h3);
		let img = document.createElement("img");
		img.className = "newsImg";
		img.setAttribute("alt", "Image");
		img.setAttribute("src", data.articles[i].urlToImage);
		news.appendChild(img);
		let desc = document.createElement("div");
		desc.className = "newsArticle";
		desc.innerHTML = data.articles[i].description;
		news.appendChild(desc);
		let date = document.createElement("span");
		date.className = "newsPublishedAt";
		date.innerHTML = data.articles[i].publishedAt;
		news.appendChild(date);
		let author = document.createElement("span");
		author.className = "newsAuthor";
		author.innerHTML = data.articles[i].author;
		news.appendChild(author);
	}
}