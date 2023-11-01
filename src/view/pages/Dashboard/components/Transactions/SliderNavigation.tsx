import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

const SliderNavigation = () => {
    const swiper = useSwiper();
    return (
        <>
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center  z-10 bg-gradient-to-r from-gray-100 to-transparent"
                onClick={() => swiper.slidePrev()}
            >
                <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
            </button>

            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center  z-10  bg-gradient-to-l  from-gray-100 to-transparent">
                <ChevronRightIcon
                    className="h-6 w-6 text-gray-800"
                    onClick={() => swiper.slideNext()}
                />
            </button>
        </>
    );
};

export default SliderNavigation;
