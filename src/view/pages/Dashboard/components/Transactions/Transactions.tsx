import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";

import Spinner from "../../../../components/Spinner";
import SliderOption from "./SliderOption";
import SliderNavigation from "./SliderNavigation";

import emptyStateImg from "../../../../../assets/Empty State.svg";

const Transactions = () => {
    const { transactions, areValueVisible, isLoading, isInitialLoading } =
        useTransactionController();

    const HasTransactions = transactions.length > 0;

    return (
        <div className="bg-gray-100 rounded-2xl h-full w-full  px-4 py-8 md:p-10  flex flex-col">
            {isInitialLoading && (
                <div className="flex items-center justify-center h-full w-full">
                    <Spinner className="h-10 w-10" />
                </div>
            )}

            {!isInitialLoading && (
                <>
                    {" "}
                    <header>
                        <div className="flex justify-between items-center">
                            <button className="flex items-center gap-2 ">
                                <TransactionsIcon />
                                <span className="text-sm text-gray-800 tracking-[-0.5px]">
                                    Transações
                                </span>
                                <ChevronDownIcon className="text-gray-900" />
                            </button>
                            <button>
                                <FilterIcon />
                            </button>
                        </div>

                        <div className="mt-6 relative">
                            <Swiper slidesPerView={3} centeredSlides>
                                <SliderNavigation />
                                {MONTHS.map((month, index) => (
                                    <SwiperSlide key={month}>
                                        {({ isActive }) => (
                                            <SliderOption
                                                index={index}
                                                isActive={isActive}
                                                month={month}
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </header>
                    <div className="mt-4 space-y-2 flex-1 overflow-y-auto ">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full">
                                <Spinner className="h-10 w-10" />
                            </div>
                        )}

                        {!HasTransactions && !isLoading && (
                            <div className="flex flex-col justify-center items-center  h-full">
                                <img src={emptyStateImg} alt="Empty State" />
                                <p className="text-gray-700">
                                    Não encontramos nenhuma transação
                                </p>
                            </div>
                        )}

                        {HasTransactions && (
                            <>
                                {" "}
                                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap gap-4">
                                    <div className="flex-1 flex items-center gap-3">
                                        <CategoryIcon type="expense" />
                                        <div>
                                            <strong className="font-bold tracking-[-0.5px] block">
                                                Almoço
                                            </strong>

                                            <span className="text-sm text-gray-600">
                                                01/11/2023
                                            </span>
                                        </div>
                                    </div>

                                    <span
                                        className={cn(
                                            "text-red-800 tracking-[-0.5px] font-medium",
                                            !areValueVisible && "blur-sm"
                                        )}
                                    >
                                        - {formatCurrency(127.23)}
                                    </span>
                                </div>
                                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap gap-4">
                                    <div className="flex-1 flex items-center gap-3">
                                        <CategoryIcon type="income" />
                                        <div>
                                            <strong className="font-bold tracking-[-0.5px] block">
                                                Almoço
                                            </strong>

                                            <span className="text-sm text-gray-600">
                                                01/11/2023
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={cn(
                                            "text-green-800 tracking-[-0.5px] font-medium",
                                            !areValueVisible && "blur-sm"
                                        )}
                                    >
                                        + {formatCurrency(400)}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Transactions;
