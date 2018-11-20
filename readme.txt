Great resource for Understanding Node
https://www.youtube.com/watch?v=TlB_eWDSMt4


module is a global object - is an object of type Module
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/sabask/Desktop/Search-Engine/app.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/sabask/Desktop/Search-Engine/node_modules',
     '/Users/sabask/Desktop/node_modules',
     '/Users/sabask/node_modules',
     '/Users/node_modules',
     '/node_modules' ]
}

app.js acts as a main module in the application
module.exports: {} => we add all modules to make them public. you can export a function or module

require = used to include modules

express()
{ [EventEmitter: app]
  _events: { mount: [Function: onmount] },
  _eventsCount: 1,
  _maxListeners: undefined,
  setMaxListeners: [Function: setMaxListeners],
  getMaxListeners: [Function: getMaxListeners],
  emit: [Function: emit],
  addListener: [Function: addListener],
  on: [Function: addListener],
  prependListener: [Function: prependListener],
  once: [Function: once],
  prependOnceListener: [Function: prependOnceListener],
  removeListener: [Function: removeListener],
  off: [Function: removeListener],
  removeAllListeners: [Function: removeAllListeners],
  listeners: [Function: listeners],
  rawListeners: [Function: rawListeners],
  listenerCount: [Function: listenerCount],
  eventNames: [Function: eventNames],
  init: [Function: init],
  defaultConfiguration: [Function: defaultConfiguration],
  lazyrouter: [Function: lazyrouter],
  handle: [Function: handle],
  use: [Function: use],
  route: [Function: route],
  engine: [Function: engine],
  param: [Function: param],
  set: [Function: set],
  path: [Function: path],
  enabled: [Function: enabled],
  disabled: [Function: disabled],
  enable: [Function: enable],
  disable: [Function: disable],
  acl: [Function],
  bind: [Function],
  checkout: [Function],
  connect: [Function],
  copy: [Function],
  delete: [Function],
  get: [Function],
  head: [Function],
  link: [Function],
  lock: [Function],
  'm-search': [Function],
  merge: [Function],
  mkactivity: [Function],
  mkcalendar: [Function],
  mkcol: [Function],
  move: [Function],
  notify: [Function],
  options: [Function],
  patch: [Function],
  post: [Function],
  propfind: [Function],
  proppatch: [Function],
  purge: [Function],
  put: [Function],
  rebind: [Function],
  report: [Function],
  search: [Function],
  source: [Function],
  subscribe: [Function],
  trace: [Function],
  unbind: [Function],
  unlink: [Function],
  unlock: [Function],
  unsubscribe: [Function],
  all: [Function: all],
  del: [Function],
  render: [Function: render],
  listen: [Function: listen],
  request: IncomingMessage { app: [Circular] },
  response: ServerResponse { app: [Circular] },
  cache: {},
  engines: {},
  settings:
   { 'x-powered-by': true,
     etag: 'weak',
     'etag fn': [Function: generateETag],
     env: 'development',
     'query parser': 'extended',
     'query parser fn': [Function: parseExtendedQueryString],
     'subdomain offset': 2,
     'trust proxy': false,
     'trust proxy fn': [Function: trustNone],
     view: [Function: View],
     views: '/Users/sabask/Desktop/Search-Engine/views',
     'jsonp callback name': 'callback' },
  locals:
   { settings:
      { 'x-powered-by': true,
        etag: 'weak',
        'etag fn': [Function: generateETag],
        env: 'development',
        'query parser': 'extended',
        'query parser fn': [Function: parseExtendedQueryString],
        'subdomain offset': 2,
        'trust proxy': false,
        'trust proxy fn': [Function: trustNone],
        view: [Function: View],
        views: '/Users/sabask/Desktop/Search-Engine/views',
        'jsonp callback name': 'callback' } },
  mountpath: '/' }



//Rules to follow:
- canonicalize URL’s
- If L is not to an HTML page (.gif, .jpeg, .ps, .pdf, .ppt, etc.)
􏰂 continue loop.
- If cannot download P (e.g. 404 error, robot excluded)
􏰂 continue loop.
- Index P (e.g. add to inverted index or store cached copy).
- Parse P to obtain list of new links N
- Remove links to other sites from Q
- Must complete relative URL’s using current page URL
- Internal page fragments (ref’s) removed (#)
- Extract anchor text (between <a> and </a>) of each link followed.
- keep inlinks track for a page visited multiple times
