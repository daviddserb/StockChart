function getStockName() {
	console.log("se intra in functia getStockName()");
	let stockName = document.getElementById("inputStock").value
	console.log("stockName= " + stockName);
	sendData(stockName);
}

function sendData(stockName) {
	console.log("se intra in functia callAPI(stockName)");
	console.log("stockName= " + stockName)

	let stockDates = [];
	let stockPrices = [];

	const API_Key = '60Q2KGI6HWMPFI8G'; //my own free key for Alpha Vantage
	let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&apikey=${API_Key}`;
	//API_Call is from documentation: https://www.alphavantage.co/documentation/
	//company's stock symbols: TSLA, AMZN, FB, AAPL,  DAX, IBM, etc... (search on google: 'company's name' stock symbol)
	
	fetch(API_Call)
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);

		console.log("se va intra in for->");
		for (var key in data['Time Series (Daily)']) {
			console.log("sunt in for:\n");
			stockDates.push(key);
			stockPrices.push(data['Time Series (Daily)'][key]['1. open']);
		}
		console.log("s-a iesit din for.");
		console.log(stockDates);
		console.log(stockPrices);

		drawGraph(stockDates, stockPrices);
	})
	console.log("SE TRECE DE .then(data)");
}

function drawGraph(stockDates, stockPrices) {
	// Instantiate bar chart and container
	const barChart = britecharts.bar();
	const container = d3.select('.bar-container');

	// Create Dataset with proper shape
	let barData = [];
	for (let i = 0; i < 10; ++i) { //stockDates.length
		barData[i] = {name: stockDates[i], value: stockPrices[i]};
	}
	console.log(barData);

	// Configure chart
	barChart
	    .margin({left: 100})
	    .height(800)
	    .width(1500);

	container.datum(barData).call(barChart);
}

/*
let string = "https://api.coingecko.com/api/v3/coins/" + currency1API +"/history?date="+indexDate+"&localization=false";
*/