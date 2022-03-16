import React, { useState } from "react";

export default function BlockList() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockList, setBlockList] = useState([]);

  return <h1>blocked list</h1>;
}
