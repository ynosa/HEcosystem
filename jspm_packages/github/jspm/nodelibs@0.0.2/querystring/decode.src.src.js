// Copyright Joyent, Inc. and other Node contributors.
"use strict";function hasOwnProperty(t,e){return Object.prototype.hasOwnProperty.call(t,e)}module.exports=function(t,e,r,n){e=e||"&",r=r||"=";var o={};if("string"!=typeof t||0===t.length)return o;var s=/\+/g;t=t.split(e);var i=1e3;n&&"number"==typeof n.maxKeys&&(i=n.maxKeys);var E=t.length;i>0&&E>i&&(E=i);for(var a=0;E>a;++a){var u,S,_,p,l=t[a].replace(s,"%20"),f=l.indexOf(r);f>=0?(u=l.substr(0,f),S=l.substr(f+1)):(u=l,S=""),_=decodeURIComponent(u),p=decodeURIComponent(S),hasOwnProperty(o,_)?Array.isArray(o[_])?o[_].push(p):o[_]=[o[_],p]:o[_]=p}return o};