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
        // Enviar o menu principal de opções
        this.enviarOpcoes(msg);
      } else {
        // Verificar qual opção foi escolhida
        if (msg.body === '1') {
          this.produtos(msg);
        } else if (msg.body === '2') {
          this.suporte(msg);
        } else if (msg.body === '3') {
          this.atendente(msg);
        } else if (msg.body === '1.1') {
          this.softwaresJuridicos(msg);
        } else if (msg.body === '1.2') {
          this.consultoriaLegal(msg);
        } else if (msg.body === '1.3') {
          this.gestaoDocumentos(msg);
        } else if (msg.body === '4') {
          this.voltar(msg);
        }
      }
    });
  }

  // Envia o menu principal para o usuário
  enviarOpcoes(msg) {
    msg.reply("Bem-vindo à AOB!\nEscolha uma opção:\n1. Produtos\n2. Suporte\n3. Falar com atendente");
  }

  // Envia o menu de produtos para o usuário
  produtos(msg) {
    msg.reply("Escolha uma categoria de produtos:\n1.1. Softwares Jurídicos\n1.2. Consultoria Legal\n1.3. Gestão de Documentos\n4. Voltar");
  }

  // Detalhes sobre os Softwares Jurídicos
  softwaresJuridicos(msg) {
    msg.reply("Oferecemos os seguintes softwares jurídicos:\n- Sistema de Automação de Processos\n- Gerenciamento de Escritórios de Advocacia\n- Software para Pesquisa de Jurisprudência");
  }

  // Detalhes sobre Consultoria Legal
  consultoriaLegal(msg) {
    msg.reply("Oferecemos serviços de consultoria em:\n- Direito Civil\n- Direito Penal\n- Direito Trabalhista");
  }

  // Detalhes sobre Gestão de Documentos
  gestaoDocumentos(msg) {
    msg.reply("Serviços de gestão de documentos jurídicos:\n- Organização de Documentos de Processos\n- Digitalização de Arquivos\n- Armazenamento Seguro de Documentos");
  }

  // Mensagem de suporte
  suporte(msg) {
    msg.reply("Como posso ajudar com o suporte?");
  }

  // Mensagem para falar com um atendente
  atendente(msg) {
    msg.reply("Um atendente estará com você em breve.");
  }

  // Voltar ao menu principal
  voltar(msg) {
    this.enviarOpcoes(msg);
  }
}

// Inicializando o chatbot
const chatBot = new ChatBot();
