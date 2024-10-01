const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class ChatBot {
  constructor() {
    this.client = new Client();
    this.client.initialize();

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    });

    // Escuta quando qualquer mensagem é recebida
    this.client.on('message', msg => {
      // Se a mensagem é a primeira interação ou não corresponde às opções
      if (!['1', '2', '3', '1.1', '1.2', '1.3', '4'].includes(msg.body)) {
        // Enviar o menu principal de opções simulando botões
        this.enviarOpcoes(msg);
      } else {
        // Verificar qual opção foi escolhida
        if (msg.body === '1') {
          this.produtos(msg); // Vai para o menu de produtos
        } else if (msg.body === '2') {
          this.suporte(msg); // Vai para suporte
        } else if (msg.body === '3') {
          this.atendente(msg); // Vai para atendimento
        } else if (msg.body === '1.1') {
          this.softwaresJuridicos(msg); // Detalhes de Softwares Jurídicos
        } else if (msg.body === '1.2') {
          this.consultoriaLegal(msg); // Detalhes de Consultoria Legal
        } else if (msg.body === '1.3') {
          this.gestaoDocumentos(msg); // Detalhes de Gestão de Documentos
        } else if (msg.body === '4') {
          this.voltar(msg); // Voltar ao menu principal
        }
      }
    });
  }

  // Envia o menu principal simulando botões de opções
  enviarOpcoes(msg) {
    msg.reply(
      `*Bem-vindo à AOB!*\n\nEscolha uma opção clicando no número correspondente:\n\n` +
      `1️⃣ *Produtos*\n` +
      `2️⃣ *Suporte*\n` +
      `3️⃣ *Falar com atendente*\n`
    );
  }

  // Envia o menu de produtos simulando botões
  produtos(msg) {
    msg.reply(
      `*Escolha uma categoria de produtos:*\n\n` +
      `1️1️⃣ *Softwares Jurídicos*\n` +
      `1️2️⃣ *Consultoria Legal*\n` +
      `1️3️⃣ *Gestão de Documentos*\n` +
      `4️⃣ *Voltar ao menu principal*\n`
    );
  }

  // Detalhes sobre os Softwares Jurídicos
  softwaresJuridicos(msg) {
    msg.reply(
      `*Oferecemos os seguintes softwares jurídicos:*\n\n` +
      `- Sistema de Automação de Processos\n` +
      `- Gerenciamento de Escritórios de Advocacia\n` +
      `- Software para Pesquisa de Jurisprudência\n\n` +
      `4️⃣ *Voltar para Produtos*`
    );
  }

  // Detalhes sobre Consultoria Legal
  consultoriaLegal(msg) {
    msg.reply(
      `*Oferecemos serviços de consultoria em:*\n\n` +
      `- Direito Civil\n` +
      `- Direito Penal\n` +
      `- Direito Trabalhista\n\n` +
      `4️⃣ *Voltar para Produtos*`
    );
  }

  // Detalhes sobre Gestão de Documentos
  gestaoDocumentos(msg) {
    msg.reply(
      `*Serviços de gestão de documentos jurídicos:*\n\n` +
      `- Organização de Documentos de Processos\n` +
      `- Digitalização de Arquivos\n` +
      `- Armazenamento Seguro de Documentos\n\n` +
      `4️⃣ *Voltar para Produtos*`
    );
  }

  // Mensagem de suporte
  suporte(msg) {
    msg.reply("Como posso ajudar com o suporte?\n\n4️⃣ *Voltar ao menu principal*");
  }

  // Mensagem para falar com um atendente
  atendente(msg) {
    msg.reply("Um atendente estará com você em breve.\n\n4️⃣ *Voltar ao menu principal*");
  }

  // Voltar ao menu principal
  voltar(msg) {
    this.enviarOpcoes(msg);
  }
}

// Inicializando o chatbot
const chatBot = new ChatBot();
