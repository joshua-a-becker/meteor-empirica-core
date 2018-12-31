import SimpleSchema from "simpl-schema";

export const GlobalConfigs = new Mongo.Collection("global_configs");

GlobalConfigs.schema = new SimpleSchema({
  
	name: {
    type: String,  
		custom() {
      if (this.isSet && GlobalConfigs.find({ name: this.value }).count() > 0) {
        return "notUnique";
      }
    },
  },

  value: {
    type: String,
  },
	
	type: {
    type: String,
		index: 1,
    defaultValue: "String"
  },

});


GlobalConfigs.attachSchema(GlobalConfigs.schema);