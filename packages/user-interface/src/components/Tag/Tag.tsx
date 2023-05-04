import React from "react";
import "./index.scss";
interface TagProps {
 name: string;
 color: string;
}

export function Tag({ name, color }: TagProps) {
 return (
  <div className="tag" style={{ backgroundColor: color }}>
   {name}
  </div>
 );
}
