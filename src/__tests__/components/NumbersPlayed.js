import React from 'react';
import { shallow } from 'enzyme';
import NumbersPlayed from '../../components/NumbersPlayed';

describe('--- NumbersPlayed snapshot ---', () => {
  test('should render NumbersPlayed Page correctly', () => {
    const wrapper = shallow(<NumbersPlayed />);
    expect(wrapper).toMatchSnapshot();
  });
});

// import React from 'react';
// // import ReactDOM from 'react-dom';
// import NumbersPlayed from '../../components/NumbersPlayed';
// import { render, cleanup, waitForElement } from '@testing-library/react';

// import axiosMock from 'axios';

// afterEach(cleanup);

// it('Async axios request works', async () => {
//   axiosMock.get.mockResolvedValue({
//     data: {
//       results: [
//         {
//           allResultsChecked: false,
//           _id: '6014a6af531b3910f8b2c58e',
//           game: 'M',
//           first: 10,
//           second: 26,
//           third: 48,
//           fourth: 57,
//           fifth: 66,
//           ball: 20,
//           startDate: '2021-01-08T05:00:00.000Z',
//           endDate: '2021-03-02T05:00:00.000Z',
//           createdAt: '2021-01-30T00:22:07.994Z',
//           __v: 0
//         }
//       ]
//     }
//   });

//   const url = 'https://jsonplaceholder.typicode.com/posts/1';
//   const { getByText, getByTestId } = render(<NumbersPlayed />);

//   expect(getByText(/...Loading/i).textContent).toBe('...Loading');

//   const resolvedEl = await waitForElement(() => getByTestId('game'));
//   console.log(resolvedEl);

//   expect(resolvedEl.textContent).toBe('Mega Millions');

//   expect(axiosMock.get).toHaveBeenCalledTimes(1);
//   // expect(axiosMock.get).toHaveBeenCalledWith(url);
// });
