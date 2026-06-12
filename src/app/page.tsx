"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
export default function Home() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [arquivos, setArquivos] = useState<FileList | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function enviar() {
    if (!arquivos?.length) {
      toast.error("Selecione ao menos um arquivo");
      return;
    }

    setEnviando(true);

    const form = new FormData();

    form.append("nome", nome);
    form.append("mensagem", mensagem);

    Array.from(arquivos).forEach((arquivo) => {
      form.append("arquivos", arquivo);
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    setEnviando(false);

    if (data.success) {
      setSucesso(true);
    }
  }

  if (sucesso) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">❤️ Obrigado!</h1>

          <p className="mt-4">Sua foto foi recebida com sucesso.</p>

          <p>
            Aproveite a festa e continue registrando momentos inesquecíveis!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-3">
      <main className="min-h-screen p-4">
        <div className="max-w-lg mx-auto">
          <Image
            src="/noivos2.png"
            alt="Noivos"
            width={800}
            height={400}
            className="hero-image mb-6"
            priority
          />
          <div className="wedding-card space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center title-gradient leading-tight">
              Compartilhe seus momentos conosco ❤️
            </h1>

            <p className="text-center text-sm text-gray-600">
              Ajude-nos a guardar as lembranças deste dia tão especial.
            </p>

            <input
              placeholder="Seu nome (opcional)"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <textarea
              rows={4}
              placeholder="Mensagem para os noivos (opcional)"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />

            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setArquivos(e.target.files)}
            />

            <button
              type="button"
              onClick={enviar}
              disabled={enviando}
              className="primary-button w-full"
            >
              {enviando ? "Enviando..." : "❤️ Enviar"}
            </button>
          </div>
        </div>
      </main>
    </main>
  );
}
