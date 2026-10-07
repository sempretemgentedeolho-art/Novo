import React from "react";

const DUVIDAS = [
  {
    id: 1,
    pergunta: "Como faço para ver de novo um vídeo que já assisti?",
    resposta:
      "Abra a sua área, lá embaixo no canto direito, e toque em Histórico. Todos os vídeos que você assistiu ficam guardados ali, do mais novo para o mais antigo.",
  },
  {
    id: 2,
    pergunta: "O vídeo está sem som. O que eu faço?",
    resposta:
      "Aperte o botão de volume na lateral do celular, na parte de cima. Se ainda estiver sem som, toque no vídeo para os controles aparecerem e confira se o ícone do alto-falante não está riscado.",
  },
  {
    id: 3,
    pergunta: "A letra do vídeo está pequena demais.",
    resposta:
      "Abra a sua área, toque em Configurações e depois em Aparência da legenda. Escolha Grande ou Enorme e a legenda fica do tamanho que você enxerga melhor.",
  },
  {
    id: 4,
    pergunta: "Posso assistir sem internet?",
    resposta:
      "Pode. Baixe o vídeo antes de sair de casa e ele fica guardado em Downloads, dentro do celular. Assim você assiste mesmo sem sinal.",
  },
  {
    id: 5,
    pergunta: "Como mando um vídeo para alguém da família?",
    resposta:
      "Com o vídeo aberto, toque em Compartilhar e escolha WhatsApp. O link do vídeo vai direto para a conversa com a pessoa.",
  },
];

// Ajuda do YouTube: as dúvidas mais comuns, com a resposta explicada devagar
export default function AjudaYouTubeView() {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-lg font-bold text-gray-900 pt-3">Ajuda do YouTube</h2>
      <p className="text-xs text-gray-600 mt-1 mb-4 leading-snug">
        As dúvidas que mais aparecem, com a resposta passo a passo. Se precisar, peça ajuda a alguém
        da família e leia junto.
      </p>

      <div className="space-y-3">
        {DUVIDAS.map((d) => (
          <div key={d.id} className="rounded-2xl border border-gray-200 px-3 py-3">
            <p className="text-sm font-semibold text-gray-900 leading-snug">{d.pergunta}</p>
            <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">{d.resposta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}