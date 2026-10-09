import React, { useState } from "react";
import { Store, Check, ShieldCheck, Video, Radio, Users, BarChart3 } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Em que parte da venda a pessoa está, de acordo com o passo falado
const ETAPAS = {
  vender_conta: "conta",
  vender_seller: "seller",
  vender_catalogo: "catalogo",
  vender_preco: "catalogo",
  vender_salvar: "catalogo",
  vender_conteudo: "conteudo",
  vender_live: "conteudo",
  vender_afiliados: "afiliados",
  vender_dados: "dados",
  vender_pronto: "pronto",
};

// Números de exemplo que aparecem no relatório do vendedor
const RESULTADOS = [
  {
    id: "vistos",
    valor: "1.240",
    titulo: "Pessoas viram",
    recado: "Quantas pessoas assistiram aos vídeos do seu produto.",
  },
  {
    id: "cliques",
    valor: "86",
    titulo: "Clicaram no produto",
    recado: "Quantas quiseram saber o preço.",
  },
  {
    id: "vendas",
    valor: "7",
    titulo: "Compraram",
    recado: "As vendas que já entraram na sua lojinha.",
  },
];

const campo =
  "w-full rounded-2xl border-2 border-gray-300 px-4 py-4 text-base text-gray-900 outline-none focus:border-[#FE2C55]";

const botao = "w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white";

