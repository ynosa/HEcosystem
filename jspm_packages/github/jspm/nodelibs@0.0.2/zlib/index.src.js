function error(){var t=[].slice.call(arguments).join(" ");throw new Error([t,"we accept pull requests","http://github.com/brianloveswords/zlib-browserify"].join("\n"))}var Zlib=module.exports=require("./zlib");["createGzip","createGunzip","createDeflate","createDeflateRaw","createInflate","createInflateRaw","createUnzip","Gzip","Gunzip","Inflate","InflateRaw","Deflate","DeflateRaw","Unzip","inflateRaw","deflateRaw"].forEach(function(t){Zlib[t]=function(){error("sorry,",t,"is not implemented yet")}});var _deflate=Zlib.deflate,_gzip=Zlib.gzip;Zlib.deflate=function(t,e){return _deflate(Buffer(t),e)},Zlib.gzip=function(t,e){return _gzip(Buffer(t),e)};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/zlib\index.src.js.map