function callAPI() {
	let stockName = document.getElementById("inputStock").value

	let stockDates = [];
	let stockPrices = [];

	const API_Key = '60Q2KGI6HWMPFI8G'; //my own free key from Alpha Vantage
	let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&apikey=${API_Key}`;
	//the API http is from documentation: https://www.alphavantage.co/documentation/
	//to find the symbol of a company, search on google: 'company's name' stock symbol (ex: TESLA stock symbol)
	//stock symbol ex: TSLA, AMZN, FB, AAPL, DAX, IBM, etc...
	
	fetch(API_Call)
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
		for (var key in data['Time Series (Daily)']) {
			stockDates.push(key);
			stockPrices.push(data['Time Series (Daily)'][key]['1. open']);
		}
		console.log(stockDates);
		console.log(stockPrices);
		drawGraph(stockDates, stockPrices);
	});
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
	console.log(lineChart);
}
