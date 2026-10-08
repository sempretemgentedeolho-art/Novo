import perfilMaria from '@/assets/imagens/perfil-maria.jpg';
import perfilJoao from '@/assets/imagens/perfil-joao.jpg';
import perfilAna from '@/assets/imagens/perfil-ana.jpg';
import minhaFoto from '@/assets/imagens/shorts-pessoa.jpg';
import foto1 from '@/assets/imagens/galeria-1.jpg';
import foto2 from '@/assets/imagens/galeria-2.jpg';
import foto3 from '@/assets/imagens/galeria-3.jpg';
import foto4 from '@/assets/imagens/galeria-4.jpg';
import foto5 from '@/assets/imagens/galeria-5.jpg';
import foto6 from '@/assets/imagens/galeria-6.jpg';

export const MINHA_FOTO = minhaFoto;

// Fotos do celular que a pessoa pode escolher para publicar
export const GALERIA = [
  { id: 'f1', nome: 'Meu jardim', foto: foto1 },
  { id: 'f2', nome: 'Parque', foto: foto2 },
  { id: 'f3', nome: 'Café da tarde', foto: foto3 },
  { id: 'f4', nome: 'Família', foto: foto4 },
  { id: 'f5', nome: 'Viagem', foto: foto5 },
  { id: 'f6', nome: 'Domingo', foto: foto6 },
];

// Histórias: fotos que ficam no ar só 24 horas
export const STORIES = [
  { id: 'maria', nome: 'Maria Silva', foto: perfilMaria, imagem: foto2, legenda: 'Caminhada no parque hoje 🌳' },
  { id: 'joao', nome: 'João Santos', foto: perfilJoao, imagem: foto3, legenda: 'Café da tarde ☕' },
  { id: 'ana', nome: 'Ana Costa', foto: perfilAna, imagem: foto5, legenda: 'Chegando da viagem! 🏖️' },
];

// Publicações. O "filtro" diz a que grupo cada uma pertence na aba Feeds;
// "favorito" marca quem a pessoa escolheu ver primeiro.
export const PUBLICACOES = [
  {
    id: 'p1',
    autor: 'Maria Silva',
    foto: perfilMaria,
    quando: '2 h',
    texto: 'Que dia lindo hoje! Fui caminhar no parque e o jardim está todo florido. ☀️',
    imagem: foto2,
    curtidas: 12,
    curtido: false,
    comentarios: [{ autor: 'João Santos', texto: 'Que delícia, Maria!' }],
    filtro: 'amigos',
    favorito: true,
  },
  {
    id: 'p2',
    autor: 'João Santos',
    foto: perfilJoao,
    quando: '5 h',
    texto: 'Alguém sabe de um lugar bom para tomar um café aqui perto de casa?',
    imagem: null,
    curtidas: 8,
    curtido: false,
    comentarios: [{ autor: 'Ana Costa', texto: 'Eu conheço um ótimo, João!' }],
    filtro: 'amigos',
  },
  {
    id: 'p3',
    autor: 'Ana Costa',
    foto: perfilAna,
    quando: 'Ontem',
    texto: 'Olha que vista bonita do lugar onde eu passei o fim de semana.',
    imagem: foto5,
    curtidas: 34,
    curtido: false,
    comentarios: [],
    filtro: 'amigos',
  },
  {
    id: 'p4',
    autor: 'Padaria do Bairro',
    foto: null,
    quando: 'Ontem',
    texto: 'Pão quentinho saindo do forno! Passa aqui para tomar um café com a gente. 🥖',
    imagem: foto6,
    curtidas: 21,
    curtido: false,
    comentarios: [],
    filtro: 'paginas',
    favorito: true,
  },
  {
    id: 'p5',
    autor: 'Clube de Leitura',
    foto: null,
    quando: '2 dias',
    texto: 'Neste mês vamos ler "O Pequeno Príncipe". Quem participa?',
    imagem: foto1,
    curtidas: 6,
    curtido: false,
    comentarios: [],
    filtro: 'grupos',
  },
  {
    id: 'p6',
    autor: 'Grupo da Família',
    foto: null,
    quando: '3 dias',
    texto: 'Almoço de domingo na casa da vovó! Levem a sobremesa. 🍰',
    imagem: foto4,
    curtidas: 15,
    curtido: false,
    comentarios: [],
    filtro: 'grupos',
  },
];

