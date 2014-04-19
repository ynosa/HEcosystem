
System.paths['HEcosystem/*'] = 'lib/*.js';
System.paths['npm:*'] = 'jspm_packages/npm/*.js';
System.paths['github:*'] = 'jspm_packages/github/*.js';

System.map = {
  'npm:d3': 'npm:d3@^3.4.5',
  'underscore': 'npm:underscore@^1.6.0',
  'npm:dat-gui': 'npm:dat-gui@^0.5.0',
  'npm:galaxy': 'npm:galaxy@^0.1.4',
  'jquery': 'npm:jquery@^2.1.0',
  'npm:rxjs': 'npm:rxjs@^1.0.10621',
  'npm:d3@3.4.5': {
    'jsdom': 'npm:jsdom@0.5.7'
  },
  'npm:jsdom@0.5.7': {
    'htmlparser': 'npm:htmlparser@1',
    'nwmatcher': 'npm:nwmatcher@^1.3.1',
    'cssom': 'npm:cssom@^0.2.5',
    'request': 'npm:request@2',
    'cssstyle': 'npm:cssstyle@^0.2.3',
    'contextify': 'npm:contextify@^0.1.5'
  },
  'npm:request@2.34.0': {
    'mime': 'npm:mime@^1.2.9',
    'node-uuid': 'npm:node-uuid@1.4',
    'forever-agent': 'npm:forever-agent@0.5',
    'qs': 'npm:qs@0.6',
    'json-stringify-safe': 'npm:json-stringify-safe@5.0'
  },
  'npm:contextify@0.1.7': {
    'bindings': 'npm:bindings@^1.2.0',
    'nan': 'npm:nan@0.8'
  },
  'npm:cssstyle@0.2.11': {
    'cssom': 'npm:cssom@0.3'
  },
  'github:jspm/nodelibs@0.0.2': {
    'inherits': 'npm:inherits@^2.0.1',
    'ieee754': 'npm:ieee754@^1.1.1',
    'base64-js': 'npm:base64-js@^0.0.4',
    'Base64': 'npm:Base64@0.2',
    'json': 'github:systemjs/plugin-json@master'
  }
};

System.versions = {
  'npm:d3': '3.4.5',
  'github:jspm/nodelibs': '0.0.2',
  'npm:jsdom': '0.5.7',
  'npm:htmlparser': '1.7.7',
  'npm:nwmatcher': '1.3.3',
  'npm:cssom': [
    '0.2.5',
    '0.3.0'
  ],
  'npm:request': '2.34.0',
  'npm:cssstyle': '0.2.11',
  'npm:contextify': '0.1.7',
  'npm:mime': '1.2.11',
  'npm:node-uuid': '1.4.1',
  'npm:forever-agent': '0.5.2',
  'npm:qs': '0.6.6',
  'npm:json-stringify-safe': '5.0.0',
  'npm:bindings': '1.2.0',
  'npm:nan': '0.8.0',
  'npm:inherits': '2.0.1',
  'npm:ieee754': '1.1.3',
  'npm:base64-js': '0.0.4',
  'npm:Base64': '0.2.1',
  'github:systemjs/plugin-json': 'master',
  'npm:underscore': '1.6.0',
  'npm:dat-gui': '0.5.0',
  'npm:galaxy': '0.1.4',
  'npm:jquery': '2.1.0',
  'npm:rxjs': '1.0.10621'
};

