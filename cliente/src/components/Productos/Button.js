import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ onClick, className, type, children }) => {
    return (_jsx("button", { className: ` ${className} shadow-xl mt-2 ml-2 hover:bg-gray-800 hover:text-white transform hover:scale-110 transition-all duration-200 hover:border-none `, type: type || 'button', onClick: onClick, children: children }));
};
export default Button;
