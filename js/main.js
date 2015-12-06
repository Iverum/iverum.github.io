var React = require('react');
var ReactDOM = require('react-dom');
var ProjectCard = require('./components/project_card')

ReactDOM.render(
  (
    <div className='row'>
      <div className='col s12 m4'>
        <ProjectCard
          title="Card Title"
          content="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
          image="http://placehold.it/350x150"
        />
      </div>
    </div>
  ),
  document.getElementById('content')
);