// Mostra só o que a pessoa escolheu no filtro da aba Feeds
export function postsDoFiltro(posts, filtro) {
  if (filtro === 'favoritos') return posts.filter((p) => p.favorito);
  if (filtro === 'todos') return posts;
  return posts.filter((p) => p.filtro === filtro);
}

// A aba Vídeo
export const VIDEOS = [
  { id: 'v1', titulo: 'Receita de bolo de cenoura, passo a passo', imagem: foto3 },
  { id: 'v2', titulo: 'Caminhada leve no parque: 10 minutos', imagem: foto2 },
  { id: 'v3', titulo: 'Viagem bonita para você sonhar acordado', imagem: foto5 },
];

// A aba Grupos
export const GRUPOS = [
  { id: 'g1', nome: 'Grupo da Família', membros: '8 membros', imagem: foto4 },
  { id: 'g2', nome: 'Clube de Leitura', membros: '24 membros', imagem: foto1 },
  { id: 'g3', nome: 'Amigos da Igreja', membros: '56 membros', imagem: foto6 },
];

export const AMIGOS = [
  { id: 'maria', nome: 'Maria Silva', foto: perfilMaria, recado: 'Comadre · 3 amigos em comum', amigo: true },
  { id: 'joao', nome: 'João Santos', foto: perfilJoao, recado: 'Vizinho · 5 amigos em comum', amigo: true },
  { id: 'ana', nome: 'Ana Costa', foto: perfilAna, recado: 'Da igreja · 2 amigos em comum', amigo: true },
  { id: 'pedro', nome: 'Pedro Almeida', foto: null, recado: 'Da feira · 1 amigo em comum', amigo: false },
  { id: 'clara', nome: 'Clara Nogueira', foto: null, recado: 'Clube de leitura', amigo: false },
];

export const CONVERSAS = [
  {
    id: 'maria',
    nome: 'Maria Silva',
    foto: perfilMaria,
    recados: [
      { de: 'ela', texto: 'Oi! Tudo bem? Vamos almoçar hoje?' },
      { de: 'eu', texto: 'Oi, Maria! Tudo ótimo. Pode ser meio-dia?' },
    ],
  },
  {
    id: 'joao',
    nome: 'João Santos',
    foto: perfilJoao,
    recados: [{ de: 'ele', texto: 'Bom dia! Você viu o jogo ontem?' }],
  },
  {
    id: 'ana',
    nome: 'Ana Costa',
    foto: perfilAna,
    recados: [{ de: 'ela', texto: 'Mandei a foto da festa para você 😊' }],
  },
];

export const AVISOS = [
  { id: 'a1', foto: perfilMaria, texto: 'Maria Silva curtiu a sua publicação', quando: '2 h' },
  { id: 'a2', foto: perfilJoao, texto: 'João Santos comentou: "Que lindo!"', quando: '5 h' },
  { id: 'a3', foto: perfilAna, texto: 'Ana Costa começou a seguir você', quando: 'Ontem' },
];

// A tela Mercado: a feirinha de anúncios de quem mora perto
export const MERCADO = [
  { id: 'm1', titulo: 'Bicicleta aro 26, boa para passear', preco: 'R$ 350', cidade: '2 km de você', imagem: foto2 },
  { id: 'm2', titulo: 'Jogo de panelas de ferro, pouco usado', preco: 'R$ 120', cidade: '3 km de você', imagem: foto3 },
  { id: 'm3', titulo: 'Máquina de costura antiga, funcionando', preco: 'R$ 480', cidade: '5 km de você', imagem: foto1 },
  { id: 'm4', titulo: 'Poltrona de sala, muito confortável', preco: 'R$ 200', cidade: '6 km de você', imagem: foto4 },
  { id: 'm5', titulo: 'Plantas e vasos para a sua casa', preco: 'R$ 25', cidade: '1 km de você', imagem: foto6 },
  { id: 'm6', titulo: 'Guarda-sol grande para o quintal', preco: 'R$ 90', cidade: '4 km de você', imagem: foto5 },
];

// A tela Reels: vídeos curtos, um atrás do outro
export const REELS = [
  { id: 'r1', autor: 'Cozinha da Vovó', legenda: 'Bolo de fubá quentinho, sai da forma em 40 minutos 🍰', imagem: foto3, curtidas: 320 },
  { id: 'r2', autor: 'Maria Silva', legenda: 'Caminhada no parque hoje de manhã 🌳', imagem: foto2, curtidas: 128 },
  { id: 'r3', autor: 'João Santos', legenda: 'Dica para o jardim: regue bem cedo 💧', imagem: foto1, curtidas: 87 },
];

