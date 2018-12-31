import { withTracker } from "meteor/react-meteor-data";

import { GlobalConfigs } from "../../../api/global-configs/global-configs.js";
import AdminGlobalConfigs from "../../components/admin/AdminGlobalConfigs.jsx";


export default withTracker(props => {
  const loading = !Meteor.subscribe("admin-global-configs").ready();

	window.GlobalConfigsProp = GlobalConfigs;
	
  return {
    loading,
    globalConfigs: GlobalConfigs.find().fetch(),
    ...props
  };
})(AdminGlobalConfigs);
