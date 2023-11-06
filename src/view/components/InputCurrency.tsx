import { NumericFormat } from "react-number-format";

const InputCurrency = () => {
    return (
        <NumericFormat
            className="w-full border  text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
            thousandSeparator="."
            decimalSeparator=","
            defaultValue="0,00"
        />
    );
};

export default InputCurrency;
