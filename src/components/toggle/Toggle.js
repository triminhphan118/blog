import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Toggle = (props) => {
  const { on, name, control, onClick, ...rest } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: false,
  });
  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        className="hidden-input"
        onClick={onClick}
        {...field}
        {...rest}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-blue-500" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[34px] h-[34px] bg-white rounded-full inline-block ${
            on ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toggle;
