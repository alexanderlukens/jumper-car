import React from 'react';

const LeaderboardEntry = (props) => {
  return (
    <tr>
      <td>{props.rank}</td>
      <td>{props.username}</td>
      <td>{props.score}</td>
    </tr>
  )
}


export default LeaderboardEntry
