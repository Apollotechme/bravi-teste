import { IInputProps } from "../../types/typeComponents";

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
      <div className="styled-input">
        <input {...rest} {...register(id as string)} />
        {error && <span>{error}</span>}
      </div>
    </>
  );
};

export default CustomInput;
