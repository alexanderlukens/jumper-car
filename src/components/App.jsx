import React from 'react';
import $ from 'jquery'
import Car from './Car.jsx';
import Roadblock from './Roadblock.jsx';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      started: false,
      timeIntervals: []
    };
  }

  jump() {
    $( ".car" ).animate({top:'60%'}, 300, () => {
      $( ".car" ).animate({top:'89%'}, 400)
    });
  }

  start() {
    if (this.state.started === false){
      this.setState({started: true}, () => {
        this.moveRoadBlock(1)
        let i = 1;
        while (i < 4) {
          this.state.timeIntervals.push(this.setRoadBlockRunners(i));
          i++
        }
      })
    }
  }

  collision() {
    console.log($('.car').position())
  }

  end() {
    this.state.timeIntervals.forEach((id) => {
      clearInterval(id);
    })
    this.setState({
      started: true,
      timeIntervals: []
    })
  }

  setRoadBlockRunners(num) {
    let timeInterval = Math.floor(Math.random() * 10000) + 4000
    return setInterval(() => {
      this.moveRoadBlock(num)
    }, timeInterval)
  }

  moveRoadBlock(num) {
    $( `#roadblock${num}` ).animate({left:'-10%'}, 4000, () => {
      $( `#roadblock${num}`).animate({left:'110%'}, 0)
    })
  }


  render() {
    return (
      <div className='container'>
      <button onClick={this.start.bind(this)}>Start Game</button>
        <div className="board">
          <Roadblock num={1}/>
          <Roadblock num={2}/>
          <Roadblock num={3}/>
          <Car/>
        </div>
        <button onClick={this.jump}>JUMP</button>
      </div>
    )

  }
}

// refactor Roadblock to be more intelligent and use a loop

export default App
