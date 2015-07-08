window.tinyAMD = (function() {
    this._loadScript = function(src,callback){
        var xmlhttp;
        if (window.XMLHttpRequest)  {
            xmlhttp = new XMLHttpRequest();
        } else {
            try {
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return;
            }
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp);
            }
        };

        xmlhttp.script_src = src;
        xmlhttp.open("GET", src , true);
        xmlhttp.send();
    };

    this._exec = function(parent,path,string) {
        var newModule = new Function('return ' + string)();
        newModule.parent = parent;
        newModule.name = path;
        if(!newModule.depPaths.length && newModule.parent){
                newModule.parent.addModuleResult(newModule);
        }
        return newModule;
    };

    this._defineShim = function(shimLib,callback){
        self._loadScript(shimLib.paths,function(xmlhttp){
            eval('(function() {' + xmlhttp.responseText + '}())');
            callback(window[shimLib.exports]);
        });
        
    };

    window.define = function(scripts, complete) {
        var  module = new tinyAMD.module(scripts,complete);
        module.loadDeps();
        return module;
    };

    return{

        shim :{},
        module:function(scripts, callback){
            this.args = [];
            this.depPaths = scripts;
            this.depsLoaded = [];
            this.callback = callback;

            this.execute = function(){
                if(this.parent){
                    this.parent.addModuleResult(this);
                }else{
                    return this.callback.apply(this, this.args);
                }
            };

            this.addModuleResult = function(module){
                this.args[this.depPaths.indexOf(module.name)] = module.callback.apply(module, module.args);
                this.depsLoaded.push(module.name);
                if(this.depsLoaded.length == this.depPaths.length)
                    this.execute();
            };

            this.loadDeps = function(){
                this.depPaths.forEach(function(dep,index){

                    if(tinyAMD.shim[dep]){

                        self._defineShim(tinyAMD.shim[dep],function(){
                            this.depsLoaded.push(tinyAMD.shim[dep].exports);
                            this.args[this.depPaths.indexOf(dep)] = window[tinyAMD.shim[dep].exports];
                            if(this.args.length == this.depsLoaded.length)
                                this.execute();
                        }.bind(this));

                    }else{

                        self._loadScript(dep,function(xmlhttp){
                            self._exec(this, xmlhttp.script_src,xmlhttp.responseText);
                        }.bind(this));
                        
                    }

                }.bind(this));
            };
        }
    };
})();