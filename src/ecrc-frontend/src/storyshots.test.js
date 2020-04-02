/* eslint-disable no-console */
import initStoryshots from "@storybook/addon-storyshots";

window.scrollTo = jest.fn();
console.error = jest.fn(); // for async storyshot errors, due to lack of support

initStoryshots({
  /* configuration options */
});
