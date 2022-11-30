import { ReactElement, SetStateAction, useContext } from "react";
import { BurgerClose as Icon } from "react-icons-animated";
import { GlobalDataContext } from "../../providers/global";

const Hamburger = (): ReactElement => {
  const { isClosed, setIsClosed } = useContext(GlobalDataContext);
  return (
    <button
      onClick={() => setIsClosed(!isClosed)}
      style={{
        margin: " 0px  0px  0px 20px ",
        background: "transparent",
        border: "none",
      }}
    >
      <Icon isClosed={isClosed} />
    </button>
  );
};

export default Hamburger;
