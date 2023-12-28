import logo from "../../assets/logo.svg";

function Header({ score }: { score: number }) {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="score">
        <div className="score__title">score</div>
        <div className="score__number">{score}</div>
      </div>
    </header>
  );
}

export default Header;
