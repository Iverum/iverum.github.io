var React = require('react');
var ReactDOM = require('react-dom');

var ProjectCard = React.createClass({
  render: function() {
    return <h1>Hello, world!</h1>
  }
})

ReactDOM.render(
  <ProjectCard/>,
  document.getElementById('content')
);
