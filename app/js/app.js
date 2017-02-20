var routingViews = angular.module('routingViews', ['ui.router']);

//mod no html5 storare pra comportar objetos json
Storage.prototype.setObj = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObj = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}
