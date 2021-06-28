
import "react";
import renderer from "react-test-renderer";
import ChangeLanguageScreen from "../screens/ChangeLanguageScreen";

import '../providers/lang/translations';

import * as t from '../providers/lang/translations';
import {jest} from '@jest/globals';


describe('NewsContent', () => {
    it.todo('Change language') 
  });

// test('renders correctly', () => {
//         // const tree = renderer.create(<ChangeLanguageScreen />).toJSON();
//         // expect(tree).toMatchSnapshot();

//         const mock = jest.spyOn(t, 'otherFn');  // spy on otherFn
//         mock.mockReturnValue('mocked value');  // mock the return value

//         expect(t.testFn()).toBe('mocked value');  // SUCCESS

//         // mock.mockRestore();
//         // const testTrue = true ;
//         // expect(testTrue).toBeTruthy()
// });
