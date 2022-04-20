import classes from './RoundButton.module.scss';

const RoundButton = ({ text, active, onClick }) => {
  return (
    <button
      className={`${classes['btn-round']} ${
        active ? classes['btn-round--active'] : ''
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default RoundButton;
