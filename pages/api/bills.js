export default async function handler(req, res) {
	let bills = [];
	if (req.method === 'POST') {
	  const { accountNumber, amount, dueDate, description } = req.body;
  
	  if (!accountNumber || !amount || !dueDate || !description) {
		return res.status(400).json({ message: 'Missing required fields.' });
	  }
  
	  if (typeof amount !== 'number') {
		return res.status(400).json({ message: 'Invalid amount. Please enter a number.' });
	  }
  
	  try {
		// Use an in-memory array for demonstration (replace with database access in production)
		bills = []; // Initialize an empty array
		bills.push({ accountNumber, amount, dueDate, description });
  
		console.log('Added bill:', { accountNumber, amount, dueDate, description });
  
		res.status(200).json({ message: 'Bill saved successfully!' });
	  } catch (error) {
		console.error('Error saving bill:', error);
		return res.status(500).json({ message: 'An error occurred.' });
	  }
	} else if (req.method === 'GET') {
	  // For demonstration, return the in-memory bills array
	  res.status(200).json(bills);
	  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

	} else {
	  res.status(405).end(); // Allow only POST and GET requests
	}
  }
  