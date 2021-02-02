import React from 'react';
import { shallow } from 'enzyme';
import PayoutSchedule from '../../components/PayoutSchedule';

describe('--- PayoutSchedule snapshot ---', () => {
  test('should render PayoutSchedule Page correctly', () => {
    const wrapper = shallow(<PayoutSchedule />);
    expect(wrapper).toMatchSnapshot();
  });
});
