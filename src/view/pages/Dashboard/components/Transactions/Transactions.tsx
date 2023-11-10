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
import TransactionTypeDropdown from "./TransactionTypeDropdown";
import FiltersModal from "./FiltersModal/FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import EditNewTransactionModal from "../../modals/ActionTransactionModal/EditTransactionModal";

const Transactions = () => {
    const {
        isEditModalOpen,
        transactionBeingEdited,
        filters,
        transactions,
        isFiltered,
        areValueVisible,
        isLoading,
        isInitialLoading,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        handleChangeFilters,
        handleApplyFilters,
        handleCloseTransactionEditModal,
        handleOpenTransactionEditModal,
    } = useTransactionController();

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
                    <FiltersModal
                        onApplyFilters={handleApplyFilters}
                        open={isFiltered}
                        onCLose={handleCloseFiltersModal}
                    />{" "}
                    <header>
                        <div className="flex justify-between items-center">
                            <TransactionTypeDropdown
                                selectedType={filters.type}
                                onSelect={handleChangeFilters("type")}
                            />

                            <button onClick={handleOpenFiltersModal}>
                                <FilterIcon />
                            </button>
                        </div>

                        <div className="mt-6 relative">
                            <Swiper
                                slidesPerView={3}
                                centeredSlides
                                initialSlide={filters.month}
                                onSlideChange={(swiper) => {
                                    handleChangeFilters("month")(
                                        swiper.realIndex
                                    );
                                }}
                            >
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

                        {HasTransactions && !isLoading && (
                            <>
                                {" "}
                                {transactions.map((transaction) => (
                                    <div
                                        className="bg-white p-4 rounded-2xl flex items-center justify-between gap gap-4"
                                        key={transaction.id}
                                        role="button"
                                        onClick={() =>
                                            handleOpenTransactionEditModal(
                                                transaction
                                            )
                                        }
                                    >
                                        <div className="flex-1 flex items-center gap-3">
                                            <CategoryIcon
                                                type={
                                                    transaction.type ===
                                                    "EXPENSE"
                                                        ? "expense"
                                                        : "income"
                                                }
                                                category={
                                                    transaction.category.icon
                                                }
                                            />
                                            <div>
                                                <strong className="font-bold tracking-[-0.5px] block">
                                                    {transaction.name}
                                                </strong>

                                                <span className="text-sm text-gray-600">
                                                    {formatDate(
                                                        new Date(
                                                            transaction.date
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className={cn(
                                                " tracking-[-0.5px] font-medium",
                                                !areValueVisible && "blur-sm",
                                                transaction.type === "INCOME"
                                                    ? "text-green-800"
                                                    : "text-red-800"
                                            )}
                                        >
                                            {transaction.type === "INCOME"
                                                ? "+"
                                                : "-"}{" "}
                                            {formatCurrency(transaction.value)}
                                        </span>
                                    </div>
                                ))}
                                {transactionBeingEdited && (
                                    <EditNewTransactionModal
                                        open={isEditModalOpen}
                                        onClose={
                                            handleCloseTransactionEditModal
                                        }
                                        transaction={transactionBeingEdited}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Transactions;
