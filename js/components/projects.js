var React = require('react')
var PropTypes = React.PropTypes
var _ = require('lodash')
var ProjectCard = require('./project_card')

var Projects = React.createClass({

  propTypes: {
    projects: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      blurb: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      }))
    })).isRequired,
  },

  render: function() {
    var projects = _.map(this.props.projects, function(project) {
      return (
        <ProjectCard
          key={project.title}
          title={project.title}
          content={project.blurb}
          image={project.image}
          links={project.links}
        />
      )
    })
    return (
      <section style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {projects}
      </section>
    )
  }

})

module.exports = Projects
