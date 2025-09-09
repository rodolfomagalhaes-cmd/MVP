# COMPARTILHAÍ - Deploy Web

## 🌐 Versão Demonstração

Esta é uma versão completa do COMPARTILHAÍ preparada para deploy em servidores gratuitos, otimizada especialmente para iPad e dispositivos móveis.

## 🚀 Deploy Automático

### Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/compartilhai)

1. Conecte seu repositório GitHub ao Vercel
2. Configure as seguintes variáveis de ambiente:
   - `NODE_VERSION=18`
3. Deploy automático será feito

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

1. Conecte seu repositório ao Netlify
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Deploy automático será feito

## 📱 Características da Versão Demo

### ✅ Funcionalidades Implementadas
- **Autenticação Demo**: Sistema de login simulado com 3 usuários fictícios
- **Dados Mock**: Banco de dados simulado com condomínios, moradores e itens
- **API Mock**: Todas as chamadas de API funcionam localmente
- **PWA**: Progressive Web App instalável no iPad
- **Responsivo**: Interface otimizada para tablet e mobile
- **Offline**: Funciona sem internet após primeiro carregamento

### 👥 Usuários de Demonstração
1. **Maria Silva** - Apartamento 101
   - Email: maria@demo.compartilhai.com
   - Perfil: Proprietária de ferramentas e eletrônicos

2. **João Santos** - Apartamento 205  
   - Email: joao@demo.compartilhai.com
   - Perfil: Oferece itens de cozinha e esportes

3. **Ana Costa** - Apartamento 312
   - Email: ana@demo.compartilhai.com
   - Perfil: Especialista em itens domésticos

### 🏠 Dados Demo Inclusos
- **3 Condomínios** com diferentes configurações
- **8 Itens** variados para locação
- **Sistema de Reservas** totalmente funcional
- **Avaliações e Comentários** simulados
- **Chat entre Moradores** (interface)

## 🛠 Deploy Manual

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Comandos
```bash
# Clone o repositório
git clone <repository-url>
cd compartilhai

# Instale dependências
npm install

# Build para produção
npm run build

# Preview local (opcional)
npm run preview
```

### Arquivos de Deploy Inclusos
- `vercel.json` - Configuração para Vercel
- `netlify.toml` - Configuração para Netlify
- `public/manifest.json` - PWA manifest
- Ícones otimizados para PWA

## 🎯 Otimizações para iPad

### Interface Touch-Friendly
- Botões com tamanho mínimo de 44px
- Espaçamento adequado para gestos touch
- Navegação por swipe e tap
- Feedback visual em todas as interações

### Performance
- Lazy loading de imagens
- Bundle size otimizado
- Cache estratégico para assets
- Transições suaves e responsivas

### PWA Features
- Instalável na tela inicial
- Funciona offline
- Splash screen customizada
- Ícones adaptativos
- Modo standalone (sem barra do navegador)

## 🔗 URLs Importantes

Após o deploy, acesse:
- `/` - Página principal com login demo
- `/demo` - Informações sobre a demonstração
- `/dashboard` - Painel administrativo

## 📊 Métricas de Performance

### Lighthouse Score (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 85+
- PWA: 100

### Tamanho do Bundle
- JavaScript: ~200KB (gzipped)
- CSS: ~50KB (gzipped)
- Total: <500KB inicial

## 🔧 Configurações Importantes

### Headers de Cache (Vercel/Netlify)
```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Service Worker
- Cache first para assets estáticos
- Network first para dados dinâmicos
- Offline fallback configurado

## 🐛 Troubleshooting

### Build Falha
- Verificar Node.js versão 18+
- Limpar node_modules: `rm -rf node_modules && npm install`
- Verificar TypeScript: `npx tsc --noEmit`

### Deploy Falha
- Verificar build local: `npm run build`
- Verificar tamanho dos arquivos
- Checar logs do provedor (Vercel/Netlify)

### Performance Issues
- Otimizar imagens (WebP, tamanhos responsivos)
- Lazy loading implementado
- Code splitting configurado

## 🔄 Atualizações Futuras

Para converter em versão de produção:
1. Substituir mock APIs por endpoints reais
2. Implementar autenticação real (Google OAuth)
3. Conectar banco de dados real (PostgreSQL/MySQL)
4. Configurar sistema de pagamentos
5. Implementar notificações push

## 📞 Suporte

Esta é uma versão demonstração. Para implementação em produção ou customizações, entre em contato com a equipe de desenvolvimento.

---

**COMPARTILHAÍ Demo** - Economia colaborativa para condomínios
