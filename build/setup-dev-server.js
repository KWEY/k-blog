const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MFS = require('memory-fs');
const chokidar = require('chokidar');
const clientConfig = require('./webpack.client.config')();
const serverConfig = require('./webpack.server.config')();

const readFile = (fss, file) => {
  try {
    console.log(fs.readFileSync);
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
  } catch (e) {
    console.log(e);
  }
};

module.exports = (app, templatePath, cb) => {
  let bundle;
  let template;
  let clientManifest;
  let ready;
  const readyPromise = new Promise(r => { ready = r });
  const update = () => {
    if (bundle && clientManifest) {
      ready();
      cb(bundle, {
        template,
        clientManifest
      });
    }
  };

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8');
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    console.log('index.html template updated.');
    update();
  });

  // 修改客户端配置添加 热更新中间件
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  // DEV Middleware
  const clientCompiler = webpack(clientConfig); // 执行webpack
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(devMiddleware);

  // 监听执行完webpack
  clientCompiler.plugin('done', stats => {
    const stat = stats.toJson();
    stat.errors.forEach(err => console.error(err));
    stat.warnings.forEach(err => console.warn(err));
    if (stat.errors.length) return;

    // const fs = devMiddleware.fileSystem;
    // const filePath = path.join(clientConfig.output.path, 'index.html'); // 模板为打包后的html文件
    // if (fs.existsSync(filePath)) {
    //   template = fs.readFileSync(filePath, 'utf-8');
    // }
    console.log(devMiddleware.fileSystem, 'clientCompiler');
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ));
    update();
  });

  // HOT Middleware
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));

  // 监听 server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS(); // 内存文件系统，在JavaScript对象中保存数据。
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    const stat = stats.toJson();
    stat.errors.forEach(err => console.error(err));
    stat.warnings.forEach(err => console.warn(err));
    if (stat.errors.length) return;

    // 读取使用vue-ssr-webpack-plugin生成的bundle（vue-ssr-bundle.json）
    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-bundle.json');
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    if (template) {
      update();
    }
  });

  return readyPromise;
};
