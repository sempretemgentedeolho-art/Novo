import { useEffect, useState } from "react";

// Preferências de acessibilidade escolhidas pela pessoa (guardadas no aparelho)
const STORAGE_KEY = "forja_acessibilidade";
const EVENT = "forja-acessibilidade";

const PADRAO = {
  talkback: false,
  contraste: false,
  reduzirAnimacoes: false,
  gestos: false,
};

export function getAcessibilidade() {
  try {
    return { ...PADRAO, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...PADRAO };
  }
}

export function setAcessibilidade(mudanca) {
  const novo = { ...getAcessibilidade(), ...mudanca };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novo));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
  return novo;
}

// Lê as preferências e reage quando alguma delas muda
export function useAcessibilidade() {
  const [opcoes, setOpcoes] = useState(getAcessibilidade);

  useEffect(() => {
    const atualizar = () => setOpcoes(getAcessibilidade());
    window.addEventListener(EVENT, atualizar);
    window.addEventListener("storage", atualizar);
    return () => {
      window.removeEventListener(EVENT, atualizar);
      window.removeEventListener("storage", atualizar);
    };
  }, []);

  return opcoes;
}