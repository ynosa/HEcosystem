/*
 * Copyright (C) 2007-2014 Diego Perini
 * All rights reserved.
 *
 * this is just a small example to show
 * how an extension for NWMatcher could be
 * adapted to handle WebForms/HTML5 selectors
 *
 * Pseudo Selectors
 * :default, :indeterminate, :optional, :required,
 * :valid, :invalid, :in-range, :out-of-range,
 * :read-only, :read-write
 * :has, :matches (not yet in a defined specification)
 *
 */
NW.Dom.registerSelector("html5:pseudos",/^\:(default|indeterminate|optional|required|valid|invalid|in-range|out-of-range|read-only|read-write)(.*)/,function(t){return function(e,n){{var r=!0;t.Object({"default":4,indeterminate:4,invalid:4,valid:4,optional:4,required:4,"read-write":4,"read-only":4})}switch(e[1]){case"default":n='if(((typeof e.form!=="undefined"&&(/radio|checkbox/i).test(e.type))||/option/i.test(e.nodeName))&&(e.defaultChecked||e.defaultSelected)){'+n+"}";break;case"indeterminate":n='if(typeof e.form!=="undefined"&&(/radio|checkbox/i).test(e.type)&&s.select("[checked]",e.form).length===0){'+n+"}";break;case"optional":n='if(typeof e.form!=="undefined"&&typeof e.required!="undefined"&&!e.required){'+n+"}";break;case"required":n='if(typeof e.form!=="undefined"&&typeof e.required!="undefined"&&e.required){'+n+"}";break;case"read-write":n='if(typeof e.form!=="undefined"&&typeof e.readOnly!="undefined"&&!e.readOnly){'+n+"}";break;case"read-only":n='if(typeof e.form!=="undefined"&&typeof e.readOnly!="undefined"&&e.readOnly){'+n+"}";break;case"invalid":n='if(typeof e.form!=="undefined"&&typeof e.validity=="object"&&!e.validity.valid){'+n+"}";break;case"valid":n='if(typeof e.form!=="undefined"&&typeof e.validity=="object"&&e.validity.valid){'+n+"}";break;case"in-range":n='if(typeof e.form!=="undefined"&&(s.getAttribute(e,"min")||s.getAttribute(e,"max"))&&typeof e.validity=="object"&&!e.validity.typeMismatch&&!e.validity.rangeUnderflow&&!e.validity.rangeOverflow){'+n+"}";break;case"out-of-range":n='if(typeof e.form!=="undefined"&&(s.getAttribute(e,"min")||s.getAttribute(e,"max"))&&typeof e.validity=="object"&&(e.validity.rangeUnderflow||e.validity.rangeOverflow)){'+n+"}";break;default:r=!1}return t.Object({source:n,status:r})}}(this));
//# sourceMappingURL=jspm_packages/npm/nwmatcher@1.3.3/src/modules/nwmatcher-webforms.js.map