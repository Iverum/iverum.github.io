var React = require('react');

var ProjectCard = React.createClass({
  render: function() {
    return (
      <section className='card'>
        <div className='card-content'>
          <h1 className='card-title'>Title</h1>
          <span>Snippet of text or blurb</span>
        </div>
      </section>
    )
  }
})

module.exports = ProjectCard
