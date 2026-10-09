import {
  Home,
  User,
  UserPlus,
  Video,
  CircleDollarSign,
  ShoppingBag,
  LogOut,
} from "lucide-react";

// Partes do treinamento do TikTok: a pessoa escolhe por onde quer começar
export const CHAPTERS = [
  {
    id: "inicio",
    label: "Começar do início",
    description: "Assistir, curtir e comentar os vídeos",
    icon: Home,
    stepIndex: 0,
    view: "feed",
  },
  {
    id: "perfil",
    label: "Seu perfil e sua conta",
    description: "A sua parte do TikTok e o botão de criar conta",
    icon: User,
    stepIndex: 9,
    view: "perfil",
  },
  {
    id: "cadastro",
    label: "Criar a sua conta",
    description: "Fazer o cadastro passo a passo",
    icon: UserPlus,
    stepIndex: 10,
    view: "cadastro",
  },
  {
    id: "publicar",
    label: "Publicar um vídeo",
    description: "Gravar e colocar o seu primeiro vídeo no ar",
    icon: Video,
    stepIndex: 20,
    view: "publicar",
  },
  {
    id: "monetizar",
    label: "Configuração de Monetizar",
    description: "Como receber dinheiro pelos seus vídeos",
    icon: CircleDollarSign,
    stepIndex: 25,
    view: "monetizar",
  },
  {
    id: "vender",
    label: "Vender no TikTok (TikTok Shop)",
    description: "Como vender os seus produtos pela lojinha do TikTok",
    icon: ShoppingBag,
    stepIndex: 30,
    view: "vender",
  },
  {
    id: "final",
    label: "Terminar o treino",
    description: "Voltar para a tela inicial do celular",
    icon: LogOut,
    stepIndex: 40,
    view: "monetizar",
  },
];

