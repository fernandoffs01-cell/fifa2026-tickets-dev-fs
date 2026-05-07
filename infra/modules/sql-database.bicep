// =====================================================
// Azure SQL Server + Database
// =====================================================
// Servidor lógico + 1 banco "FIFA2026Tickets".
// Firewall:
//   - Default: bloqueia tudo
//   - Adiciona regra para permitir Azure services (necessário
//     para o backend Web App acessar via outbound IPs Azure).
// Para produção real: trocar por Private Endpoint.
// =====================================================

@description('Nome do servidor SQL (sem .database.windows.net).')
param serverName string

@description('Nome do database.')
param databaseName string

@description('Região Azure.')
param location string

@description('Login admin (SQL auth).')
param adminLogin string

@description('Senha admin.')
@secure()
param adminPassword string

@description('SKU da database.')
param skuName string

resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: serverName
  location: location
  properties: {
    administratorLogin: adminLogin
    administratorLoginPassword: adminPassword
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    version: '12.0'
  }
}

resource sqlDb 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  parent: sqlServer
  name: databaseName
  location: location
  sku: {
    name: skuName
    tier: skuName == 'Basic' ? 'Basic' : 'Standard'
  }
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: skuName == 'Basic' ? 2147483648 : 268435456000
    zoneRedundant: false
  }
}

// Permite que outros serviços Azure (Web Apps) cheguem ao SQL.
// Para apertar: trocar por Private Endpoint + VNet integration.
resource fwAllowAzure 'Microsoft.Sql/servers/firewallRules@2023-08-01-preview' = {
  parent: sqlServer
  name: 'AllowAllAzureServices'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

output serverFqdn string = sqlServer.properties.fullyQualifiedDomainName
output serverName string = sqlServer.name
output databaseName string = sqlDb.name
