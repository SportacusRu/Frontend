import { useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
}

export default function useSize() : Size {
    const [windowSize, setWindowSize] = useState({ height: 0, width: 0});
  
    useEffect(() => {
      const handleResize =() => setWindowSize({ 
        width: window.innerWidth, height: window.innerHeight 
      });

      window.addEventListener("resize", handleResize);
      handleResize();
      
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowSize;
}