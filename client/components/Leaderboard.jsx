import React from 'react';
import LeaderboardEntry from './LeaderboardEntry.jsx'

const Leaderboard = (props) => {
  const entrys = props.topPlayers.map((entry, i) => {
    return (<LeaderboardEntry username={entry.username} score={entry.score} rank={i + 1} key={i}/>)
  })
  return (
    <div className='leaderboard'>
      <table className="table">
        <caption>Leaderboard</caption>
        <tbody>
          <tr  className="header">
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
          {entrys}
        </tbody>
      </table>
    </div>
  )
}
export default Leaderboard
