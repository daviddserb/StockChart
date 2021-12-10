//to install the node_modules folder, type in CMD, on the folder where you have the project: npm install britecharts d3-selection

function getStockName() {
	let stockName = document.getElementById("inputStock").value
	callAPI(stockName);
}

function callAPI(stockName) {
	let stockDates = [];
	let stockPrices = [];

	const API_Key = '60Q2KGI6HWMPFI8G'; //my own free key for Alpha Vantage
	let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&apikey=${API_Key}`;
	//API_Call is from documentation: https://www.alphavantage.co/documentation/
	//company's stock symbols: TSLA, AMZN, FB, AAPL, DAX, IBM, etc... (search on google: 'company's name' stock symbol)
	
	fetch(API_Call)
	.then(response => {
		return response.json();
	})
	.then(data => {
		for (var key in data['Time Series (Daily)']) {
			stockDates.push(key);
			stockPrices.push(data['Time Series (Daily)'][key]['1. open']);
		}

		drawGraph(stockDates, stockPrices);
	})
}

function drawGraph(stockDates, stockPrices) {
	const myChart = document.getElementById('myChart').getContext('2d');
	const lineChart = new Chart(myChart, {
	    type: 'line', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
	    data: {
	        labels: stockDates,
	        datasets: [{
	            label: 'price',
	            data: stockPrices,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    }
	});
}
