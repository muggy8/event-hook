(function(context){
	
	/*var defaultConfig = {
		
	}*/
	
	var EventHook = context.EventHook = function(/*config*/){
		/*config = config || {};*/
		var self = this;
		/*var instanceConfigs = {};
		
		Object.keys(defaultConfig).forEach(function(key, keyIndex, keyCollection){
			instanceConfigs[key] = defaultConfig[key]
		})
		Object.keys(config).forEach(function(key, keyIndex, keyCollection){
			instanceConfigs[key] = config[key];
		})*/
		
		var subscription = {}; 
		/* example
		{
			changeHalth:[callback1, callback2, callback3],
			changeTarget:[callback1, callback2]
		}
		*/
		
		self.subscribe = self.on = function(nameSpace, callback){
			subscription[nameSpace] = subscription[nameSpace] || [];
			subscription[nameSpace].push(callback);
		}
		
		self.broadCast = self.emit = function(nameSpace, data){
			data = data || {}
			if (subscription[nameSpace]){
				subscription[nameSpace].forEach(function(callback){
					callback(data);
				})
			}
		}
		
		self.unsubscribe = self.off = function(nameSpace, callback){
			subscription[nameSpace].forEach(function(subscriber, subscriberIndex, subscriberList){
				if (subscriber == callback){
					subscriberList.splice(subscriberIndex, 1);
				}
			})
		}
	}
	
	/*EventHook.setConfigs = function(config){
		Object.keys(config).forEach(function(key, keyIndex, keyCollection){
			defaultConfig[key] = config[key];
		})
	}*/
	
	if (typeof module != 'undefined' ) {module.exports = context.EventHook};
})(this)