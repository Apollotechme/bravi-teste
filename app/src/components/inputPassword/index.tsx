import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

type IPasswordInput = {
  id: string;
  text: string;
  type: string;
  placeholder?: string;
  register: Function;
};

function InputPassword(props: IPasswordInput) {
  const [showPassword, setShowPassword] = useState(true);
  const [typeShow, setTypeShow] = useState(true);

  function handlePassword(e) {
    setTypeShow(!typeShow);
    return setShowPassword(!showPassword);
  }
  return (
    <div>
      <input
        id={props.id}
        placeholder={props.placeholder}
        {...props.register(props.id)}
        type={typeShow ? props.type : "text"}
      />
      {showPassword ? (
        <MdVisibility onClick={(e) => handlePassword(e)} />
      ) : (
        <MdVisibilityOff onClick={(e) => handlePassword(e)} />
      )}
    </div>
  );
}

export default InputPassword;
