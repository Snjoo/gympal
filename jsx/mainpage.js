var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var _ = require('lodash');
var UniqueIdMixin = require('unique-id-mixin');

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
      exerciseList: [{name: "", additionalInfo: "", repetitions: "", id: 1}],
      nextExerciseId: 2
    };
  },

  render: function() {
    return(
      <form>
        <div className="row">
          <div className="large-12 medium-12 columns">
            <RoutineInfo
              name={this.state.name}
              duration={this.state.duration}
              toughness={this.state.toughness}
              additionalInfo={this.state.additionalInfo}
              nameChangeHandler = {this.handleNameChange}
              additionalInfoChangeHandler = {this.handleAdditionalInfoChange}
              durationChangeHandler = {this.handleDurationChange}
              toughnessChangeHandler = {this.handleToughnessChange}
              />
            <Exercises
              exerciseList = {this.state.exerciseList}
              addExerciseHandler = {this.addExercise}
              exerciseNameChangeHandler = {this.handleExerciseNameChange}
              exerciseRepetitionsChangeHandler = {this.handleExerciseRepetitionsChange}
              exerciseAdditionalInfoChangeHandler = {this.handleExerciseAdditionalInfoChange}
            />
            <SaveButton />
          </div>
        </div>
      </form>
    );
  },
  addExercise: function(e) {
    var exercise = {name: "", additionalInfo: "", repetitions: "", id: this.state.nextExerciseId};
    var exerciseList = this.state.exerciseList;
    exerciseList.push(exercise);
    this.setState({exerciseList: exerciseList});
    var newId = this.state.nextExerciseId + 1;
    this.setState({nextExerciseId: newId})
  },
  handleExerciseNameChange: function(exerciseId, event) {
    debugger;
    this.setState({exerciseList: exerciseList});
  },
  handleExerciseRepetitionsChange: function(exerciseId, event) {
    this.setState({exerciseList: exerciseList});
  },
  handleExerciseAdditionalInfoChange: function(exerciseId, event) {
    this.setState({exerciseList: exerciseList});
  },
  handleNameChange: function(event) {
    this.setState({name: event.target.value});
  },
  handleAdditionalInfoChange: function(event) {
    this.setState({additionalInfo: event.target.value});
  },
  handleDurationChange: function(event) {
    var duration = event.target.value;
    if (0 <= duration <= 1000) {
      this.setState({duration: duration});
    }
  },
  handleToughnessChange: function(event) {
    var toughness = event.target.value;
    if (0 <= toughness <= 100) {
      this.setState({toughness: toughness});
    }
  },
});

var RoutineInfo = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="large-12 medium-12 columns">
          <div className="row">
            <label htmlFor="name">Routine name</label>&nbsp;
            <input id="name" defaultValue={this.props.name} type="text" onChange={this.props.nameChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="toughness">Toughness (0-100)</label>&nbsp;
            <input id="toughness" defaultValue={this.props.toughness} type="number" min="0" max="100" onChange={this.props.toughnessChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="duration">Duration (minutes)</label>&nbsp;
            <input id="duration" defaultValue={this.props.duration} type="number" min="0" max="1000" onChange={this.props.durationChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="additionalInfo">Additional info</label>&nbsp;
            <textarea id="additionalInfo" defaultValue={this.props.additionalInfo} placeholder="More information about routine" rows="4" cols="80" onChange={this.props.additionalInfoChangeHandler}></textarea>
          </div>
        </div>
      </div>
    );
  }
});

var Exercises = React.createClass({
  render: function() {
    var exerciseList = this.props.exerciseList;
    var exerciseNameChangeHandler = this.props.exerciseNameChangeHandler;
    var exerciseRepetitionsChangeHandler = this.props.exerciseRepetitionsChangeHandler;
    var exerciseAdditionalInfoChangeHandler = this.props.exerciseAdditionalInfoChangeHandler;
    return (
      <div className="row">
        <div className="large-12 medium-12 columns">
          <h3>Exercises</h3>
          <div className="row">
            <div className="large-12 medium-12 columns">
              {_.map(exerciseList, function(exercise) {
                return (
                  <Exercise
                    key = {exercise.id}
                    exercise = {exercise}
                    exerciseNameChangeHandler = {exerciseNameChangeHandler}
                    exerciseRepetitionsChangeHandler = {exerciseRepetitionsChangeHandler}
                    exerciseAdditionalInfoChangeHandler = {exerciseAdditionalInfoChangeHandler}
                  />
                );
              })}
              <div className="row">
                &nbsp;
                <Button onClick={this.props.addExerciseHandler}>Add exercise</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Exercise = React.createClass({
  render: function() {
    var exercise = this.props.exercise;
    return (
      <div className="row">
        <div className="large-12 medium-12 columns">
          <div className="row">
            <label htmlFor="exerciseName">Exercise name</label>&nbsp;
            <input id="exerciseName" defaultValue={exercise.name} type="text" onChange={this.props.exerciseNameChangeHandler.bind(null, exercise.id)} />
          </div>
          <div className="row">
            <label htmlFor="exerciseRepetitions">Repetitions</label>&nbsp;
            <input id="exerciseRepetitions" defaultValue={exercise.repetitions} type="number" onChange={this.props.exerciseRepetitionsChangeHandler.bind(null, exercise.id)} />
          </div>
          <div className="row">
            <label htmlFor="exerciseAdditionalInfo">Additional info</label>&nbsp;
            <input id="exerciseAdditionalInfo" defaultValue={exercise.additionalInfo} type="text" onChange={this.props.exerciseAdditionalInfoChangeHandler.bind(null, exercise.id)} />
          </div>
          &nbsp;
        </div>
      </div>
    );
  }
});

var SaveButton = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="large-12 medium-12 columns">
          <Button>Save routine</Button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainPage />,
  document.getElementById('container')
);
