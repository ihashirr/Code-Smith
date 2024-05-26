import { renderToStream } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as xlsx from 'xlsx';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  field: {
    fontSize: 14,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  field1: {
    fontSize: 14,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flexGrow: 1,
    borderBottom: '1px solid #ccc',
    paddingBottom: 2,
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
});

const PdfDocument = ({ formData, totalPaidFees, totalUnpaidFees, remainingDue }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        {formData.monthlyFees ? (
          <>
            <Text style={styles.heading}>Bath Spa University Bill</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Student Name:</Text>
              <Text style={styles.value}>{formData.studentName}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Intake:</Text>
              <Text style={styles.value}>{formData.intake}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Course:</Text>
              <Text style={styles.value}>{formData.course}</Text>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Month</Text>
                <Text style={styles.tableCell}>Fee (AED)</Text>
                <Text style={styles.tableCell}>Status</Text>
              </View>
              {formData.monthlyFees.map((month, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{month.name || `Month ${index + 1}`}</Text>
                  <Text style={styles.tableCell}>{month.fee}</Text>
                  <Text style={styles.tableCell}>{month.status}</Text>
                </View>
              ))}
            </View>
            <View style={styles.field1}>
              <Text style={styles.label}>Yearly Fees:</Text>
              <Text style={styles.value}>AED {parseFloat(formData.yearlyAmount || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.field1}>
              <Text style={styles.label}>Total Paid Fees:</Text>
              <Text style={styles.value}>AED {totalPaidFees.toFixed(2)}</Text>
            </View>
            <View style={styles.field1}>
              <Text style={styles.label}>Remaining Due:</Text>
              <Text style={styles.value}>AED {remainingDue.toFixed(2)}</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.heading}>Other Data</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Type</Text>
                <Text style={styles.tableCell}>Value</Text>
              </View>
              {formData.otherFields.map((field, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{field.type}</Text>
                  <Text style={styles.tableCell}>{field.value}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </Page>
  </Document>
);

const generateExcelFile = (formData, totalPaidFees, remainingDue) => {
  let data = [];

  if (formData.monthlyFees) {
    data = formData.monthlyFees.map(({ name, fee, status }) => ({
      Month: name,
      Fee: fee,
      Status: status,
    }));
    data.push({ Month: 'Total Paid Fees', Fee: totalPaidFees.toFixed(2), Status: '' });
    data.push({ Month: 'Remaining Due', Fee: remainingDue.toFixed(2), Status: '' });
    data.push({ Month: 'Course', Fee: formData.course, Status: '' });
  }

  if (formData.otherFields) {
    data = data.concat(
      formData.otherFields.map(({ type, value }) => ({
        Type: type,
        Value: value,
      }))
    );
  }

  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
  return xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
};

const generateCsvFile = (formData, totalPaidFees, remainingDue) => {
  let data = [];

  if (formData.monthlyFees) {
    data = formData.monthlyFees.map(({ name, fee, status }) => [name, fee, status]);
    data.push(['Total Paid Fees', totalPaidFees.toFixed(2), '']);
    data.push(['Remaining Due', remainingDue.toFixed(2), '']);
    data.push(['Course', formData.course, '']);
  }

  if (formData.otherFields) {
    data = data.concat(
      formData.otherFields.map(({ type, value }) => [type, value])
    );
  }

  data.unshift(['Type', 'Value']);
  return data.map(row => row.join(',')).join('\n');
};

export default async function handler(req, res) {
  try {
    const formData = req.body;
    const fileType = formData.fileType;

    let totalPaidFees = 0;
    let totalUnpaidFees = 0;
    let remainingDue = 0;

    if (formData.monthlyFees) {
      totalPaidFees = formData.monthlyFees
        .filter(fee => fee.status === 'Paid')
        .reduce((total, fee) => total + parseFloat(fee.fee || 0), 0);
      totalUnpaidFees = formData.monthlyFees
        .filter(fee => fee.status === 'Unpaid')
        .reduce((total, fee) => total + parseFloat(fee.fee || 0), 0);
      remainingDue = parseFloat(formData.yearlyAmount || 0) - totalPaidFees;
    }

    if (fileType === 'pdf') {
      const stream = await renderToStream(
        <PdfDocument formData={formData} totalPaidFees={totalPaidFees} totalUnpaidFees={totalUnpaidFees} remainingDue={remainingDue} />
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${formData.fileName || 'document'}.pdf`);
      stream.pipe(res);
    } else if (fileType === 'xlsx') {
      const excelFile = generateExcelFile(formData, totalPaidFees, remainingDue);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${formData.fileName || 'document'}.xlsx`);
      res.send(excelFile);
    } else if (fileType === 'csv') {
      const csvFile = generateCsvFile(formData, totalPaidFees, remainingDue);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${formData.fileName || 'document'}.csv`);
      res.send(csvFile);
    } else {
      res.status(400).json({ error: 'Invalid file type' });
    }
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
