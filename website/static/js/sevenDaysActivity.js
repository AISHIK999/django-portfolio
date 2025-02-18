document.addEventListener('DOMContentLoaded', () => {
    const chartDom = document.getElementById('line-chart-container');
    if (!chartDom) {
        console.error('Chart container not found');
        return;
    }

    let myChart = null;

    function getCSSVariableValue(variableName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();
    }

    async function fetchCodingActivity() {
        try {
            const response = await fetch('https://wakatime.com/share/@AISHIK999/ea25fb4c-4149-493a-9d57-874045ae2a63.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();

            const dates = jsonData.data.map(item => item.range.text);
            const hours = jsonData.data.map(item => parseFloat(item.grand_total.decimal));

            // Initialize chart only once
            if (!myChart) {
                myChart = echarts.init(chartDom);
            }

            const primaryColor = getCSSVariableValue('--color-primary');
            const secondaryColor = getCSSVariableValue('--color-secondary');
            const highlightColor = getCSSVariableValue('--color-highlight');

            const option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        return `${params[0].name}<br/>
                               Coding time: ${params[0].value.toFixed(2)} hours`;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: dates.map(date => date.split(' ')[0].split('-').reverse().join('.')),
                    axisLabel: {
                        rotate: 45,
                        interval: 'auto'
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Hours',
                    min: 0,
                    axisLabel: {
                        formatter: '{value} hrs'
                    }
                },
                series: [{
                    data: hours,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3
                    },
                    symbolSize: 8,
                    itemStyle: {
                        color: primaryColor
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: secondaryColor
                            },
                            {
                                offset: 1,
                                color: highlightColor
                            }
                        ])
                    }
                }],
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '15%',
                    containLabel: true
                }
            };
            myChart.setOption(option);
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    }

    // Handle window resize
    const resizeHandler = () => {
        if (myChart) {
            myChart.resize();
        }
    };
    window.addEventListener('resize', resizeHandler);

    // Initial fetch
    fetchCodingActivity();

    // Clean up on page unload
    window.addEventListener('unload', () => {
        window.removeEventListener('resize', resizeHandler);
        if (myChart) {
            myChart.dispose();
        }
    });
});