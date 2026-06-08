import React, { useState, useEffect } from "react";
import {
  Baby as BabyIcon,
  Heart,
  Calendar,
  ListTodo,
  MessageSquare,
  Plus,
  Award,
  Settings,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Send,
  RefreshCw,
  User,
  Copy,
  Check,
  CheckSquare,
  Trash,
  Smartphone,
  Sparkle,
  ArrowRight,
  Database,
  Code,
  Map,
  BookOpenCheck,
  Flame,
  Scale,
  Menu,
  ChevronUp,
  X,
  PlusCircle,
  TrendingUp,
  Share2,
  FileCode,
  CheckCircle2,
  Lock
} from "lucide-react";

import { BabyProfile, Recipe, Message, MealPlan, CommunityPost, HabitTracker } from "./types";
import { STAGES, STAGE_DESCRIPTIONS, RECIPES_DATABASE, MINI_LESSONS, DEFAULT_POSTS, APP_SPECS_NAV_FLOW, FIRESTORE_BLUEPRINT, FLUTTER_CODE_EXPORTS } from "./data";

// HIGH-FIDELITY VECTOR RENDERING OF THE OCTAGONAL MASCOT (FROM THE UPLOADED ASSET)
// Poses available: "greeting" (waving peace), "meditating" (zen lotus), "shy" (sitting cuddled),
// "surfing" (surfing on avocado), "celebrating" (jumping high), "cool" (sunglasses and peace),
// "running" (running happily), "confident" (hands on hips)
const NutrinMascot = ({ 
  pose, 
  size = "w-28 h-28", 
  caption 
}: { 
  pose: "greeting" | "meditating" | "shy" | "surfing" | "celebrating" | "cool" | "running" | "confident";
  size?: string;
  caption?: string;
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${size} transition-transform duration-300 hover:scale-105`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        {/* Helper grid for alignment, invisible */}
        <defs>
          <linearGradient id="blackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25262B" />
            <stop offset="100%" stopColor="#111215" />
          </linearGradient>
          <linearGradient id="surfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A4DF41" />
            <stop offset="100%" stopColor="#79AA31" />
          </linearGradient>
        </defs>

        {/* SURFBOARD (if posing as a surfer) */}
        {pose === "surfing" && (
          <ellipse cx="60" cy="98" rx="42" ry="10" fill="url(#surfGrad)" stroke="#618925" strokeWidth="2" />
        )}

        {/* ARMS & LEGS - Styled exactly as the cute thin black limbs from the picture */}
        
        {/* LEGS */}
        {pose === "meditating" && (
          <>
            {/* Lotus folded legs */}
            <path d="M40 85 C20 88, 30 96, 50 90" stroke="#111" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M80 85 C100 88, 90 96, 70 90" stroke="#111" strokeWidth="6" strokeLinecap="round" fill="none" />
          </>
        )}

        {pose === "shy" && (
          <>
            {/* Cuddled leg bars with knees up */}
            <path d="M40 82 C35 70, 48 65, 45 85" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M80 82 C85 70, 72 65, 75 85" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Anxious foot tap */}
            <line x1="43" y1="85" x2="35" y2="85" stroke="#111" strokeWidth="5" strokeLinecap="round" />
            <line x1="77" y1="85" x2="85" y2="85" stroke="#111" strokeWidth="5" strokeLinecap="round" />
          </>
        )}

        {pose !== "meditating" && pose !== "shy" && (
          <>
            {/* Standard legs based on movement state */}
            {pose === "running" ? (
              <>
                {/* Sprinter running leg loops */}
                <path d="M48 83 C45 92, 35 95, 25 90" stroke="#111" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M72 83 C75 92, 85 96, 92 82" stroke="#111" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              </>
            ) : pose === "celebrating" ? (
              <>
                {/* High jumping wide legs */}
                <path d="M45 83 L30 100" stroke="#111" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M75 83 L90 100" stroke="#111" strokeWidth="5.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Regular straight little cute standing feet */}
                <line x1="48" y1="83" x2="48" y2="102" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                <line x1="72" y1="83" x2="72" y2="102" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                <line x1="48" y1="102" x2="42" y2="102" stroke="#111" strokeWidth="6" strokeLinecap="round" />
                <line x1="72" y1="102" x2="78" y2="102" stroke="#111" strokeWidth="6" strokeLinecap="round" />
              </>
            )}
          </>
        )}

        {/* MAIN BODY: HIGH-CONTRAST OCTAGON */}
        {/* Points of regular octagon centered on 60, 52 with size ~ 76x76 */}
        <polygon 
          points="40,16 80,16 102,38 102,70 80,92 40,92 18,70 18,38" 
          fill="url(#blackGrad)" 
          stroke="#111" 
          strokeWidth="3.5"
        />
        {/* Inside white nested octagon frame matching custom logo exactly */}
        <polygon 
          points="43,21 77,21 97,41 97,67 77,87 43,87 23,67 23,41" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="3"
        />

        {/* ARMS - Positions depends on pose */}
        {pose === "greeting" && (
          <>
            {/* Left arm waving peace sign */}
            <path d="M20 54 C10 40, 5 30, 12 18" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* V sign fingers */}
            <line x1="12" y1="18" x2="6" y2="8" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="12" y1="18" x2="18" y2="8" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
            {/* Right arm relaxed */}
            <path d="M100 54 Q112 65 105 78" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {pose === "meditating" && (
          <>
            {/* Two arms meditating in air making dynamic zen circle 'ohm' gestures */}
            <path d="M20 54 C5 54, 3 66, 12 70" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M100 54 C115 54, 117 66, 108 70" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="15" cy="71" r="5" fill="none" stroke="#111" strokeWidth="3" />
            <circle cx="105" cy="71" r="5" fill="none" stroke="#111" strokeWidth="3" />
          </>
        )}

        {pose === "cool" && (
          <>
            {/* Left hand doing V-sign with swagger */}
            <path d="M20 54 Q10 45 15 30" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <line x1="15" y1="30" x2="10" y2="18" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="15" y1="30" x2="22" y2="20" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
            {/* Right arm on hip swagger */}
            <path d="M100 54 L112 60 L102 70" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {pose === "surfing" && (
          <>
            {/* Arms spread for core balance on surfboard */}
            <path d="M20 54 Q5 45 4 35" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M100 54 Q116 50 112 36" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {pose === "confident" && (
          <>
            {/* Both arms planted firmly on hips */}
            <path d="M20 54 L10 60 L18 70" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M100 54 L110 60 L102 70" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {pose === "celebrating" && (
          <>
            {/* Both arms thrown straight up in absolute nutrition-fueled glee */}
            <path d="M22 45 L10 20" stroke="#111" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path d="M98 45 L110 20" stroke="#111" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            {/* Sparkle star indicators */}
            <circle cx="8" cy="12" r="1.5" fill="#F58220" />
            <circle cx="112" cy="12" r="1.5" fill="#8DC63F" />
          </>
        )}

        {pose === "running" && (
          <>
            {/* Dynamic running stride arms */}
            <path d="M22 50 Q12 38 18 26" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M98 50 Q112 55 105 68" stroke="#111" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        )}

        {pose === "shy" && (
          <>
            {/* Shy hands joined together in middle of belly */}
            <path d="M22 54 C35 60, 45 60, 48 56" stroke="#111" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M98 54 C85 60, 75 60, 72 56" stroke="#111" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* EYES - Large, expressive white googly circles with brown irises */}
        {pose === "meditating" ? (
          <>
            {/* Peaceful closed curved eyes */}
            <path d="M42 46 Q50 38 52 46" stroke="#FFFFFF" strokeWidth="5_5" strokeLinecap="round" fill="none" />
            <path d="M68 46 Q70 38 78 46" stroke="#FFFFFF" strokeWidth="5_5" strokeLinecap="round" fill="none" />
          </>
        ) : pose === "cool" ? (
          <>
            {/* Cool retro black sunglasses with high shine stripe */}
            <polygon points="32,38 58,38 52,54 36,54" fill="#111" stroke="#FFF" strokeWidth="2" />
            <polygon points="62,38 88,38 84,54 68,54" fill="#111" stroke="#FFF" strokeWidth="2" />
            <line x1="58" y1="44" x2="62" y2="44" stroke="#111" strokeWidth="4" />
            {/* Sun flare shine reflection */}
            <line x1="38" y1="42" x2="48" y2="42" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="42" x2="78" y2="42" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Cute big white circle eyes */}
            <circle cx="48" cy="46" r="11" fill="#FFFFFF" stroke="#111111" strokeWidth="1" />
            <circle cx="72" cy="46" r="11" fill="#FFFFFF" stroke="#111111" strokeWidth="1" />
            
            {/* Brown Irises */}
            {pose === "shy" ? (
              <>
                {/* Worried pupils looking sideways */}
                <circle cx="45" cy="46" r="5" fill="#5C4033" />
                <circle cx="69" cy="46" r="5" fill="#5C4033" />
                <circle cx="44" cy="44" r="1.5" fill="#FFF" />
                <circle cx="68" cy="44" r="1.5" fill="#FFF" />
              </>
            ) : (
              <>
                {/* Wide happy central pupils */}
                <circle cx="48" cy="46" r="5" fill="#5C4033" />
                <circle cx="72" cy="46" r="5" fill="#5C4033" />
                {/* White eye glare reflections */}
                <circle cx="46.5" cy="44.5" r="2" fill="#FFFFFF" />
                <circle cx="70.5" cy="44.5" r="2" fill="#FFFFFF" />
              </>
            )}
          </>
        )}

        {/* CUTE EYEBROWS OR EYELASHES */}
        <path d="M38 31 Q46 26 52 32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M68 32 Q74 26 82 31" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* CHEEKS - Warm rosy blush */}
        <circle cx="34" cy="56" r="4.5" fill="#F58220" opacity="0.65" />
        <circle cx="86" cy="56" r="4.5" fill="#F58220" opacity="0.65" />

        {/* MOUTH - Expressing his mood */}
        {pose === "shy" ? (
          // Small squeaky worry line
          <path d="M54 62 Q60 58 66 62" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : pose === "meditating" ? (
          // Gentle smiling lock
          <path d="M54 59 Q60 66 66 59" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : (
          // Wide open cute toothy dinosaur baby grin!
          <>
            <path d="M52 58 Q60 74 68 58 Z" fill="#F58220" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M56 61 Q60 67 64 61" fill="#FFFFFF" opacity="0.8" />
          </>
        )}
      </svg>
      {caption && (
        <span className="text-[10px] bg-slate-900 text-amber-200 font-extrabold uppercase px-2 py-0.5 rounded-full mt-1.5 shadow-sm border border-slate-700">
          {caption}
        </span>
      )}
    </div>
  );
};

export default function App() {
  // Mobile Simulator States
  const [currentScreen, setCurrentScreen] = useState<
    "bienvenida" | "registro" | "perfil_bebe" | "inicio" | "nutricion" | "recetas" | "planificador" | "lista_compras" | "comunidad" | "logros" | "configuracion"
  >("bienvenida");

  const [inspectedRecipe, setInspectedRecipe] = useState<Recipe | null>(null);

  const [simulatedDevice, setSimulatedDevice] = useState<"ios" | "android">("ios");

  // User & Baby Profiles
  const [profile, setProfile] = useState<BabyProfile>(() => {
    const saved = localStorage.getItem("nutricomienzos_profile");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: "Mateo",
      weight: "10.4",
      height: "76",
      ageMonths: 14,
      stage: "1-3-anos"
    };
  });

  const [parentName, setParentName] = useState<string>(() => {
    return localStorage.getItem("nutricomienzos_parentName") || "Karla";
  });

  // Persist baby profile changes
  useEffect(() => {
    localStorage.setItem("nutricomienzos_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("nutricomienzos_parentName", parentName);
  }, [parentName]);

  // Habit Tracker State (Daily)
  const [habits, setHabits] = useState<HabitTracker>(() => {
    const saved = localStorage.getItem("nutricomienzos_habits");
    return saved ? JSON.parse(saved) : { water: 3, veggies: 2, fruits: 1 };
  });

  useEffect(() => {
    localStorage.setItem("nutricomienzos_habits", JSON.stringify(habits));
  }, [habits]);

  // Mascot Evolution levels based on daily goals completed
  const totalCompletedHabits = habits.water + habits.veggies + habits.fruits;
  const currentLevel = Math.min(5, Math.floor(totalCompletedHabits / 2) + 1);

  const getMascotEvolution = (level: number) => {
    switch (level) {
      case 1:
        return { 
          stage: "Huevo Nutritivo", 
          emoji: "🥚", 
          pose: "shy" as const, 
          status: "🦕 ¡Nutrín está protegiéndose en su cascarón! Completa el hidratante diario para verlo nacer fuerte." 
        };
      case 2:
        return { 
          stage: "Nutrín Bebé", 
          emoji: "🦕", 
          pose: "greeting" as const, 
          status: "🦕 ¡Nutrín ha nacido! Ama el brócoli tierno y se alegra cuando Mateo come de forma colorida." 
        };
      case 3:
        return { 
          stage: "Nutrín Explorador", 
          emoji: "🥦", 
          pose: "running" as const, 
          status: "🦕 ¡Nutrín camina! Le fascinan los bastoncitos de aguacate cocido y los cortes seguros." 
        };
      case 4:
        return { 
          stage: "Nutrín Atleta", 
          emoji: "👑", 
          pose: "cool" as const, 
          status: "🦕 ¡Nutrín tiene su onda! Te obsequia estrellas brillantes por cada comida baja en sodio terminada." 
        };
      default:
        return { 
          stage: "Súper Nutrín", 
          emoji: "🦕✨", 
          pose: "celebrating" as const, 
          status: "🦕 ¡Sabio Gigante! Tu guía definitiva libre de mitos comerciales. ¡Sigan así, súper papás!" 
        };
    }
  };

  const mascotInfo = getMascotEvolution(currentLevel);

  // Chat/Consultant State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "nutrin",
      text: "¡Hola! Soy Nutrín, tu tierno tutor octogonal 🦖🖤. Estoy aquí para resolver tus dudas de forma 100% pediátrica. ¿Qué ingrediente tienes duda de cómo cortar o qué te gustaría cocinar hoy?",
      timestamp: "04:21"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Meal Plan State
  const [mealPlan, setMealPlan] = useState<Record<string, MealPlan>>(() => {
    const saved = localStorage.getItem("nutricomienzos_meals");
    if (saved) return JSON.parse(saved);
    return {
      Lunes: { breakfast: "Avena con plátano", lunch: "Papilla de calabaza y pollo", dinner: "Puré de aguacate", snack: "Trozos de pera al vapor" },
      Martes: { breakfast: "Huevo revuelto tierno", lunch: "Crema de brócoli con queso", dinner: "Tortitas de avena", snack: "Manzana triturada" },
      Miércoles: { breakfast: "Yogur natural con mango", lunch: "Sopa de estrellitas con verduras", dinner: "Puré de camote dulce", snack: "Bastones de pepino" },
      Jueves: { breakfast: "Gachas de sémola", lunch: "Pescado suave con zanahoria", dinner: "Papilla de lentejas", snack: "Plátano machacado" },
      Viernes: { breakfast: "Licuado de fresas con espinaca", lunch: "Guiso triturado de pavo", dinner: "Papilla de aguacate", snack: "Durazno cocido" },
      Sábado: { breakfast: "Panqueques de avena", lunch: "Consomé arcoíris con fideos", dinner: "Zanahoria machacada", snack: "Yogur griego suave" },
      Domingo: { breakfast: "Avena cremosa", lunch: "Arroz con frijoles aplastados", dinner: "Palitos de calabacita", snack: "Puré de pera" }
    };
  });

  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [editingMealField, setEditingMealField] = useState<keyof MealPlan | null>(null);
  const [editingMealText, setEditingMealText] = useState("");

  // Shopping Items
  const [shoppingItems, setShoppingItems] = useState<{ id: string; name: string; checked: boolean; category: string }[]>([
    { id: "s1", name: "Espinaca tierna para batidos", checked: false, category: "Verduras" },
    { id: "s2", name: "Aguacates bien maduros", checked: true, category: "Grasas Saludables" },
    { id: "s3", name: "Plátanos de seda suaves", checked: false, category: "Frutas" },
    { id: "s4", name: "Avena integral molida", checked: false, category: "Cereales" },
    { id: "s5", name: "Pechuga de pollo fresca", checked: false, category: "Proteínas" },
    { id: "s6", name: "Queso fresco bajo en sal", checked: true, category: "Lácteos" }
  ]);
  const [newShopItem, setNewShopItem] = useState("");
  const [newShopCategory, setNewShopCategory] = useState("Verduras");

  // Community Feed
  const [posts, setPosts] = useState<CommunityPost[]>(DEFAULT_POSTS);
  const [newPostContent, setNewPostContent] = useState("");

  // Developer panel tab
  const [showDeveloperTab, setShowDeveloperTab] = useState(false);
  const [activeTechnicalTab, setActiveTechnicalTab] = useState<"wireframe" | "flow" | "db" | "flutter">("flutter");
  const [selectedFlutterFile, setSelectedFlutterFile] = useState<"pubspec" | "main" | "firestore" | "welcome">("welcome");
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Dynamic Clock State for phone top status bar
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Chat message submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const inputToSend = chatInput;
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/nutrin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputToSend,
          stage: profile.stage,
          babyName: profile.name
        })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      const nutrinMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "nutrin",
        text: data.text || "¡Uy! Creo que Nutrín se distrajo comiendo verduras. Prueba otra vez.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, nutrinMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "nutrin",
          text: "¡Hola! He tenido un pequeño lag en mis patitas. Recuerda que a los " + profile.ageMonths + " meses, la hidratación con agua en vasos pequeños es genial si ya come sólidos. ¿Tienes otra pregunta? ✨🦕",
          timestamp: "Ahora"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateStage = (stageId: BabyProfile["stage"]) => {
    let defaultAge = 12;
    if (stageId === "embarazo") defaultAge = 0;
    else if (stageId === "recien-nacido") defaultAge = 3;
    else if (stageId === "6-12-meses") defaultAge = 8;
    else if (stageId === "1-3-anos") defaultAge = 18;
    else if (stageId === "3-5-anos") defaultAge = 48;

    setProfile(prev => ({
      ...prev,
      stage: stageId,
      ageMonths: defaultAge
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleAddShopItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShopItem.trim()) return;
    setShoppingItems(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newShopItem.trim(),
        checked: false,
        category: newShopCategory
      }
    ]);
    setNewShopItem("");
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const newPost: CommunityPost = {
      id: "usr-" + Date.now(),
      author: `${parentName} (Tú)`,
      role: `Mamá/Papá de ${profile.name} (${profile.ageMonths}m)`,
      content: newPostContent.trim(),
      likes: 0,
      replies: 0,
      date: "Ahora",
      avatarColor: "bg-emerald-100 text-[#0056A6]"
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const importMealsToShoppingList = () => {
    const activeDayMeals = mealPlan[selectedDay];
    const items = [
      activeDayMeals.breakfast,
      activeDayMeals.lunch,
      activeDayMeals.dinner,
      activeDayMeals.snack
    ].filter((m) => m && m.length > 3);

    const added = items.map((meal, index) => ({
      id: "imp-" + index + "-" + Date.now(),
      name: `Ingredientes para "${meal}"`,
      checked: false,
      category: "Planificador"
    }));

    setShoppingItems((prev) => [...prev, ...added]);
    setCurrentScreen("lista_compras");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#A0C7BB] via-[#C9DF9E] to-[#CDDD52] flex items-center justify-center p-0 md:p-6 overflow-hidden selection:bg-[#8BB326] selection:text-white">

      {/* MOBILE APPLICATION container wrapper
          - Framed in a minimalist, gorgeous white physical smartphone frame reflecting the design image.
      */}
      <div className="w-full h-screen sm:h-[820px] sm:max-w-[395px] bg-[#FDFBF7] sm:rounded-[46px] sm:border-[8px] sm:border-white sm:shadow-[0_25px_80px_rgba(40,55,30,0.18)] relative flex flex-col overflow-hidden transition-all duration-500 z-10">
        
        {/* PHYSICAL SMARTPHONE EARPIECE NOTCH / BAR DESIGNED ON DESKTOP */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-white rounded-b-xl z-50 shadow-xs">
          <div className="w-8 h-0.5 bg-stone-300 rounded-full mx-auto mt-1" />
        </div>

        {/* TOP STATUS BAR (Dynamic real-time clock and cellular indicators) */}
        <div className="h-8 max-h-8 min-h-8 w-full bg-[#FDFBF7] text-[#55634B] text-[10px] px-6 sm:px-8 flex items-center justify-between z-40 select-none relative pt-1.5 border-b border-stone-200/30">
          <span className="font-bold tracking-tight">{currentTime || "04:21 AM"}</span>
          <div className="flex items-center gap-1.5 font-mono text-[9px] opacity-80">
            <span>📶</span>
            <span>LTE</span>
            <span className="text-[#8BB326] font-bold">🔋 100%</span>
          </div>
        </div>

        {/* INTERNAL VIEWPORT SCREEN CONTAINER - MOBILE APP CONTENT */}
        <div className="flex-1 overflow-y-auto bg-[#FDFBF7] flex flex-col relative pb-16 scrollbar-none">
            
            {/* HEADER — estilo referencia: hamburger izquierda, lupa derecha, hoja decorativa */}
            {currentScreen !== "bienvenida" && currentScreen !== "registro" && currentScreen !== "perfil_bebe" && (
              <div className="bg-[#FAFAF7] px-5 pt-2 pb-1 sticky top-0 z-30 flex items-center justify-between">
                <button onClick={() => {}} className="w-8 h-8 flex flex-col justify-center gap-[4px]">
                  <span className="block w-5 h-[2px] bg-stone-700 rounded-full"></span>
                  <span className="block w-4 h-[2px] bg-stone-700 rounded-full"></span>
                  <span className="block w-5 h-[2px] bg-stone-700 rounded-full"></span>
                </button>
                <div 
                  onClick={() => setCurrentScreen("perfil_bebe")}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 bg-[#8BB326] rounded-full animate-pulse"></span>
                  <span className="text-[9.5px] font-bold text-[#5C791D]">👶 {profile.name} • {profile.ageMonths}m</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </button>
              </div>
            )}

            {/* --- SCREEN 1: WELCOME ONBOARDING --- */}
            {currentScreen === "bienvenida" && (
              <div className="p-5 flex flex-col items-center justify-between min-h-full py-8 text-center text-[#3C4A28]">
                <div className="my-auto space-y-6">
                  {/* Highlighted core mascot custom widget! Waving hello state */}
                  <div className="bg-[#FAF7F2] rounded-[36px] p-4 inline-block border border-[#EDF2DF] shadow-xs">
                    <NutrinMascot pose="greeting" size="w-28 h-28" caption="HOLA, SOY NUTRÍN" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h2 className="text-3xl font-black text-[#5C791D] tracking-tight lowercase">
                      nutrimás
                    </h2>
                    <p className="text-xs font-semibold text-stone-400 tracking-wider uppercase">
                      Guía de nutrición pediátrica
                    </p>
                  </div>

                  <p className="text-[11.5px] text-stone-500 leading-relaxed max-w-[270px] mx-auto font-medium">
                    El aliado experto diseñado con pediatras para apoyarte desde la gestación hasta los 5 años de vida de tu bebé.
                  </p>

                  <div className="bg-[#EDF2DF] border border-[#D5E2BC] rounded-2xl p-3">
                    <p className="text-[10.5px] leading-snug text-[#5C791D] font-extrabold text-center">
                      🌿 Nutrición 100% libre de mitos comerciales
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-2 pt-6">
                  <button
                    onClick={() => setCurrentScreen("registro")}
                    className="w-full bg-[#8BB326] hover:bg-[#73982A] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Comenzar aventura</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentScreen("inicio")}
                    className="w-full text-[10.5px] text-[#5C791D] font-black hover:underline"
                  >
                    Entrar directamente (Demo Rápida)
                  </button>
                </div>
              </div>
            )}

            {/* --- SCREEN 2: REGISTRO PADRE --- */}
            {currentScreen === "registro" && (
              <div className="p-5 flex flex-col justify-between min-h-full bg-[#FDFBF7]">
                <div>
                  <div className="text-center mb-5">
                    <div className="inline-block p-2 bg-[#FCF8F2] rounded-full mb-2">
                      <NutrinMascot pose="confident" size="w-16 h-16" />
                    </div>
                    <h3 className="text-base font-black text-[#3C4A28]">
                      Hola, papá y mamá
                    </h3>
                    <p className="text-[11px] text-stone-400 font-medium">
                      Configura tu nombre para personalizar los consejos de Nutrín.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-1">
                        Tu Nombre / Apodo:
                      </label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="ej. Karla, Mateo's Mom"
                        className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-xs font-bold focus:outline-[#8BB326] text-stone-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-1">
                        ¿Qué método te atrae más?
                      </label>
                      <select className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-xs font-bold focus:outline-[#8BB326] text-stone-700">
                        <option>Método Tradicional (Papillas y Purés)</option>
                        <option>Baby Led Weaning (BLW - Trocitos)</option>
                        <option>Alimentación Mixta (Ambas opciones)</option>
                        <option>Aún no lo tengo decidido</option>
                      </select>
                    </div>

                    <div className="bg-[#FCF8F2] rounded-2.5xl p-3.5 border border-stone-200/50">
                      <p className="text-[9.5px] text-[#8BB326] font-black uppercase tracking-wider">Tip de Bienvenida:</p>
                      <p className="text-[11px] text-stone-600 leading-normal font-medium mt-1">
                        No hay prisas para introducir sólidos. Los bebés necesitan desarrollar el reflejo de deglución antes de iniciar. ¡Nutrín te irá avisando!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setCurrentScreen("perfil_bebe")}
                    className="w-full bg-[#8BB326] hover:bg-[#73982A] text-white font-black py-3.5 px-4 rounded-xl shadow-md text-xs flex items-center justify-center gap-1"
                  >
                    <span>Configurar bebé</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* --- SCREEN 3: PERFIL DETALLADO BEBÉ --- */}
            {currentScreen === "perfil_bebe" && (
              <div className="p-5 flex flex-col justify-between min-h-full bg-[#FDFBF7]">
                <div>
                  <div className="text-center mb-4">
                    <div className="inline-block p-1 bg-[#FCF8F2] rounded-full mb-1">
                      <NutrinMascot pose="shy" size="w-14 h-14" />
                    </div>
                    <h3 className="text-base font-black text-[#3C4A28]">
                      Perfil de tu pequeño
                    </h3>
                    <p className="text-[11px] text-stone-400 font-medium">
                      Calculamos alertas en base a su edad exacta y peso.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-1">Nombre de tu bebé:</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="ej. Mateo, Sofía, Lucas"
                        className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-xs font-bold focus:outline-[#8BB326] text-stone-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-1">Peso (kg):</label>
                        <input
                          type="number"
                          step="0.1"
                          value={profile.weight}
                          onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                          className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-xs font-bold focus:outline-[#8BB326] text-stone-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-1">Talla (cm):</label>
                        <input
                          type="number"
                          value={profile.height}
                          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                          className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-xs font-bold focus:outline-[#8BB326] text-stone-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-stone-400 tracking-wider mb-1">Etapa de crecimiento:</label>
                      <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-none">
                        {STAGES.map((st) => (
                          <button
                            key={st.id}
                            onClick={() => updateStage(st.id)}
                            className={`w-full p-2.5 text-left rounded-2xl transition-all border flex items-center justify-between ${
                              profile.stage === st.id
                                ? "bg-[#8BB326] border-[#8BB326] text-white"
                                : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                            }`}
                          >
                            <div className="flex-1 text-left">
                              <p className="font-bold text-xs">{st.label}</p>
                              <p className={`text-[9px] font-medium leading-none mt-0.5 ${profile.stage === st.id ? "text-green-50" : "text-stone-400"}`}>
                                {st.desc.slice(0, 48)}...
                              </p>
                            </div>
                            <span className="text-[9px] font-black opacity-90 pl-1 whitespace-nowrap">
                              {st.ageRange}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setCurrentScreen("inicio")}
                    className="w-full bg-[#8BB326] hover:bg-[#73982A] text-white font-black py-3.5 px-4 rounded-xl shadow-md text-xs flex items-center justify-center gap-1"
                  >
                    <span>Guardar y Entrar</span>
                    <Check className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>
            )}

            {/* --- SCREEN 4: INICIO MAIN DASHBOARD (Rediseño estilo referencia) --- */}
            {currentScreen === "inicio" && (
              <div className="bg-[#FAFAF7] min-h-full">
                
                {/* HEADER SALUDO */}
                <div className="px-5 pt-4 pb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-stone-400 font-semibold">Buenos días 🌿</p>
                    <h4 className="text-base font-black text-[#4A7C1F] leading-tight">
                      Hola, {parentName}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#EDF2DF] rounded-full flex items-center justify-center">
                      <span className="text-sm">🦖</span>
                    </div>
                  </div>
                </div>

                {/* SEARCH BAR estilo referencia */}
                <div className="px-5 pb-3">
                  <div className="bg-[#EEF3E4] rounded-full px-4 py-2.5 flex items-center gap-2 border border-[#D8E8C0]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BB326" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span className="text-[11px] text-stone-400 font-medium flex-1">Buscar alimento o receta...</span>
                  </div>
                </div>

                {/* TABS ETAPA */}
                <div className="px-5 flex gap-2 pb-3">
                  {["Alimentos", "Recetas", "Hábitos"].map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => i === 1 ? setCurrentScreen("recetas") : i === 2 ? null : null}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${i === 0 ? "bg-[#8BB326] text-white shadow-sm" : "bg-white text-stone-400 border border-stone-200"}`}
                    >
                      {tab}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8BB326" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                  </div>
                </div>

                {/* LISTA DE ALIMENTOS estilo referencia */}
                <div className="px-5 space-y-2">
                  {[
                    { emoji: "🫛", name: "Guisantes frescos", cat: "alimentos / verduras", cal: 81, color: "#E8F5D4" },
                    { emoji: "🥚", name: "Huevo", cat: "alimentos / lácteos y huevos", cal: 72, color: "#FFF8E8" },
                    { emoji: "🥬", name: "Espinaca Baby", cat: "alimentos / verduras", cal: 23, color: "#E8F5D4" },
                    { emoji: "🥑", name: "Aguacate", cat: "alimentos / frutas", cal: 160, color: "#F0F9E8" },
                    { emoji: "🍌", name: "Plátano maduro", cat: "alimentos / frutas", cal: 89, color: "#FFF9E0" },
                  ].map((food, i) => (
                    <div
                      key={food.name}
                      className="bg-white rounded-2xl px-3.5 py-3 flex items-center gap-3 border border-stone-100 shadow-[0_1px_6px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-all cursor-pointer"
                      onClick={() => setCurrentScreen("nutricion")}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-none text-2xl" style={{ background: food.color }}>
                        {food.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-stone-800 leading-tight">{food.name}</p>
                        <p className="text-[9.5px] text-stone-400 font-medium leading-tight mt-0.5">{food.cat}</p>
                        <p className="text-[9px] text-stone-400 font-medium">Calorías {food.cal}</p>
                      </div>
                      <Heart className={`w-4 h-4 flex-none ${i < 2 ? "fill-[#8BB326] text-[#8BB326]" : "text-stone-300"}`} />
                    </div>
                  ))}
                </div>

                {/* HÁBITOS DEL DÍA — sección compacta */}
                <div className="px-5 mt-4 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10.5px] font-black text-stone-600 uppercase tracking-wider">Metas del día</p>
                    <button onClick={() => setHabits({ water: 0, veggies: 0, fruits: 0 })} className="text-[9px] text-stone-400 font-bold">reiniciar ↺</button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { emoji: "🥛", label: "Agua", val: habits.water, max: 4, color: "#E8F0FF", action: () => setHabits({ ...habits, water: Math.min(4, habits.water + 1) }) },
                      { emoji: "🥦", label: "Verdura", val: habits.veggies, max: 3, color: "#EDF2DF", action: () => setHabits({ ...habits, veggies: Math.min(3, habits.veggies + 1) }) },
                      { emoji: "🍎", label: "Fruta", val: habits.fruits, max: 3, color: "#FFF0E8", action: () => setHabits({ ...habits, fruits: Math.min(3, habits.fruits + 1) }) },
                    ].map(h => (
                      <button key={h.label} onClick={h.action}
                        className="rounded-2xl p-3 text-center transition-all active:scale-95 border border-stone-100"
                        style={{ background: h.color }}
                      >
                        <span className="text-xl block">{h.emoji}</span>
                        <span className="text-[9px] font-bold text-stone-600 block mt-1">{h.label}</span>
                        <span className="text-[11px] font-black text-[#5C791D] block">{h.val}/{h.max}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CHAT NUTRÍN */}
                <div className="px-5 mt-3 mb-4">
                  <div className="bg-[#8BB326] rounded-2xl p-3.5 flex items-center gap-3">
                    <span className="text-2xl flex-none">🦖</span>
                    <div className="flex-1">
                      <p className="text-[11px] font-black text-white leading-tight">¿Dudas sobre {profile.name}?</p>
                      <p className="text-[9.5px] text-green-100 font-medium leading-tight mt-0.5">Pregúntale a Nutrín IA</p>
                    </div>
                    <button onClick={() => setCurrentScreen("configuracion")} className="bg-white/20 hover:bg-white/30 text-white rounded-xl px-3 py-1.5 text-[9.5px] font-black transition-all">
                      Chat →
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* --- SCREEN 5: EDUCACIÓN NUTRICIÓN POR EDAD (MITOS/VERDAD) --- */}
            {currentScreen === "nutricion" && (
              <div className="p-4 space-y-4">
                <div className="text-left">
                  <h3 className="text-base font-black text-[#0056A6]">
                    Guía de Nutrición Infantil
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Alineado con las directrices pediátricas aprobadas por la OMS.
                  </p>
                </div>

                {/* Dynamic Quick Stage toggler pillbox inside phone */}
                <div className="flex gap-1 overflow-x-auto pb-1.5">
                  {STAGES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => updateStage(st.id)}
                      className={`flex-none px-2.5 py-1 rounded-full text-[10px] font-extrabold border transition-all ${
                        profile.stage === st.id
                          ? "bg-[#F58220] border-[#F58220] text-white"
                          : "bg-white border-[#EAD7C3] text-gray-500 text-opacity-80"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Priority items detailed card view */}
                <div className="space-y-3">
                  <div className="bg-white border border-[#EAD7C3] rounded-2xl p-4 shadow-xs">
                    <h4 className="text-xs font-black text-[#0056A6] flex items-center gap-1.5 mb-2">
                      <span className="text-emerald-500">🥦</span> Alimentos para Priorizar:
                    </h4>
                    <div className="space-y-1.5">
                      {STAGE_DESCRIPTIONS[profile.stage]?.foods.map((food, idx) => (
                        <div key={idx} className="text-[11px] text-gray-600 flex items-start gap-1">
                          <span className="text-amber-500">•</span>
                          <span>{food}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#8DC63F] bg-opacity-10 rounded-2xl p-4 border border-[#8DC63F] border-opacity-30">
                    <h4 className="text-xs font-black text-[#4B7318] flex items-center gap-1.5 mb-1.5">
                      ⚖️ Cantidades Sugeridas:
                    </h4>
                    <p className="text-[11px] text-gray-700 leading-snug">
                      {STAGE_DESCRIPTIONS[profile.stage]?.amounts}
                    </p>
                  </div>

                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                    <h4 className="text-xs font-black text-rose-700 flex items-center gap-1.5 mb-1.5">
                      ❌ Evitar por Completo:
                    </h4>
                    <div className="space-y-1">
                      {STAGE_DESCRIPTIONS[profile.stage]?.avoid.map((item, idx) => (
                        <div key={idx} className="text-[11px] text-rose-700 flex items-start gap-1.5">
                          <span>✗</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Myths accordion inside phone */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">
                    Lecciones breves (Mitos y verdades)
                  </h4>
                  {MINI_LESSONS.map((les) => (
                    <div key={les.id} className="bg-white border border-[#EAD7C3] p-3 rounded-2xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] bg-amber-100 text-[#F58220] px-2 py-0.5 rounded font-extrabold uppercase">
                          {les.category}
                        </span>
                      </div>
                      <p className="text-xs font-black text-[#0056A6] leading-tight">
                        {les.title}
                      </p>
                      <p className="text-[11px] text-gray-500 leading-tight">
                        {les.desc}
                      </p>
                      <div className="bg-[#FFF8EE] p-2 rounded border border-amber-200 text-[10px] text-[#F58220] font-bold">
                        💡 {les.fact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SCREEN 6: RECETAS SALUDABLES --- */}
            {currentScreen === "recetas" && (
              <div className="p-4 space-y-4 bg-[#FDFBF7] text-stone-700">
                {inspectedRecipe ? (
                  /* HIGH FIDELITY CIRCULAR NUTRIENT INFOGRAPHIC (MATCHING SCREENSHOT RIGHT SCREEN) */
                  <div className="flex flex-col justify-between min-h-full bg-[#FDFBF7] animate-fade-in pb-4">
                    
                    {/* Back header navigation */}
                    <div className="flex justify-between items-center w-full pb-2">
                      <button 
                        onClick={() => setInspectedRecipe(null)}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5C791D] hover:bg-stone-50 border border-stone-200/50 cursor-pointer shadow-xs"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[3]" />
                      </button>
                      
                      {/* Three small green dots matching the image */}
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EAA846]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8BB326]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      </div>
                      
                      <div className="w-8"></div>
                    </div>

                    {/* lowercase item name precisely like mockup */}
                    <div className="text-center mt-2">
                      <h2 className="text-2xl font-black text-[#6E8E2D] tracking-tight lowercase">
                        {inspectedRecipe.name.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                        distribución macronutricional
                      </p>
                    </div>

                    {/* Circular ring infographic */}
                    <div className="my-6 flex items-center justify-center relative">
                      
                      {/* Concentric colored bands for Protein, Fat, Carbs */}
                      <div className="relative w-44 h-44 rounded-full flex items-center justify-center border border-stone-200/30 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.02)]">
                        
                        {/* Concentric SVG rings with custom sizes */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Background soft circle */}
                          <circle cx="50" cy="50" r="41" fill="transparent" stroke="#FAF8F5" strokeWidth="6" />
                          {/* Carbohydrates (Green) - 54% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="41" 
                            fill="transparent" 
                            stroke="#A4DF41" 
                            strokeWidth="5.5" 
                            strokeDasharray="257.6"
                            strokeDashoffset={257.6 * (1 - 0.54)}
                            strokeLinecap="round" 
                          />
                          {/* Proteins (Yellow) - 37% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="34" 
                            fill="transparent" 
                            stroke="#EAA846" 
                            strokeWidth="5" 
                            strokeDasharray="213.6"
                            strokeDashoffset={213.6 * (1 - 0.37)}
                            strokeLinecap="round" 
                          />
                          {/* Fats (Red) - 9% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="27" 
                            fill="transparent" 
                            stroke="#FD6B6B" 
                            strokeWidth="4" 
                            strokeDasharray="169.6"
                            strokeDashoffset={169.6 * (1 - 0.09)}
                            strokeLinecap="round" 
                          />
                        </svg>

                        {/* Dashed lines / dots and tags exactly like mockup */}
                        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white px-1 py-0.5 rounded-full border border-stone-100 shadow-xs">
                          <div className="w-1.5 h-1.5 bg-[#FD6B6B] rounded-full"></div>
                          <span className="text-[7.5px] font-black text-stone-600">9%</span>
                        </div>

                        <div className="absolute right-[-12px] top-1/3 flex items-center gap-1 bg-white px-1 py-0.5 rounded-full border border-stone-100 shadow-xs">
                          <span className="text-[7.5px] font-black text-stone-600">37%</span>
                          <div className="w-1.5 h-1.5 bg-[#A4DF41] rounded-full"></div>
                        </div>

                        <div className="absolute bottom-[-6px] left-[35%] flex items-center gap-1 bg-white px-1 py-0.5 rounded-full border border-stone-100 shadow-xs">
                          <div className="w-1.5 h-1.5 bg-[#EAA846] rounded-full"></div>
                          <span className="text-[7.5px] font-black text-stone-600">54%</span>
                        </div>

                        {/* Central food illustration with drop shadow */}
                        <div className="w-24 h-24 rounded-full bg-[#FDFAF5] flex items-center justify-center text-4xl shadow-inner border border-stone-100">
                          {inspectedRecipe.name.includes("Aguacate") || inspectedRecipe.id === "rec1" ? "🥑" : inspectedRecipe.name.includes("Avena") || inspectedRecipe.id === "rec2" ? "🥣" : inspectedRecipe.name.includes("Brócoli") || inspectedRecipe.id === "rec3" ? "🥦" : inspectedRecipe.name.includes("Sopa") || inspectedRecipe.id === "rec4" ? "🍜" : inspectedRecipe.name.includes("Muffin") || inspectedRecipe.id === "rec5" ? "🧁" : "🥬"}
                        </div>
                      </div>
                    </div>

                    {/* Micronutrient profile summary */}
                    <div className="bg-[#FAF7F2] rounded-[28px] border border-stone-200/50 p-4 space-y-3 text-left shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
                      
                      {/* Calories badge */}
                      <div className="text-center pb-1">
                        <span className="text-[11px] font-black text-[#5C791D] bg-[#ECF1E2] px-3.5 py-1.5 rounded-full inline-block">
                          🔋 {inspectedRecipe.nutrients.calories} de energía vital
                        </span>
                      </div>

                      {/* Bullet values */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-stone-600 px-1 pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-[#EAA846] rounded-full"></span>
                          <span>proteínas: {inspectedRecipe.nutrients.proteins}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-[#A4DF41] rounded-full"></span>
                          <span>carbohidratos: {inspectedRecipe.nutrients.carbs}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <span className="w-2 h-2 bg-[#FD6B6B] rounded-full"></span>
                          <span>grasas buenas: {inspectedRecipe.nutrients.fats}</span>
                        </div>
                      </div>

                      {/* Detail list and preparation steps */}
                      <div className="pt-2 border-t border-stone-200/50">
                        <p className="text-[9.5px] font-extrabold uppercase text-stone-400 tracking-wider mb-1">Pasos de preparación tierno:</p>
                        <ol className="text-[10px] text-stone-500 space-y-1 font-semibold leading-normal list-decimal pl-3.5">
                          {inspectedRecipe.instructions.map((ins, idx) => (
                            <li key={idx}>{ins}</li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => {
                          const items = inspectedRecipe.ingredients.map((ing, i) => ({
                            id: "inspected-" + i + "-" + Date.now(),
                            name: ing,
                            checked: false,
                            category: "Despensa"
                          }));
                          setShoppingItems((prev) => [...prev, ...items]);
                          setCurrentScreen("lista_compras");
                          setInspectedRecipe(null);
                        }}
                        className="flex-1 bg-white hover:bg-[#EDF2DF] text-[#73982A] border border-[#CBD9AF] font-bold py-2.5 px-3 rounded-2xl text-[10px]"
                      >
                        🛒 Agregar a Lista de Compras
                      </button>
                      <button 
                        onClick={() => setInspectedRecipe(null)}
                        className="bg-[#8BB326] hover:bg-[#73982A] text-white font-bold py-2.5 px-4 rounded-xl text-[10px]"
                      >
                        Cerrar ➔
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* CUSTOM SEARCH HEADERS - MATCHING THE DESIGN MODEL LEFT CANVAS */}
                    <div className="text-left space-y-1">
                      <p className="text-[10px] font-bold text-[#8BB326] uppercase tracking-wider">Hola, {parentName}</p>
                      <h3 className="text-xl font-bold text-[#3C4A28] leading-none mb-1">Encuentra tu comida</h3>
                    </div>

                    {/* SEARCH INPUT BOX */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Introduce un alimento (ej. aguacate, avena)..."
                        className="w-full h-11 bg-[#EDF2DF]/50 placeholder-stone-400 text-[11px] font-bold rounded-2xl pl-10 pr-4 text-stone-700 border border-stone-200/20 focus:outline-none focus:ring-1 focus:ring-[#8BB326]"
                      />
                      <span className="absolute left-3.5 top-3.5 text-[#8BB326] text-xs">🔍</span>
                    </div>

                    {/* SUB CATEGORY TABS */}
                    <div className="flex gap-4 text-[10.5px] font-black text-stone-400 border-b border-stone-100 pb-1.5 pt-0.5 text-left">
                      <button className="text-[#8BB326] border-b-2 border-[#8BB326] pb-1 font-bold">ALIMENTOS</button>
                      <button className="hover:text-stone-600 pb-1 font-semibold">BEBIDAS</button>
                      <button className="hover:text-stone-600 pb-1 font-semibold">ALÉRGENOS</button>
                    </div>

                    {/* HIGH FIDELITY CULINARY SUB-BAR */}
                    <div className="flex bg-[#FCF8F2] p-1 rounded-2xl border border-stone-200/30">
                      <button
                        onClick={() => setCurrentScreen("recetas")}
                        className="flex-1 text-[10px] py-1.5 rounded-xl font-black bg-white text-[#5C791D] shadow-xs"
                      >
                        🥣 Recetas
                      </button>
                      <button
                        onClick={() => setCurrentScreen("planificador")}
                        className="flex-1 text-[10px] py-1.5 rounded-xl font-semibold text-stone-400 hover:text-stone-700"
                      >
                        📅 Menú
                      </button>
                      <button
                        onClick={() => setCurrentScreen("lista_compras")}
                        className="flex-1 text-[10px] py-1.5 rounded-xl font-semibold text-stone-400 hover:text-stone-700"
                      >
                        🛒 Compras
                      </button>
                    </div>

                    {/* RECIPE CARD COLLECTIONS */}
                    <div className="space-y-3">
                      {RECIPES_DATABASE.filter(r => r.stage === profile.stage).length === 0 ? (
                        <div className="bg-white rounded-[28px] p-6 border border-stone-200/50 text-center text-stone-400 space-y-2">
                          <span className="text-2xl block">🍼</span>
                          <p className="text-xs font-bold leading-normal text-stone-700">
                            ¡Lactancia exclusiva de 0 a 6 meses!
                          </p>
                          <p className="text-[10.5px] text-stone-400 leading-relaxed">
                            La recomendación de la OMS y pediatras es no ofrecer sólidos hasta completar los 6 meses.
                          </p>
                          <button
                            onClick={() => updateStage("6-12-meses")}
                            className="bg-[#8BB326] text-white font-black px-4 py-2 rounded-xl text-xs"
                          >
                            Ir a etapa de 6-12 meses ➜
                          </button>
                        </div>
                      ) : (
                        RECIPES_DATABASE.filter(r => r.stage === profile.stage).map((rec) => (
                          <div 
                            key={rec.id} 
                            onClick={() => setInspectedRecipe(rec)}
                            className="bg-white hover:bg-stone-50 active:scale-[0.99] border border-stone-200/30 rounded-[28px] p-4 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.01)] cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-3.5 flex-1 text-left">
                              {/* Circle icon tierno wrapper */}
                              <div className="w-12 h-12 rounded-3xl bg-stone-100/75 flex items-center justify-center text-2xl shadow-inner">
                                {rec.name.includes("Aguacate") || rec.id === "rec1" ? "🥑" : rec.name.includes("Avena") || rec.id === "rec2" ? "🥣" : rec.name.includes("Brócoli") || rec.id === "rec3" ? "🥦" : rec.name.includes("Sopa") || rec.id === "rec4" ? "🍜" : rec.name.includes("Muffin") || rec.id === "rec5" ? "🧁" : "🥬"}
                              </div>
                              <div className="text-left flex-1 min-w-0">
                                <h4 className="text-[11.5px] font-black text-stone-700 truncate leading-none">{rec.name}</h4>
                                <p className="text-[9.5px] text-stone-400 font-bold leading-normal mt-1 capitalize">{rec.time} • comida sana</p>
                                <p className="text-[10px] text-[#8BB326] font-black mt-0.5">{rec.nutrients.calories}</p>
                              </div>
                            </div>

                            {/* Chevron or green button tag */}
                            <div className="w-8 h-8 rounded-full bg-[#FCFBF7] hover:bg-[#F2EFE8] flex items-center justify-center text-[#8BB326] text-[10px] shadow-xs border border-stone-100 flex-none ml-2">
                              ➔
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* --- SCREEN 7: PLANIFICADOR DE COMIDAS & IMPORT AD HOC --- */}
            {currentScreen === "planificador" && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-black text-[#0056A6]">
                      Plan de Comidas
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Organiza el menú saludable de Mateo
                    </p>
                  </div>
                  {/* Cool meditation mascot */}
                  <NutrinMascot pose="meditating" size="w-14 h-14" />
                </div>

                {/* HIGH FIDELITY CULINARY SUB-BAR */}
                <div className="flex bg-white p-1 rounded-2xl border border-[#EAD7C3]">
                  <button
                    onClick={() => setCurrentScreen("recetas")}
                    className={`flex-1 text-[10px] py-1.5 rounded-xl font-black transition-all ${
                      currentScreen === "recetas" ? "bg-[#0056A6] text-white shadow-xs" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    🥣 Recetas
                  </button>
                  <button
                    onClick={() => setCurrentScreen("planificador")}
                    className={`flex-1 text-[10px] py-1.5 rounded-xl font-black transition-all ${
                      currentScreen === "planificador" ? "bg-[#0056A6] text-white shadow-xs" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    📅 Menú
                  </button>
                  <button
                    onClick={() => setCurrentScreen("lista_compras")}
                    className={`flex-1 text-[10px] py-1.5 rounded-xl font-black transition-all ${
                      currentScreen === "lista_compras" ? "bg-[#0056A6] text-white shadow-xs" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    🛒 Compras
                  </button>
                </div>

                {/* Day selector carousel inside phone */}
                <div className="flex gap-1 overflow-x-auto pb-1.5 bg-white p-1 rounded-xl border border-[#EAD7C3]">
                  {Object.keys(mealPlan).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-black transition-all ${
                        selectedDay === day 
                          ? "bg-[#0056A6] text-white" 
                          : "text-gray-500 hover:bg-slate-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Meal slots */}
                <div className="bg-white rounded-3xl p-4 border border-[#EAD7C3] shadow-xs space-y-3">
                  <span className="text-[10px] bg-[#8DC63F] bg-opacity-10 text-[#4B7318] px-2 py-0.5 rounded font-black">
                    Menú para el día: {selectedDay}
                  </span>

                  {/* Breakfast Slot */}
                  <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#EAD7C3] border-opacity-60">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-0.5">
                      <span>🍳 DESAYUNO</span>
                    </div>
                    <p className="text-xs font-black text-[#0056A6]">{mealPlan[selectedDay].breakfast}</p>
                  </div>

                  {/* Lunch Slot */}
                  <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#EAD7C3] border-opacity-60">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-0.5">
                      <span>🍲 ALMUERZO</span>
                    </div>
                    <p className="text-xs font-black text-[#0056A6]">{mealPlan[selectedDay].lunch}</p>
                  </div>

                  {/* Snack Slot */}
                  <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#EAD7C3] border-opacity-60">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-0.5">
                      <span>🍎 MERIENDA/REFRIGERIO</span>
                    </div>
                    <p className="text-xs font-black text-[#0056A6]">{mealPlan[selectedDay].snack}</p>
                  </div>

                  {/* Dinner Slot */}
                  <div className="p-2 bg-[#FFF8EE] rounded-xl border border-[#EAD7C3] border-opacity-60">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-0.5">
                      <span>🌙 CENA</span>
                    </div>
                    <p className="text-xs font-black text-[#0056A6]">{mealPlan[selectedDay].dinner}</p>
                  </div>

                  {/* Auto generation to Shopping list */}
                  <button
                    onClick={importMealsToShoppingList}
                    className="w-full mt-2 bg-[#F58220] hover:bg-opacity-90 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Generar Lista Inteligente de Compras</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* --- SCREEN 8: LISTA DE COMPRAS MANUAL E IMPORTADA --- */}
            {currentScreen === "lista_compras" && (
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-base font-black text-[#0056A6]">
                    Lista Inteligente
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Autogenerada por categorías según tu planificador
                  </p>
                </div>

                {/* HIGH FIDELITY CULINARY SUB-BAR */}
                <div className="flex bg-white p-1 rounded-2xl border border-[#EAD7C3]">
                  <button
                    onClick={() => setCurrentScreen("recetas")}
                    className={`flex-1 text-[10px] py-1.5 rounded-xl font-black transition-all ${
                      currentScreen === "recetas" ? "bg-[#0056A6] text-white shadow-xs" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    🥣 Recetas
                  </button>
                  <button
                    onClick={() => setCurrentScreen("planificador")}
                    className={`flex-1 text-[10px] py-1.5 rounded-xl font-black transition-all ${
                      currentScreen === "planificador" ? "bg-[#0056A6] text-white shadow-xs" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    📅 Menú
                  </button>
                  <button
                    onClick={() => setCurrentScreen("lista_compras")}
                    className={`flex-1 text-[10px] py-1.5 rounded-xl font-black transition-all ${
                      currentScreen === "lista_compras" ? "bg-[#0056A6] text-white shadow-xs" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    🛒 Compras
                  </button>
                </div>

                {/* Quick Add manual form */}
                <form onSubmit={handleAddShopItem} className="flex gap-1">
                  <input
                    type="text"
                    value={newShopItem}
                    onChange={(e) => setNewShopItem(e.target.value)}
                    placeholder="ej. Arándanos, Huevos de codorniz"
                    className="flex-1 p-2 bg-white border border-[#EAD7C3] rounded-xl text-xs font-bold focus:outline-[#0056A6]"
                  />
                  <button
                    type="submit"
                    className="bg-[#0056A6] text-white p-2 rounded-xl flex items-center justify-center hover:bg-opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>

                <div className="bg-white border border-[#EAD7C3] rounded-3xl p-4 shadow-xs space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Artículos Pendientes</span>
                    <span>Lista ({shoppingItems.length})</span>
                  </div>

                  <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                    {shoppingItems.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setShoppingItems(
                            shoppingItems.map((s) => s.id === item.id ? { ...s, checked: !s.checked } : s)
                          );
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                          item.checked 
                            ? "bg-slate-50 border-gray-150 line-through text-gray-400 opacity-60" 
                            : "bg-white border-[#EAD7C3] hover:bg-[#FFF8EE]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckSquare className={`w-4 h-4 ${item.checked ? "text-emerald-500" : "text-gray-300"}`} />
                          <span className="text-[11px] font-bold leading-tight">{item.name}</span>
                        </div>
                        <span className="text-[8px] bg-[#FFF8EE] border border-[#EAD7C3] px-1.5 py-0.5 rounded font-bold text-[#F58220]">
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-1 text-[10px]">
                    <button 
                      onClick={() => setShoppingItems([])}
                      className="text-red-500 hover:underline font-bold"
                    >
                      Limpiar todo
                    </button>
                    <span className="text-gray-400 font-bold">
                      {shoppingItems.filter(s => s.checked).length} de {shoppingItems.length} comprados
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SCREEN 9: COMUNIDAD DE APOYO Y PEDIATRIAS --- */}
            {currentScreen === "comunidad" && (
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-base font-black text-[#0056A6]">
                    Comunidad NutriComienzos
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Consejos reales de padres primerizos y pediatras asesores
                  </p>
                </div>

                {/* Post writing box */}
                <form onSubmit={handleAddPost} className="space-y-1.5 bg-white p-3 rounded-2xl border border-[#EAD7C3] shadow-xs">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Comparte un logro o tu experiencia con un ingrediente..."
                    rows={2}
                    className="w-full p-2 bg-slate-50 border-none rounded-xl text-xs font-medium focus:outline-[#0056A6] resize-none"
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-gray-400 font-medium">Publicando como {parentName}</span>
                    <button
                      type="submit"
                      className="bg-[#0056A6] text-white px-3 py-1.5 rounded-xl text-[10px] font-black hover:bg-opacity-95"
                    >
                      Compartir post 📢
                    </button>
                  </div>
                </form>

                {/* Posts feed list */}
                <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white border border-[#EAD7C3] p-3 rounded-2xl space-y-2 text-left shadow-xs">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-7 h-7 rounded-full ${post.avatarColor} flex items-center justify-center font-bold text-[11px] shadow-sm`}>
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-gray-800 leading-none">{post.author}</p>
                            <p className="text-[9px] text-[#F58220] font-bold leading-none mt-0.5">{post.role}</p>
                          </div>
                        </div>
                        <span className="text-[8px] text-gray-400">{post.date}</span>
                      </div>
                      <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-slate-50 pt-2 font-mono">
                        <button 
                          onClick={() => {
                            setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p));
                          }}
                          className="hover:text-amber-500 font-bold"
                        >
                          ❤️ {post.likes} Me gusta
                        </button>
                        <span>💬 {post.replies} Respuestas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SCREEN 10: LOGROS Y BADGES --- */}
            {currentScreen === "logros" && (
              <div className="p-4 space-y-4">
                <div className="text-center">
                  <NutrinMascot pose="celebrating" size="w-24 h-24" caption="¡NUTRÍN CELEBRA!" />
                  <h3 className="text-base font-black text-[#0056A6] mt-2">
                    Colección de Logros
                  </h3>
                  <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                    Completa hábitos para desbloquear insignias familiares que guarden en tu perfil de juego.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white border border-[#EAD7C3] p-3 rounded-2xl flex flex-col items-center justify-between text-center shadow-xs">
                    <span className="text-3xl">🥛</span>
                    <p className="text-[10px] font-black mt-2 text-[#0056A6]">Rey Hidratado</p>
                    <p className="text-[9px] text-gray-400">Mateo bebió 4 vasos de agua al día</p>
                    <span className="text-[8px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded mt-2">
                      DESBLOQUEADO ✔
                    </span>
                  </div>

                  <div className="bg-white border border-[#EAD7C3] p-3 rounded-2xl flex flex-col items-center justify-between text-center shadow-xs">
                    <span className="text-3xl">🥦</span>
                    <p className="text-[10px] font-black mt-2 text-[#0056A6]">Arcoíris Verde</p>
                    <p className="text-[9px] text-gray-400">Alcanza 3 raciones de brócoli o acelga</p>
                    <span className="text-[8px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded mt-2">
                      DESBLOQUEADO ✔
                    </span>
                  </div>

                  <div className={`p-3 rounded-2xl flex flex-col items-center justify-between text-center border relative ${
                    currentLevel >= 3 ? "bg-white border-[#EAD7C3]" : "bg-slate-50 border-gray-200 opacity-75"
                  }`}>
                    {currentLevel < 3 && <Lock className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2" />}
                    <span className="text-3xl">🥑</span>
                    <p className="text-[10px] font-black mt-2 text-[#0056A6]">Campeón de Grasas Saludables</p>
                    <p className="text-[9px] text-gray-400">Introduce aguacate o nuez triturada</p>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded mt-2 ${
                      currentLevel >= 3 ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                    }`}>
                      {currentLevel >= 3 ? "DESBLOQUEADO ✔" : "BLOQUEADO"}
                    </span>
                  </div>

                  <div className={`p-3 rounded-2xl flex flex-col items-center justify-between text-center border relative ${
                    currentLevel >= 5 ? "bg-white border-[#EAD7C3]" : "bg-slate-50 border-gray-200 opacity-75"
                  }`}>
                    {currentLevel < 5 && <Lock className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2" />}
                    <span className="text-3xl">👑</span>
                    <p className="text-[10px] font-black mt-2 text-[#0056A6]">Súper Pediatra Familiar</p>
                    <p className="text-[9px] text-gray-400">Nutrín llega al máximo nivel evolutivo</p>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded mt-2 ${
                      currentLevel >= 5 ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                    }`}>
                      {currentLevel >= 5 ? "DESBLOQUEADO ✔" : "BLOQUEADO"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* --- SCREEN 11: SYSTEM CONFIG & AI CHAT INTEGRATION --- */}
            {currentScreen === "configuracion" && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-black text-[#0056A6]">
                      Chat Pediátrico con Nutrín
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Asistente de Inteligencia Pediátrica activa
                    </p>
                  </div>
                  {/* Cool sunglass waving mascot */}
                  <NutrinMascot pose="cool" size="w-16 h-16" />
                </div>

                {/* Simulated live chat screen */}
                <div className="bg-white border border-[#EAD7C3] rounded-3xl p-3 flex flex-col h-[320px] shadow-xs">
                  {/* Message log */}
                  <div className="flex-1 overflow-y-auto space-y-2 p-1 text-xs">
                    {messages.map((m) => (
                      <div 
                        key={m.id}
                        className={`flex flex-col max-w-[85%] ${
                          m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                        }`}
                      >
                        <span className="text-[8px] text-gray-400 font-bold mb-0.5">
                          {m.sender === "user" ? parentName : "Nutrín 🦖"}
                        </span>
                        <div className={`p-2.5 rounded-2xl text-[11px] leading-relaxed font-bold ${
                          m.sender === "user" 
                            ? "bg-[#0056A6] text-white rounded-br-none" 
                            : "bg-[#FFF8EE] text-gray-800 border border-[#EAD7C3] rounded-bl-none"
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 pl-2">
                        <span>🦖</span>
                        <span className="animate-pulse">Nutrín está masticando brócoli y pensando su respuesta...</span>
                      </div>
                    )}
                  </div>

                  {/* Input submit form */}
                  <form onSubmit={handleSendMessage} className="flex gap-1 border-t border-slate-100 pt-2 mt-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="ej. ¿A qué edad introduzco huevo?"
                      className="flex-1 p-2 border border-[#EAD7C3] bg-[#FFF8EE] rounded-xl text-xs font-semibold focus:outline-[#0056A6]"
                    />
                    <button
                      type="submit"
                      className="bg-[#0056A6] hover:bg-opacity-95 text-white py-2 px-3.5 rounded-xl flex items-center justify-center text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

                {/* Other Config controls */}
                <div className="bg-white border border-[#EAD7C3] p-3 rounded-2xl flex justify-between items-center text-xs font-bold text-gray-700">
                  <span>Notificaciones Diarias de Nutrín</span>
                  <div className="w-9 h-5 bg-[#8DC63F] rounded-full p-0.5 flex items-center justify-end">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div 
                  onClick={() => setShowDeveloperTab(!showDeveloperTab)}
                  className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl text-center font-bold text-[10px] cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>⚙️ MODULOS TÉCNICOS: {showDeveloperTab ? "OCULTAR" : "MOSTRAR PLANOS"}</span>
                </div>

                {showDeveloperTab && (
                  <div className="border border-[#EAD7C3] bg-white p-3 rounded-2xl space-y-4 text-xs">
                    <p className="font-extrabold text-[#0056A6] uppercase tracking-wider text-[10px] pb-1 border-b">
                      1. Flujo de Navegación del Dispositivo
                    </p>
                    <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                      {APP_SPECS_NAV_FLOW.map((f, i) => (
                        <div key={i} className="bg-[#FFF8EE] p-2 rounded-lg border border-opacity-40 border-[#EAD7C3] text-[9.5px]">
                          <p className="font-black text-[#F58220]">{f.from} ➔ {f.to}</p>
                          <p className="text-gray-500 text-[9px] leading-tight mt-0.5">{f.detail}</p>
                        </div>
                      ))}
                    </div>

                    <p className="font-extrabold text-[#0056A6] uppercase tracking-wider text-[10px] pb-1 border-b">
                      2. Plano NoSQL Firestore (Database)
                    </p>
                    <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                      {Object.entries(FIRESTORE_BLUEPRINT.collections).map(([name, col]) => (
                        <div key={name} className="bg-[#FFF8EE] p-2 rounded-lg border border-[#EAD7C3] text-[9px]">
                          <p className="font-black text-[#0056A6] uppercase">Colección: {name}</p>
                          <p className="text-gray-400 my-0.5 text-[8.5px] leading-tight">{col.description}</p>
                          <div className="mt-1 font-mono text-[8px] space-y-0.5 text-gray-500">
                            {col.fields.map((f, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="font-bold">{f.name}</span>
                                <span>{f.type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="font-extrabold text-[#0056A6] uppercase tracking-wider text-[10px] pb-1 border-b">
                      3. Código Inicial Flutter con Firebase
                    </p>
                    <div className="space-y-2">
                      <div className="flex gap-1 bg-[#FFF8EE] p-0.5 rounded-lg border border-[#EAD7C3] overflow-x-auto">
                        {["pubspec", "main", "firestore", "welcome"].map((file) => (
                          <button
                            key={file}
                            onClick={() => setSelectedFlutterFile(file as any)}
                            className={`text-[8.5px] px-2 py-1 rounded font-bold whitespace-nowrap ${
                              selectedFlutterFile === file ? "bg-[#0056A6] text-white" : "text-gray-500"
                            }`}
                          >
                            {file === "pubspec" ? "pubspec.yaml" : file === "main" ? "main.dart" : file === "firestore" ? "firestore_service.dart" : "welcome.dart"}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <pre className="bg-slate-900 text-slate-100 text-[8px] p-2.5 rounded-xl overflow-x-auto font-mono max-h-[120px]">
                          <code>
                            {selectedFlutterFile === "pubspec" && FLUTTER_CODE_EXPORTS.pubspec}
                            {selectedFlutterFile === "main" && FLUTTER_CODE_EXPORTS.main}
                            {selectedFlutterFile === "firestore" && FLUTTER_CODE_EXPORTS.firestoreService}
                            {selectedFlutterFile === "welcome" && FLUTTER_CODE_EXPORTS.welcomeScreen}
                          </code>
                        </pre>
                        <button
                          onClick={() => {
                            let text = "";
                            if (selectedFlutterFile === "pubspec") text = FLUTTER_CODE_EXPORTS.pubspec;
                            else if (selectedFlutterFile === "main") text = FLUTTER_CODE_EXPORTS.main;
                            else if (selectedFlutterFile === "firestore") text = FLUTTER_CODE_EXPORTS.firestoreService;
                            else if (selectedFlutterFile === "welcome") text = FLUTTER_CODE_EXPORTS.welcomeScreen;
                            copyToClipboard(text);
                          }}
                          className="absolute right-1.5 top-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 p-1 rounded text-white"
                        >
                          📋
                        </button>
                        {copiedNotification && (
                          <span className="absolute left-1.5 bottom-1.5 text-[8px] bg-emerald-500 text-white font-black px-1.5 rounded animate-pulse">Copiado!</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div 
                  onClick={() => {
                    if (window.confirm("¿Seguro que quieres borrar todos los datos? Se perderá el perfil del bebé, hábitos y configuración.")) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="bg-red-50 border border-red-100 p-2.5 rounded-xl text-center text-red-600 font-black text-[10px] cursor-pointer hover:bg-red-100"
                >
                  ⚠ REESTABLECER BASE DE DATOS LOCAL
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM NAVIGATION BAR — estilo referencia: fondo naranja redondeado */}
          {currentScreen !== "bienvenida" && currentScreen !== "registro" && currentScreen !== "perfil_bebe" && (
            <div className="absolute bottom-0 left-0 right-0 z-35 px-3 pb-2 select-none">
              <div className="bg-[#F5A623] rounded-[28px] h-[58px] grid grid-cols-5 items-center px-2 shadow-[0_4px_20px_rgba(245,166,35,0.35)]">
              
              <button onClick={() => { setInspectedRecipe(null); setCurrentScreen("inicio"); }} className="flex flex-col items-center justify-center h-full">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${currentScreen === "inicio" || currentScreen === "logros" ? "fill-white scale-110" : "fill-white/50"}`}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              </button>

              <button onClick={() => { setInspectedRecipe(null); setCurrentScreen("nutricion"); }} className="flex flex-col items-center justify-center h-full">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${currentScreen === "nutricion" ? "fill-white scale-110" : "fill-white/50"}`}><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
              </button>

              <button onClick={() => { setInspectedRecipe(null); setCurrentScreen("recetas"); }} className="flex flex-col items-center justify-center h-full">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${currentScreen === "recetas" || currentScreen === "planificador" || currentScreen === "lista_compras" ? "fill-white scale-110" : "fill-white/50"}`}><path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"/></svg>
              </button>

              <button onClick={() => { setInspectedRecipe(null); setCurrentScreen("configuracion"); }} className="flex flex-col items-center justify-center h-full">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${currentScreen === "configuracion" ? "fill-white scale-110" : "fill-white/50"}`}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
              </button>

              <button onClick={() => { setInspectedRecipe(null); setCurrentScreen("comunidad"); }} className="flex flex-col items-center justify-center h-full">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all ${currentScreen === "comunidad" ? "fill-white scale-110" : "fill-white/50"}`}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </button>

            </div>
            </div>
          )}

        </div>

      </div>
  );
}