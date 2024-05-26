// use client
import React from "react";
import "./page.css";

function App() {
  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      ></link>

<nav className="navbar">
        <ul className="nav-list">
          <li className="nav-prop">
            <a href="/">Home</a>
          </li>
          <li className="nav-prop">
            <a href="/about">Admin</a>
          </li>
          <li className="nav-prop">
            <a href="/contact">Team</a>
          </li>
          <li className="nav-prop">
            <a href="/contact">Client</a>
          </li>
        </ul>
      </nav>
      
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

        <button className="starttoday">Create New</button>
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
      <footer classNameName="footer">
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

export default App;
