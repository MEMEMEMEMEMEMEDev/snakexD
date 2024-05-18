import "./Menu.scss";

interface IMenu {
  startGame: () => void;
}

const Menu: React.FC<IMenu> = ({ startGame }) => {
  return (
    <div className="menu">
      <div className="menu-container">
        <h1>Snake Game</h1>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Menu;
