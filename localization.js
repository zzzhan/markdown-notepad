var showdown  = require('showdown'),
converter = new showdown.Converter();

module.exports = function(grunt) {
    return {
      options: {
        tpl:{
		  index: 'src/tpl/index.html',
		  readme: 'src/tpl/readme.md',
		  welcome: 'src/tpl/readme.md'
		},
		renderer: function(k, v) {
		  var flag = /@.+\.md$/.test(k),
		  ctx = this.ctx;
		  if(flag) {
			var ret = /_(\w{2}\-\w{2})\.\w{2,4}/i.exec(ctx.dest),lang='en-US',
			filename=k.substring(1),
			defPath='src/lang/'+lang+'/'+filename;
			if(!!ret) {
			  lang = ret[1];
			}
			var path = 'src/lang/'+lang+'/'+filename,
			mdString=null;
			console.log(path);
			if(grunt.file.exists(path)) {
			  mdString = grunt.file.read(path);
			} else {
			  mdString = grunt.file.read(defPath);				
			}
			v = converter.makeHtml(mdString);
		  }
		  return v;
		}
      },
      index: {
        files: {
          'index.html': ['src/lang/en-US/main.json'],
          'index_zh-CN.html': ['src/lang/en-US/main.json','src/lang/zh-CN/main.json']
        }
	  },
      readme: {
        files: {
          'README.md': ['src/lang/en-US/main.json','src/lang/en-US/readme.json'],
          'README_zh-CN.md': ['src/lang/zh-CN/main.json','src/lang/zh-CN/readme.json']
        }
	  },
      welcome: {
        files: {
          'WELCOME.md': ['src/lang/en-US/welcome.json'],
          'WELCOME_zh-CN.md': ['src/lang/zh-CN/welcome.json']
        }
	  }
    };
  };