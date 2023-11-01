import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SliderOptionsProps {
    month: string;
    isActive: boolean;
    index: number;
}

const SliderOption = ({ month, isActive, index }: SliderOptionsProps) => {
    const swiper = useSwiper();
    return (
        <button
            onClick={() => swiper.slideTo(index)}
            className={cn(
                "w-full rounded-full h-12 text-sm tracking-[-0.5px] text-gray-800 font-medium",
                isActive && "bg-white"
            )}
        >
            {month}
        </button>
    );
};

export default SliderOption;
