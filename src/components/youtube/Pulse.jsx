import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAcessibilidade } from "@/lib/acessibilidade";

// Destaque no elemento que a pessoa deve tocar naquele passo.
// Com "contraste elevado" o destaque fica mais forte e escuro;
// com "menos animações" ele para de pulsar, mas continua bem visível.
export default function Pulse({
  active,
  children,
  className = "inline-flex",
  ring = "rounded-full",
  onClick,
}) {
  const { contraste, reduzirAnimacoes } = useAcessibilidade();
  const ref = useRef(null);

  // A pista do passo atual se traz sozinha para a parte visível da tela,
  // para ninguém precisar adivinhar que é preciso rolar a lista.
  useEffect(() => {
    if (!active || !ref.current) return;
    // Rola só a lista que contém a pista; nunca mexe na moldura da tela
    let box = ref.current.parentElement;
    while (box && !/(auto|scroll)/.test(getComputedStyle(box).overflowY)) {
      box = box.parentElement;
    }
    if (!box) return;
    const el = ref.current.getBoundingClientRect();
    const area = box.getBoundingClientRect();
    if (el.top >= area.top && el.bottom <= area.bottom) return;
    box.scrollTo({
      top: box.scrollTop + el.top - area.top - area.height / 2 + el.height / 2,
      behavior: reduzirAnimacoes ? "auto" : "smooth",
    });
  }, [active, reduzirAnimacoes]);

  const corDestaque = contraste ? "bg-yellow-300 border-4 border-black" : "bg-yellow-400";

  return (
    <div ref={ref} className={`relative ${className}`} onClick={onClick}>
      {active && (
        <motion.div
          animate={
            reduzirAnimacoes
              ? { scale: 1.15, opacity: 0.95 }
              : { scale: [1, 1.35, 1.35], opacity: [0.7, 0.25, 0] }
          }
          transition={
            reduzirAnimacoes
              ? { duration: 0 }
              : { repeat: Infinity, duration: 1.5, ease: "easeOut" }
          }
          className={`absolute -inset-2 ${ring} ${corDestaque} z-0 pointer-events-none`}
        />
      )}
      <motion.div
        animate={active && !reduzirAnimacoes ? { scale: [1, 1.07, 1] } : {}}
        transition={
          active && !reduzirAnimacoes ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}
        }
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}