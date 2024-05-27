const jsreport = require('jsreport-core')();
const mysql = require('mysql2/promise');

async function generateReport() {
    // Set up a connection to your MySQL database
    const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'ihashirr',
		password: 'Iamhashir@42',
		database: 'codesmith'
    });

    // Query the session table
    const [rows] = await connection.execute('SELECT * FROM my_sessions');

    // Use jsreport to create a PDF report
    jsreport.init().then(() => {
        return jsreport.render({
            template: {
                content: `
                    <h1>Session Table Report</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Session ID</th>
                                <th>Expires</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{#each rows}}
                                <tr>
                                    <td>{{this.session_id}}</td>
                                    <td>{{this.expires}}</td>
                                    <td>{{this.data}}</td>
                                </tr>
                            {{/each}}
                        </tbody>
                    </table>
                `,
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                rows: rows
            }
        });
    }).then((resp) => {
        // Write the PDF to a file
        require('fs').writeFileSync('Report.pdf', resp.content);
        console.log('Report has been generated.');
    }).catch((err) => {
        console.error(err);
    });
}

generateReport();