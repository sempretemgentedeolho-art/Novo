import foto1 from '@/assets/imagens/galeria-1.jpg';
import foto2 from '@/assets/imagens/galeria-2.jpg';
import foto3 from '@/assets/imagens/galeria-3.jpg';
import foto4 from '@/assets/imagens/galeria-4.jpg';
import foto5 from '@/assets/imagens/galeria-5.jpg';
import minhaFoto from '@/assets/imagens/shorts-pessoa.jpg';

export const MINHA_FOTO = minhaFoto;

// Os vídeos que aparecem na tela "Para você", um atrás do outro
export const VIDEOS = [
  {
    id: 'v1',
    usuario: '@cozinhadavovo',
    autor: 'Cozinha da Vovó',
    legenda: 'Bolo de fubá quentinho, sai da forma em 40 minutos 🍰 #receita',
    som: 'Som original - Cozinha da Vovó',
    imagem: foto3,
    curtidas: '125 mil',
    comentarios: '1,2 mil',
    compartilhamentos: '890',
  },
  {
    id: 'v2',
    usuario: '@mariasilva',
    autor: 'Maria Silva',
    legenda: 'Caminhada leve no parque, hoje de manhã 🌳 #vidaSaudavel',
    som: 'Som original - Maria Silva',
    imagem: foto2,
    curtidas: '48 mil',
    comentarios: '320',
    compartilhamentos: '150',
  },
  {
    id: 'v3',
    usuario: '@jardimemcasa',
    autor: 'Jardim em Casa',
    legenda: 'Dica para as plantas: regue bem cedo 💧 #jardim',
    som: 'Som original - Jardim em Casa',
    imagem: foto1,
    curtidas: '12 mil',
    comentarios: '98',
    compartilhamentos: '42',
  },
];

export const COMENTARIOS = [
  { autor: 'João Santos', texto: 'Que delícia, vou fazer hoje mesmo!' },
  { autor: 'Ana Costa', texto: 'Adorei a receita 😊' },
];

// O que o TikTok pede para liberar o dinheiro dos vídeos
export const REQUISITOS = [
  { id: 'r1', titulo: 'Ter 18 anos ou mais', recado: 'É preciso ser maior de idade.' },
  { id: 'r2', titulo: '10 mil seguidores', recado: 'Gente que acompanha os seus vídeos.' },
  { id: 'r3', titulo: '100 mil visualizações em 30 dias', recado: 'Quantas vezes os seus vídeos foram vistos.' },
  { id: 'r4', titulo: 'Conta verificada e dados completos', recado: 'Nome completo, CPF e data de nascimento.' },
];

// Os vídeos que já estão no perfil da pessoa
export const MEUS_VIDEOS = [foto4, foto5, foto2, foto1];