import { Tracker } from "react-tracker";
import { submitUserAction } from "../service/index.js";
console.log(Tracker);
const tracker = new Tracker();

tracker.on("*", (event, eventHistory) => {
  const data = {
    ...event.data,
    time: new Date().toLocaleString()
  }
  submitUserAction(data);
});

/**
 *
 * @param {string} type event type
 * @param {any} data
 */
// export const sendAction = (type, data) => {
//   tracker.trackEvent({
//     type,
//     data,
//   });
// };

export const sendAction = (data) => {
  tracker.trackEvent({
    type: "any",
    data,
  });
};
