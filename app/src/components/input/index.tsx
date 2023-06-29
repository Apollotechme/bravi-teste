type ICommonInput = {
  id: string;
  text: string;
  type: string;
  placeholder?: string;
  register: Function;
};

const InputCommon = (props: ICommonInput) => {
  return (
    <>
      <label htmlFor={props.id}>{props.text}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.id)}
      />
    </>
  );
};

export default InputCommon;
