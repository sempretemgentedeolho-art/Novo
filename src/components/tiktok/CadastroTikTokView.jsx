import React, { useState } from "react";
import { Smartphone, Mail, ShieldCheck, CheckCircle2, Video } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Em que parte do cadastro a pessoa está, de acordo com o passo falado
const ETAPAS = {
  cadastro_telefone: "escolha",
  campo_numero: "numero",
  receber_codigo: "numero",
  campo_codigo: "codigo",
  cadastro_nome: "nome",
  cadastro_senha: "senha",
  cadastro_concluir: "senha",
  conta_pronta: "pronto",
  ir_publicar: "pronto",
};

const PASSOS = { escolha: 1, numero: 2, codigo: 3, nome: 4, senha: 5, pronto: 5 };

const campo =
  "w-full rounded-2xl border-2 border-gray-300 px-4 py-4 text-base text-gray-900 outline-none focus:border-[#FE2C55]";

export default function CadastroTikTokView({ target, onAvancar, onIrPublicar }) {
  const etapa = ETAPAS[target] || "escolha";
  const [numero, setNumero] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-4 pt-4 pb-2">
        <p className="text-lg font-bold text-gray-900">Criar a sua conta</p>
        <p className="text-xs text-gray-600 mt-1">
          Passo {PASSOS[etapa]} de 5 · é de graça e a gente faz junto
        </p>
        <div className="h-1.5 bg-gray-200 rounded-full mt-2">
          <div
            className="h-1.5 bg-[#FE2C55] rounded-full"
            style={{ width: `${(PASSOS[etapa] / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {etapa === "escolha" && (
          <>
            <p className="text-sm text-gray-700 leading-snug">
              Escolha como quer fazer a sua conta. O telefone é o mais fácil, porque a gente sempre
              lembra do nosso número.
            </p>
            <Pulse active={target === "cadastro_telefone"} className="w-full" ring="rounded-2xl">
              <button
                onClick={() => onAvancar("cadastro_telefone")}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#FE2C55] px-4 py-4"
              >
                <Smartphone className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">Continuar com telefone</span>
              </button>
            </Pulse>
            <button
              onClick={() => onAvancar("cadastro_telefone")}
              className="w-full flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-300 px-4 py-4"
            >
              <Mail className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-bold text-gray-800">Continuar com e-mail</span>
            </button>
          </>
        )}

        {etapa === "numero" && (
          <>
            <p className="text-sm text-gray-700 leading-snug">
              Digite o número do seu celular com o DDD, só os números.
            </p>
            <Pulse active={target === "campo_numero"} className="w-full" ring="rounded-2xl">
              <input
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                onFocus={() => onAvancar("campo_numero")}
                placeholder="Número do celular com DDD"
                inputMode="tel"
                className={campo}
              />
            </Pulse>
            <Pulse active={target === "receber_codigo"} className="w-full" ring="rounded-2xl">
              <button
                onClick={() => onAvancar("receber_codigo")}
                className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
              >
                Receber código
              </button>
            </Pulse>
          </>
        )}

        {etapa === "codigo" && (
          <>
            <div className="flex items-start gap-3 rounded-2xl bg-blue-50 border border-blue-200 p-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 leading-snug">
                O TikTok mandou uma mensagem com 6 números para o seu celular. Nunca passe esse
                código para outra pessoa.
              </p>
            </div>
            <Pulse active={target === "campo_codigo"} className="w-full" ring="rounded-2xl">
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onFocus={() => onAvancar("campo_codigo")}
                placeholder="Código de 6 números"
                inputMode="numeric"
                className={campo}
              />
            </Pulse>
            <button
              onClick={() => onAvancar("cadastro_nome")}
              className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
            >
              Continuar
            </button>
          </>
        )}

        {etapa === "nome" && (
          <>
            <p className="text-sm text-gray-700 leading-snug">
              Escolha o nome que vai aparecer no TikTok. Uma boa ideia é o seu nome com o ano em que
              você nasceu, por exemplo maria1947.
            </p>
            <Pulse active={target === "cadastro_nome"} className="w-full" ring="rounded-2xl">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onFocus={() => onAvancar("cadastro_nome")}
                placeholder="Nome de usuário"
                className={campo}
              />
            </Pulse>
            <button
              onClick={() => onAvancar("cadastro_senha")}
              className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
            >
              Continuar
            </button>
          </>
        )}

        {etapa === "senha" && (
          <>
            <p className="text-sm text-gray-700 leading-snug">
              Crie uma senha que só você saiba, com letras e números. Anote num papel e guarde num
              lugar seguro.
            </p>
            <Pulse active={target === "cadastro_senha"} className="w-full" ring="rounded-2xl">
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onFocus={() => onAvancar("cadastro_senha")}
                placeholder="Senha"
                className={campo}
              />
            </Pulse>
            <Pulse active={target === "cadastro_concluir"} className="w-full" ring="rounded-2xl">
              <button
                onClick={() => onAvancar("cadastro_concluir")}
                className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
              >
                Criar minha conta
              </button>
            </Pulse>
          </>
        )}

        {etapa === "pronto" && (
          <>
            <div className="flex flex-col items-center text-center py-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="text-lg font-bold text-gray-900 mt-3">Sua conta está pronta!</p>
              <p className="text-sm text-gray-700 mt-1 leading-snug">
                Agora você tem uma conta no TikTok. Com ela você pode publicar vídeos, seguir amigos
                e participar do programa que paga pelos vídeos.
              </p>
            </div>

            {target === "ir_publicar" ? (
              <Pulse active className="w-full" ring="rounded-2xl">
                <button
                  onClick={onIrPublicar}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl bg-black border-2 border-cyan-400 px-4 py-4"
                >
                  <Video className="w-5 h-5 text-cyan-300" />
                  <span className="text-sm font-bold text-white">Publicar um vídeo</span>
                </button>
              </Pulse>
            ) : (
              <Pulse active={target === "conta_pronta"} className="w-full" ring="rounded-2xl">
                <button
                  onClick={() => onAvancar("conta_pronta")}
                  className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
                >
                  Continuar
                </button>
              </Pulse>
            )}
          </>
        )}
      </div>
    </div>
  );
}