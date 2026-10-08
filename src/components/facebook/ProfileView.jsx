import React from "react";
import { MINHA_FOTO } from "@/components/facebook/facebookData";

// Sua página no Facebook: sua foto, seus amigos e o que você publicou
export default function ProfileView({ posts, amigos }) {
  const minhas = posts.filter((p) => p.autor === "Você");
  const totalAmigos = amigos.filter((a) => a.amigo).length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="h-28 bg-gradient-to-br from-[#1877F2] to-sky-400" />

      <div className="bg-white mx-3 -mt-12 rounded-2xl p-4 flex items-center gap-3 shadow">
        <img
          src={MINHA_FOTO}
          alt="Sua foto"
          className="w-20 h-20 rounded-full object-cover border-4 border-white"
        />
        <div>
          <p className="text-lg font-bold text-gray-900">Você</p>
          <p className="text-xs text-gray-600">
            {totalAmigos} amigos · {minhas.length} publicações
          </p>
        </div>
      </div>

      <div className="bg-white mt-2 mx-3 rounded-2xl p-4">
        <p className="text-sm font-bold text-gray-900 mb-1">Suas publicações</p>
        {minhas.length === 0 ? (
          <p className="text-sm text-gray-600 leading-snug">
            Você ainda não publicou nada. Na aba Início, toque na caixinha No que você está
            pensando para publicar uma foto.
          </p>
        ) : (
          minhas.map((post) => (
            <div key={post.id} className="flex items-center gap-3 py-2 border-t border-gray-100">
              <img src={post.imagem} alt="" className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm text-gray-800 leading-snug">{post.texto}</p>
                <p className="text-xs text-gray-500">{post.curtidas} curtidas</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white mt-2 mx-3 mb-4 rounded-2xl p-4">
        <p className="text-sm font-bold text-gray-900 mb-1">Para que serve o seu perfil</p>
        <p className="text-sm text-gray-600 leading-snug">
          É a sua página no Facebook: é onde as pessoas veem a sua foto, o que você publica e quem
          são os seus amigos.
        </p>
      </div>
    </div>
  );
}