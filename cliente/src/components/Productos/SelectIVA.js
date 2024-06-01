import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SelectIVA = ({ id, label, value, onChange }) => {
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: id, children: label }), _jsxs("select", { className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light", id: id, value: value, onChange: onChange, children: [_jsx("option", { value: "5%", children: "5%" }), _jsx("option", { value: "10%", children: "10%" })] })] }));
};
export default SelectIVA;