// A tela Salvos: o que a pessoa guardou para ver depois
export const SALVOS = [
  { id: 's1', tipo: 'Vídeo', titulo: 'Receita de bolo de cenoura, passo a passo', quem: 'Cozinha da Vovó', imagem: foto3 },
  { id: 's2', tipo: 'Publicação', titulo: 'Caminhada leve no parque: 10 minutos', quem: 'João Santos', imagem: foto2 },
  { id: 's3', tipo: 'Link', titulo: 'Como usar o Facebook sem medo', quem: 'Ajuda do Facebook', imagem: foto5 },
];

// A tela Eventos: festas e encontros com data marcada
export const EVENTOS = [
  { id: 'e1', nome: 'Festa Junina do bairro', quando: 'Sábado, 12 de julho, às 19h', onde: 'Salão da igreja', pessoas: '38 pessoas vão', imagem: foto4 },
  { id: 'e2', nome: 'Feira de artesanato', quando: 'Domingo, 20 de julho, às 9h', onde: 'Praça central', pessoas: '21 pessoas vão', imagem: foto6 },
  { id: 'e3', nome: 'Aula de dança para a melhor idade', quando: 'Terça-feira, 22 de julho, às 15h', onde: 'Clube dos amigos', pessoas: '14 pessoas vão', imagem: foto1 },
];

// A tela Memórias: o que a pessoa publicou em outros anos
export const MEMORIAS = [
  { id: 'l1', quando: 'Faz 2 anos', texto: 'Você publicou: "Aniversário da neta, que tarde feliz!"', imagem: foto4 },
  { id: 'l2', quando: 'Faz 5 anos', texto: 'Você publicou: "Férias na praia com a família."', imagem: foto5 },
  { id: 'l3', quando: 'Faz 1 ano', texto: 'Maria Silva escreveu: "Que bom ter você por perto!"', imagem: perfilMaria },
];

// A tela Páginas: as lojas e páginas que a pessoa acompanha
export const PAGINAS = [
  { id: 'pg1', nome: 'Cozinha da Vovó', sobre: 'Receitas simples, com poucos ingredientes', imagem: foto3, seguindo: true },
  { id: 'pg2', nome: 'Jardim em Casa', sobre: 'Dicas de plantas para quem tem pouco espaço', imagem: foto1, seguindo: false },
  { id: 'pg3', nome: 'Clube da Melhor Idade', sobre: 'Encontros, dança e viagens em grupo', imagem: foto6, seguindo: true },
];

// A tela Configurações e privacidade do Facebook
export const CONFIG_FACEBOOK = [
  { id: 'c1', titulo: 'Senha e segurança', recado: 'Trocar a sua senha e ver quem entrou na sua conta' },
  { id: 'c2', titulo: 'Privacidade', recado: 'Escolher quem pode ver o que você publica' },
  { id: 'c3', titulo: 'Notificações', recado: 'Escolher sobre o que o Facebook pode avisar você' },
  { id: 'c4', titulo: 'Bloqueio e silenciamento', recado: 'Bloquear alguém que incomoda você' },
  { id: 'c5', titulo: 'Sua atividade', recado: 'Ver o que você curtiu, comentou e pesquisou' },
  { id: 'c6', titulo: 'Ajuda a melhorar o Facebook', recado: 'Escolher o que o Facebook pode usar para melhorar' },
];

// A tela Ajuda e suporte do Facebook
export const AJUDA_FACEBOOK = [
  { id: 'h1', titulo: 'Central de ajuda', recado: 'Perguntas e respostas sobre tudo no Facebook' },
  { id: 'h2', titulo: 'Reportar um problema', recado: 'Contar para o Facebook quando algo não funciona' },
  { id: 'h3', titulo: 'Denunciar algo que incomoda', recado: 'Avisar sobre uma publicação ou mensagem ruim' },
  { id: 'h4', titulo: 'Falar com o suporte', recado: 'Pedir ajuda a uma pessoa do Facebook' },
  { id: 'h5', titulo: 'Dicas de segurança', recado: 'Como se proteger de golpes e mentiras na internet' },
];