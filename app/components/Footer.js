export default function Footer() {
	return (
	  <footer  >
		<div className="container mx-auto flex flex-wrap items-center justify-between">
		  <h1 className="font-bold text-2xl">My App</h1>
		  <ul className="flex items-center space-x-4">
			<li><a href="#" className="hover:text-gray-300">About</a></li>
			<li><a href="#" className="hover:text-gray-300">Services</a></li>
			<li><a href="#" className="hover:text-gray-300">Contact</a></li>
		  </ul>
		  <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
		</div>
	  </footer>
	);
  }