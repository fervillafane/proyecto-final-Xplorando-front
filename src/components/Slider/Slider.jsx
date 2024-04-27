import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sliderStyles from './Slider.module.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { producto } from '../../components/data'; 

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    // Encuentra el índice del producto correspondiente al id del producto
    const index = producto.findIndex((item) => item.id.toString() === id);
    if (index !== -1) {
      setCurrentImage(index);
    }
  }, [id]);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % totalSlides);
  };
  
  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + totalSlides) % totalSlides);
  };

  const totalSlides = 5; // Update this according to the total number of slides

  return (
    <div className={sliderStyles.container}>
      <div className={`${sliderStyles.arrow} ${sliderStyles.left}`} onClick={handlePrev}>
      <SlArrowLeft />
      </div>
      <div className={`${sliderStyles.slide} ${sliderStyles[`slide${currentImage + 1}`]}`}>
        <div className={sliderStyles.caption}>
        <h3>{producto[currentImage].name}</h3>
          <p>{producto[currentImage].description}</p>
        </div>
      </div>
      {/* Render other slides similarly */}
      <div className={`${sliderStyles.arrow} ${sliderStyles.right}`} onClick={handleNext}>
      <SlArrowRight />
      </div>
    </div>
  );
};

export default Slider;
