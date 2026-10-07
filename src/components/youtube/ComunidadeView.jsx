import React, { useState } from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const POSTS = [
  {
    id: 1,
    quando: "há 2 horas",
    texto: "Quarta-feira tem vídeo novo: bolo de milho da roça, bem cremoso. Quem vai fazer comigo?",
    imagem: "from-yellow-300 to-amber-500",
    gostei: 214,
    comentarios: 18,
  },
  {
    id: 2,
    quando: "há 3 dias",
    texto: "Me digam: qual receita você quer ver depois, sopa de legumes ou torta de frango?",
    gostei: 128,
    comentarios: 34,
  },
];

// Aba Comunidade do canal: os recados e as fotos que o canal publica entre um vídeo e outro
export default function ComunidadeView({ target, onTap }) {
  const [curtidos, setCurtidos] = useState([]);

  const curtir = (id) => {
    setCurtidos((c) => (c.includes(id) ? c : [...c, id]));
    onTap("post_curtir");
  };

  return (
    <div className="mt-4 space-y-3">
      <p className="text-xs font-bold text-gray-500 uppercase">Publicações do canal</p>

      {POSTS.map((post) => {
        const curtido = curtidos.includes(post.id);
        return (
          <div key={post.id} className="rounded-2xl border border-gray-200 px-3 py-3">
            <p className="text-sm text-gray-600">{post.quando}</p>
            <p className="text-base text-gray-900 mt-1 leading-snug">{post.texto}</p>
            {post.imagem && (
              <div className={`mt-2 h-32 rounded-xl bg-gradient-to-br ${post.imagem}`} />
            )}
            <div className="flex items-center gap-2 mt-3">
              <Pulse active={target === "post_curtir" && post.id === 1} ring="rounded-full">
                <button
                  type="button"
                  onClick={() => curtir(post.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border ${
                    curtido
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-gray-300 text-gray-800"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{post.gostei + (curtido ? 1 : 0)}</span>
                </button>
              </Pulse>
              <span className="flex items-center gap-1 text-sm text-gray-600 px-2">
                <MessageSquare className="w-4 h-4" /> {post.comentarios}
              </span>
            </div>
          </div>
        );
      })}

      <p className="text-sm text-gray-700 leading-snug rounded-2xl bg-gray-50 px-3 py-3">
        Publicação é um recado do canal: pode ser uma pergunta, uma foto ou um aviso de vídeo novo,
        entre um vídeo e outro. Toque no joinha para mostrar que você gostou.
      </p>
    </div>
  );
}