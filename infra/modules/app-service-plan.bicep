// =====================================================
// App Service Plan (Windows)
// =====================================================
// 1 plano compartilhado entre frontend e backend.
// Para o evento (B1): 1 instância, sem auto-scale.
// =====================================================

@description('Nome do App Service Plan.')
param name string

@description('Região Azure.')
param location string

@description('SKU do plano.')
param sku string

// Map SKU code → tier name (inline porque user-defined functions exigem Bicep ≥ 0.42)
var tier = startsWith(sku, 'B') ? 'Basic' : (startsWith(sku, 'S') ? 'Standard' : (startsWith(sku, 'P') ? 'PremiumV3' : 'Free'))

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: name
  location: location
  sku: {
    name: sku
    tier: tier
  }
  kind: 'app'
  properties: {
    reserved: false  // false = Windows
  }
}

output planId string = appServicePlan.id
output planName string = appServicePlan.name
