// Function to Render Class Average Chart for Teacher Dashboard
function renderClassAverageChart(studentAverages) {
    // Find the canvas where the chart will be rendered
    const ctx = document.getElementById('classAverageChart').getContext('2d');
    
    // Destroy any existing chart instances to avoid duplicates
    if (window.classAverageChartInstance) {
        window.classAverageChartInstance.destroy();
    }

    // Creating a new Chart.js instance for class average data
    window.classAverageChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: studentAverages.map(sa => sa.student),
            datasets: [{
                label: 'Average Grade',
                data: studentAverages.map(sa => sa.average),
                backgroundColor: 'rgba(37, 99, 235, 0.6)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Class Average Grades'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Function to Render Individual Student Performance Chart for Students
function renderStudentPerformanceChart(assignmentScores) {
    // Find the canvas where the chart will be rendered
    const ctx = document.getElementById('studentPerformanceChart').getContext('2d');
    
    // Destroy any existing chart instances to avoid duplicates
    if (window.studentPerformanceChartInstance) {
        window.studentPerformanceChartInstance.destroy();
    }

    // Creating a new Chart.js instance for student performance data
    window.studentPerformanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: assignmentScores.map(as => as.assignment),
            datasets: [{
                label: 'Assignment Score (%)',
                data: assignmentScores.map(as => as.score),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Student Performance Over Assignments'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Function to Render Exam Results Chart for Students
function renderExamResultsChart(examResults) {
    // Find the canvas where the chart will be rendered
    const ctx = document.getElementById('examResultsChart').getContext('2d');

    // Destroy any existing chart instances to avoid duplicates
    if (window.examResultsChartInstance) {
        window.examResultsChartInstance.destroy();
    }

    // Creating a new Chart.js instance for student exam results data
    window.examResultsChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: examResults.map(er => er.subject),
            datasets: [{
                label: 'Exam Scores',
                data: examResults.map(er => er.score),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
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
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Exam Results by Subject'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Function to Clear All Chart Instances
function clearAllCharts() {
    if (window.classAverageChartInstance) {
        window.classAverageChartInstance.destroy();
    }
    if (window.studentPerformanceChartInstance) {
        window.studentPerformanceChartInstance.destroy();
    }
    if (window.examResultsChartInstance) {
        window.examResultsChartInstance.destroy();
    }
}
