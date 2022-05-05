import { Tracker } from "react-tracker";
import { submitUserAction } from "../service/index.js";
const tracker = new Tracker();

tracker.on("*", (event, eventHistory) => {
  const data = {
    ...event.data,
    time: new Date().toLocaleString()
  }
  submitUserAction(data);
});

export const sendAction = (data) => {
  tracker.trackEvent({
    type: "any",
    data,
  });
  console.log('sent interaction')
};
