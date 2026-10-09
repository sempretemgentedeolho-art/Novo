import {
  Home,
  ThumbsUp,
  Share2,
  Sparkles,
  Newspaper,
  Users,
  Bell,
  Store,
  CalendarDays,
  Flag,
} from "lucide-react";

// Partes do tutorial do Facebook: a pessoa escolhe por onde quer começar
export const CHAPTERS = [
  {
    id: "inicio",
    label: "Começar do início",
    description: "Ver as novidades, curtir e comentar",
    icon: Home,
    stepIndex: 0,
    view: "feed",
  },
  {
    id: "compartilhar",
    label: "Compartilhar e publicar",
    description: "Mandar para alguém e publicar uma foto sua",
    icon: Share2,
    stepIndex: 4,
    view: "feed",
  },
  {
    id: "stories",
    label: "Stories (histórias de 24 horas)",
    description: "Ver e criar fotos que somem no dia seguinte",
    icon: Sparkles,
    stepIndex: 11,
    view: "feed",
  },
  {
    id: "feeds",
    label: "Aba Feeds (só o mais recente)",
    description: "Ver as publicações na ordem, e usar os filtros",
    icon: Newspaper,
    stepIndex: 15,
    view: "feed",
  },
  {
    id: "amigos",
    label: "Amigos e mensagens",
    description: "Convidar amigos e conversar",
    icon: Users,
    stepIndex: 17,
    view: "feed",
  },
  {
    id: "perfil",
    label: "Seu perfil e avisos",
    description: "Sua página, sua foto e a campainha de avisos",
    icon: Bell,
    stepIndex: 24,
    view: "feed",
  },
  {
    id: "mercado_reels",
    label: "Mercado e Reels",
    description: "O que as pessoas vendem perto, e vídeos curtinhos",
    icon: Store,
    stepIndex: 27,
    view: "feed",
  },
  {
    id: "salvos_eventos",
    label: "Salvos, eventos e memórias",
    description: "Guardar para depois, festas e fotos de outros anos",
    icon: CalendarDays,
    stepIndex: 34,
    view: "feed",
  },
  {
    id: "paginas_ajustes",
    label: "Páginas, ajustes e ajuda",
    description: "Lojas que você segue, senha, privacidade e dúvidas",
    icon: Flag,
    stepIndex: 43,
    view: "feed",
  },
  {
    id: "grupos_videos",
    label: "Grupos e vídeos",
    description: "As rodinhas de gente e os vídeos para assistir",
    icon: Users,
    stepIndex: 52,
    view: "feed",
  },
];

