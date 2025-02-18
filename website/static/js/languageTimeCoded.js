document.addEventListener('DOMContentLoaded', () => {
    const chartDom = document.getElementById('bar-chart-container');
    if (!chartDom) {
        console.error('Chart container not found');
        return;
    }

    let myChart = null;

    async function fetchCodingActivity() {
        try {
            const response = await fetch('https://wakatime.com/share/@AISHIK999/2fd9bad8-8f09-4c43-a047-f032bbbba3eb.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();

            // Sort data by hours (descending) and take the top 10
            const sortedData = jsonData.data
                .sort((a, b) => parseFloat(b.decimal) - parseFloat(a.decimal))
                .slice(0, 10);

            const languages = sortedData.map(item => item.name);
            const hours = sortedData.map(item => parseFloat(item.decimal));
            const colors = sortedData.map(item => item.color); // Extract colors from JSON

            // Initialize chart only once
            if (!myChart) {
                myChart = echarts.init(chartDom);
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        return `${params[0].name}<br/>
                               Coding time: ${params[0].value.toFixed(2)} hours`;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: languages,
                    axisLabel: {
                        rotate: 45,
                        interval: 0
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
                    data: hours.map((hour, index) => ({
                        value: hour,
                        itemStyle: {
                            color: colors[index] // Use the color from the JSON data
                        }
                    })),
                    type: 'bar',
                    emphasis: {
                        // itemStyle: {
                        //     color: primaryColor
                        // },
                        itemStyle: {
                            color: colors[index => colors[index]] // Highlight color on hover
                        }
                    }
                }],
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '20%',
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