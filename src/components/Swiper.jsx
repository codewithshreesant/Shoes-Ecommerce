import { Navigation, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Swipers = () => {
  return (
    <Swiper
      // Install Swiper modules
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className='w-[90vw] font-bold text-[1rem] text-blue-600'
    >
      <SwiperSlide>Running Shoes</SwiperSlide>
      <SwiperSlide>Training Shoes</SwiperSlide>
      <SwiperSlide>Casual Shoes</SwiperSlide>
      <SwiperSlide>Skateboarding  Shoes</SwiperSlide>
      <SwiperSlide>Athletic Shoes</SwiperSlide>
      <SwiperSlide>Dress Shoes</SwiperSlide>
      <SwiperSlide>Boots</SwiperSlide>
      <SwiperSlide>Canvas Shoes</SwiperSlide>
      {/* ... */}
    </Swiper>
  );
};

export default Swipers;