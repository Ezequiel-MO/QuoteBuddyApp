import { Icon } from "@iconify/react";

const Button = ({ handleClick, icon, children }) => {
  return (
    <button
      onClick={handleClick}
      className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
    >
      <Icon icon={icon} />
      <span>{children}</span>
    </button>
  );
};

export default Button;
