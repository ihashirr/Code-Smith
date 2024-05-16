// script.js

// Sample data for reports (Replace with actual data)
let reportsData = [
    { id: 1, title: 'Report 1', category: 'Category A', date: '2024-05-01' },
    { id: 2, title: 'Report 2', category: 'Category B', date: '2024-05-02' },
    { id: 3, title: 'Report 3', category: 'Category C', date: '2024-05-03' },
    // Add more reports as needed
];

// Function to create a table row
function createTableRow(report) {
    return `
        <tr>
            <td>${report.id}</td>
            <td>${report.title}</td>
            <td>${report.category}</td>
            <td>${report.date}</td>
        </tr>
    `;
}

// Function to display reports
function displayReports() {
    const reportTable = document.getElementById('reportTable');
    reportTable.innerHTML = ''; // Clear previous content

    // Create table header
    const tableHeader = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id="reportBody">
                <!-- Table body will be dynamically generated here -->
            </tbody>
        </table>
    `;
    reportTable.innerHTML = tableHeader;

    const reportBody = document.getElementById('reportBody');

    // Populate table rows with reports data
    reportsData.forEach(report => {
        reportBody.innerHTML += createTableRow(report);
    });
}

// Call displayReports function to initially populate the table
displayReports();

// Function to sort reports by column
function sortReports(columnName) {
    reportsData.sort((a, b) => {
        const valueA = a[columnName];
        const valueB = b[columnName];
        return valueA.localeCompare(valueB);
    });
    displayReports();
}

// Event listeners for sorting
document.getElementById('reportTable').addEventListener('click', function(event) {
    if (event.target.tagName === 'TH') {
        const columnName = event.target.textContent.trim();
        sortReports(columnName.toLowerCase());
    }
});

// Function to export reports to PDF
document.getElementById('exportPDF').addEventListener('click', function() {
    // Implement PDF export functionality
});

// Function to export reports to CSV
document.getElementById('exportCSV').addEventListener('click', function() {
    // Implement CSV export functionality
});

// Function to handle form submission (search)
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredReports = reportsData.filter(report =>
        report.title.toLowerCase().includes(searchTerm) ||
        report.category.toLowerCase().includes(searchTerm) ||
        report.date.includes(searchTerm)
    );
    displayReports(filteredReports);
});
