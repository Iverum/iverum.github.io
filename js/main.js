var React = require('react');
var ReactDOM = require('react-dom');
var Projects = require('./components/projects')

var projects = require('../data/projects')

ReactDOM.render(
  (
    <Projects anchor='projects' projects={projects} />
  ),
  document.getElementById('content')
);
