import React from "react";
import { AlertToaster } from "../Toasters.jsx";


import { EditableText, Select } from "@blueprintjs/core";

import { createGlobalConfig, updateGlobalConfigNoName, updateGlobalConfig } from "../../../api/global-configs/methods.js";

export default class AdminGlobalConfigs extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      newName: "",
			newType: "",
			newValue: "",
    };
  }
	
  handleNewNameChange = name => {
    this.setState({ 
			newName: name || ""
		});
  };

	handleNewTypeChange = e => {
		const type = e.target.value;
    this.setState({ 
			newType: type || ""
		});
  };

	
  handleNewValueChange = value => {
    this.setState({ 
			newValue: value || ""
		});
  };
	
	handleInsert = () => {
    

    const { newName: nameRaw, newType, newValue:valueRaw } = this.state;
		
    const newName = nameRaw.trim();
		const newValue = String(valueRaw);		
		
    createGlobalConfig.call( { name:newName, type:newType, value:newValue }, err => {
      if (err) {
        AlertToaster.show({ message: String(err) });
        return;
      }
    });
  };

    
	
  render() {
	
		const { globalConfigs } = this.props;
		const { newName, newValue, newType } = this.state;
		
		window.globalConfigs=globalConfigs;
		window.loading = this.props.loading;
		if(loading) {
			return(<>Loading...</>);
		} else {		
			return (
				<div className="global-configs">
						<table>
							<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Value</th>							
								<th>Value in DB</th>	
							</tr>
						</thead>
						<tbody>
							{_.map(globalConfigs, globalConfig => (
								<AdminGlobalConfig
									key={globalConfig._id}
									globalConfig={globalConfig}
								/>
							))}
							<tr><td colSpan={4}><br/><br/>ADD NEW:</td></tr>
							<tr>
								<td>
									<EditableText
										onChange={this.handleNewNameChange}
										value={newName}
									/>
								</td>
								<td>
										<select value={newType} onChange={this.handleNewTypeChange}>
											<option disabled value="">--select--</option>
											<option value="String">String</option>
											<option value="Number">Number</option>
											<option value="Boolean">Boolean</option>
										</select>
								</td>
								<td>
									<AdminInput type={newType} value={newValue} handleChange={this.handleNewValueChange}/>
								</td>
								<td>
									---
								</td>
								<td>
									<button onClick={this.handleInsert} > Add </button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}
  }
}



class AdminGlobalConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.globalConfig.name || "",
			type: props.globalConfig.type,
			value: props.globalConfig.value || "",
    };
  }
	
  handleNameChange = name => {
    this.setState({ 
			name: name || ""
		});
  };

	handleTypeChange = e => {
		const type = e.target.value;
    this.setState({ 
			type: type || ""
		});
  };

	
	handleValueChange = value => {
    this.setState({ 
			value: value || ""
		});
  };

	
  handleUpdate = () => {
    
		const { _id, name:propName, type:propType, value:propValue } = this.props.globalConfig;
    const { name: nameRaw, type, value } = this.state;
    const name = nameRaw.trim();

		
		if(name==propName) {
			updateGlobalConfigNoName.call( { _id, type, value }, err => {
				if (err) {
					AlertToaster.show({ message: String(err) });
					this.setState({
						name: propName,
						type: propType,
						value: propValue
					})
					return;
				}
			});
		} else {
			updateGlobalConfig.call( { _id, name, type, value }, err => {
				if (err) {
					AlertToaster.show({ message: String(err) });
					this.setState({
						name: propName,
						type: propType,
						value: propValue
					})
					return;
				}
			});
		}
    
  };

  
  render() {
    const { globalConfig } = this.props;
		const { name,value,type } = this.state;

		
		
    return (
      <tr>
        <td>
          <EditableText
            onChange={this.handleNameChange}
            value={name}
          />
        </td>
				<td>
					  <select value={type} onChange={this.handleTypeChange}>
							<option value="String">String</option>
							<option value="Number">Number</option>
							<option value="Boolean">Boolean</option>
						</select>
				</td>
        <td>
					<AdminInput type={type} value={value} handleChange={this.handleValueChange}/>
        </td>
				<td>
          {globalConfig.value}
        </td>
				<td>
          <button onClick={this.handleUpdate} > Update </button>
        </td>
      </tr>
    );
  }
}

class AdminInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }


	handleTextChange = value => {
    this.setState({ 
			value: value || ""
		});
		this.props.handleChange(value);
  };
	
	
	handleBooleanChange = e => {
		const value = String(e.target.checked);
    this.setState({ 
			value: value || ""
		});
		this.props.handleChange(value);
  };



	render() {
		const {type} = this.props;
		const {value} = this.state;
		
		
	
		
		return(
			
			<div>
				{type!="Boolean" ?
					<EditableText
						onChange={this.handleTextChange}
						value={value}
					/> :
					<input type="checkbox" 
						checked={value=="true"} 
						onChange={this.handleBooleanChange} 
					/>
				}
			</div>		
		)
	}
}