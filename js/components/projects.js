var React = require('react')
var PropTypes = React.PropTypes
var _ = require('lodash')
var ProjectCard = require('./project_card')

var Projects = React.createClass({

  propTypes: {
    anchor: PropTypes.string.isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      blurb: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
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
          description={project.description}
        />
      )
    })
    return (
      <article id={this.props.anchor}>
        <nav className='teal'>
          <a style={{paddingLeft: '10px'}} href={'#'+this.props.anchor} className="brand-logo">Projects</a>
        </nav>
        <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {projects}
        </section>
      </article>
    )
  }

})

module.exports = Projects
