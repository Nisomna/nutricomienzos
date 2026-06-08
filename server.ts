import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Pediatric expert and mascot responses in Spanish for fallback
const FALLBACK_RESPONSES: Record<string, string> = {
  general: "¡Hola, mami y papi! 👶 Soy Nutrín, tu aliado en este hermoso camino. Recuerda que cada bebé crece a su propio ritmo. ¿De qué etapa te gustaría hablar hoy? ¡Estoy listo con consejos deliciosos y nutritivos! 🍎✨",
  embarazo: "¡Qué emoción! Durante el embarazo, el ácido fólico, el hierro y el calcio son súper héroes 🌟. Intenta consumir espinacas, lentejas, lácteos y frutas de colores. ¡Estás nutriendo un milagro de vida! 🤰🍓",
  "recien-nacido": "Hasta los 6 meses, la leche materna (o fórmula de manera exclusiva) es todo lo que tu pancita necesita 🍼✨. Tiene agua, anticuerpos y amor puro. No es necesario darles agua, tés ni jugos. ¡Cada toma los hace fuertes! 💪❤️",
  "6-12-meses": "¡Comienza la gran aventura de la alimentación complementaria! 🥦🥑 Inicien con papillas suaves de un solo ingrediente (plátano molido, calabacita, aguacate). Recuerden: nada de sal ni azúcar añadida, ¡queremos que conozcan los sabores reales de la naturaleza! 🥕🥔",
  "1-3-anos": "¡Ya es un explorador! 🏃‍♂️ A esta edad comen casi de todo en bocados pequeños. Su plato ideal debe tener colores: proteínas (pollo, frijolitos), cereales integrales y muchas verduritas. ¡Hacer figuras divertidas con la comida les encanta! 🎨🧀",
  "3-5-anos": "¡Qué grande está! 🚀 A los 3-5 años se vuelven selectivos. Involúcralos en la cocina: elegir las manzanas o desgranar chícharos los anima a probar cosas nuevas. Mantén las porciones pequeñas y la comida divertida. 🥦🍇",
  alergenos: "¡Ojo de detective! 🕵️‍♂️ Los alérgenos comunes (huevo, cacahuate, pescado, trigo) deben introducirse por separado de 3 a 5 días para vigilar cualquier reacción. Si hay antecedentes familiares, consulta a tu pediatra primero. 🥜🍳",
  atragantamiento: "¡Seguridad primero! ⚠️ Evita trozos redondos enteros como uvas, salchichas o zanahorias crudas. Corta todo a lo largo en tiritas delgadas (forma de dedito) para que su agarre sea seguro. ¡Queremos sonrisas, no sustos! 🍌🥑",
};

// API Endpoint for Nutrín Mascot chat powered by Gemini (with solid fallback and custom pediatrician prompt)
app.post("/api/nutrin/chat", async (req, res) => {
  try {
    const { message, stage, babyName } = req.body;
    const client = getGeminiClient();

    if (!message) {
      return res.status(400).json({ error: "Falta el mensaje del usuario" });
    }

    if (!client) {
      // Return a smart fallback response based on message keywords
      const lower = message.toLowerCase();
      let reply = FALLBACK_RESPONSES.general;

      if (lower.includes("embarazo") || lower.includes("gestacion") || lower.includes("panza")) {
        reply = FALLBACK_RESPONSES.embarazo;
      } else if (lower.includes("recien") || lower.includes("lactancia") || lower.includes("bebe") || lower.includes("leche")) {
        reply = FALLBACK_RESPONSES["recien-nacido"];
      } else if (lower.includes("6 meses") || lower.includes("papilla") || lower.includes("complementaria") || lower.includes("introduc")) {
        reply = FALLBACK_RESPONSES["6-12-meses"];
      } else if (lower.includes("1 año") || lower.includes("2 años") || lower.includes("bocado")) {
        reply = FALLBACK_RESPONSES["1-3-anos"];
      } else if (lower.includes("3") || lower.includes("4") || lower.includes("5") || lower.includes("grande") || lower.includes("selectivo")) {
        reply = FALLBACK_RESPONSES["3-5-anos"];
      } else if (lower.includes("alergia") || lower.includes("huevo") || lower.includes("cacahuate")) {
        reply = FALLBACK_RESPONSES.alergenos;
      } else if (lower.includes("ahogo") || lower.includes("ahogar") || lower.includes("corte") || lower.includes("peligro") || lower.includes("atraganta")) {
        reply = FALLBACK_RESPONSES.atragantamiento;
      }

      // Personalized touch even in fallback!
      if (babyName) {
        reply = reply.replace("tu bebé", babyName).replace("tu pancita", `la pancita de ${babyName}`);
      }

      return res.json({
        text: reply,
        fallback: true,
      });
    }

    const systemInstruction = 
      `Eres Nutrín, una alegre, tierna, cariñosa y experta mascota nutricional de la app "NutriComienzos". No eres una IA aburrida, eres un tierno dinosaurio bebé de color verde que ama las frutas y verduras y quiere ser el mejor amigo de la familia.
       Tu propósito es guiar, motivar y educar a padres primerizos en la alimentación y bienestar de sus hijos.
       Te consultan sobre la etapa: ${stage || "General"}. ${babyName ? `El nombre del bebé es ${babyName}.` : ""}
       Reglas de respuesta:
       1. Habla de manera empática, simple, sumamente tierna y práctica, basándote en guías internacionales de pediatría (OMS, AAP).
       2. Evita tecnicismos o descríbelos de forma lúdica y amigable para mamás y papás jóvenes.
       3. Tus respuestas DEBEN ser exclusivamente en español.
       4. Tu respuesta DEBE ser corta (máximo 140 palabras) para que quepa perfectamente en la pantalla de un celular.
       5. Estructura el texto usando emojis tiernos (🥦, 🍎, 👶, ✨, 🍼, ❤️) y viñetas breves si das listas.
       6. ¡Siempre despídete con palabras de aliento y un abrazo virtual de Nutrín!`;

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    const replyText = response.text || "¡Ups! Mi pancita se llenó de brócoli y no pude responder bien. ¡Prueba otra vez, mami o papi! 😊🦖";
    return res.json({ text: replyText, fallback: false });

  } catch (error: any) {
    console.error("Error in Gemini integration server-side:", error);
    res.status(500).json({ 
      error: "Ocurrió un pequeño contratiempo en la cocina de Nutrín.",
      details: error.message 
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server running on http://localhost:${PORT}`);
  });
}

startServer();