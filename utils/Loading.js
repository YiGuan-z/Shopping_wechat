Function.prototype.before = function(fun){
	var self = this;
	return function(){
		fun.apply(this,arguments);
		return self.apply(this, arguments)
	}
}
Function.prototype.around = function(fun){
	var self = this;
	return function(){
		return self.apply(this, arguments);
	}
}
