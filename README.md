# event-hook
Event Hook lets you broadcast events and subscribe to them in javascript

## Why?!
Doesn't javascript have an extremely well done and robust event system? why does this even exists? Well the main reason is to we can seperate code to where we need them and keep logic where they should be. Consider the following scenario:

```
	var myData = someReallyComplicatedFunction(settings); // assuming synchronous opperation
	
	if (myData) {
		// I have succeeded in my opperation and I will now let all my friends know that the data is good
		friendfn1(myData)
		friendfn2(myData)
		friendfn3(myData)
		friendfn4(myData)
		friendfn5(myData)
	}
	else{
		// I have failed and now I must inform my friends of my failure
		friendfn1(false)
		friendfn2(false)
		friendfn3(false)
		friendfn4(false)
		friendfn5(false)
	}
```
	
that looks and sounds pretty stupid right especially if you need to add or remove from that huge list of friend functions? now consider the situation where the friendfnX, whicheverone it is, is a private function in another object. This is probably when you would start working with event emmiters and whatever which starts getting pretty tedious real fast and probably need to figure out how to get it to do what you want in the dreaded IEs of the world.

That's where this comes in. Event Hook is a tiny library (also works in node) that lets you hook callbacks to arbeturary events and is callback based (rather than event based) and you can subscribe to any string as an event name. When you broadcast an event, the library finds all the callbacks and calls them right away. Now you can keep all your objects nicely tucked away and private variables and functions private. 

## Cool how do I use it?

### var eventSpace = new EventHook();
Initialize your event space. yes you can have multiple. I dont know why you want that but hey it's supported. 

### eventSpace.subscribe(name, callback) || eventSpace.on(name, callback) 
stick a callback onto any arbeturary event name like `eventSpace.subscribe("healthChange", UI.playerHealth.update)` or `eventSpace.subscribe("enemyDeath", UI.playerExperiance.update)`. This function will be provided with 1 variable which is the data recieved from the broadcast/emit function or an empty object if none is provided.

### eventSpace.broadcast(name[, data]) || eventSpace.emit(name[, data])
You can put some data to be given to the event subscribers like 

```
player.takeDamage = function(amount){
	eventSpace.broadcast("healthChange", {
		unit:player,
		amount:-amount
	})
	player.health -= amount;
}
```

or give them nothing and just let them know that you've hit that event 

```
enemyProto.destroy = function (){
	// do some logic to remove youself from memory and the DOM/canvas
	eventSpace.broadcast("enemyDeath")
}
```

### eventSpace.unsubscribe(name, callback) || eventSpace.off(name, callback)
This functions filters through the events currently and gets rid of all the functions that matches the callback's reference. NOTE: you can only do this to referenced callbacks not anonmyous functions