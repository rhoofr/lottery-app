import React from 'react';
import { shallow } from 'enzyme';
import MainNavigation from '../../shared/components/navigation/MainNavigation';

describe('--- MainNavigation snapshot ---', () => {
  test('should render Main Navigation correctly.', () => {
    const wrapper = shallow(<MainNavigation />);
    expect(wrapper).toMatchSnapshot();
  });
});
