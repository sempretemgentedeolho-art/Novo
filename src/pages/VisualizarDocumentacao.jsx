import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, BookOpen, FileText, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { companionDocs } from "@/lib/companionDocs";

export default function VisualizarDocumentacao() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showList, setShowList] = useState(false);

  const selectedDoc = companionDocs[selectedIndex];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(createPageUrl("TelaInicial"))}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <BookOpen className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <h1 className="text-base font-bold truncate">Documentação Base44</h1>
        </div>
        <span className="text-xs text-white/50 flex-shrink-0">{companionDocs.length} seções</span>
      </div>

      {/* Mobile dropdown trigger */}
      <button
        onClick={() => setShowList(!showList)}
        className="lg:hidden flex-shrink-0 w-full flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <FileText className="w-4 h-4 text-cyan-400" />
          {selectedDoc.name}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showList ? "rotate-180" : ""}`} />
      </button>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - desktop only */}
        <aside className="hidden lg:flex w-72 border-r border-white/10 flex-shrink-0 flex-col">
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {companionDocs.map((doc, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                  i === selectedIndex
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-white/70 hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className={`text-xs font-mono w-6 ${i === selectedIndex ? "text-cyan-400" : "text-white/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{doc.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile dropdown list */}
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute left-0 right-0 top-[112px] z-30 bg-slate-900 border-b border-white/10 overflow-hidden"
            >
              <nav className="p-2 space-y-1 max-h-[50vh] overflow-y-auto">
                {companionDocs.map((doc, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedIndex(i);
                      setShowList(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                      i === selectedIndex
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-white/70 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className={`text-xs font-mono w-6 ${i === selectedIndex ? "text-cyan-400" : "text-white/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{doc.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto pb-8"
          >
            {/* Doc title */}
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs text-cyan-400 mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{selectedDoc.file}</span>
              </div>
              <h2 className="text-2xl font-bold">{selectedDoc.name}</h2>
            </div>

            {/* Markdown content - custom styled */}
            <div className="markdown-body text-sm leading-relaxed space-y-4">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-white mt-5 mb-2 pb-1 border-b border-white/10" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-cyan-300 mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="text-white/80 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside text-white/80 space-y-1" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-white/80 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                  em: ({ node, ...props }) => <em className="italic text-white/90" {...props} />,
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code className="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs" {...props} />
                    ) : (
                      <code className="block text-cyan-200 bg-slate-950/80 p-3 rounded-xl overflow-x-auto text-xs border border-white/10" {...props} />
                    ),
                  pre: ({ node, ...props }) => <pre className="bg-slate-950/80 p-4 rounded-xl overflow-x-auto border border-white/10 my-3" {...props} />,
                  a: ({ node, ...props }) => <a className="text-cyan-400 underline hover:text-cyan-300" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-cyan-500/50 pl-4 text-white/60 italic my-3" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full text-sm border-collapse my-3" {...props} />,
                  th: ({ node, ...props }) => <th className="text-white bg-white/5 px-3 py-2 border border-white/10 text-left" {...props} />,
                  td: ({ node, ...props }) => <td className="text-white/70 px-3 py-2 border border-white/10" {...props} />,
                  hr: ({ node, ...props }) => <hr className="border-white/10 my-4" {...props} />,
                }}
              >
                {selectedDoc.content}
              </ReactMarkdown>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                disabled={selectedIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>
              <span className="text-xs text-white/40">
                {selectedIndex + 1} / {companionDocs.length}
              </span>
              <button
                onClick={() => setSelectedIndex(Math.min(companionDocs.length - 1, selectedIndex + 1))}
                disabled={selectedIndex === companionDocs.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Próximo
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}