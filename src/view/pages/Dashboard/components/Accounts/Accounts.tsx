import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";

import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { PlusIcon } from "@radix-ui/react-icons";

import AccountCard from "./AccountCard";
import "swiper/css";
import Spinner from "../../../../components/Spinner";
import useAccountsController from "./useAccountsController";
import SliderNavigation from "./SliderNavigation";

const Accounts = () => {
    const {
        currentBalance,
        accounts,
        isLoading,
        areValueVisible,
        windowWidth,
        sliderState,
        openNewAccountModal,
        setSliderState,
        toggleValuesVisiblity,
    } = useAccountsController();

    return (
        <div className="bg-teal-900 rounded-2xl h-full w-full  px-4 py-8 md:p-10 flex flex-col">
            {isLoading && (
                <div className="flex items-center justify-center h-full w-full">
                    <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
                </div>
            )}

            {!isLoading && (
                <>
                    <div>
                        <span className="text-white tracking-[-0.5px block">
                            Saldo Total
                        </span>

                        <div className="flex gap-3">
                            <strong
                                className={cn(
                                    "text-2xl tracking-[-1px] text-white",
                                    !areValueVisible && "blur-sm"
                                )}
                            >
                                {formatCurrency(currentBalance)}
                            </strong>
                            <button
                                className="w-8 h-8 flex items-center justify-center"
                                onClick={toggleValuesVisiblity}
                            >
                                <EyeIcon open={areValueVisible} />
                            </button>
                        </div>
                    </div>
                    <div className=" flex-1 flex  flex-col justify-end mt-10 md:mt-0">
                        {accounts.length === 0 && (
                            <>
                                <div
                                    className="w-full mb-4"
                                    slot="container-start"
                                >
                                    <strong className="text-white tracking-[-1px] text-lg">
                                        Minhas contas
                                    </strong>
                                </div>

                                <button
                                    className="mt-4 h-52 border-2 border-teal-600  border-dashed rounded-2xl  flex flex-col items-center justify-center gap-4 text-white"
                                    onClick={openNewAccountModal}
                                >
                                    <div className="w-11 h-11 rounded-full border-dashed border-2 border-white flex justify-center items-center">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                    <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                                        Cadastre uma nova conta
                                    </span>
                                </button>
                            </>
                        )}

                        {accounts.length > 0 && (
                            <>
                                {" "}
                                <div>
                                    <Swiper
                                        spaceBetween={16}
                                        slidesPerView={
                                            windowWidth > 500 ? 2.1 : 1.2
                                        }
                                        onSlideChange={(swiper) => {
                                            setSliderState({
                                                isBeginning: swiper.isBeginning,
                                                isEnd: swiper.isEnd,
                                            });
                                        }}
                                    >
                                        <div
                                            className="flex items-center justify-between w-full mb-4"
                                            slot="container-start"
                                        >
                                            <strong className="text-white tracking-[-1px] text-lg">
                                                Minhas contas
                                            </strong>

                                            <SliderNavigation
                                                isBeginning={
                                                    sliderState.isBeginning
                                                }
                                                isEnd={sliderState.isEnd}
                                            />
                                        </div>

                                        {accounts.map((account) => (
                                            <SwiperSlide>
                                                <AccountCard data={account} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </>
                        )}
                    </div>{" "}
                </>
            )}
        </div>
    );
};

export default Accounts;
