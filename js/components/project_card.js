var React = require('react')
var PropTypes = React.PropTypes

var ProjectCard = React.createClass({

  propTypes: {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <section className='card'>
        <div className="card-image">
          <img src={this.props.image}/>
          <span className="card-title">{this.props.title}</span>
        </div>
        <div className='card-content'>
          <span>{this.props.content}</span>
        </div>
      </section>
    )
  }
})

module.exports = ProjectCard
