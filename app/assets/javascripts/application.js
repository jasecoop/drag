//= require jquery
//= require jquery_ujs

//= require_self
//= require react_ujs
//= require upload

React = require('react');
Parse = require('parse').Parse;
ParseReact = require('parse-react');

Parse.initialize("r2c7bhmqVSWUJz2XkdsVIgSMN6jXoOpNgdvN8ws7", "GF5EB7nZm3kKSAyn5Mv1cl41ZoO5XIRAhBeGOoPr");

classNames = require('classnames');

require('./components');

// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });
