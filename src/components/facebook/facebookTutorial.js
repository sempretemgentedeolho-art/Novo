import { Home, ThumbsUp, Share2, Sparkles, Newspaper, Users, Bell } from "lucide-react";

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
    id: "terminar",
    target: "back",
    text: "Estes são os seus avisos: as curtidas, os comentários e quem começou a seguir você. Você aprendeu o principal do Facebook: curtir, comentar, compartilhar, publicar foto, ver histórias, a aba Feeds, amigos, mensagens e o seu perfil. Toque na seta de voltar, onde está piscando, para terminar.",
  },
];