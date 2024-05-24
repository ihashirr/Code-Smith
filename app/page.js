import Image from "next/image";
import React from "react";
import cm from "./images/computer.jpg";
import cm1 from "./images/computer.jpg";
export default function Home() {
	return (
		<main className>
			<section className="text-gray-700 body-font">
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Unleash Efficiency with CodeSmith
						</h1>
						<p className="mb-8 leading-relaxed">Where efficiency, beats unpracticality.</p>
						<div className="flex justify-center">
							<button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Start now</button>

						</div>
					</div>
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
						<Image src={cm} alt="computer" width={600} height={780} />
					</div>
				</div>
			</section>
			<section className="text-gray-700 body-font border-t border-gray-200">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">What CodeSmith do</h1>
					</div>
					<div className="flex flex-wrap -m-4">
						<div className="p-4 md:w-1/3">
							<div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
								<div className="flex items-center mb-3">

									<h2 className="text-gray-900 text-lg title-font font-medium">Data management</h2>
								</div>
								<div className="flex-grow">
									<p className="leading-relaxed text-base">A central database where data will be stored and managed by us.</p>

								</div>
							</div>
						</div>
						<div className="p-4 md:w-1/3">
							<div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
								<div className="flex items-center mb-3">

									<h2 className="text-gray-900 text-lg title-font font-medium">Report generator</h2>
								</div>
								<div className="flex-grow">
									<p className="leading-relaxed text-base">Choose what data to include in the report to filter certain data and.</p>

								</div>
							</div>
						</div>
						<div className="p-4 md:w-1/3">
							<div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
								<div className="flex items-center mb-3">

									<h2 className="text-gray-900 text-lg title-font font-medium">Time efficiency</h2>
								</div>
								<div className="flex-grow">
									<p className="leading-relaxed text-base">Say goodbye to hours of stressful data management, and welcome to fast and time saving data management.</p>

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="text-gray-700 body-font border-t border-gray-200">
				<div className="container px-5 py-24 mx-auto flex flex-wrap">
					<div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
						<Image src={cm1} alt="computer2" width={600} height={600} />
					</div>
					<div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
						<div className="flex flex-col mb-10 lg:items-start items-center">
							<div className="flex-grow">
								<h2 className="text-gray-900 text-lg title-font font-medium mb-3">Data management</h2>
								<p className="leading-relaxed text-base">Keeping your data safe with us is our top priority. As the saying goes, security is number one priority.</p>

							</div>
						</div>
						<div className="flex flex-col mb-10 lg:items-start items-center">

							<div className="flex-grow">
								<h2 className="text-gray-900 text-lg title-font font-medium mb-3">Report generator</h2>
								<p className="leading-relaxed text-base">Have a clearer understanding of your data with a report generator to monitor it more efficiently.</p>

							</div>
						</div>
						<div className="flex flex-col mb-10 lg:items-start items-center">

							<div className="flex-grow">
								<h2 className="text-gray-900 text-lg title-font font-medium mb-3">Time efficiency</h2>
								<p className="leading-relaxed text-base">Time is crucial. Time is valuable. Time is always on the move just as the data management is.</p>

							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="text-gray-700 body-font border-t border-gray-200">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-20">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">Our hard working team ensures that your data is safe and managed accordingly.</p>
					</div>
					<div className="flex flex-wrap -m-2">
						<div className="p-2 lg:w-1/3 md:w-1/2 w-full">
							<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
								<img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
								</img>
								<div className="flex-grow">
									<h2 className="text-gray-900 title-font font-medium">Malik Hashir</h2>
									<p className="text-gray-500">Backend engineer</p>
								</div>
							</div>
						</div>
						<div className="p-2 lg:w-1/3 md:w-1/2 w-full">
							<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
								<img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84/edf2f7/a5afbd">
								</img>
								<div className="flex-grow">
									<h2 className="text-gray-900 title-font font-medium">Michael Zoorob</h2>
									<p className="text-gray-500">Frontend designer</p>
								</div>
							</div>
						</div>
						<div className="p-2 lg:w-1/3 md:w-1/2 w-full">
							<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
								<img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/88x88/edf2f7/a5afbd">
								</img>
								<div className="flex-grow">
									<h2 className="text-gray-900 title-font font-medium">Mohammad Ayaan</h2>
									<p className="text-gray-500">Designer</p>
								</div>
							</div>
						</div>
						<div className="p-2 lg:w-1/3 md:w-1/2 w-full">
							<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
								<img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/90x90/edf2f7/a5afbd">
								</img>
								<div className="flex-grow">
									<h2 className="text-gray-900 title-font font-medium">Waleed Zahid</h2>
									<p className="text-gray-500">Frontend designer</p>
								</div>
							</div>
						</div>
						<div className="p-2 lg:w-1/3 md:w-1/2 w-full">
							<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
								<img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/94x94/edf2f7/a5afbd">
								</img>
								<div className="flex-grow">
									<h2 className="text-gray-900 title-font font-medium">Sohail</h2>
									<p className="text-gray-500">Marketing and frontend designer</p>
								</div>
							</div>
						</div>
						<div className="p-2 lg:w-1/3 md:w-1/2 w-full">
							<div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
								<img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/98x98/edf2f7/a5afbd">
								</img>
								<div className="flex-grow">
									<h2 className="text-gray-900 title-font font-medium">Peter James</h2>
									<p className="text-gray-500">Marketing and documentation</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="text-gray-700 body-font border-t border-gray-200">
				<div className="container px-5 py-24 mx-auto">
					<div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
							<path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
						</svg>
						<p className="leading-relaxed text-lg">As the world is constantly evovling at a rapid pace, new times start to roll in. In those new times came CodeSmith. At CodeSmith, we understand challenges that businesses and companies are experiencing in managing their data. That is why CodeSmith is here. A user-friendly platform that allows you have your data and content managed, to return you a generative report, a suite of tools to use. Premium service from CodeSmith serves you even further into having a fantastic experience. Now the time can be saved, less stress to deal with, and efficiency beats unpracticality.</p>
						<span className="inline-block h-1 w-10 rounded bg-gray-500 mt-8 mb-6"></span>
						<h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">Michael Zoorob</h2>
						<p className="text-gray-500">Frontend designer</p>
					</div>
				</div>
			</section>
 
 
			<footer className="text-gray-700 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">


						<div className="lg:w-1/6 md:w-1/2 w-full px-4">
							<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CodeSmith</h2>
							<nav className="list-none mb-10">
								<li>
									<a className="text-gray-600 hover:text-gray-800">Powered and created by CodeSmith - Data management system</a>
								</li>
							</nav>
						</div>
						<div className="lg:w-1/6 md:w-1/2 w-full px-4">
							<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">More</h2>
							<nav className="list-none mb-10">
								<li>
									<a className="text-gray-600 hover:text-gray-800">Licsenses</a>
								</li>
								<li>
									<a className="text-gray-600 hover:text-gray-800">FAQ's</a>
								</li>
								<li>
									<a className="text-gray-600 hover:text-gray-800">Privacy and policy</a>
								</li>

							</nav>
						</div>
						<div className="lg:w-1/6 md:w-1/2 w-full px-4">
							<h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Contact</h2>
							<nav className="list-none mb-10">
								<li>
									<a className="text-gray-600 hover:text-gray-800">M.P Al Ghws street, Abu Dhabi, 1234</a>
								</li>
								<li>
									<a className="text-gray-600 hover:text-gray-800">+971 02 123 4567</a>
								</li>
							</nav>
						</div>

					</div>
				</div>


				<div className="container px-5 py-8 flex flex-wrap mx-auto items-center">

					<span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
						<a className="text-gray-500" href="https://www.facebook.com/share/6G5JPmkKhwtWZokb/?mibextid=kFxxJD">
							<svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
								<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
							</svg>
						</a>

						<a className="ml-3 text-gray-500" href="https://www.instagram.com/codesmith2024?igsh=c3J6aDJxbTMxbW1r&utm_source=qr">
							<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
								<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
								<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
							</svg>
						</a>

					</span>
				</div>

				<div className="bg-gray-200">
					<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
						<p className="text-gray-500 text-sm text-center sm:text-left">© 2024 CodeSmith —
							<a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@codesmith</a>
						</p>
					</div>
				</div>
			</footer>

		</main>
	);
}