export default function VenderTikTokView({ target, onAvancar, onFechar }) {
  const etapa = ETAPAS[target] || "conta";
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-[#FE2C55]" />
          <p className="text-lg font-bold text-gray-900">Vender no TikTok</p>
        </div>
        <p className="text-xs text-gray-600 mt-1 leading-snug">
          A lojinha do TikTok se chama TikTok Shop. Você vende os seus produtos sem sair do
          aplicativo, e o cliente compra ali mesmo.
        </p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {etapa === "conta" && (
          <>
            <p className="text-sm font-bold text-gray-900">Virar conta comercial</p>
            <div className="space-y-2">
              {[
                { id: "gratis", titulo: "É de graça", recado: "Não se paga nada para virar conta comercial." },
                {
                  id: "videos",
                  titulo: "Nada muda nos seus vídeos",
                  recado: "Você continua publicando e os seus seguidores continuam com você.",
                },
                {
                  id: "loja",
                  titulo: "Libera a lojinha",
                  recado: "Aparecem os relatórios e a loja do TikTok Shop.",
                },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-2xl border-2 border-gray-200 p-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.titulo}</p>
                    <p className="text-xs text-gray-600 leading-snug">{item.recado}</p>
                  </div>
                </div>
              ))}
            </div>
            <Pulse active={target === "vender_conta"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_conta")} className={botao}>
                Virar conta comercial
              </button>
            </Pulse>
          </>
        )}

        {etapa === "seller" && (
          <>
            <p className="text-sm font-bold text-gray-900">Central do Vendedor</p>
            <p className="text-xs text-gray-600 leading-snug">
              É aqui que você cadastra os produtos, acompanha os pedidos, cuida das entregas e vê
              quanto vendeu. O cadastro é gratuito e pede documentos: o CNPJ da empresa ou o seu
              CPF, se você vender como pessoa física, além dos dados do banco para receber.
            </p>
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border-2 border-amber-300 p-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-snug">
                Se estiver começando, chame uma pessoa de confiança da família para ajudar a
                preencher os documentos e os dados do banco.
              </p>
            </div>
            <Pulse active={target === "vender_seller"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_seller")} className={botao}>
                Abrir a Central do Vendedor
              </button>
            </Pulse>
          </>
        )}

        {etapa === "catalogo" && (
          <>
            <p className="text-sm font-bold text-gray-900">Cadastrar o primeiro produto</p>
            <p className="text-xs text-gray-600 leading-snug">
              Comece com um produto só, o que você conhece melhor. Escreva um nome bem claro e
              escolha uma foto boa, com luz, mostrando o produto inteiro.
            </p>
            <Pulse active={target === "vender_catalogo"} className="w-full" ring="rounded-2xl">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onFocus={() => onAvancar("vender_catalogo")}
                placeholder="Nome do produto"
                className={campo}
              />
            </Pulse>
            <Pulse active={target === "vender_preco"} className="w-full" ring="rounded-2xl">
              <input
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                onFocus={() => onAvancar("vender_preco")}
                placeholder="Preço, por exemplo 79,90"
                inputMode="numeric"
                className={campo}
              />
            </Pulse>
            <button className="w-full rounded-2xl border-2 border-gray-300 px-4 py-4 text-left">
              <span className="text-sm font-bold text-gray-900">Escolher foto do produto</span>
              <span className="block text-xs text-gray-600 mt-0.5">
                Foto clara, de perto, sem sombra
              </span>
            </button>
            <Pulse active={target === "vender_salvar"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_salvar")} className={botao}>
                Salvar produto
              </button>
            </Pulse>
          </>
        )}

        {etapa === "conteudo" && target === "vender_conteudo" && (
          <>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#FE2C55]" />
              <p className="text-sm font-bold text-gray-900">Gravar o vídeo do produto</p>
            </div>
            <div className="space-y-2">
              {[
                { id: "usando", texto: "Mostre o produto sendo usado, no dia a dia." },
                { id: "custo", texto: "Fale para que serve e quanto custa." },
                { id: "sempre", texto: "Grave sempre, 2 ou 3 vídeos por semana." },
              ].map((dica) => (
                <div key={dica.id} className="flex items-start gap-3 rounded-2xl border-2 border-gray-200 p-3">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#FE2C55]" />
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">{dica.texto}</p>
                </div>
              ))}
            </div>
            <Pulse active={target === "vender_conteudo"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_conteudo")} className={botao}>
                Gravar vídeo do produto
              </button>
            </Pulse>
          </>
        )}

        {etapa === "conteudo" && target === "vender_live" && (
          <>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#FE2C55]" />
              <p className="text-sm font-bold text-gray-900">Fazer uma live para vender</p>
            </div>
            <p className="text-xs text-gray-600 leading-snug">
              Numa live você mostra o produto ao vivo, responde as perguntas na hora e oferece um
              cupom de desconto para quem estiver assistindo. É uma das formas que mais vende.
            </p>
            <Pulse active={target === "vender_live"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_live")} className={botao}>
                Fazer uma live
              </button>
            </Pulse>
          </>
        )}

        {etapa === "afiliados" && (
          <>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FE2C55]" />
              <p className="text-sm font-bold text-gray-900">Afiliados: outras pessoas vendem para você</p>
            </div>
            <p className="text-xs text-gray-600 leading-snug">
              Você convida criadores para gravar vídeos do seu produto. Eles ganham uma comissão só
              quando a venda acontece, então você não paga nada adiantado. Procure pessoas que já
              falam sobre o assunto do seu produto.
            </p>
            <Pulse active={target === "vender_afiliados"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_afiliados")} className={botao}>
                Convidar afiliados
              </button>
            </Pulse>
          </>
        )}

        {etapa === "dados" && (
          <>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FE2C55]" />
              <p className="text-sm font-bold text-gray-900">Ver meus resultados</p>
            </div>
            <p className="text-xs text-gray-600 leading-snug">
              No relatório você vê quantas pessoas assistiram aos vídeos, quantas clicaram no
              produto e quantas compraram. Com esses números você melhora os próximos vídeos.
            </p>
            <Pulse active={target === "vender_dados"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_dados")} className={botao}>
                Ver meus resultados
              </button>
            </Pulse>
          </>
        )}

        {etapa === "pronto" && (
          <>
            <p className="text-sm font-bold text-gray-900">O seu relatório de vendedor</p>
            <div className="space-y-2">
              {RESULTADOS.map((r) => (
                <div key={r.id} className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 p-3">
                  <p className="text-lg font-bold text-[#FE2C55] w-14 text-center">{r.valor}</p>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{r.titulo}</p>
                    <p className="text-xs text-gray-600 leading-snug">{r.recado}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border-2 border-amber-300 p-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-snug">
                Importante: nunca combine pagamento por fora do TikTok, e nunca passe a sua senha
                nem o código que chega no celular para ninguém. Quem pede isso está tentando
                aplicar um golpe.
              </p>
            </div>

            <Pulse active={target === "vender_pronto"} className="w-full" ring="rounded-2xl">
              <button onClick={() => onAvancar("vender_pronto")} className={botao}>
                Terminei
              </button>
            </Pulse>

            <Pulse active={target === "terminar"} className="w-full" ring="rounded-2xl">
              <button
                onClick={onFechar}
                className="w-full rounded-2xl bg-black px-4 py-4 text-sm font-bold text-white"
              >
                Voltar para a tela inicial
              </button>
            </Pulse>
          </>
        )}
      </div>
    </div>
  );
}