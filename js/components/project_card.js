var React = require('react')
var PropTypes = React.PropTypes
var _ = require('lodash')

var ProjectCard = React.createClass({

  propTypes: {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    description: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
  },

  render: function() {
    var actions, description = null

    if (this.props.links) {
      actions = (
        <div className='card-action'>
          {_.map(this.props.links, function(link) {
            return (
              <a key={link.href} href={link.href}>{link.text}</a>
            )
          })}
        </div>
      )
    }

    if (this.props.description) {
      description = (
        <div className="card-reveal">
          <span className="card-title">{this.props.title}<i className="material-icons right">close</i></span>
          <p>{this.props.description}</p>
        </div>
      )
    }

    return (
      <section className='card medium' style={{
          width: '350px',
          marginLeft: '15px',
          margineRight: '15px',
        }}>
        <div className="card-image waves-effect waves-block">
          <img className="activator" src={this.props.image}/>
          <span className="card-title activator">{this.props.title}</span>
        </div>
        <div className='card-content'>
          <span>{this.props.content}</span>
        </div>
        {description}
        {actions}
      </section>
    )
  }
})

module.exports = ProjectCard
