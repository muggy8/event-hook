(function(context){
	
	var defaultConfig = {
		
	}
	
	var EventHook = context.EventHook = function(config){
		var instanceConfigs = {};
		Object.keys(defaultConfig).forEach(function(key, keyIndex, keyCollection){
			instanceConfigs[key] = defaultConfig[key]
		})
		Object.keys(config).forEach(function(key, keyIndex, keyCollection){
			instanceConfigs[key] = config[key];
		})
		
	}
	
	EventHook.setConfigs = function(config){
		Object.keys(config).forEach(function(key, keyIndex, keyCollection){
			defaultConfig[key] = config[key];
		})
	}
	
	if (typeof module != 'undefined' ) {module.exports = context.EventHook};
})(this)