// Cada etapa: texto falado em voz alta + elemento que pisca em amarelo
export const STEPS = [
  {
    id: "curtir",
    target: "curtir",
    text: "Bem-vindo ao Facebook! Aqui você vê as novidades dos seus amigos e da sua família. Embaixo desta primeira publicação tem um botão escrito CURTIR, com um joinha. Toque nele, onde está piscando, para mostrar que você gostou.",
  },
  {
    id: "curtiu_comentar",
    target: "comentar_btn",
    text: "Muito bem, o botão ficou azul: a Maria já sabe que você gostou. Agora toque em COMENTAR, do lado do Curtir, onde está piscando, para escrever o que você achou.",
  },
  {
    id: "escrever_comentario",
    target: "campo_comentario",
    text: "Aqui você escreve o seu recado. Toque no espaço branco onde está escrito Escreva um comentário, que está piscando.",
  },
  {
    id: "enviar_comentario",
    target: "enviar_comentario",
    text: "Agora toque na tecla azul PUBLICAR, onde está piscando, para o seu comentário aparecer para todos os amigos.",
  },
  {
    id: "compartilhar",
    target: "compartilhar_btn",
    text: "Prontinho, seu comentário apareceu embaixo da publicação. Se quiser, você pode apagá-lo tocando na lixeirinha. Agora vamos compartilhar: toque em COMPARTILHAR, onde está piscando, para mandar esta publicação para alguém.",
  },
  {
    id: "compartilhar_escolha",
    target: "share_whats",
    text: "Escolha por onde quer mandar. Toque em WHATSAPP, onde está piscando, para enviar para um amigo.",
  },
  {
    id: "publicar_abrir",
    target: "publicar_caixa",
    text: "Muito bem, você compartilhou! Agora você vai publicar uma foto sua. Na aba Início, lá em cima, tem uma caixinha branca escrita No que você está pensando. Toque nela, onde está piscando, para criar uma publicação.",
  },
  {
    id: "escolher_foto",
    target: "escolher_foto",
    text: "Escolha uma foto do seu celular. Toque no quadradinho de uma foto que você goste, onde está piscando.",
  },
  {
    id: "escrever_legenda",
    target: "campo_legenda",
    text: "Escreva uma legenda: pode ser uma frase simples, como Bom dia a todos! Toque no espaço branco onde está piscando e escreva com o teclado do celular.",
  },
  {
    id: "publicar_enviar",
    target: "publicar_botao",
    text: "Agora toque na tecla azul PUBLICAR, onde está piscando, para a sua publicação aparecer no Facebook.",
  },
  {
    id: "publicado_ok",
    target: "ver_publicacao",
    text: "Parabéns, sua publicação está no ar! Todas as suas amizades podem ver a foto e o que você escreveu. Toque em VER NO FEED, onde está piscando, para ver a sua publicação no topo da lista.",
  },
  {
    id: "story_abrir",
    target: "story_abrir",
    text: "Agora os Stories, as histórias. São fotos que duram só 24 horas e depois somem sozinhas. Lá em cima, na fileira de bolinhas, toque na primeira história, onde está piscando, para ver a da Maria.",
  },
  {
    id: "story_fechar",
    target: "story_fechar",
    text: "Está vendo? A história aparece em tela cheia e some no dia seguinte, sem precisar fazer nada. Para sair, toque no X, onde está piscando.",
  },
  {
    id: "story_criar",
    target: "story_criar",
    text: "Você também pode colocar uma história sua. Toque em CRIAR STORY, na primeira bolinha, onde está piscando.",
  },
  {
    id: "meu_story_fechar",
    target: "story_fechar",
    text: "Sua história também fica no ar por 24 horas e depois desaparece sozinha. Toque no X, onde está piscando, para fechar.",
  },
  {
    id: "abrir_feeds",
    target: "aba_feeds",
    text: "Agora você vai conhecer a aba FEEDS. No alto da tela tem uma fileira de desenhos: a casinha, o vídeo, o jornalzinho, as pessoas, a campainha e as três risquinhas. Toque no JORNALZINHO, onde está piscando, para ver só as publicações mais recentes.",
  },
  {
    id: "feeds_filtro",
    target: "filtro_amigos",
    text: "Esta é a aba Feeds: aqui as publicações aparecem na ordem, da mais nova para a mais antiga, sem as sugestões do Facebook. Em cima tem os filtros: Todos, Favoritos, Amigos, Grupos e Páginas. Toque em AMIGOS, onde está piscando, para ver só o que os seus amigos publicaram.",
  },
  {
    id: "abrir_menu",
    target: "aba_menu",
    text: "Muito bem! Agora toque nas TRÊS RISQUINHAS, no canto direito de cima, onde está piscando, para abrir o menu do Facebook. É ali que ficam o seu perfil, os seus amigos e as suas conversas.",
  },
  {
    id: "abrir_amigos_menu",
    target: "menu_amigos",
    text: "Toque em AMIGOS, onde está piscando, para ver a sua lista de amigos.",
  },
  {
    id: "adicionar_amigo",
    target: "adicionar_amigo",
    text: "Estes são os seus amigos. O Pedro quer ser seu amigo. Toque em ADICIONAR, onde está piscando, do lado do nome dele, para mandar o convite. Ele só vira amigo depois que aceitar.",
  },
  {
    id: "abrir_mensagens",
    target: "mensagens_icone",
    text: "Agora toque no BALÃOZINHO de conversa, lá em cima no canto direito, onde está piscando, para ver as suas mensagens.",
  },
  {
    id: "abrir_conversa",
    target: "conversa_maria",
    text: "Toque na conversa da Maria, onde está piscando, para abrir e ler o que ela escreveu.",
  },
  {
    id: "escrever_recado",
    target: "campo_recado",
    text: "Escreva aqui a sua resposta para a Maria. Toque no espaço branco onde está piscando e escreva com o teclado do celular.",
  },
  {
    id: "enviar_recado",
    target: "enviar_recado",
    text: "Toque na seta azul, onde está piscando, para enviar a sua mensagem. Ela chega na hora para a Maria.",
  },
  {
    id: "abrir_menu_perfil",
    target: "aba_menu",
    text: "Está chegando ao fim. Toque outra vez nas TRÊS RISQUINHAS, lá em cima, onde está piscando, para abrir o menu.",
  },
  {
    id: "abrir_perfil",
    target: "menu_perfil",
    text: "Toque em PERFIL, onde está piscando, para ver a sua página no Facebook.",
  },
  {
    id: "abrir_avisos",
    target: "aba_avisos",
    text: "Nesta página ficam a sua foto, os seus amigos e as suas publicações. Toque na CAMPAINHA, lá em cima, onde está piscando, para ver os seus avisos.",
  },
  {
    id: "abrir_menu_mercado",
    target: "aba_menu",
    text: "Você viu os seus avisos. Agora vamos conhecer as outras partes do Facebook, que ficam todas no menu. Toque nas TRÊS RISQUINHAS, no canto direito de cima, onde está piscando, para abrir o menu.",
  },
  {
    id: "menu_mercado",
    target: "menu_mercado",
    text: "Olhe quanta coisa tem no menu, e não só amigos e conversas. Toque em MERCADO, onde está piscando. O Mercado é como uma feirinha: as pessoas que moram perto anunciam o que querem vender.",
  },
  {
    id: "mercado_item",
    target: "mercado_item",
    text: "Estes são os anúncios de quem mora perto de você, com o preço e a distância. Toque no primeiro anúncio, onde está piscando, para ver como é.",
  },
  {
    id: "voltar_menu_reels",
    target: "aba_menu",
    text: "No Mercado você só olha, sem compromisso nenhum: ninguém vai cobrar nada de você. Para ver outras coisas, toque outra vez nas TRÊS RISQUINHAS, onde está piscando.",
  },
  {
    id: "menu_reels",
    target: "menu_reels",
    text: "Toque em REELS, onde está piscando. Reels são vídeos bem curtinhos, de menos de um minuto, que passam um atrás do outro.",
  },
  {
    id: "reels_curtir",
    target: "reels_curtir",
    text: "Toque no JOINHA, à direita, onde está piscando, para mostrar que você gostou deste vídeo. O número do lado é quantas pessoas gostaram também.",
  },
  {
    id: "reels_proximo",
    target: "reels_proximo",
    text: "Para ver o próximo vídeo, toque em PRÓXIMO, onde está piscando. É assim que se passa de um Reel para outro, sem precisar fazer mais nada.",
  },
  {
    id: "abrir_menu_salvos",
    target: "aba_menu",
    text: "Vamos conhecer mais três partes do menu. Toque nas TRÊS RISQUINHAS, onde está piscando.",
  },
  {
    id: "menu_salvos",
    target: "menu_salvos",
    text: "Toque em SALVOS, onde está piscando. Aqui fica tudo o que você guardou para ver depois, sem perder nada.",
  },
  {
    id: "salvos_filtro",
    target: "salvos_filtro",
    text: "Estas bolinhas em cima separam o que você guardou: Tudo, Vídeos, Publicações e Links. Toque em VÍDEOS, onde está piscando, para ver só os vídeos guardados.",
  },
  {
    id: "voltar_menu_eventos",
    target: "aba_menu",
    text: "Muito bem! Toque outra vez nas TRÊS RISQUINHAS, onde está piscando, para ver a próxima parte.",
  },
  {
    id: "menu_eventos",
    target: "menu_eventos",
    text: "Toque em EVENTOS, onde está piscando. Evento é uma festa, uma feira ou um encontro com dia e lugar marcados.",
  },
  {
    id: "eventos_vou",
    target: "eventos_vou",
    text: "Toque em VOU PARTICIPAR, no primeiro evento, onde está piscando. Assim quem organiza sabe que você vai estar lá.",
  },
  {
    id: "voltar_menu_memorias",
    target: "aba_menu",
    text: "Se mudar de ideia, é só tocar outra vez no mesmo botão, e o Facebook avisa quem organiza. Toque nas TRÊS RISQUINHAS, onde está piscando.",
  },
  {
    id: "menu_memorias",
    target: "menu_memorias",
    text: "Toque em MEMÓRIAS, onde está piscando. Aqui o Facebook lembra você do que você publicou em outros anos, como um álbum de fotos antigas.",
  },
  {
    id: "memorias_item",
    target: "memorias_item",
    text: "Toque na lembrança, onde está piscando, para guardá-la. Se aparecer alguma que você não quer mais ver, é só tocar nos três pontinhos da publicação e escolher Ocultar.",
  },
  {
    id: "abrir_menu_paginas",
    target: "aba_menu",
    text: "Falta pouco para terminar. Toque nas TRÊS RISQUINHAS, onde está piscando.",
  },
  {
    id: "menu_paginas",
    target: "menu_paginas",
    text: "Toque em PÁGINAS, onde está piscando. Página é como o perfil de uma loja, de um restaurante ou de um grupo musical.",
  },
  {
    id: "paginas_seguir",
    target: "paginas_seguir",
    text: "Toque em SEGUIR, do lado do Jardim em Casa, onde está piscando. Quando você segue uma página, o que ela publica aparece no seu Início. Se não quiser mais, toque de novo no mesmo botão.",
  },
  {
    id: "abrir_menu_config",
    target: "aba_menu",
    text: "Agora as duas partes mais importantes do menu. Toque nas TRÊS RISQUINHAS, onde está piscando.",
  },
  {
    id: "menu_config",
    target: "menu_configfacebook",
    text: "Toque em CONFIGURAÇÕES E PRIVACIDADE, onde está piscando. É aqui que você manda no seu Facebook.",
  },
  {
    id: "config_item",
    target: "config_item",
    text: "Toque em SENHA E SEGURANÇA, onde está piscando. Aqui você troca a sua senha e vê em quais aparelhos a sua conta está aberta. Ninguém mexe aqui por você.",
  },
  {
    id: "abrir_menu_ajuda",
    target: "aba_menu",
    text: "Na próxima vez que ficar com dúvida, é aqui que você volta. Toque nas TRÊS RISQUINHAS, onde está piscando, para ver a última parte.",
  },
  {
    id: "menu_ajuda",
    target: "menu_ajudafacebook",
    text: "Toque em AJUDA E SUPORTE, onde está piscando. Aqui o próprio Facebook responde as suas dúvidas.",
  },
  {
    id: "ajuda_item",
    target: "ajuda_item",
    text: "Toque em CENTRAL DE AJUDA, onde está piscando. Sempre que ficar com dúvida sobre qualquer coisa do Facebook, é por aqui que você procura a resposta.",
  },
  {
    id: "abrir_grupos",
    target: "aba_grupos",
    text: "Falta pouco! Agora você vai conhecer os Grupos e os Vídeos. Lá em cima, no alto da tela, ao lado do jornalzinho, tem o desenho de duas pessoas: são os Grupos. Toque nele, onde está piscando.",
  },
  {
    id: "grupo_publicacoes",
    target: "grupo_publicacoes",
    text: "Estes são os seus grupos. Grupo é uma roda de gente que fala do mesmo assunto: a família, a igreja, o clube do bairro. Só quem está no grupo vê o que é publicado ali. Toque em VER AS PUBLICAÇÕES, no primeiro grupo, onde está piscando, para ver o que escreveram.",
  },
  {
    id: "aba_video",
    target: "aba_video",
    text: "Aqui aparecem só as publicações do grupo que você escolheu. Agora vamos ver os vídeos: toque no desenho do telão, o segundo lá em cima, onde está piscando.",
  },
  {
    id: "video_abrir",
    target: "video_abrir",
    text: "Esta é a aba Vídeo, onde o Facebook junta os vídeos para você assistir. Dá para ver com calma, deitado no sofá. Toque no primeiro vídeo, onde está piscando.",
  },
  {
    id: "video_fechar",
    target: "video_fechar",
    text: "Você está assistindo. O vídeo toca sozinho, sem precisar fazer nada. Quando quiser parar, toque em FECHAR O VÍDEO, onde está piscando. Se um vídeo não lhe interessar, é só fechar e escolher outro.",
  },
  {
    id: "terminar",
    target: "back",
    text: "Muito bem, chegou ao fim do treino! Você aprendeu o principal do Facebook: curtir, comentar, compartilhar, publicar foto, ver histórias, a aba Feeds, amigos, mensagens, o seu perfil, o Mercado, os Reels, os Salvos, os Eventos, as Memórias, as Páginas, os Grupos, os Vídeos, as Configurações e a Ajuda. Toque na seta de voltar, onde está piscando, para terminar.",
  },
];