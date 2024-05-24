"use client"
import React from "react";
import "../styling/upload.css";
import Link from "next/link";
export default function App() {
  return (
    <div>      
      <div className="border1"></div>
      <div className="header">
        <h1 className="title">Start Today!</h1>
        <p className="p">
          Keep track of all data with lorem ipsum text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text text text text text text text text text
        </p>
	<Link href="/upload/new/">
        <button className="starttoday">Create New</button>
	</Link>
      </div>

      <div className="border"></div>

      <div className="what3">
        <section className="what2">
          <div className="lines">
            <div className="darkline"></div>
            <div className="mediumline"></div>
            <div className="brightline"></div>
            <h1 className="what">What would you like to do?</h1>
          </div>
        </section>
      </div>

      <div className="border2"></div>

      <div className="what-container">
        <section className="buttons">
          <div className="button-layout">
            <button type="button" className="button">
              Open existing file
            </button>
            <button type="button" className="button">
              Start New
            </button>
            <button type="button" className="button">
              Test
            </button>
          </div>
        </section>

        <section className="cols">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </section>
      </div>

      <div className="border3"></div>

      <h1 className="recent">Recent Work</h1>

      <div className="what-container">
        <section className="cols">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </section>
      </div>

<div className="border4"></div>

      <div className="footer"></div>
      <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4 className="logo-text">CodeSmith</h4>
                <p className="f-paragraph">
                  Lorem ipsum text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text
                </p>
              </div>
              

              <div className="col-md-2">
                <h5 className="title-sm">More</h5>
                <div className="footer">
                  <p className="#">Licsenses</p>
                  <p className="#">FAQ's</p>
                  <p className="#">Privacy & Policy </p>
                </div>
              </div>


              <div className="col-md-2">
                <h5 className="title-sm">Contact</h5>
                <div className="footer">
                  <p className="mb">SB Al G Street, Abu Dhabi, 2413</p>
                  <p className="mb">+971 02 123 4567</p>
                  <p className="mb">codesmith@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="lower-footer">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-6">
                <p className="mb">© CS agency 2023. All rights reserved</p>
              </div>
              <div className="col-auto">
                <p className="mb">Created by CodeSmith</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// function App() {
//   const [column1, setColumn1] = React.useState('');
//   const [column2, setColumn2] = React.useState('');
//   const [column3, setColumn3] = React.useState('');

//   const handleSubmit = async (e) => {
// 	e.preventDefault();
  
// 	console.log('column1:', column1);
// 	console.log('column2:', column2);
// 	console.log('column3:', column3);
  
// 	try {
// 	  const response = await fetch('/api/upload', {
// 		method: 'POST',
// 		headers: {
// 		  'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({ column1, column2, column3 }),
// 	  });
  
// 	  console.log('Response:', response);
  
// 	  if (response.ok) {
// 		return response.json();
// 	  } else {
// 		// Handle error...
// 	  }
// 	} catch (error) {
// 	  console.error('Error:', error);
// 	}
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="column1" placeholder="Enter column1 data" value={column1} onChange={e => setColumn1(e.target.value)} />
//         <input type="text" name="column2" placeholder="Enter column2 data" value={column2} onChange={e => setColumn2(e.target.value)} />
//         <input type="text" name="column3" placeholder="Enter column3 data" value={column3} onChange={e => setColumn3(e.target.value)} />
//         <button type="submit">Create New</button>
//       </form>
//     </div>
//   );
// }

// export default App;