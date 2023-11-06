import ColorDropdownInput from "../../../../components/ColorDropdownInput";
import Input from "../../../../components/Input";
import InputCurrency from "../../../../components/InputCurrency";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import useNewAccountModalController from "./useNewAccountModalController";

const NewAccountModal = () => {
    const { isNewAccountModalOpen, closeNewAccountModal } =
        useNewAccountModalController();
    return (
        <Modal
            title="Nova conta"
            open={isNewAccountModalOpen}
            onClose={closeNewAccountModal}
        >
            <form>
                <div className="">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-xs">
                            Saldo
                        </span>
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">
                            R$
                        </span>
                        <InputCurrency />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome da Conta"
                    />
                    <Select
                        placeholder="Tipo"
                        options={[
                            {
                                value: "INVESTMENT",
                                label: "Investimentos",
                            },
                            {
                                value: "Checking",
                                label: "Conta corrente",
                            },
                            {
                                value: "CASH",
                                label: "Dinheiro fisico",
                            },
                        ]}
                    />

                    <ColorDropdownInput />
                </div>
            </form>
        </Modal>
    );
};

export default NewAccountModal;
