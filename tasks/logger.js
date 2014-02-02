/*
 * Grunt Task File
 * ---------------
 *
 * Task: logger
 * Description: A grunt task that writes the release logs into logger file. (useful for config files, etc).
 *
 */
'use strict';

var cli = require('grunt/lib/grunt/cli'),
	fs = require('fs'),
	path = require('path');

module.exports = function(grunt) {
	var util = grunt.util || grunt.utils,
		_ = util._;

	grunt.registerMultiTask("logger", "Create build release log file.", function() {
		var options = this.data,
			dist = options.dist,
			log = new Date() + ' : ' + options.log,
			strMessage = new Date() + ' : ' + '',
			arrDir = dist.split('/'),
			fileName = dist.substring(dist.lastIndexOf('/')),
			file,
			filePath = '';

		arrDir.splice(arrDir.length - 1, 1);
		_.forEach(arrDir, function(dir, idx){
			filePath = path.join(filePath, dir);
			if (!fs.existsSync(filePath)) {
	            fs.mkdirSync(filePath, '0777', true);
	        }
		});		

        if(fileName){
        	file = path.join(filePath, fileName);
        	fs.existsSync(file) ? fs.appendFileSync(file, '\r\n' + log) : fs.writeFileSync(file, log);
        }
    });
};
