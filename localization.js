var showdown  = require('showdown'),
converter = new showdown.Converter();

module.exports = function(grunt) {
    return {
      options: {
        tpl:{
		  index: 'src/tpl/index.html',
		  offline: 'src/tpl/index.html',
		  readme: 'src/tpl/readme.md',
		  welcome: 'src/tpl/readme.md',
		  about: 'src/tpl/about.md'
		},
		renderer: function(k, v) {
		  var ctx = this.ctx,
			  arr = /^@.+\.(\w{2,4})$/i.exec(k);
		  if(!!arr) {
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
			v = arr[1].toLowerCase()==='md'?converter.makeHtml(mdString):mdString;
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
      offline: {
        files: {
          'dist/index.html': ['src/lang/en-US/main.json','src/lang/en-US/offline.json'],
          'dist/index_zh-CN.html': ['src/lang/en-US/main.json','src/lang/zh-CN/main.json','src/lang/en-US/offline.json','src/lang/zh-CN/offline.json']
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
          'dist/WELCOME.md': ['src/lang/en-US/welcome.json'],
          'dist/WELCOME_zh-CN.md': ['src/lang/zh-CN/welcome.json']
        }
	  },
      about: {
        files: {
          'dist/ABOUT.md': ['src/lang/en-US/main.json','src/lang/en-US/offline.json'],
          'dist/ABOUT_zh-CN.md': ['src/lang/en-US/main.json','src/lang/zh-CN/main.json','src/lang/zh-CN/offline.json']
        }
	  }
    };
  };