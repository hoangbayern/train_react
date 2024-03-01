import React, { useRef, useState } from 'react'
import { Button } from '@mui/material';

export default function Test1() {
  const countRef = useRef(0);
  const obj = {
    current:0
  }
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    countRef.current = countRef.current + 1;
    obj.current += 1;
  };

  console.log({
    count, countRef, obj
  });

  return (
    <div>
      <h1>Learn ref</h1>
      <Button onClick={handleClick}>
           Click
      </Button>
    </div>
  )
}
