import { ReactElement, SetStateAction } from "react";
import { BurgerClose as Icon } from "react-icons-animated";

interface Props {
  isClosed: boolean;
  setIsClosed: (arg: SetStateAction<boolean>) => void;
}

const Hamburger = ({ isClosed, setIsClosed }: Props): ReactElement => {
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
