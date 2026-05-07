// =====================================================
// Web App — Frontend (público)
// =====================================================
// Hospeda o build estático (dist/) do React/Vite.
// IIS aplica o web.config (rewrite /api/* -> backend).
// HTTPS Only, FTPS desabilitado.
// =====================================================

@description('Nome do Web App.')
param name string

@description('Região Azure.')
param location string

@description('Resource ID do App Service Plan.')
param planId string

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: name
  location: location
  kind: 'app'
  properties: {
    serverFarmId: planId
    httpsOnly: true
    siteConfig: {
      ftpsState: 'Disabled'
      minTlsVersion: '1.2'
      http20Enabled: true
      alwaysOn: false  // B1 não suporta alwaysOn em todos os tiers
      defaultDocuments: [
        'index.html'
      ]
    }
  }
}

output defaultHostName string = webApp.properties.defaultHostName
output possibleOutboundIps string = webApp.properties.possibleOutboundIpAddresses
output webAppId string = webApp.id
output webAppName string = webApp.name
