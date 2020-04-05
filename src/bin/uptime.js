// Imports the Google Cloud client library
const monitoring = require('@google-cloud/monitoring')

// Creates a client
const client = new monitoring.UptimeCheckServiceClient()

const projectId = 'YOUR_PROJECT_ID'
const hostname = 'mydomain.com'

const request = {
  // i.e. parent: 'projects/my-project-id'
  parent: client.projectPath(projectId),
  uptimeCheckConfig: {
    displayName: 'My Uptime Check',
    monitoredResource: {
      // See the Uptime Check docs for supported MonitoredResource types
      type: 'uptime_url',
      labels: {
        host: hostname,
      },
    },
    httpCheck: {
      path: '/',
      port: 80,
    },
    timeout: {
      seconds: 10,
    },
    period: {
      seconds: 300,
    },
  },
}

// Creates an uptime check config for a GCE instance
const [uptimeCheckConfig] = await client.createUptimeCheckConfig(request)
console.log('Uptime check created:')
console.log(`ID: ${uptimeCheckConfig.name}`)
console.log(`Display Name: ${uptimeCheckConfig.displayName}`)
console.log('Resource: %j', uptimeCheckConfig.monitoredResource)
console.log('Period: %j', uptimeCheckConfig.period)
console.log('Timeout: %j', uptimeCheckConfig.timeout)
console.log(`Check type: ${uptimeCheckConfig.check_request_type}`)
console.log(
  'Check: %j',
  uptimeCheckConfig.httpCheck || uptimeCheckConfig.tcpCheck,
)
console.log(
  `Content matchers: ${uptimeCheckConfig.contentMatchers
    .map(matcher => matcher.content)
    .join(', ')}`,
)
console.log(`Regions: ${uptimeCheckConfig.selectedRegions.join(', ')}`)
