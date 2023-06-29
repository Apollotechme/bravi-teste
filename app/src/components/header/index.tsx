import Logo from "../../assets/Logo.png";


function Header({ setAuthenticated }) {
  function logOut() {
    localStorage.clear();
    return setAuthenticated(false);
  }
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <button
        onClick={() => {
          logOut();
        }}
        className="link__back"
      >
        Sair
      </button>
    </header>
  );
}
export default Header;
