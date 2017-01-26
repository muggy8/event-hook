# event-hook
Event Hook lets you broadcast events and subscribe to them in javascript
This is curently a work in progress...

Target API:
<pre>
	var eventSpace = new EventHook(eventHookConfigs);
	
	// some player logic ... 
	
	player.takeDamage = function(amount){
		var me = this;
		var broadcastData = {unit: me, change:-amount}
		eventSpace.broadcast("changeHealth", broadcastData);
		this.health -= amount;
	}
	
	// some UI lifebar logic ...
	
	eventSpace.subscribe("changeHealth", function(broadcastedData){
		if (player.prototype.isPrototypeOf(broadcastedData.unit)){
			// update the health bar 
		}
	})
</pre>