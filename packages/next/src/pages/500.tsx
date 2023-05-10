import React from "react";
import Image from "next/image";
export default function Custom500() {
 return (
  <div
   style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
   <Image
    src="/images/error-image.jpg"
    alt="ErrorImage"
    width={800}
    height={600}
   />
  </div>
 );
}
