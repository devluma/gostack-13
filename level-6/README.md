# Estratégias de deploy

Nessa aula iniciaremos o módulo de deploy da aplicação backend do GoBarber e nele você aprenderá boa parte dos conceitos e ferramentas necessárias para fazer o deploy de qualquer projeto criado em Node.js. Lembre-se que a DigitalOcean não é um serviço gratuito mas atualmente é uma das melhores soluções para hospedagem, visto que você só paga pelo que usa.

# Gerando build do projeto

Antes de prosseguir de fato com o deploy da aplicação, precisamos configurar a forma com que o código é transpilado para JavaScript e também gerar o build da aplicação, pois é ele quem irá rodar no servidor e não a versão em TypeScript como acontece em ambiente de desenvolvimento.

Para isso, utilizaremos o babel ao invés do próprio tsc, isso porque o babel é mais rápido para essa tarefa, visto que precisaremos gerar um novo build a cada nova alteração no código.

Arquivo de configurações `babel.config.js`:

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@modules': './src/modules',
        '@config': './src/config',
        '@shared': './src/shared'
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
}
```

# Servidor Linux

Nessa aula iremos criar o nosso droplet na DigitalOcean (que é como são chamados os servidores lá) e configurar a chave ssh para conseguirmos acessar posteriormente o servidor a partir da nossa máquina.

Se você estiver usando o Windows 10, provavelmente vai conseguir fazer o acesso via ssh a partir do terminal assim como no Linux. Caso não funcione, você pode usar esse guia da própria DigitalOcean para realizar o acesso: [Guia de conexão com Putty](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/putty/).

# SSH 
[No Windows](https://www.notion.so/SSH-no-Windows-c6091c09aeca4555b0bbe00447a8ebd8)

# Configurando servidor

Agora que temos o servidor criado, é hora de configurar algumas coisas no próprio Linux, instalar o Node.js na sua versão LTS e a versão 1.xx.x do Yarn para que possamos manusear a aplicação quando estiver dentro do droplet.

# Clone da aplicação

Nessa aula iremos realizar o clone da aplicação que está no GitHub para dentro do droplet e instalar as dependências usando o Yarn. Como ainda não temos os containers do Docker instalados, a aplicação ainda não irá funcionar, mas esse será o único passo necessário para que ela funcione após termos gerado a build.

# Serviços do Docker

Nessa aula iremos configurar os serviços do Docker usados pela nossa aplicação que são os containers do PostgreSQL, MongoDB e Redis.

Aqui também aplicaremos algumas estratégias na configuração da conexão com os containers, já pensando em mais segurança afim de evitar possíveis ataques.

## Para instalar o PostgreSQL
```bash
docker run -d --name postgresql -e POSTGRESQL_PASSWORD=SUA_SENHA -e POSTGRESQL_USERNAME=USUARIO_DA_CONEXAO -e POSTGRESQL_DATABASE=gobarber -p PORTA_EXTERNA:5432 bitnami/postgresql:latest
```

## Para instalar o MongoDB
```bash
docker run -d --name mongodb -e MONGODB_USERNAME=USUARIO_DA_CONEXAO -e MONGODB_PASSWORD=SUA_SENHA -e MONGODB_DATABASE=gobarber -p PORTA_EXTERNA:27017 bitnami/mongodb:latest
```

## Para instalar o Redis
```bash
docker run -d --name redis -e REDIS_PASSWORD=SUA_SENHA -p PORTA_EXTERNA:6379 bitnami/redis:latest
```

# Proxy Reverso do NGINX

Com a aplicação já rodando, o que iremos fazer agora é o redirecionamento de portas dentro do Linux. Usando o NGINx, será possível liberar apenas a porta 80 para ser acessada externamente e com isso permitir que façamos o redirecionamento de qualquer acesso na porta 80 para portas específicas dentro do servidor.

# Mantendo aplicação no ar

Nessa aula iremos realizar algumas configurações adicionais tanto no Docker quanto na própria aplicação Node.js para garantir que nenhum tipo de erro faça a aplicação parar e assim, não precisarmos acessar o servidor para iniciar a aplicação manualmente.

# Configurando domínio e SSL

Nessa aula iremos configurar o acesso via HTTPS para a API. Lembrando que esse é um passo que necessita de um domínio próprio para ser feito. Se você não possui um domínio próprio, não se preocupe. Usar diretamente o IP nas requisições irá funcionar perfeitamente.

[Link Certbot](https://certbot.eff.org/)

# Criando workflow de CI

Nessa aula iremos configurar o repositório no GitHub para automatizar o processo de build e envio da aplicação para o servidor. Com isso configurado, podemos alterar o código localmente, mandar para o GitHub e aguardar que ele mesmo faça de forma automática o clone do repositório no droplet.

# Deploy contínuo

Finalizando a configuração de CI/CD, nessa aula iremos acrescentar alguns passos dentro do workflow para que possamos rodar alguns comandos via SSH dentro do droplet como a instalação de dependências, execução das migrations e restart do servidor com o PM2.

[Link PM2](https://blog.rocketseat.com.br/pm2-com-funcionalidades-secretas/)

# Estratégias de deploy ReactJS

Partindo agora para o deploy do front-end web, nessa aula iremos conhecer um pouco sobre as estratégias para aplicações em React. Você verá como existem muitas possibilidades e que essa parte é bem mais simples que o deploy da API por exemplo.

Nessa aula iremos realizar alguns ajustes na aplicação para que fique pronta para o deploy, como o uso de variáveis ambiente e também o envio do repositório para o GitHub.

# Realizando deploy no Netlify

Nessa aula iremos configurar e realizar o deploy no Netlify com ou sem um domínio próprio, usando também um certificado SSL para habilitar o https na nossa aplicação.

# Criando bucket CDN

Partindo para uma alternativa mais avançada de deploy, nessa aula daremos o primeiro passo que será a criação de um bucket na Google Cloud Storage para o armazenamento das páginas estáticas já configurando um domínio próprio.

# Conta de serviço e permissões Google Cloud

Pensando na questão de segurança e prevenção de possíveis ações acidentais por conta de permissões extras, nessa aula iremos criar, assim como para o usuário no servidor da API, uma conta para permissões específicas dentro do bucket criado na aula anterior.

# Configurando página inicial

Nessa aula faremos algumas configurações para que o bucket saiba qual arquivo deve ser mostrado ao acessarmos a página inicial da aplicação. Isso serve para que o bucket saiba onde buscar cada página de acordo com as rotas, considerando que a raiz seja o arquivo especificado.

# Workflow do Github Actions

Nessa aula iremos configurar todo o ambiente do GitHub Actions para que faça uma nova build automaticamente toda vez que ocorrer alguma alteração na branch master e fazendo com que o bucket fique totalmente configurado sem precisarmos realizar alguma configuração manualmente.

[Link Download Workflow](https://gist.github.com/diego3g/97a364469caacc0295e69d665253c447)

# Apontando domínio

Nessa aula iremos configurar um IP fixo para conseguirmos apontarmos ao domínio. Esse é um processo bastante importante pois é aqui que iremos realizar todas as etapas referentes à geração de certificado para habilitar o acesso via HTTPS.

# Lojas, requisitos e dicas

Iniciando mais um módulo e nessa aula iremos falar um pouco sobre o ambiente usado por nós devs para publicar nossas aplicações tanto na Google Play Store quanto na App Store. Aqui trataremos de assunto como precificação e o processo pelo qual a aplicação passará antes de ir para as lojas de fato.

[Link Icon Splash Screenshots Figma](https://storage.googleapis.com/golden-wind/bootcamp-gostack/IconSplashScreenshotsFigma.zip)

# Android

## Criando ícone da aplicação

O que vamos fazer nessa aula é configurar o ícone e o nome do App que será exibido ao instalar a aplicação. Considere realizar o passo de configuração do ícone através do Android Studio, assim você o fará com mais facilidade.

## Criando splash screen

Nessa aula iremos criar a splash screen para a aplicação. Aqui o processo é um pouco mais longo comparado à criação do ícone mas todos os códigos estará disponível para que você possa acompanhar todos os passos de uma forma mais simples.

[Link Splash Screen no Android](https://www.notion.so/Splash-Screen-no-Android-d1fc75844f5342abbad80db9eece6022)

## React Native Splash Screen

Para finalizar a implementação da splash screen, nessa aula iremos configurar para que ela saia da tela do usuário apenas quando o primeiro componente estiver totalmente carregado. Isso se faz necessário porque até então, a splash screen some após um determinado tempo independente do conteúdo do App estar pronto para ser exibido ou não.

## Gerando Android App Bundle Android

Nessa aula iremos configurar todo o ambiente do App Android para que possamos gerar o arquivo .aab (Android App Bundle) que nada mais é que um bundle com todas as versões de arquitetura em um único arquivo, para então partirmos para a publicação na Play Store.

[Link para o guia mostrado na aula](https://reactnative.dev/docs/signed-apk-android)

## Configurando Google Play Store

Nessa aula iremos realizar todas as configurações obrigatórias no painel de desenvolvedores da Google Play Store como upload do ícone para a loja, screenshots, envio de alguns formulários e também faremos o upload do bundle gerado na aula anterior.

## Distribuindo App Android para Testers

Agora que já temos tudo configurado é hora de fazermos a primeira distribuição do App para testadores internos, ou seja, apenas pessoas que nós adicionarmos na lista de permissões de e-mail poderão baixar o App a partir da URL de adesão gerada pela plataforma após a publicação.

## Distribuindo App Android em Produção

Para finalizar a etapa de publicação da aplicação, nessa aula iremos disponibilizar o App para o público geral, ou seja, publicaremos em ambiente de produção. Como já temos tudo configurado e a versão para testadores já distribuída, esse será um passo bastante simples.

# IOS

## Criando ícone da aplicação

Para iniciar o processo de publicação do App na App Store, nessa aula iremos configurar o ícone e o nome da aplicação. Lembrando que se você não estiver em ambiente MacOS, é possível alugar um Mac em alguma plataforma em nuvem como o MacInCloud citado na primeira aula desse módulo.

## Criando splash screen

Continuando com as configurações específicas para o iOS, nessa aula vamos configurar a splash screen que é exibida ao iniciar a aplicação para que fique igual a que configuramos para o Android.

## React Native Splash Screen

Para que possamos controlar o momento em que a splash screen deve desaparecer assim como no Android, é necessário realizar também algumas mudanças no código nativo e é exatamente isso que faremos nessa aula.
Você pode acompanhar o processo de instalação através da documentação do pacote nesse link: [React Native Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen/)

## Criando IOS App ID

Nessa aula iremos criar um novo App ID para a aplicação. Essa será a forma como a Apple poderá identificar a aplicação assim como fizemos para o Android.

## Gerando IPA do Aplicativo

Nessa aula iremos gerar o bundle do aplicativo iOS e enviar para a App Store. Esse é um processo mais simples comparado com a Play Store, visto que o Xcode possui integração direta com a plataforma.

## Distribuindo App IOS para Testers

Nessa aula iremos disponibilizar o build gerado na aula anterior para a área de testes para que apenas pessoas permitidas por nós consigam ter acesso à aplicação antes de liberar para o público geral, exatamente como foi feito no Android.

## Distribuindo App IOS em Produção

Nessa aula iremos colocar a aplicação em produção que, até então, estava disponível apenas para testes. Para fazer isso, considerando que a aplicação já foi enviada para o ambiente de testes, basta preenchermos alguns dados sobre a aplicação, enviar e aguardar a submissão por parte dos reviewers da Apple.
