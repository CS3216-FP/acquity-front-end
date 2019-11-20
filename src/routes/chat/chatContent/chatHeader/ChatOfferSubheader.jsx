import React from 'react';
import { useParams } from 'react-router-dom';
import useForm from 'react-hook-form';

import SocketRequestService from 'services/SocketService/socketRequestService';
import { useSocket } from 'contexts/socketContext';
import { integerRegex } from 'constants/regex';
import { validateMoneyString } from 'utils/moneyUtils';

import './ChatOfferSubheader.scss';

const ChatOfferSubheader = ({ handleClose }) => {
  return (
    <div className="chatOfferSubheader">
      <div className="chatOfferSubheader__header">Make an offer:</div>
      <MakeOfferForm handleClose={handleClose} />
    </div>
  );
};

const MakeOfferForm = ({ handleClose }) => {
  const { chatRoomId } = useParams();
  const socket = useSocket();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur'
  });

  const onClickSubmit = data => {
    const { price, numberOfShares } = data;
    SocketRequestService.addNewOffer({
      price,
      numberOfShares,
      chatRoomId,
      socket
    });
    handleClose();
  };

  return (
    <form
      className="form chatOfferSubheader__form"
      noValidate
      onSubmit={handleSubmit(onClickSubmit)}
    >
      <div className="columns is-marginless is-mobile">
        <div className="column chatOfferSubheader__form__input">
          <label htmlFor="numberOfShares" className="label">
            Quantity:
          </label>
          <div className="form__field field">
            <div className="control">
              <input
                id="numberOfShares"
                onKeyPress={evt => {
                  const charCode = evt.which ? evt.which : evt.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    evt.preventDefault();
                  }
                }}
                className={`input ${errors.numberOfShares ? 'is-danger' : ''}`}
                type="text"
                name="numberOfShares"
                placeholder="3000"
                ref={register({
                  required: 'This field is required',
                  validate: value => {
                    if (!value.match(integerRegex)) {
                      return 'Number of shares is invalid or should be a whole number';
                    }
                    if (value <= 0) {
                      return 'Number of shares must be bigger than 0';
                    }

                    return true;
                  }
                })}
              />
              {errors.numberOfShares && (
                <p className="help is-danger">
                  {errors.numberOfShares.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="column chatOfferSubheader__form__input">
          <label htmlFor="price" className="label">
            Price:
          </label>
          <div className="form__field field">
            <div className="control">
              <input
                id="price"
                className={`input ${errors.price ? 'is-danger' : ''}`}
                onKeyPress={evt => {
                  const charCode = evt.which ? evt.which : evt.keyCode;
                  if (
                    charCode > 31 &&
                    (charCode !== 46 && (charCode < 48 || charCode > 57))
                  ) {
                    evt.preventDefault();
                  }
                }}
                type="text"
                name="price"
                placeholder="0.00"
                ref={register({
                  required: 'This field is required',
                  validate: value => {
                    if (!parseFloat(value) || !validateMoneyString(value)) {
                      return 'Price amount is invalid';
                    }
                    if (value <= 0) {
                      return 'Amount must be higher than 0';
                    }

                    if (value > 100000) {
                      return 'Amount must be lower than $100,000';
                    }

                    return true;
                  }
                })}
              />
              {errors.price && (
                <p className="help is-danger">{errors.price.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="column chatOfferSubheader__form__actions">
          <div className="actions is-grouped field">
            <div className="control">
              <button type="submit" className="button--cta button no-shadow">
                Confirm
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="as-non-button button chatOfferSubheader__form__button--cancel"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatOfferSubheader;
