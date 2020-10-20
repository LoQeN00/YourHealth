//a tutaj dane odbierasz

const getData = async () => {
    const data = await fetch('https://yourhealth-hackheroes.herokuapp.com/chartData',{
     method:"GET",
     headers : new Headers({
        'Content-Type':'application/json'
     })
    })

    const dataJSON = await data.json()

    return dataJSON
}

const makeBarChart = (ctx, labels, data, label) => {

    const stepChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    categoryPercentage: 7,
                    barPercentage: .1
                }]
            },
            maintainAspectRatio: false,
            tooltips: {
                caretSize: 20,
                mode: 'index',
                intersect: false,
                displayColors: false
            },
            legend: {
                display: true,
                onClick: (e, legendItem) => {
                    return
                },
                labels: {
                    boxWidth: 0
                }
            }
        }
    })
    
}

const makeCharts = async () => {
    const data = await getData()
    const stepDataCtx = document.getElementById('step__chart')
    makeBarChart(stepDataCtx, data.date_arr, data.steps_arr, 'Twoje ostatnie 24h aktywności')
}



makeCharts()










