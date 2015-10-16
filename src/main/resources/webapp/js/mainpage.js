var MainPage = React.createClass({displayName: "MainPage",
  render: function() {
    return (
      React.createElement("div", {className: "mainpage"}, 
        "This is Gympal."
      )
    );
  }
});
ReactDOM.render(
  React.createElement(MainPage, null),
  document.getElementById('container')
);
