import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";

import { GlobalConfigs } from "./global-configs.js";
import { IdSchema } from "../default-schemas.js";

export const createGlobalConfig = new ValidatedMethod({
  name: "GlobalConfigs.methods.create",

	
	
  validate: GlobalConfigs.schema.validator(),

  run(globalConfig) {
    if (!this.userId) {
      throw new Error("unauthorized");
    }

    GlobalConfigs.insert(globalConfig);
  }
});

export const updateGlobalConfigNoName = new ValidatedMethod({
  name: "GlobalConfigs.methods.update",

  validate: GlobalConfigs.schema
	  .pick('type','value')
    .extend(IdSchema)
    .validator(),

  run({_id, name, type, value}) {
	
    if (!this.userId) {
      throw new Error("unauthorized");
    }
    const globalConfig = GlobalConfigs.findOne(_id);
    if (!globalConfig) {
      throw new Error("id not found");
    }
		
		
		
    GlobalConfigs.update( {_id:_id},  {$set: {type:type, value:value} });
  }
});


export const updateGlobalConfig = new ValidatedMethod({
  name: "GlobalConfigs.methods.updateWithName",

  validate: GlobalConfigs.schema
    .extend(IdSchema)
    .validator(),

  run({_id, name, type, value}) {
	
    if (!this.userId) {
      throw new Error("unauthorized");
    }
    const globalConfig = GlobalConfigs.findOne(_id);
    if (!globalConfig) {
      throw new Error("id not found");
    }
		
		
		
    GlobalConfigs.update( {_id:_id},  {$set: {name: name, type:type, value:value} });
  }
});

export const getConfigs = () => {
	return(GlobalConfigs.find().fetch());
}