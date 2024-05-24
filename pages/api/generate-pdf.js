// pages/api/generate-pdf.js
// import { renderToStream } from '@react-pdf/renderer';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//   },
// });

// const PdfDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View>
//         <Text>Hello, this is a PDF document!</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default async function handler(req, res) {
// 	try {
// 	  const stream = await renderToStream(<PdfDocument />);
// 	  res.setHeader('Content-Type', 'application/pdf');
// 	  res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
// 	  stream.pipe(res);
// 	} catch (error) {
// 	  console.error('Error generating PDF:', error);
// 	  res.status(500).send('Error generating PDF');
// 	}
//   }
// pages/api/generate-pdf.js
// import { renderToStream } from '@react-pdf/renderer';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//   },
// });

// const PdfDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View>
//         <Text>Hello, this is a PDF document!</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default async function handler(req, res) {
//   try {
// 		  const stream = await renderToStream(<PdfDocument />);
// 		  res.setHeader('Content-Type', 'application/pdf');
// 		  res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
// 		  stream.pipe(res);
// 		} catch (error) {
// 		  console.error('Error generating PDF:', error);
// 		  res.status(500).send('Error generating PDF');
// 		}
// }
import { renderToStream } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as xlsx from 'xlsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

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
		marginBottom: 10,
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
	},
});

const PdfDocument = (formData) => (
	<Document>
	  <Page size="A4" style={styles.page}>
		<View>
		  <Text style={styles.heading}>Bath Spa University Bill</Text>
		  <View style={styles.field}>
			<Text style={styles.label}>Student Name:</Text>
			<Text style={styles.value}>{formData.studentName}</Text>
		  </View>
		  <View style={styles.field}>
			<Text style={styles.label}>Intake:</Text>
			<Text style={styles.value}>{formData.intake}</Text>
		  </View>
		  {formData.monthlyFees && (
			<View style={styles.table}>
			  <View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>Month</Text>
				<Text style={[styles.tableCell, { flex: 1 }]}>Fee</Text>
			  </View>
			  {formData.monthlyFees.map((month, index) => (
				<View key={index} style={styles.tableRow}>
				  <Text style={[styles.tableCell, { flex: 1 }]}>{month.name || `Month ${index + 1}`}</Text>
				  <Text style={[styles.tableCell, { flex: 1 }]}>£{month.fee}</Text>
				</View>
			  ))}
			</View>
		  )}
  
		  {formData.otherFields && (
			<View style={styles.table}>
			  <View style={styles.tableRow}>
				<Text style={[styles.tableCell, { flex: 1 }]}>Type</Text>
				<Text style={[styles.tableCell, { flex: 1 }]}>Value</Text>
			  </View>
			  {formData.otherFields.map((field, index) => (
				<View key={index} style={styles.tableRow}>
				  <Text style={[styles.tableCell, { flex: 1 }]}>{field.type}</Text>
				  <Text style={[styles.tableCell, { flex: 1 }]}>{field.value}</Text>
				</View>
			  ))}
			</View>
		  )}
		</View>
	  </Page>
	</Document>
  );

const generateExcelFile = (formData) => {
	let data = [];

	if (formData.monthlyFees) {
		data = formData.monthlyFees.map(({ name, fee }) => ({
			Type: name,
			Value: fee,
		}));
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
const generateCsvFile = (formData) => {
	let data = [];

	if (formData.monthlyFees) {
		data = formData.monthlyFees.map(({ name, fee }) => [name, fee]);
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

		if (fileType === 'pdf') {
			const stream = await renderToStream(<PdfDocument {...formData} />);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `attachment; filename=${formData.fileName || 'document'}.pdf`);
			stream.pipe(res);
		} else if (fileType === 'xlsx') {
			const excelFile = generateExcelFile(formData);
			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			res.setHeader('Content-Disposition', `attachment; filename=${formData.fileName || 'document'}.xlsx`);
			res.send(excelFile);
		} else if (fileType === 'csv') {
			const csvFile = generateCsvFile(formData);
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