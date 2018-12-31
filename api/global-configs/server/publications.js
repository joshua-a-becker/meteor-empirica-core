import { GlobalConfigs } from "../global-configs.js";

Meteor.publish("admin-global-configs", function() {
  return GlobalConfigs.find();
});
