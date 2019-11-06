import React, { useReducer } from 'react';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { validateMoneyString } from 'utils/moneyUtils';
import ApiService from 'services/apiService';
import ErrorMessage from 'components/errorMessage';
import { updateSecurityMarketPrice } from 'reducers/SecuritiesDux';
import SuccessMessage from 'components/successMessage';

const AdjustMarketPriceForm = ({ security }) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isError: false,
    isSuccess: false,
    isLoading: false
  });

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur'
  });

  const onClickSubmit = data => {
    setState({ isLoading: true });
    const { price } = data;
    ApiService.patch(`security/${security.id}`, { marketPrice: Number(price) })
      .then(() => {
        setState({ isSuccess: true, isLoading: false });
        dispatch(
          updateSecurityMarketPrice({ id: security.id, marketPrice: price })
        );
      })
      .catch(() => {
        setState({ isError: true, isLoading: false });
      });
  };

  return (
    <div className="adjustMarketPriceForm">
      <div className="card">
        <div className="media">
          <div className="media-content">
            <div className="adjustMarketPriceForm__security">
              <div className="adjustMarketPriceForm__security--name">
                {security.name}
              </div>
              <div className="adjustMarketPriceForm__security__currentPrice">
                <span className="adjustMarketPriceForm__security__currentPrice--label">
                  Current price:&nbsp;
                </span>
                <span className="adjustMarketPriceForm__security__currentPrice--value">
                  SGD{' '}
                  {security.marketPrice ? (
                    security.marketPrice
                  ) : (
                    <span className="currentMarketPrice__price__value--empty">
                      0.00
                    </span>
                  )}
                </span>
              </div>
            </div>
            {state.isError && (
              <ErrorMessage message="Failed to update market price. Try again." />
            )}
            {state.isSuccess && (
              <SuccessMessage message="Successfully updated market price." />
            )}
            <form
              className="form adjustMarketPriceForm__form"
              noValidate
              onSubmit={handleSubmit(onClickSubmit)}
            >
              <label htmlFor="price" className="label">
                New unofficial price
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
              <div className="actions is-grouped field">
                <div className="control">
                  <button
                    type="submit"
                    disabled={state.isLoading}
                    className={`button--cta button hvr-grow ${
                      state.isLoading ? 'is-loading' : ''
                    }`}
                  >
                    Update price
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustMarketPriceForm;
