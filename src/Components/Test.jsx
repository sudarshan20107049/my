import React, { useEffect, useState } from 'react';

const Test = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Your ${count}`;
  }, []);
  return (
    <div>
      <button onClick={() => setCount + 1}>Click</button>
    </div>
  );
};

export default Test;
