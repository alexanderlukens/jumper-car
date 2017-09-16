import React from 'react';
import $ from 'jquery'
import Car from './Car.jsx';
import Roadblock from './Roadblock.jsx';
import Score from './Score.jsx';
import Username from './Username.jsx';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      started: false,
      timeIntervals: [],
      boardClasses: 'board',
      score: 0,
      username: ''
    };
  }

  jump() {
    $( ".car" ).animate({top:'60%'}, 300, () => {
      $( ".car" ).animate({top:'89%'}, 400)
    });
  }

  start() {
    if (this.state.started === false){
      this.setState({
        started: true,
        boardClasses: 'board'
      }, () => {
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
    let carPosition = $('.car').position()
    let carX = carPosition.left
    let carY = carPosition.top
    $('.roadblock').each((i, rb) => {
      let rbX = $(rb).position().left
      let rbY = $(rb).position().top
      if (Math.abs(carX - rbX) < 30 && Math.abs(carY - rbY) < 30) {
        this.end()
      }
    });
  }

  end() {
    this.state.timeIntervals.forEach((id) => {
      clearInterval(id);
    })
    this.setState({
      started: false,
      timeIntervals: [],
      boardClasses: 'board loser'
    })
  }

  setRoadBlockRunners(num) {
    let timeInterval = Math.floor(Math.random() * 10000) + 4000
    return setInterval(() => {
      this.moveRoadBlock(num)
    }, timeInterval)
  }

  moveRoadBlock(num) {
    $( `#roadblock${num}`).animate({left:'-10%'}, 4000, () => {
      $( `#roadblock${num}`).animate({left:'110%'}, 0)
    })
  }

  componentDidMount() {
      setInterval(this.collision.bind(this),100)
      let username = prompt('Please Enter a Username');
      this.setState({username: username})
    }

  render() {
    return (
      <div className='container'>
      <button onClick={this.start.bind(this)}>Start Game</button>
      <Score score={this.state.score}/>
      <Username user={this.state.username}/>
      <div className={this.state.boardClasses}>
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
