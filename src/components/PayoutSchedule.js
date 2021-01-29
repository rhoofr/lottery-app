import React from 'react';

import './PayoutSchedule.css';

function PayoutSchedule() {
  return (
    <div>
      <h3 className='card__title-payout'>PAYOUT SCHEDULE</h3>
      <table className='table table-striped table-bordered border-primary jackpot--table'>
        <thead className='table-light'>
          <tr key={1}>
            <th scope='col' colSpan={2}>
              Powerball *
            </th>
            <th scope='col' colSpan={2}>
              Mega Millions **
            </th>
          </tr>
          <tr key={2} className='table-header__2'>
            <th scope='col'>Match</th>
            <th scope='col'>Payout</th>
            <th scope='col'>Match</th>
            <th scope='col'>Payout</th>
          </tr>
        </thead>
        <tbody>
          <tr key={3}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>Jackpot</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>Jackpot</td>
          </tr>
          <tr key={4}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
            </td>
            <td className='payout'>$1,000,000</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
            </td>
            <td className='payout'>$1,000,000</td>
          </tr>
          <tr key={5}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$50,000</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$10,000</td>
          </tr>
          <tr key={6}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
            </td>
            <td className='payout'>$100</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
            </td>
            <td className='payout'>$500</td>
          </tr>
          <tr key={7}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$100</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$200</td>
          </tr>
          <tr key={8}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
            </td>
            <td className='payout'>$7</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
            </td>
            <td className='payout'>$10</td>
          </tr>
          <tr key={9}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$7</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$10</td>
          </tr>
          <tr key={10}>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$4</td>
            <td className='payout'>
              <div className='reg-number'></div>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$4</td>
          </tr>
          <tr key={11}>
            <td className='payout'>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$4</td>
            <td className='payout'>
              <div className='ball-number'></div>
            </td>
            <td className='payout'>$2</td>
          </tr>
        </tbody>
      </table>
      <div className='payout-notes'>
        <span className='payout-notes__details'>
          * Powerball (Regular Numbers 1-69, Ball Numbers 1-26)
        </span>
      </div>
      <div className='payout-notes'>
        <span className='payout-notes__details'>
          ** Mega Millions (Regular Numbers 1-70, Ball Numbers 1-25)
        </span>
      </div>
    </div>
  );
}

export default PayoutSchedule;
