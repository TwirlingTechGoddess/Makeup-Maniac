import React from 'react';

const Home = (fetchData) => {
  return (
    <div>
      <h2>Enjoy the most organized and comprehensive lists of the world's premiere MakeUp brands</h2>
      <button onSubmit={() => fetchData()}>PRESS TO EXPLORE</button>
    </div>
  )
}

export default Home