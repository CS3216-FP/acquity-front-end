import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';

import { validateMoneyString } from 'utils/moneyUtils';
import InputDropdownSelect from 'components/inputDropdownSelect';
import OrderDisclaimer from '../orderDisclaimer';

const NewBidForm = ({ onSubmit, securities, formData, isLoading, type }) => {
  const {
    register,
    handleSubmit: validateInputs,
    errors,
    watch,
    setValue,
    triggerValidation
  } = useForm({
    mode: 'onBlur',
    defaultValues: formData || {}
  });
  const watchedFields = watch();

  return (
    <form
      className="form newBid"
      noValidate
      onSubmit={validateInputs(onSubmit)}
    >
      <input
        id="securityId"
        className="is-hidden"
        type="text"
        name="securityId"
        ref={register({
          required: 'This field is required'
        })}
      />
      <input
        id="securityName"
        className="is-hidden"
        type="text"
        name="securityName"
        ref={register({
          required: 'This field is required'
        })}
      />
      <label htmlFor="numberOfShares" className="label">
        Number of shares
      </label>
      <div className="form__field field has-addons">
        <div className="control">
          <InputDropdownSelect
            handleBlur={() => triggerValidation({ name: 'securityId' })}
            options={securities}
            valueField="id"
            labelField="name"
            iconField="iconUrl"
            isLoading={isLoading}
            isError={errors.securityId}
            onChange={value => {
              setValue('securityName', value[0].name, true);
              setValue('securityId', value[0].id, true);
            }}
            values={
              formData
                ? [
                    {
                      id: formData.securityId,
                      name: formData.securityName
                    }
                  ]
                : []
            }
          />
        </div>
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
          <button
            tabIndex={-1}
            type="button"
            className="button is-static has-text-dark"
          >
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
      <OrderDisclaimer type={type} />
      <div className="actions is-grouped field">
        <div className="control">
          <button type="submit" className="button--cta button hvr-grow">
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

NewBidForm.propTypes = {
  securities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NewBidForm;
