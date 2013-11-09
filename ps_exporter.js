var doc = app.activeDocument;
var doc_name = doc.name;

//	模版文件的路径
var tpl_save_path = "E:/PS_Export/template/";
//var tpl_save_path = "~/Work/PS_Export/template/";

//	输出文件的路径
var dest_file = "E:/yoyo/ps导出/"+doc_name.replace('psd', 'h');
//var dest_file = "/Users/dotboy/Work/ps导出/"+doc_name.replace('psd', 'h');

//	导出图片的路径
var save_path = "E:/yoyo/ps导出/";   
//var save_path = "/Users/dotboy/Work/ps导出/";

function readTpl(name){
	var filename = tpl_save_path+name;
	var file = new File(filename);
	file.open('r');
	var tplContent = file.read();
	file.close();
	return tplContent;
}

var header = readTpl('header.tpl');
var footer = readTpl('footer.tpl');
var UILabel = readTpl('UILabel.tpl');
var UIButton = readTpl('UIButton.tpl');
var UITextField = readTpl('UITextField.tpl');
var UIImageView = readTpl('UIImageView.tpl');

header = substitute(header, new object);

function proc_group(layers){
	for(var i=0; i<layers.length; i++){
		var layer = layers[i]; 

		//	忽略不可见层
		if( ! layer.visible ) {
			continue;
		}
		/*
		if( layer instanceof LayerSet){
			//	遍历组
			proc_group(layer.layers);
		}
		else{
			proc_layer(layer);
		}*/
		proc_layer(layer);
	}
}

function proc_layer(art_layer){
	var parsed_info = new object();
	//	解析名称
	var name = art_layer.name;
	var b = art_layer.bounds;
	parsed_info.x = parseInt(b[0])/2;
	parsed_info.y = parseInt(b[1])/2;
	parsed_info.w = parseInt(b[2] - b[0])/2;
	parsed_info.h = parseInt(b[3] - b[1])/2;
	//	retina屏
	parsed_info.y = parsed_info.y -64;
	parsed_info.classname = getClassName(name);
	parsed_info.name = getInstanceName(name);
	var attr = getAttr(name);
	
	if( null != attr){
		for(var key in attr){
			parsed_info[key] = attr[key];
		}
	}
	
	if( LayerKind.TEXT == art_layer.kind && null == parsed_info.classname){
		//	内容
		parsed_info.content = art_layer.textItem.contents.replace(/\r|\n/ig, "\\n");
		parsed_info.font = art_layer.textItem.font;
		parsed_info.fontsize = parseInt(art_layer.textItem.size)/2;
		//	颜色
		parsed_info.r = art_layer.textItem.color.rgb.red/255;
		parsed_info.g = art_layer.textItem.color.rgb.green/255;
		parsed_info.b = art_layer.textItem.color.rgb.blue/255;
		//	文本
		var code = substitute(UILabel, parsed_info);
		header += code;
		
		return;
	}
	
	var source_string = getSourceString(parsed_info.classname);
	var code = substitute(source_string, parsed_info);
	header += code;
	
	if( 'UIImageView' == parsed_info.classname || 'UITextField' == parsed_info.classname){
		art_layer.copy();
		var newDoc = app.documents.add(parsed_info.w*2, parsed_info.h*2, 72.0, "tmp", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
		newDoc.paste();
		image_name = parsed_info.normal;
		if( '' == image_name){
			image_name = "default";
		}
		save_png(newDoc, image_name);
		newDoc.close(SaveOptions.DONOTSAVECHANGES);
	}
}

//	保存
function save_png(doc, fileName){
    var saveOptions = new PNGSaveOptions();
    saveOptions.interlaced = true;
	fileName = fileName.replace(/\./,'@2x.');
    doc.saveAs(new File(save_path+fileName), saveOptions, true, Extension.LOWERCASE);
}
//	C++对象
function object(){
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.l = 1;
	this.name = '';
	this.classname = '';
	//this.ifName= 'LoginViewController';
	this.ifName=doc_name.substring(0,doc_name.lastIndexOf('.'));
	this.cgName=this.ifName+'Category';
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

//	获取源字符串
function getSourceString(string){
	var code = "(function(){return " +string+";}())";
	var ret = eval(code);
	return ret;
}

function substitute(str, obj){
	if(!(Object.prototype.toString.call(str) === '[object String]')){
		return '';
	}

	if(!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)){
		return str;
	}

	return str.replace(/\<([^<>]+)\>/g, function(match, key){
		var value = obj[key];
		return ( value !== undefined) ? ''+value :'';
	});
}

//	遍历所有的层
proc_group(doc.layers);

header += footer;
var file = new File(dest_file);
file.encoding="UTF-8";
file.lineFeed="windows";
file.open("w");
file.write('');
file.write(header);
file.close();


