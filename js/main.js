window.addEventListener("load", Init);
var countryLang = "ua";
function Init() {
	let url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
	let category = ["sport", "science", "health", "entertainment", "technology"];
	let urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=rivne&lang=ua&units=metric&APPID=d7370c4f4680389e97fe267bbac3955e";
	Request(url, GetCurrency);
	for (i=0;i<category.length; i++){
		NewsRequest(countryLang, category[i], GetNews);
	}
	WeatherRequest(urlWeather, GetWeather);
}
$("input[type=button]").on("click",function (){
		countryLang=$(this).val();
		var $sportNews = $("#sport").children();
		var $scienceNews = $("#science").children();
		var $healthNews = $("#health").children();
		var $entertainmentNews = $("#entertainment").children();
		var $technologyNews = $("#technology").children();
		var $currency = $("#currency").children();
		var $weather = $("#weather").children();
		$sportNews.each(function (i,elem){
			$(this).remove();
		});
		$scienceNews.each(function (i,elem){
			$(this).remove();
		});
		$healthNews.each(function (i,elem){
			$(this).remove();
		});
		$entertainmentNews.each(function (i,elem){
			$(this).remove();
		});
		$technologyNews.each(function (i,elem){
			$(this).remove();
		});
		$currency.each(function (i,elem){
			$(this).remove();
		});
		$weather.each(function (i,elem){
			$(this).remove();
		});
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
			//console.log(errStatus + ": " + errText);
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
			//console.log(errStatus + ": " + errText);
		}
		else {
			var data = JSON.parse(xhr.responseText);
			callback(data);
    		}
  	};
}
function WeatherRequest(urlWeather, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", urlWeather, true);
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
	}
}
function GetNews(category, data) {
	//console.log(data.articles);
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
function GetWeather(data) {
	let weather = document.querySelector("#weather");
	let h3=document.createElement("h3");
	h3.className = "weather";
	h3.innerHTML = data.name;
	weather.appendChild(h3);
	let temp = document.createElement("div");
	temp.className = "weather";
	temp.innerHTML = "Поточна температура:  " + data.main.temp + "  " + "&deg" + "C" + "<br />" + "Максимальна температура:  " + data.main.temp_max + "  " + "&deg" + "C" + "<br />" + "Мінімальна температура:  " + data.main.temp_min + "  " + "&deg" + "C";
	weather.appendChild(temp);
	let clouds = document.createElement("div");
	clouds.className = "weather";
	clouds.innerHTML = "Хмарність: " + data.weather[0].description;
	weather.appendChild(clouds);
}