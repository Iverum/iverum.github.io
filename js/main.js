var React = require('react');
var ReactDOM = require('react-dom');
var ProjectCard = require('./components/project_card')

ReactDOM.render(
  (
    <div className='row'>
      <div className='col s12 m6'>
        <ProjectCard/>
      </div>
    </div>
  ),
  document.getElementById('content')
);
