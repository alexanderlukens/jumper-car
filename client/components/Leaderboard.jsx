import React from 'react';
import LeaderboardEntry from './LeaderboardEntry.jsx'

const Leaderboard = (props) => {
  const entrys = props.top25.map((entry, i) => {
    return (<LeaderboardEntry username={entry.username} score={entry.score} rank={i + 1}/>)
  })
  return (
    <div>
      <h4>Leaderboard</h4>
      <table>
        <tbody>
          <tr>
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
