var React = require('react');
var ReactDOM = require('react-dom');
var Projects = require('./components/projects')

var projects = require('../data/projects')

ReactDOM.render(
  (
    <div className='row'>
      <div className='col s12 m12'>
        <Projects projects={projects} />
      </div>
    </div>
  ),
  document.getElementById('content')
);
