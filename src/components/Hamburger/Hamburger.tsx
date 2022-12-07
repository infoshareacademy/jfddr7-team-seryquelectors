import { ReactElement, useContext } from "react";
import { BurgerClose as Icon } from "react-icons-animated";
import { GlobalDataContext } from "../../providers/global";

const Hamburger = (): ReactElement => {
  const { isClosed, setIsClosed } = useContext(GlobalDataContext);
  return (
    <button
      onClick={() => setIsClosed(!isClosed)}
      style={{
        width: "60%",
        height: "100%",
        padding: "10px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <Icon isClosed={isClosed} />
    </button>
  );
};

export default Hamburger;
