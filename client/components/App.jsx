import React from 'react';
import $ from 'jquery'
import Car from './Car.jsx';
import Roadblock from './Roadblock.jsx';
import Score from './Score.jsx';
import Username from './Username.jsx';
import Leaderboard from './Leaderboard.jsx';
import axios from 'axios'
import _ from 'underscore'


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      started: false,
      timeIntervals: [],
      boardClasses: 'board',
      score: 0,
      username: '',
      topPlayers: []
    };
  }

  jump() {
    $( ".car" ).animate({top:'50%'}, 300, () => {
      $( ".car" ).animate({top:'89%'}, 400)
    });
  }

  start() {
    let startCollisionAndScoringWatcher = () => {
      this.state.timeIntervals.push(setInterval(this.collisionAndScoring.bind(this),100))
    }
    setTimeout(startCollisionAndScoringWatcher, 4000)

    if (this.state.started === false){
      this.setState({
        started: true,
        boardClasses: 'board',
        score: 0
      }, () => {
        let i = 1;
        while (i < 4) {
          this.state.timeIntervals.push(this.setRoadBlockRunners(i));
          i++
        }
      })
    }
  }

  collisionAndScoring() {
    let carPosition = $('.car').position()
    let carX = carPosition.left
    let carY = carPosition.top
    $('.roadblock').each((i, rb) => {
      let rbX = $(rb).position().left
      let rbY = $(rb).position().top
      if (Math.abs(carX - rbX) < 30 && Math.abs(carY - rbY) < 30) {
        this.end()
        return
      }
      //if no collisin check for scoring
      if ((carX - rbX) > 0 && $(rb).attr("class") !== 'roadblock scored') {
        this.setState({
          score: this.state.score + 1
        })
        $(rb).attr("class","roadblock scored");
        return
      }
    });
  }

  end() {
    this.state.timeIntervals.forEach((id) => {
      clearInterval(id);
    })
    //want to envoke the lose banner immediately, thus moved this out of set state in the promise from the get request
    this.setState({
      boardClasses: 'board loser',
    })
    axios.post('/scores', {
      username: this.state.username,
      score: this.state.score
    })
    .then(() => {
      axios.get('/scores')
      .then((data) => {
        this.setState({
          started: false,
          timeIntervals: [],
          topPlayers: data.data
        })
      })
    })
  }

  setRoadBlockRunners(num) {
    let timeInterval = Math.floor(Math.random() * 10000) + 4000
    return setInterval(() => {
      this.moveRoadBlock(num)
    }, timeInterval)
  }

  moveRoadBlock(num) {
    $( `#roadblock${num}`).animate({left:'-15%'}, 4000, () => {
      $(`#roadblock${num}`).attr("class","roadblock");
      $( `#roadblock${num}`).animate({left:'100%'}, 0)
    })
  }

  componentDidMount() {
      let username = prompt('Please Enter a Username');
      axios.get('/scores')
      .then((data) => {
        console.log(data)
        this.setState({
          username: username,
          topPlayers: data.data
        }, () => {
        })
      })
    }

  render() {
    return (
      <div className='container'>
        <div className="topbar">
          <button onClick={this.start.bind(this)} className="start">Start Game</button>
          <Score score={this.state.score}/>
          <Username user={this.state.username}/>
        </div>
        <div className={this.state.boardClasses}>
          <Roadblock num={1}/>
          <Roadblock num={2}/>
          <Roadblock num={3}/>
          <Car/>
        </div>
        <Leaderboard topPlayers={this.state.topPlayers}/>
        <button className='jump' onClick={_.throttle(this.jump.bind(this), 700)}>JUMP</button>
      </div>
    )

  }
}

// refactor Roadblock to be more intelligent and use a loop

export default App
