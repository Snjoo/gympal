var MainPage = React.createClass({displayName: "MainPage",

  render: function() {
    var title = '<h3>GymPal</h3>';
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "large-2 medium-3 columns"}, 
          React.createElement("h5", null, "Navigation"), 
          React.createElement("nav", null, 
            React.createElement("ul", {className: "side-nav"}, 
              React.createElement("li", null, "test")
            )
          )
        ), 
        React.createElement("div", {className: "large-10 medium-9 columns"}, 
          React.createElement("h1", null, "GymPal - Your fitness companion!"), 
          React.createElement(RoutineForm, null)
        )
      )
    );
  }
});

var RoutineForm = React.createClass({displayName: "RoutineForm",
  getInitialState: function() {
    return {
      name: "",
      additionalInfo: "",
      duration: "",
      toughness: "",
      exerciseList: ""
    };
  },

  render: function() {
    return(
      React.createElement("form", null, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "large-12 medium-12 columns"}, 
            React.createElement(RoutineInfo, {
              nameChangeHandler: this.handleNameChange, 
              additionalInfoChangeHandler: this.handleAdditionalInfoChange, 
              durationChangeHandler: this.handleDurationChange, 
              toughnessChangeHandler: this.handleToughnessChange}
              ), 
            React.createElement(Exercises, null)
          )
        )
      )
    );
  },
  handleNameChange: function(event) {
    this.setState({name: event.target.value});
  },
  handleAdditionalInfoChange: function(event) {
    this.setState({additionalInfo: event.target.value});
  },
  handleDurationChange: function(event) {
    this.setState({duration: event.target.value});
  },
  handleToughnessChange: function(event) {
    this.setState({toughness: event.target.value});
  },
});

var RoutineInfo = React.createClass({displayName: "RoutineInfo",
  render: function() {
    return(
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "large-12 medium-12 columns"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("label", {htmlFor: "name"}, "Routine name"), " ", 
            React.createElement("input", {id: "name", type: "text", onChange: this.props.nameChangeHandler})
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("label", {htmlFor: "toughness"}, "Toughness (0-100)"), " ", 
            React.createElement("input", {id: "toughness", type: "number", min: "0", max: "100", onChange: this.props.toughnessChangeHandler})
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("label", {htmlFor: "duration"}, "Duration (minutes)"), " ", 
            React.createElement("input", {id: "duration", type: "number", min: "0", max: "1000", onChange: this.props.durationChangeHandler})
          ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("label", {htmlFor: "additionalInfo"}, "Additional info"), " ", 
            React.createElement("textarea", {id: "additionalInfo", placeholder: "More information about routine", rows: "4", cols: "80", onChange: this.props.additionalInfoChangeHandler})
          )
        )
      )
    );
  }
});

var Exercises = React.createClass({displayName: "Exercises",
  render: function() {
    return(
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "large-12 medium-12 columns"}, 
          React.createElement("h3", null, "Exercises")
        )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(MainPage, null),
  document.getElementById('container')
);
