document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feeding-form');
    const feedingTable = document.getElementById('feeding-table');
    const feedingChart = document.getElementById('feeding-chart').getContext('2d');
    let feedings = JSON.parse(localStorage.getItem('feedings')) || [];

    const renderTable = () => {
        feedingTable.innerHTML = '';
        feedings.forEach(feeding => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="py-2 px-4 border-b border-gray-300">${new Date(feeding.time).toLocaleString()}</td><td class="py-2 px-4 border-b border-gray-300">${feeding.amount}</td>`;
            feedingTable.appendChild(row);
        });
    };

    const renderChart = () => {
        const labels = feedings.map(feeding => new Date(feeding.time).toLocaleTimeString());
        const data = feedings.map(feeding => feeding.amount);
        new Chart(feedingChart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Feeding Amount (ml)',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour'
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount (ml)'
                        }
                    }
                }
            }
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const time = document.getElementById('time').value;
        const amount = document.getElementById('amount').value;
        if (time && amount) {
            const feeding = { time, amount: parseInt(amount) };
            feedings.push(feeding);
            localStorage.setItem('feedings', JSON.stringify(feedings));
            renderTable();
            renderChart();
            form.reset();
        }
    });

    renderTable();
    renderChart();
});
