var React = require('react')
var PropTypes = React.PropTypes
var ProjectCard = require('./project_card')

var Projects = React.createClass({

  render: function() {
    return (
      <section style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <ProjectCard
          title="Card Title 1"
          content="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
          image="http://placehold.it/350x150"
        />
        <ProjectCard
          title="Card Title 2"
          content="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
          image="http://placehold.it/350x150"
        />
        <ProjectCard
          title="Card Title 3"
          content="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
          image="http://placehold.it/350x150"
        />
        <ProjectCard
          title="Card Title 4"
          content="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
          image="http://placehold.it/350x150"
        />
        <ProjectCard
          title="Card Title 5"
          content="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
          image="http://placehold.it/350x150"
        />
      </section>
    )
  }

})

module.exports = Projects
