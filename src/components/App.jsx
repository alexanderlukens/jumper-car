import React from 'react';
import $ from 'jquery'
import Car from './Car.jsx';
import Roadblock from './Roadblock.jsx';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      started: false,
      roadblocks: 0
    };
  }

  jump() {
    $( ".car" ).animate({top:'60%'}, 500, () => {
      $( ".car" ).animate({top:'89%'}, 500)
    });
  }

  start() {
    this.setState({started: true}, () => {
      $( ".roadblock" ).animate({left:'-10%'}, 4000)
    })
  }


  render() {
    return (
      <div className='container'>
      <button onClick={this.start.bind(this)}>Start Game</button>
        <div className="board">
          <Roadblock num></Roadblock>
          <Car></Car>
        </div>
        <button onClick={this.jump}>JUMP</button>
      </div>
    )

  }
}



export default App
