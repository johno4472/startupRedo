import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Create } from './create/create';
import { Review } from './review/review';
import { Report } from './report/report';
import { About } from './about/about';


export default function App() {
    return (
    <BrowserRouter>
    <div className='app bg-dark text-light'>
        <header className="light-red-bg" id="header">
      <nav className="header-top">
        <h1 className="web-title">ConsistAndSee</h1>
        <div id="username" className="username"></div>        
      </nav>

      <nav>
        <menu className="main-menu">
          <li><NavLink className="light-red-bg" to="/">Home</NavLink></li>
          <li><NavLink className="light-red-bg" to="report">Report</NavLink></li>
          <li><NavLink className="light-red-bg" to="create">Create</NavLink></li>
          <li><NavLink className="light-red-bg" to="review">Review</NavLink></li>
          <li><NavLink className="light-red-bg" to="about">About</NavLink></li>
        </menu>
      </nav>

    </header>

    <header className="make-pretty"></header>

    <Routes>
    <Route path='/' element={<Login />} exact />
    <Route path='/create' element={<Create />} />
    <Route path='/report' element={<Report />} />
    <Route path='/about' element={<About />} />
    <Route path='/review' element={<Review />}/>
    <Route path='*' element={<NotFound />} />
    </Routes>

    <footer>
      <hr />
      <span>Author Name: John Olson</span>
      <br />
      <NavLink to="https://github.com/johno4472/startupRedo">GitHub</NavLink>
    </footer>
    </div>
    </BrowserRouter>
    );
};

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>
        404 Return to Sender. Address unknown
    </main>
}