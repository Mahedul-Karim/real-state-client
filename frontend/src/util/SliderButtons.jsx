import { useSwiper } from "swiper/react";

const SliderButtons=function(){

    const swiper = useSwiper();

    return(
        <div className='flexCenter r-button btn'>
            <button onClick={()=>swiper.slidePrev()}>&lt;</button>
            <button onClick={()=>swiper.slideNext()}>&gt;</button>
        </div>
    )
}
export default SliderButtons;