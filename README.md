# tinyAMD
AMD library (like RequireJS) but in 100 strings

Just for fun - AMD loader with shim config (for non-AMD libraries like JQuery) in <100 strings

## Using (RequireJS syntax)

```
define(['modules/moduleA.js','modules/moduleB.js','underscore'], function(a, b, _) {
    var instanceA = new a(),
        instanceB = new b(); 
 ... using a,b,_ here ....
});
```

## shim

```
tinyAMD.shim = {
		jQuery: {
			exports: "jQuery",
			paths:'vendor/jquery-2.1.4.min.js'
		},
		underscore:{
			exports:"_",
			paths:'vendor/underscore.js'
		}
};
```