import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

describe('--- NotFound snapshot ---', () => {
  test('should render NotFound Page correctly', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
