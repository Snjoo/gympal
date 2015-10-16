var MainPage = React.createClass({displayName: "MainPage",

  render: function() {
    var title = '<h3>GymPal</h3>';
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "large-3 medium-4 columns"}, 
          React.createElement("h5", null, "Navigation"), 
          React.createElement("nav", null, 
            React.createElement("ul", {className: "side-nav"}, 
              React.createElement("li", null, "test")
            )
          )
        ), 
        React.createElement("div", {className: "large-9 medium-8 columns"}, 
          React.createElement("h1", null, "GymPal - Your fitness companion!")
        )
      )
    );
  }
});
ReactDOM.render(
  React.createElement(MainPage, null),
  document.getElementById('container')
);
