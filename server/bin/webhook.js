const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/', secret: 'root' })
// 上面的 secret 保持和 GitHub 后台设置的一致

handler.on('error', function(err) {
  console.error('Error:', err.message)
})

handler.on('push', function(event) {
  const name = event.payload.repository.name
  console.log('Received a push event for %s to %s', name, event.payload.ref)
  // console.log(event);
  switch (name) {
    case 'test':
      runCmd('sh', ['./test.sh', name], function(text) {
        console.log(text)
      })
      break
    case 'k-blog':
      runCmd('sh', ['./deploy.sh', name], function(text) {
        console.log(text)
      })
      break
    default:
      break
  }
})

function runCmd(cmd, args, callback) {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  let resp = ''
  child.stdout.on('data', function(buffer) {
    resp += buffer.toString()
  })
  child.stdout.on('end', function() {
    callback(resp)
  })
}

http
  .createServer(function(req, res) {
    handler(req, res, function() {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(7777)
