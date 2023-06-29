import { IFormulary } from "../../types/typeComponents";
import "./styles.scss";

const Formulary = ({ children, ...rest }: IFormulary) => (
  <form {...rest}>{children}</form>
);

export default Formulary;
