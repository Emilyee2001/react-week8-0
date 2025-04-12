import { useEffect, useState } from "react";

export default function Slideshow({ images }) {

  const [index, setIndex] = useState(0);
  const renderImages = [...images.slice(0,2)];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % renderImages.length);
    }, 1100);
    return () => clearInterval(timer);
  }, [images.toString()]);


  return (<>
    <img src={renderImages[index]} alt={`slideshow-image-${index + 1}`} className="object-cover" />
  </>)
}