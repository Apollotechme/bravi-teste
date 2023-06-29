import { IInputProps } from "../../types/typeComponents";
import Tooltip from "../Tooltip";
import "./style.scss";

const CustomInput = ({
  id,
  label,
  register,
  error,
  select,
  ...rest
}: IInputProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div
        className="styled-input"
        // border={setBorder}
      >
        <input {...rest} {...register(id as string)} />
        {error && <Tooltip>{error}</Tooltip>}
      </div>
    </>
  );
};

export default CustomInput;
