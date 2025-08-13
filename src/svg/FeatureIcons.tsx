import Ecology from "../../public/svg/ecology-green-world-hand-world-development-svgrepo-com.svg";
import Food from "../../public/svg/fastfood-and-drink-burger-svgrepo-com.svg";
import People from "../../public/svg/people-svgrepo-com.svg";
import Sun from "../../public/svg/sun-svgrepo-com.svg";
import Clock from "../../public/svg/time-clock-svgrepo-com.svg";
import WasherIcon from "../../public/svg/washing-machine-free-illustrations-7-svgrepo-com.svg";

export const CardsIcon = () => {
  return <Clock width={64} height={64} className="text-light" aria-hidden />;
};

export const DoorIcon = () => {
  return <Food width={64} height={64} className="text-light" aria-hidden />;
};

export const MagicIcon = () => {
  return <People width={64} height={64} className="text-light" aria-hidden />;
};

export const ShuffleIcon = () => {
  return (
    <WasherIcon width={64} height={64} className="text-light" aria-hidden />
  );
};

export const SignalIcon = () => {
  return <Sun width={64} height={64} className="text-light " aria-hidden />;
};

export const TalkingIcon = () => {
  return <Ecology width={64} height={64} className="text-light " aria-hidden />;
};
