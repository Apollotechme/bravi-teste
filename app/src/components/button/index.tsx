type IButton = {
  type: "submit" | "button" | "reset";
  color: string;
  text: string;
};

function Button(props: IButton) {
  return (
    <button color={props.color} type={props.type}>
      {props.text}
    </button>
  );
}
export default Button;
