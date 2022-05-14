import classes from './RatingCard.module.scss';
import { useState, useRef } from 'react';
import RoundButton from './RoundButton';
import { CSSTransition } from 'react-transition-group';

const RatingCard = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState('0');
  const [error, setError] = useState(false);
  //using useRef avoids the "findDOMNode is deprecated" warning when using
  //the CSSTransition component, see the CSSCTransition component below
  const nodeRef = useRef(null);

  const VOTING_RANGE = ['1', '2', '3', '4', '5'];

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (selectedRating === '0') {
      setError(true);
      setIsSubmitted(false);
    } else {
      setError(false);
      setIsSubmitted(true);
    }
  };

  const handleSelectRating = (event, number) => {
    event.preventDefault();
    setSelectedRating(number);
    setError(false);
  };

  return (
    <div className={classes['rating-card']}>
      {!isSubmitted && (
        <form className={classes['rating-card-survey']}>
          <div className={classes['rating-card-survey__decoration']}></div>
          <h1 className={classes['rating-card-survey__title']}>
            How did we do?
          </h1>
          <p className={classes['rating-card-survey__msg']}>
            Please let us know how we did with your support request. All
            feedback is appreciated to help us improve our offering!
          </p>
          <div className={classes['rating-card-survey__btns-container']}>
            {VOTING_RANGE.map((number) => {
              return (
                <RoundButton
                  text={number}
                  key={number}
                  onClick={(e) => handleSelectRating(e, number)}
                  active={number === selectedRating}
                />
              );
            })}
          </div>
          <button
            className={classes['rating-card-survey__submit-btn']}
            onClick={handleOnSubmit}
            type="submit"
          >
            SUBMIT
          </button>
          <p
            className={
              error
                ? classes['rating-card-survey__warning--visible']
                : classes['rating-card-survey__warning--hidden']
            }
          >
            You should select a rating before submitting!
          </p>
        </form>
      )}
      <CSSTransition
        in={isSubmitted}
        timeout={500}
        classNames={{
          enter: classes['fadein-enter'],
          enterActive: classes['fadein-enter-active'],
        }}
        unmountOnExit
        //adding a useRef hook avoids the use of the findDOMNode method
        //which is deprecated and causes a warning during the transition.
        nodeRef={nodeRef}
      >
        <div className={classes['thank-you']} ref={nodeRef}>
          <div className={classes['thank-you__image']}> </div>
          <div className={classes['thank-you__rating']}>
            You selected {selectedRating} out of 5
          </div>
          <h1>Thank You!</h1>
          <p>
            We appreciate you taking the time to give a rating. If you ever need
            more support, don’t hesitate to get in touch!
          </p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default RatingCard;
