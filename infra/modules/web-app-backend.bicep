// =====================================================
// Web App — Backend (privado)
// =====================================================
// Hospeda o Express/Node via iisnode.
// Privado: Access Restriction default Deny all.
// As regras de allowlist com os outbound IPs do frontend
// são aplicadas em script pós-deploy (post-deploy.sh / .ps1)
// porque dependem do Web App do front já existir.
// =====================================================

@description('Nome do Web App.')
param name string

@description('Região Azure.')
param location string

@description('Resource ID do App Service Plan.')
param planId string

@description('Versão do Node (formato: ~18, ~20).')
param nodeVersion string

@description('App Settings (env vars). Lista de { name, value }.')
param appSettings array

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
      alwaysOn: false
      nodeVersion: nodeVersion
      appSettings: appSettings
      // Access Restriction inicial: nega todo tráfego SCM/main exceto
      // o que for adicionado depois pelo script post-deploy.
      // Marcar default action = Deny exige ao menos uma allow rule;
      // por isso deixamos o default permissivo aqui e o script
      // post-deploy substitui pelo Deny + allowlist do front.
      ipSecurityRestrictionsDefaultAction: 'Allow'
      scmIpSecurityRestrictionsUseMain: false
    }
  }
}

output defaultHostName string = webApp.properties.defaultHostName
output webAppId string = webApp.id
output webAppName string = webApp.name
