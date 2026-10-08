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
  },
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