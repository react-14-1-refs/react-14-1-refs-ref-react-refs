import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from '../components/input/input.js';

//? Test on crash
it('Renders Input without crashing', () => {
  render(<Input />);
});

it('focuses the operator input when Input is rendered', () => {
  render(<Input />);

  expect(screen.getByTestId('operator-input')).toHaveFocus();
});

it('keeps focus on the operator input until it contains 2 digits', () => {
  render(<Input />);
  const operatorInput = screen.getByTestId('operator-input');

  fireEvent.input(operatorInput, { target: { value: '6' } });

  expect(operatorInput).toHaveFocus();
  expect(screen.getByTestId('phone-input')).not.toHaveFocus();
});

it('moves focus to the phone input when the operator input contains 2 digits', () => {
  render(<Input />);
  const operatorInput = screen.getByTestId('operator-input');
  const phoneInput = screen.getByTestId('phone-input');

  fireEvent.input(operatorInput, { target: { value: '67' } });

  expect(phoneInput).toHaveFocus();
});

it('moves focus to the phone input when 2 digits remain after non-digits are ignored', () => {
  render(<Input />);
  const operatorInput = screen.getByTestId('operator-input');
  const phoneInput = screen.getByTestId('phone-input');

  fireEvent.input(operatorInput, { target: { value: 'e67' } });

  expect(phoneInput).toHaveFocus();
});

//? Test input operators
const operators = [
  //correct input operators
  ['Kyivstar', 67, 68, 96, 97, 98],
  ['Vodafone', 50, 66, 95, 99],
  ['Lifecell', 63, 73, 93],
  ['3mob', 91],
  ['People.net', 92],
  ['intertelecom', 89, 94],

  //wrong input operators
  ['Unknown', 12, 13, 14, 15, 65, 77, 57, 90, '6udemy5', 'super 34 test'],
  ['', 2, 3, 1, 5, 6, 7, 8, 9, 'fe', 'text', '1rt', 'r3', 'aslkfvise eivas e'],
  ['Kyivstar', '67', '68', '96', '97', '98', 'e67', 'f68', 'd96', 's97', '__98'],
  ['Vodafone', '50', '66', '95', '99', '50we', '66dd', '95sd', '99tt'],
  ['Lifecell', '63', '73', '93', '6+3', '7==3', '9()3'],
  ['3mob', '91', '#91@'],
  ['People.net', '92', 'ee92'],
  ['intertelecom', '89', '94', '89-', '94]<']
];

operators.forEach(oper => {
  const operatorName = oper.shift();
  oper.forEach(num => {
    it(`Enter ${num}-, expect ${operatorName}`, () => {
      render(<Input />)
      const operatorInput = screen.getByTestId('operator-input')
      const operatorNameContainer = screen.getByTestId('operator-name')
      fireEvent.input(operatorInput, { target: { value: `${num}` } })

      expect(operatorNameContainer.textContent.trim()).toBe(operatorName);
    });
  })
});

//? Test both input operators and phone
const operatorsBoth = [
  {
    expectCheck: '✔️',
    operators: [12, 13, 14, 15, 65, 77, 57, 90, '6udemy5', 'super 34 test'],
    phone: [1234567, 1334654, '6udemy53487yyy7', 'su23per 34 te23st__0'],
  },
  {
    expectCheck: '✔️',
    operators: ['67', '68', '96', '97', '98', 'e67', 'f68', 'd96', 's97', '__98'],
    phone: [1234567, 1334654, '6udemy53487yyy7', 'su23per 34 te23st__0'],
  },
  {
    expectCheck: '-',
    operators: [2, 3, 1, 5, 6, 7, 8, 9, 'fe', 'text', '1rt', 'r3', 'aslkfvise eivas e'],
    phone: [1234567, 1334654, '6udemy53487yyy7', 'su23per 34 te23st__0'],
  }
];

operatorsBoth.forEach(({
  expectCheck,
  operators,
  phone
}) => {
  phone.forEach(numPhone => {
    operators.forEach(numOperator => {

      it(`Enter ${numOperator}-${numPhone}, expect ${expectCheck}`, () => {
        render(<Input />)
        const operatorInput = screen.getByTestId('operator-input')
        const phoneInput = screen.getByTestId('phone-input')
        const checkIconContainer = screen.getByTestId('check-icon')

        fireEvent.input(operatorInput, { target: { value: `${numOperator}` } })
        fireEvent.input(phoneInput, { target: { value: `${numPhone}` } })

        expect(checkIconContainer.textContent.trim()).toBe(expectCheck);
      });
    });
  })
});
