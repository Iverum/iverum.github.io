var React = require('react')
var PropTypes = React.PropTypes
var _ = require('lodash')

var ProjectCard = React.createClass({

  propTypes: {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
  },

  render: function() {
    var actions = this.props.links ?
      (
        <div className='card-action'>
          {_.map(this.props.links, function(link) {
            return (
              <a key={link.href} href={link.href}>{link.text}</a>
            )
          })}
        </div>
      )
      : null

    return (
      <section className='card' style={{
          width: '350px',
          marginLeft: '15px',
          margineRight: '15px',
        }}>
        <div className="card-image">
          <img src={this.props.image}/>
          <span className="card-title">{this.props.title}</span>
        </div>
        <div className='card-content'>
          <span>{this.props.content}</span>
        </div>
        {actions}
      </section>
    )
  }
})

module.exports = ProjectCard
