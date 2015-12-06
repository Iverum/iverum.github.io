var React = require('react');
var ReactDOM = require('react-dom');
var Projects = require('./components/projects')

ReactDOM.render(
  (
    <div className='row'>
      <div className='col s12 m12'>
        <Projects />
      </div>
    </div>
  ),
  document.getElementById('content')
);
