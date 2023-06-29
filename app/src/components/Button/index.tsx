import { IButtonProps } from "../../types/typeComponents";
import "./style.scss";

const Button = ({
  buttonStyle,
  children,
  handler,
  submit = false,
}: IButtonProps) =>
  buttonStyle === "primary" ? (
    <button
      className="primaryButton"
      onClick={handler}
      // buttonType={submit}
      type={submit ? "submit" : undefined}
    >
      {children}
    </button>
  ) : (
    <button className="secondaryButton" onClick={handler}>
      {children}
    </button>
  );

export default Button;
