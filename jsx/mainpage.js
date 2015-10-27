var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;
var Navbar = require('react-bootstrap').Navbar;
var NavBrand = require('react-bootstrap').NavBrand;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var _ = require('lodash');
var $ = require('jquery');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

const MainPage = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <Navbar>
            <NavBrand><a href="#">GymPal</a></NavBrand>
            <Nav>
              <ul>
                <li><Link to={'/'}>Main</Link></li>
              </ul>
              <ul>
                <li><Link to={'/routinelist'}>Routines</Link></li>
              </ul>
            </Nav>
          </Navbar>
          <RoutineForm />
        </div>
      </div>
    );
  }
});

const RoutineForm = React.createClass({
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
          <div className="col-md-4 col-md-offset-1">
            <h1>GymPal - Your fitness companion!</h1>
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
            &nbsp;
            <div className="row">
              <Button bsStyle="primary" bsSize="large" type="submit">Save routine</Button>
            </div>
          </div>
        </div>
      </form>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var data = this.state;
    data.exerciseList = JSON.stringify(this.state.exerciseList);
    $.ajax({
      url: '/routines',
      dataType: 'json',
      type: 'POST',
      data: data,
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

const RoutineInfo = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="name">Routine name</label>&nbsp;
            <input id="name" value={this.props.name} required="required" type="text" onChange={this.props.nameChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="toughness">Toughness (0-100)</label>&nbsp;
            <input id="toughness" value={this.props.toughness} type="number" min="0" max="100" onChange={this.props.toughnessChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>&nbsp;
            <input id="duration" value={this.props.duration} type="number" min="0" max="1000" onChange={this.props.durationChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional info</label>&nbsp;
            <textarea id="additionalInfo" className="form-control" value={this.props.additionalInfo} placeholder="More information about routine" rows="3" onChange={this.props.additionalInfoChangeHandler}></textarea>
          </div>
        </div>
      </div>
    );
  }
});

const Exercises = React.createClass({
  render: function() {
    var exerciseList = this.props.exerciseList;
    var exerciseNameChangeHandler = this.props.exerciseNameChangeHandler;
    var exerciseRepetitionsChangeHandler = this.props.exerciseRepetitionsChangeHandler;
    var exerciseAdditionalInfoChangeHandler = this.props.exerciseAdditionalInfoChangeHandler;
    var removeExerciseHandler = this.props.removeExerciseHandler;
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>Exercises</h3>
          <div className="row">
            <div className="col-md-12">
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

            </div>
          </div>
          <div className="row">
            &nbsp;
            <Button onClick={this.props.addExerciseHandler}>Add exercise</Button>
          </div>
        </div>
      </div>
    );
  }
});

const Exercise = React.createClass({
  render: function() {
    var exercise = this.props.exercise;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="exerciseName">Exercise name</label>&nbsp;
            <input id="exerciseName" value={exercise.name} required="required" type="text" onChange={this.props.exerciseNameChangeHandler.bind(null, exercise.id)} />
          </div>
          <div className="form-group">
            <label htmlFor="exerciseRepetitions">Repetitions</label>&nbsp;
            <input id="exerciseRepetitions" value={exercise.repetitions} required="required" type="number" onChange={this.props.exerciseRepetitionsChangeHandler.bind(null, exercise.id)} />
          </div>
          <div className="form-group">
            <label htmlFor="exerciseAdditionalInfo">Additional info</label>&nbsp;
            <input id="exerciseAdditionalInfo" value={exercise.additionalInfo} type="text" onChange={this.props.exerciseAdditionalInfoChangeHandler.bind(null, exercise.id)} />
          </div>
          &nbsp;
          <div className="row">
            <Button bsStyle="danger" onClick={this.props.removeExerciseHandler.bind(null, exercise.id)}>Remove exercise</Button>
          </div>
          &nbsp;
        </div>
      </div>
    );
  }
});

const RoutineList = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <Navbar>
            <NavBrand><a href="#">GymPal</a></NavBrand>
            <Nav>
              <ul>
                <li><Link to={'/'}>Main</Link></li>
              </ul>
              <ul>
                <li><Link to={'/routinelist'}>Routines</Link></li>
              </ul>
            </Nav>
          </Navbar>
          <Routines />
        </div>
      </div>
    );
  }
});

const Routines = React.createClass({
  getInitialState: function() {
    return {
      data: ""
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: '/routines',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/routines', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var routines = this.state.data.routines;
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h2>Routines</h2>
          <div className="row">
            <div className="col-md-12">
              {_.map(routines, function(routine) {
                return (
                  <Routine
                    key = {routine.id}
                    routine = {routine}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const Routine = React.createClass({
  render: function() {
    var routine = this.props.routine;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="row"><b>Name: </b>{routine.name}</div>
          <div className="row"><b>Duration: </b>{routine.duration}</div>
          <div className="row"><b>Toughness: </b>{routine.toughness}</div>
          <div className="row"><b>Additional info: </b>{routine.additionalInfo}</div>
          <ExerciseList
            routine={routine}
          />
          &nbsp;
        </div>
      </div>
    );
  }
});

const ExerciseList = React.createClass({
  render: function() {
    var routine = this.props.routine;
    if (_.isEmpty(routine.exercises)) {
      return (null);
    } else {
      return (
        <div className="row">
          <div className="col-md-6">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Repetitions</th>
                  <th>Additional info</th>
                </tr>
              </thead>
              <tbody>
                {_.map(routine.exercises, function(exercise) {
                  return (
                    <tr key={exercise.id}>
                      <td>{exercise.name}</td>
                      <td>{exercise.repetitions}</td>
                      <td>{exercise.additionalInfo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={MainPage}/>
    <Route path="/routinelist" component={RoutineList}/>
  </Router>
), document.getElementById('container'))
