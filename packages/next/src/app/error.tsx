"use client";

import Image from "next/image";

export default function GlobalError() {
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
