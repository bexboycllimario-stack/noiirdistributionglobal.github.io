const SUPABASE_URL = "https://kofhkyronsnlajdywtxv.supabase.co";

const SUPABASE_KEY = "sb_publishable_qKqppwLG7L1U8UikkVq3Ww_Cy5Pq5xG";

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

script.onload = () => {
  const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  const form = document.getElementById("releaseForm");
  const message = document.getElementById("formMessage");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const musica = {
      nome_musica: String(data.get("track") || "").trim(),
      nome_artistico: String(data.get("artist") || "").trim(),
      data_lancamento: data.get("date") || null,
      estado: "Pendente"
    };

    message.hidden = false;
    message.textContent = "A enviar o pedido...";

    try {
      const { error } = await db
        .from("musicas")
        .insert([musica]);

      if (error) throw error;

      message.textContent =
        "Pedido registado com sucesso! A tua música está pendente de análise.";

      form.reset();

    } catch (error) {
      console.error("Erro Supabase:", error);

      message.textContent =
        "Não foi possível registar o pedido. A base de dados pode precisar de uma política de acesso. Tira uma captura do erro para verificarmos.";
    }
  });
};

script.onerror = () => {
  const message = document.getElementById("formMessage");

  if (message) {
    message.hidden = false;
    message.textContent =
      "Não foi possível carregar o sistema. Verifica a ligação à internet.";
  }
};

document.head.appendChild(script);
