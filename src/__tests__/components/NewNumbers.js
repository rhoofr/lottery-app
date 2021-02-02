import React from 'react';
import { shallow } from 'enzyme';
import { NewNumbers } from '../../components/NewNumbers';

test('should set first value on input change', () => {
  // const value = 'New description';
  const wrapper = shallow(<NewNumbers />);
  expect(wrapper).toMatchSnapshot();

  wrapper.find('input[id="post-first"]').simulate('change', {
    target: {
      value: '12'
    }
  });
  expect(wrapper.find('input[id="post-first"]').prop('value')).toBe('12');
});

test('should call onSubmit prop for form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<NewNumbers onSubmit={onSubmitSpy} />);
  // console.log(wrapper.find('form'));
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  // expect(wrapper.state('error')).toBe('');
  // expect(onSubmitSpy).toHaveBeenCalled();
});
