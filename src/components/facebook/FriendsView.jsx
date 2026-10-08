import React from "react";
import { UserPlus, Check, User } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Lista de amigos: quem já é amigo e quem pode ser convidado
export default function FriendsView({ target, amigos, onAdicionar }) {
  const primeiroPendente = amigos.find((a) => !a.amigo)?.id;

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Amigos</h2>
        <p className="text-xs text-gray-600 leading-snug mt-0.5">
          Toque em Adicionar para convidar alguém. A pessoa só vira sua amiga depois que aceitar.
        </p>
      </div>

      {amigos.map((amigo) => (
        <div
          key={amigo.id}
          className="flex items-center gap-3 px-3 py-3 border-t border-gray-100"
        >
          {amigo.foto ? (
            <img src={amigo.foto} alt={amigo.nome} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">{amigo.nome}</p>
            <p className="text-xs text-gray-600">{amigo.recado}</p>
          </div>

          {amigo.amigo ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
              <Check className="w-4 h-4" /> Amigos
            </span>
          ) : (
            <Pulse
              active={target === "adicionar_amigo" && amigo.id === primeiroPendente}
              ring="rounded-full"
            >
              <button
                onClick={() => onAdicionar(amigo.id)}
                className={`px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1 ${
                  amigo.convite
                    ? "bg-green-100 text-green-800"
                    : "bg-[#1877F2] text-white"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                {amigo.convite ? "Convite enviado" : "Adicionar"}
              </button>
            </Pulse>
          )}
        </div>
      ))}
    </div>
  );
}