import React from 'react';
import useForm from 'react-hook-form';

import { validateMoneyString } from 'utils/moneyUtils';

const StockFormAddon = ({ stockName, iconUrl }) => {
  return (
    <div className="control">
      <button tabIndex={-1} type="button" className="button is-static">
        {iconUrl ? (
          <img
            style={{ maxWidth: '80%', maxHeight: '80%' }}
            src={iconUrl}
            alt={stockName}
          />
        ) : (
          stockName
        )}
      </button>
    </div>
  );
};

const EditBidForm = ({ onSubmit, formData, type, onDelete }) => {
  const { register, handleSubmit: validateInputs, errors, watch } = useForm({
    mode: 'onBlur',
    defaultValues: formData
  });
  const watchedFields = watch();

  return (
    <form
      className="form bidPage"
      noValidate
      onSubmit={validateInputs(onSubmit)}
    >
      <input
        id="securityName"
        className="is-hidden"
        type="text"
        name="securityName"
        ref={register}
      />
      <input
        id="securityId"
        className="is-hidden"
        type="text"
        name="securityId"
        ref={register}
      />
      <label htmlFor="numberOfShares" className="label">
        Number of shares
      </label>
      <div className="form__field field has-addons">
        <StockFormAddon
          stockName={formData.securityName}
          iconUrl={formData.iconUrl}
        />
        <div className="control is-expanded">
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
                const integerRegex = /^\d+$/;
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
            <p className="help is-danger">{errors.numberOfShares.message}</p>
          )}
        </div>
      </div>

      <label htmlFor="price" className="label">
        {type === 'bid' ? 'Maximum price per share' : 'Minimum price per share'}
      </label>
      <div className="form__field field has-addons">
        <div className="control">
          <button tabIndex={-1} type="button" className="button is-static">
            SGD
          </button>
        </div>
        <div className="control is-expanded">
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

                if (value > 10000) {
                  return 'Amount must be lower than $10,000';
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

      <div className="estimate">
        <div className="estimate__label">Estimated total</div>
        <div className="estimate__amount">
          <span className="estimate__amount--currency">SGD</span>
          <span className="estimate__amount--amount">
            {validateMoneyString(watchedFields.price)
              ? (
                  watchedFields.price * watchedFields.numberOfShares
                ).toLocaleString()
              : '-'}
          </span>
        </div>
      </div>

      <div className="actions is-grouped field">
        <div className="control">
          <button type="submit" className="button--cta button hvr-grow">
            Confirm
          </button>
        </div>
        <div className="control">
          <button
            onClick={onDelete}
            type="button"
            className="button--danger button hvr-grow"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditBidForm;
