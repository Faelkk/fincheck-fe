import { EyeIcon } from "../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import AccountCard from "./AccountCard";
import "swiper/css";
import Navigation from "./Navigation";

const Accounts = () => {
    return (
        <div className="bg-teal-900 rounded-2xl h-full w-full  px-4 py-8 md:p-10 flex flex-col">
            <div>
                <span className="text-white tracking-[-0.5px block">
                    Saldo Total
                </span>

                <div className="flex gap-3">
                    <strong className="text-2xl tracking-[-1px] text-white">
                        R$ 1000,00
                    </strong>
                    <button className="w-8 h-8 flex items-center justify-center">
                        <EyeIcon open={true} />
                    </button>
                </div>
            </div>

            <div className=" flex-1 flex  flex-col justify-end">
                <div>
                    <Swiper spaceBetween={16} slidesPerView={2.1}>
                        <div
                            className="flex items-center justify-between w-full mb-4"
                            slot="container-start"
                        >
                            <strong className="text-white tracking-[-1px] text-lg">
                                Minhas contas
                            </strong>
                            <Navigation />
                        </div>

                        <SwiperSlide>
                            <AccountCard
                                balance={1000.23}
                                color="#7950F2"
                                name="Nubank"
                                type="INVESTMENT"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard
                                balance={1000.23}
                                color="#7950F2"
                                name="Carteira"
                                type="CASH"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard
                                balance={1000.23}
                                color="#7950F2"
                                name="Carteira"
                                type="CASH"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
