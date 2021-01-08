// import {black, red, bold, italic, strikethrough, bgBlue} from 'colorette'
const _ = require('colorette'); 

console.log(_.red(_.bold('Hello, world!')));
console.log(_.red(_.strikethrough(_.bold('Hello, world!'))));
console.log(_.bgCyanBright('Hello, world!'));
console.log(_.italic('Hello, world!'));
console.log(_.dim('Hello, world!'));
