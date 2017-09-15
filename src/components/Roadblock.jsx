import React from 'react';

const Roadblock = (props) => {
  let id = 'roadblock' + props.num
  return <div id={id} className='roadblock'></div>
}

export default Roadblock;
