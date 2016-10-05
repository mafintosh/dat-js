var Swarm = require('discovery-swarm')
var swarmDefaults = require('datland-swarm-defaults')

module.exports = function (archive, opts) {
  if (opts.discovery && typeof opts.discovery !== 'object') opts.discovery = {upload: true, download: true}

  var swarm = Swarm(swarmDefaults({
    id: archive.id,
    utp: opts.utp,
    tcp: opts.tcp,
    stream: function () {
      return archive.replicate({
        upload: opts.discovery.upload,
        download: opts.discovery.download
      })
    }
  }))

  swarm.once('error', function () {
    swarm.listen(0)
  })
  swarm.join(archive.discoveryKey)
  swarm.listen(opts.port || 3282)

  return swarm
}