// Cada etapa: o texto falado em voz alta + o elemento que pisca em amarelo
export const STEPS = [
  // ---------- Assistir aos vídeos ----------
  {
    id: "proximo_video",
    target: "proximo_video",
    text: "Bem-vindo ao TikTok! Aqui você assiste a vídeos curtinhos, um atrás do outro. Este vídeo é de bolo de fubá. Para ver o próximo vídeo, toque na seta branca virada para baixo, no lado direito da tela, onde está piscando.",
  },
  {
    id: "seguir",
    target: "seguir",
    text: "Muito bem, apareceu outro vídeo. Agora toque no sinal de MAIS, em cima da rodinha vermelha, onde está piscando, para seguir a Cozinha da Vovó e receber os vídeos novos dela.",
  },
  {
    id: "curtir",
    target: "curtir",
    text: "Agora você acompanha a Cozinha da Vovó. Toque no CORAÇÃO, onde está piscando, para dizer que você gostou do vídeo. O coração fica vermelho.",
  },
  {
    id: "comentar",
    target: "comentar",
    text: "O coração ficou vermelho: a pessoa já sabe que você gostou. Agora toque no BALÃO DE CONVERSA, onde está piscando, para deixar um recadinho.",
  },
  {
    id: "campo_comentario",
    target: "campo_comentario",
    text: "Aqui você escreve o seu recado. Toque no espaço que diz Adicione um comentário, onde está piscando.",
  },
  {
    id: "enviar_comentario",
    target: "enviar_comentario",
    text: "Agora toque em PUBLICAR, onde está piscando, para o seu recadinho aparecer para todos.",
  },
  {
    id: "compartilhar",
    target: "compartilhar",
    text: "Prontinho, o seu recadinho apareceu embaixo do vídeo. Agora toque na SETA de compartilhar, onde está piscando, para mandar este vídeo para alguém.",
  },
  {
    id: "share_whats",
    target: "share_whats",
    text: "Escolha para onde quer mandar. Toque em WHATSAPP, onde está piscando, para enviar para um amigo.",
  },
  {
    id: "aba_perfil",
    target: "aba_perfil",
    text: "Você compartilhou o vídeo! Agora toque em PERFIL, lá embaixo no cantinho direito, onde está piscando, para conhecer a sua parte do TikTok.",
  },
  // ---------- Perfil ----------
  {
    id: "criar_conta",
    target: "criar_conta",
    text: "Este é o seu perfil. Para publicar vídeos e receber dinheiro pelo TikTok, você precisa de uma conta. Toque em CRIAR CONTA, onde está piscando, que a gente faz juntos, devagar.",
  },
  // ---------- Cadastro ----------
  {
    id: "cadastro_telefone",
    target: "cadastro_telefone",
    text: "Vamos criar a sua conta. É de graça. Toque em CONTINUAR COM TELEFONE, onde está piscando, porque o número é fácil de lembrar.",
  },
  {
    id: "campo_numero",
    target: "campo_numero",
    text: "Toque no espaço que diz Número do celular, onde está piscando, e digite o seu número com o DDD.",
  },
  {
    id: "receber_codigo",
    target: "receber_codigo",
    text: "Agora toque em RECEBER CÓDIGO, onde está piscando. O TikTok vai mandar uma mensagem com 6 números para o seu celular.",
  },
  {
    id: "campo_codigo",
    target: "campo_codigo",
    text: "Toque no espaço dos 6 números, onde está piscando, e digite o código que chegou no seu celular.",
  },
  {
    id: "cadastro_nome",
    target: "cadastro_nome",
    text: "Muito bem! Agora escolha o seu nome de usuário, juntando o seu nome e o ano em que você nasceu, por exemplo maria1947. Toque no espaço que diz Nome de usuário.",
  },
  {
    id: "cadastro_senha",
    target: "cadastro_senha",
    text: "Agora crie uma senha que só você saiba, com letras e números. Toque no espaço que diz Senha, onde está piscando, e anote a senha num papel para não esquecer.",
  },
  {
    id: "cadastro_concluir",
    target: "cadastro_concluir",
    text: "Está quase pronto. Toque em CRIAR MINHA CONTA, onde está piscando.",
  },
  {
    id: "conta_pronta",
    target: "conta_pronta",
    text: "Parabéns! A sua conta do TikTok está pronta. Com uma conta você pode publicar vídeos, seguir amigos e participar do programa que paga pelos vídeos.",
  },
  {
    id: "ir_publicar",
    target: "ir_publicar",
    text: "Toque em PUBLICAR UM VÍDEO, onde está piscando, para a gente gravar o seu primeiro vídeo.",
  },
  // ---------- Publicar ----------
  {
    id: "gravar_video",
    target: "gravar_video",
    text: "Aqui você grava o seu vídeo. Toque no BOTÃO VERMELHO no meio da tela, onde está piscando. Pode gravar 15 segundos falando bom dia para os seus amigos.",
  },
  {
    id: "legenda",
    target: "legenda",
    text: "Muito bem, o vídeo foi gravado! Agora toque no espaço que diz Escreva uma legenda, onde está piscando, e escreva uma frase simples, por exemplo: Bom dia, meus amigos!",
  },
  {
    id: "postar",
    target: "postar",
    text: "Agora toque em PUBLICAR, no cantinho direito de baixo, onde está piscando, para o seu vídeo ir para o ar.",
  },
  {
    id: "ver_no_perfil",
    target: "ver_no_perfil",
    text: "Seu vídeo já está no TikTok para todo mundo ver, e fica guardado no seu perfil. Toque em VER NO PERFIL, onde está piscando.",
  },
  // ---------- Monetizar ----------
  {
    id: "monetizar_abrir",
    target: "monetizar_abrir",
    text: "Agora toque em CONFIGURAÇÃO DE MONETIZAR, onde está piscando. Monetizar quer dizer ganhar dinheiro com os seus vídeos.",
  },
  {
    id: "monetizar_requisitos",
    target: "monetizar_requisitos",
    text: "Para receber dinheiro, o TikTok pede quatro coisas. Leia com calma: ter 18 anos ou mais, 10 mil seguidores, 100 mil visualizações nos últimos 30 dias e a conta com os dados completos. Toque em JÁ ENTENDI, onde está piscando.",
  },
  {
    id: "monetizar_dados",
    target: "monetizar_dados",
    text: "Agora o TikTok precisa dos seus dados de verdade: nome completo, número do CPF e data de nascimento. Toque no espaço do CPF, onde está piscando, e digite com calma.",
  },
  {
    id: "monetizar_pagamento",
    target: "monetizar_pagamento",
    text: "Agora escolha como você quer receber o dinheiro. Toque em CHAVE PIX, onde está piscando, e digite a sua chave. Se tiver dúvida, peça ajuda a uma pessoa de confiança da família.",
  },
  {
    id: "monetizar_ativar",
    target: "monetizar_ativar",
    text: "Toque em ATIVAR MONETIZAÇÃO, onde está piscando, para enviar tudo para o TikTok analisar.",
  },
  {
    id: "monetizar_pronto",
    target: "monetizar_pronto",
    text: "Parabéns! A sua monetização foi enviada e o TikTok responde em alguns dias. Quando for aprovada, você acompanha aqui quanto já rendeu. Um aviso importante: nunca passe a sua senha nem o código do celular para ninguém, nem por mensagem. Toque em ENTENDI, onde está piscando, para terminar este passo.",
  },
  // ---------- Vender no TikTok (TikTok Shop) ----------
  {
    id: "ir_vender",
    target: "ir_vender",
    text: "Parabéns! Além de ganhar pelos vídeos, o TikTok também tem uma lojinha, o TikTok Shop, onde você pode vender os seus produtos. Toque em APRENDER A VENDER, onde está piscando.",
  },
  {
    id: "vender_conta",
    target: "vender_conta",
    text: "Primeiro passo para vender: a sua conta precisa virar uma conta comercial. Ela é de graça e não muda nada nos seus vídeos nem nos seus seguidores. Toque em VIRAR CONTA COMERCIAL, onde está piscando.",
  },
  {
    id: "vender_seller",
    target: "vender_seller",
    text: "Agora vamos abrir a Central do Vendedor. É aqui que você cadastra produtos, acompanha os pedidos e vê quanto vendeu. O cadastro é gratuito e pede documentos: o CNPJ da empresa ou o seu CPF, se você vender como pessoa física, além dos dados do banco para receber. Toque em ABRIR A CENTRAL DO VENDEDOR, onde está piscando.",
  },
  {
    id: "vender_catalogo",
    target: "vender_catalogo",
    text: "Vamos cadastrar o seu primeiro produto. Comece com um produto só, aquele que você conhece melhor. Toque no espaço que diz Nome do produto, onde está piscando, e escreva um nome bem claro, por exemplo: Panela de pressão 4 litros.",
  },
  {
    id: "vender_preco",
    target: "vender_preco",
    text: "Agora toque no espaço do Preço, onde está piscando, e digite quanto você quer cobrar. Uma foto boa, com luz e mostrando o produto inteiro, ajuda muito a vender.",
  },
  {
    id: "vender_salvar",
    target: "vender_salvar",
    text: "Toque em SALVAR PRODUTO, onde está piscando, para o produto entrar na sua lojinha.",
  },
  {
    id: "vender_conteudo",
    target: "vender_conteudo",
    text: "Produto cadastrado! Agora o mais importante: gravar vídeos mostrando o produto sendo usado, contando para que serve e quanto custa. No TikTok, mostrar e vender andam juntos. Toque em GRAVAR VÍDEO DO PRODUTO, onde está piscando.",
  },
  {
    id: "vender_live",
    target: "vender_live",
    text: "Você também pode vender ao vivo, numa live. Toque em FAZER UMA LIVE, onde está piscando. Numa live, um cupom de desconto ajuda a fechar a venda.",
  },
  {
    id: "vender_afiliados",
    target: "vender_afiliados",
    text: "Existe também o programa de afiliados: outras pessoas gravam vídeos do seu produto e ganham uma comissão só quando a venda acontece. Você não paga nada adiantado. Toque em CONVIDAR AFILIADOS, onde está piscando.",
  },
  {
    id: "vender_dados",
    target: "vender_dados",
    text: "Toque em VER MEUS RESULTADOS, onde está piscando. Aqui você vê quantas pessoas assistiram aos seus vídeos, quantas clicaram no produto e quantas compraram.",
  },
  {
    id: "vender_pronto",
    target: "vender_pronto",
    text: "Pronto! Você já conhece o caminho para vender no TikTok. Comece devagar, com um produto só, e responda as perguntas dos clientes com paciência. Um aviso importante: nunca combine pagamento por fora do TikTok e nunca passe a sua senha para ninguém. Toque em TERMINEI, onde está piscando.",
  },
  {
    id: "terminar",
    target: "terminar",
    text: "Muito bem! Este foi o treinamento do TikTok. Toque na SETA de voltar, no cantinho de cima à esquerda, onde está piscando, para voltar para a tela inicial do celular.",
  },
];