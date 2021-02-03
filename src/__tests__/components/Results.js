import React from 'react';
import { shallow } from 'enzyme';
import Results from '../../components/Results';

describe('--- Results snapshot ---', () => {
  test('should render Results correctly.', () => {
    const wrapper = shallow(<Results />);
    expect(wrapper).toMatchSnapshot();
  });
});
