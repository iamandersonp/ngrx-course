import 'jest-preset-angular/setup-jest';

/* global mocks for jsdom */

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
