var doc = app.activeDocument;
var doc_name = doc.name;

var tpl_path = "~/Work/js/template/";
function readTpl(name){
	var filename = tpl_path+name;
	var file = new File(filename);
	file.open('r');
	var tplContent = file.read();
	file.close();
	return tplContent;
}

var UILabel = readTpl('UILabel.tpl');

function proc_group(layers){
	for(var i=0; i<layers.length; i++){
		var layer = layers[i]; 

		//	忽略不可见层
		if( ! layer.visible ) {
			continue;
		}

		if( layer instanceof LayerSet){
			//	遍历组
			proc_group(layer.layers);
		}
		else{
			proc_layer(layer);
		}
	}
}

function proc_layer(art_layer){
	var parsed_info = new object();
	//	解析名称
	var name = art_layer.name;
	var b = art_layer.bounds;
	parsed_info.x = b[0];
	parsed_info.y = b[1];
	parsed_info.w = b[2] - b[0];
	parsed_info.h = b[3] - b[1];

	if( LayerKind.TEXT == art_layer.kind){
		//	文本
		return;
	}
	
	parsed_info.classname = getClassName(name);
	parsed_info.name = getInstanceName(name);
	//getAttr(name);
	alert(substitute(UILabel, parsed_info));
}

//	C++对象
function object(){
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.name = '';
	this.classname = '';
}

//	获取类型名
function getClassName(string){
	var re = /\<(.*)\>/;
	var result = re.exec(string);
	if( null != result){
		return result[1];
	}
	return null;
}

//	获取实例名
function getInstanceName(string){
	var re = /\((.*)\)/;
	var result = re.exec(string);
	if( null != result ){
		return result[1];
	}
	return null;
}

//	获取属性
function getAttr(string){
	var re = /(\{.*\})/;
	var result = re.exec(string);
	if( null != result ){
		var code = "(function(){return "+ result[1] + ";}())";
		var attr = eval(code);
		return attr;
	}
	return null;
}

function substitute(str, obj){
	if(!(Object.prototype.toString.call(str) === '[object String]')){
		return '';
	}

	if(!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)){
		return str;
	}

	return str.replace(/\{([^{}]+)\}/g, function(match, key){
		var value = obj[key];
		return ( value !== undefined) ? ''+value :'';
	});
}

//	遍历所有的层
proc_group(doc.layers);

//	保存
var dest_file = "~/Work/js/"+doc_name;
var file = new File(dest_file);
file.open("w");
file.write("dotboy");
file.close();

