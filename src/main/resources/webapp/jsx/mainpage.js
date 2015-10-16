var MainPage = React.createClass({
  render: function() {
    return (
      <div className="mainpage">
        This is Gympal.
      </div>
    );
  }
});
ReactDOM.render(
  <MainPage />,
  document.getElementById('container')
);
