var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var _ = require('lodash');
var $ = require('jquery');

var MainPage = React.createClass({

  render: function() {
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
      <form onSubmit={this.handleSubmit}>
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
              removeExerciseHandler = {this.removeExercise}
            />
            <SaveButton />
          </div>
        </div>
      </form>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();

    $.ajax({
      url: '/routines',
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function(data) {
        this.setState(this.getInitialState);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/routines', status, err.toString());
      }.bind(this)
    });

  },
  addExercise: function(e) {
    var exercise = {name: "", additionalInfo: "", repetitions: "", id: this.state.nextExerciseId};
    var exerciseList = this.state.exerciseList;
    exerciseList.push(exercise);
    this.setState({exerciseList: exerciseList});
    var newId = this.state.nextExerciseId + 1;
    this.setState({nextExerciseId: newId})
  },
  removeExercise: function(exerciseId, event) {
    var exerciseList = _.filter(this.state.exerciseList, function(exercise) {
      return exercise.id != exerciseId;
    });
    this.setState({exerciseList: exerciseList});
  },
  handleExerciseNameChange: function(exerciseId, event) {
    var exerciseList = _.map(this.state.exerciseList, function(exercise) {
      if (exercise.id == exerciseId) {
        return (
          _.assign(exercise, {'name': event.target.value})
        );
      } else return exercise;
    });
    this.setState({exerciseList: exerciseList});
  },
  handleExerciseRepetitionsChange: function(exerciseId, event) {
    var exerciseList = _.map(this.state.exerciseList, function(exercise) {
      if (exercise.id == exerciseId) {
        return (
          _.assign(exercise, {'repetitions': event.target.value})
        );
      } else return exercise;
    });
    this.setState({exerciseList: exerciseList});
  },
  handleExerciseAdditionalInfoChange: function(exerciseId, event) {
    var exerciseList = _.map(this.state.exerciseList, function(exercise) {
      if (exercise.id == exerciseId) {
        return (
          _.assign(exercise, {'additionalInfo': event.target.value})
        );
      } else return exercise;
    });
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
    if (duration >= 0 && duration <= 1000) {
      this.setState({duration: duration});
    }
  },
  handleToughnessChange: function(event) {
    var toughness = event.target.value;
    if (toughness >= 0 && toughness <= 100) {
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
            <input id="name" value={this.props.name} required="required" type="text" onChange={this.props.nameChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="toughness">Toughness (0-100)</label>&nbsp;
            <input id="toughness" value={this.props.toughness} type="number" min="0" max="100" onChange={this.props.toughnessChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="duration">Duration (minutes)</label>&nbsp;
            <input id="duration" value={this.props.duration} type="number" min="0" max="1000" onChange={this.props.durationChangeHandler} />
          </div>
          <div className="row">
            <label htmlFor="additionalInfo">Additional info</label>&nbsp;
            <textarea id="additionalInfo" value={this.props.additionalInfo} placeholder="More information about routine" rows="4" cols="80" onChange={this.props.additionalInfoChangeHandler}></textarea>
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
    var removeExerciseHandler = this.props.removeExerciseHandler;
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
                    removeExerciseHandler = {removeExerciseHandler}
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
            <input id="exerciseName" value={exercise.name} required="required" type="text" onChange={this.props.exerciseNameChangeHandler.bind(null, exercise.id)} />
          </div>
          <div className="row">
            <label htmlFor="exerciseRepetitions">Repetitions</label>&nbsp;
            <input id="exerciseRepetitions" value={exercise.repetitions} required="required" type="number" onChange={this.props.exerciseRepetitionsChangeHandler.bind(null, exercise.id)} />
          </div>
          <div className="row">
            <label htmlFor="exerciseAdditionalInfo">Additional info</label>&nbsp;
            <input id="exerciseAdditionalInfo" value={exercise.additionalInfo} type="text" onChange={this.props.exerciseAdditionalInfoChangeHandler.bind(null, exercise.id)} />
          </div>
          &nbsp;
          <div className="row">
            <Button onClick={this.props.removeExerciseHandler.bind(null, exercise.id)}>Remove exercise</Button>
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
          <Button type="submit">Save routine</Button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainPage />,
  document.getElementById('container')
);
