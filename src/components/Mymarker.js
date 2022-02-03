import React from "react";

const MyMarker = ({ text, tooltip, $hover }) => {
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };

  return (
    <div className={$hover ? "circle hover" : "circle"} onClick={handleClick}>
      <span className="circleText" title={tooltip}>
        {1}
      </span>
    </div>
  );
};

export default MyMarker;
