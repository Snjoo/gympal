var MainPage = React.createClass({

  render: function() {
    var title = '<h3>GymPal</h3>';
    return (
      <div className="row">
        <div className="large-2 medium-3 columns">
          <h5>Navigation</h5>
          <nav>
            <ul className="side-nav">
              <li>test</li>
            </ul>
          </nav>
        </div>
        <div className="large-10 medium-9 columns">
          <h1>GymPal - Your fitness companion!</h1>
          <RoutineForm />
        </div>
      </div>
    );
  }
});

var RoutineForm = React.createClass({
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
      <form>
        <div className="row">
          <div className="large-12 medium-12 columns">
            <RoutineInfo
              nameChangeHandler = {this.handleNameChange}
              additionalInfoChangeHandler = {this.handleAdditionalInfoChange}
              durationChangeHandler = {this.handleDurationChange}
              toughnessChangeHandler = {this.handleToughnessChange}
              />
            <Exercises />
          </div>
        </div>
      </form>
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

var RoutineInfo = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="large-12 medium-12 columns">
          <div className="row">
            <label htmlFor="name">Routine name</label>&nbsp;
            <input id="name" type="text" onChange={this.props.nameChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="toughness">Toughness (0-100)</label>&nbsp;
            <input id="toughness" type="number" min="0" max="100" onChange={this.props.toughnessChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="duration">Duration (minutes)</label>&nbsp;
            <input id="duration" type="number" min="0" max="1000" onChange={this.props.durationChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="additionalInfo">Additional info</label>&nbsp;
            <textarea id="additionalInfo" placeholder="More information about routine" rows="4" cols="80" onChange={this.props.additionalInfoChangeHandler}></textarea>
          </div>
        </div>
      </div>
    );
  }
});

var Exercises = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="large-12 medium-12 columns">
          <h3>Exercises</h3>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainPage />,
  document.getElementById('container')
);
