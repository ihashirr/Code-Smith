export default async function handler(req, res) {
	// Handle upload logic here (e.g., using multer library)
	if (req.method === 'POST') {
	  // Your logic to handle the uploaded file
	  res.status(200).json({ message: 'Upload successful!' });
	} else {
	  res.status(405).json({ message: 'Method not allowed' }); // Handle non-POST requests
	}

}
