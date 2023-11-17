import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MyProfile from '../pages/MyProfile';
import store from '../redux/store';

it('matches snapshot', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MyProfile />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
