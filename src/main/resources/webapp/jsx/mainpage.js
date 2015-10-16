var MainPage = React.createClass({

  render: function() {
    var title = '<h3>GymPal</h3>';
    return (
      <div className="row">
        <div className="large-3 medium-4 columns">
          <h5>Navigation</h5>
          <nav>
            <ul className="side-nav">
              <li>test</li>
            </ul>
          </nav>
        </div>
        <div className="large-9 medium-8 columns">
          <h1>GymPal - Your fitness companion!</h1>
        </div>
      </div>
    );
  }
});
ReactDOM.render(
  <MainPage />,
  document.getElementById('container')
);
