import { Recipe, CommunityPost, MealPlan } from "./types";

export const STAGES = [
  { id: "embarazo", label: "👶 Gestación", ageRange: "Embarazo", desc: "Nutrición integral para el crecimiento de tu futuro bebé." },
  { id: "recien-nacido", label: "🍼 Lactancia", ageRange: "0 - 6 meses", desc: "Leche materna o de fórmula exclusiva. El mejor comienzo." },
  { id: "6-12-meses", label: "🥦 Complementaria", ageRange: "6 - 12 meses", desc: "Introducción de papillas lúdicas y texturas suaves." },
  { id: "1-3-anos", label: "🥑 Explorador", ageRange: "1 - 3 años", desc: "Alimentación familiar en porciones y trozos seguros." },
  { id: "3-5-anos", label: "🍏 Preescolar", ageRange: "3 - 5 años", desc: "Hábitos duraderos, autonomía y platos coloridos." }
] as const;

export const STAGE_DESCRIPTIONS: Record<string, {
  foods: string[];
  amounts: string;
  avoid: string[];
  tips: string[];
}> = {
  embarazo: {
    foods: ["Ácido Fólico: espinaca, acelga, lentejas", "Hierro: frijoles, carne magra, quínoa", "Calcio: yogur natural, sésamo, almendras"],
    amounts: "3 comidas principales altas en nutrientes + 2 refrigerios ligeros y saludables.",
    avoid: ["Pescados con alto contenido de mercurio", "Carnes, huevos o lácteos crudos o sin pasteurizar", "Exceso de cafeína"],
    tips: [
      "Toma mucha agua, mantente activa con caminatas suaves.",
      "Acompaña tus fuentes de hierro vegetal con limón para mayor absorción.",
      "Escucha tus antojos de frutas frescas o frutos secos en lugar de procesados."
    ]
  },
  "recien-nacido": {
    foods: ["Leche Materna exclusiva (libre demanda)", "Fórmula infantil etapa 1 (bajo indicación pediátrica)"],
    amounts: "Entre 8 y 12 tomas al día de leche materna pura, según lo dicte el bebé.",
    avoid: ["Agua mineral o purificada sola", "Tés de hierbas naturales", "Jugos de fruta, papillas o miel"],
    tips: [
      "Confía en tu cuerpo: la producción de leche materna se adapta a la succión.",
      "La leche humana cambia de composición según las necesidades diarias del bebé.",
      "Crea un entorno tranquilo para alimentar, reduciendo estímulos sonoros."
    ]
  },
  "6-12-meses": {
    foods: ["Verduras: calabacita, zanahoria, chayote al vapor", "Frutas: plátano, aguacate, pera, manzana", "Cereales: avena natural cocida, arroz integral", "Proteína: pollo cocido, yema de huevo"],
    amounts: "Inicia con 1-2 cucharaditas por comida, completando 2 a 3 veces al día.",
    avoid: ["Sal de mesa directa", "Azúcar o jarabes endulzantes", "Miel de abeja natural (riesgo de botulismo)"],
    tips: [
      "Ofrece un alimento nuevo a la vez durante 3 días seguidos para descartar alergias.",
      "El aguacate y el plátano son ideales para iniciar por su textura cremosa natural.",
      "Permite que exploren y toquen la comida, la estimulación sensorial es clave."
    ]
  },
  "1-3-anos": {
    foods: ["Proteína: pescado, pavo, garbanzos cocidos", "Lácteos: queso fresco, yogur natural sin azúcar", "Frutas frescas picadas enteras"],
    amounts: "3 porciones de verdura, 2 de fruta, y porciones del tamaño del puño del niño para cereales.",
    avoid: ["Refrescos, jugos industriales de caja", "Embutidos comerciales (salchichas enteras)", "Caramelos duros"],
    tips: [
      "Evita el riesgo de ahogo: pica las uvas, arándanos o salchichas longitudinalmente.",
      "No los obligues a limpiar el plato; confía en sus señales naturales de saciedad.",
      "Establece horarios consistentes para comer en familia compartiendo la mesa."
    ]
  },
  "3-5-anos": {
    foods: ["Platos equilibrados de comida familiar", "Verduras crudas y crujientes (zanahoria rallada)", "Semillas y frutos secos picados"],
    amounts: "Comidas principales divididas en 5 grupos: cereales, proteína, lácteos, fruta y verdura.",
    avoid: ["Comida ultraprocesada ultra-salada", "Bebidas energéticas", "Cereales de caja con exceso de sellos"],
    tips: [
      "Involucra al niño en la cocina eligiendo frutas de colores en el mercado.",
      "Explica la procedencia de los alimentos interactuando a través del juego.",
      "Haz figuras divertidas: 'arbolitos de brócoli' o 'caritas de avena'."
    ]
  }
};

export const RECIPES_DATABASE: Recipe[] = [
  {
    id: "rec1",
    name: "Papilla de Aguacate y Plátano Amiguita",
    stage: "6-12-meses",
    time: "5 min",
    imageColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ingredients: ["1/2 Aguacate maduro pequeño", "1/2 Plátano de seda maduro", "1 cucharada de leche materna u de fórmula (opcional)"],
    instructions: [
      "Corta el aguacate a la mitad, con una cuchara retira la pulpa suave.",
      "Pela el plátano y colócalo en un platito hondo de plástico.",
      "Con un tenedor plano, tritura ambos ingredientes hasta lograr una combinación homogénea.",
      "Añade la leche de apoyo por si gustas una textura más ligera. ¡Sirve de inmediato!"
    ],
    nutrients: { carbs: "18g", proteins: "1.5g", fats: "7g", calories: "135 kcal" }
  },
  {
    id: "rec2",
    name: "Pudín de Avena y Manzana Calientito",
    stage: "6-12-meses",
    time: "15 min",
    imageColor: "bg-amber-50 text-amber-700 border-amber-200",
    ingredients: ["3 cucharadas de avena molida", "1/2 Manzana rallada finamente", "1 taza de agua purificada", "Pizca de canela en polvo (opcional)"],
    instructions: [
      "En una olla pequeña, hierve la taza de agua.",
      "Añade la avena molida y la manzana rallada cocinando a fuego lento.",
      "Mueve constantemente durante 10 minutos para evitar que se pegue al fondo.",
      "Sirve tibio decorado con una ligerísima pizca de canela."
    ],
    nutrients: { carbs: "22g", proteins: "3g", fats: "1.2g", calories: "110 kcal" }
  },
  {
    id: "rec3",
    name: "Tortitas de Brócoli y Queso Suave",
    stage: "1-3-anos",
    time: "20 min",
    imageColor: "bg-green-50 text-green-700 border-green-200",
    ingredients: ["1 taza de arbolitos de brócoli cocido", "1 Huevo batido", "2 cucharadas de queso fresco desmoronado", "2 cucharadas de harina de avena"],
    instructions: [
      "Pica finamente el brócoli cocido en porciones diminutas.",
      "En un bol hondo mezcla el huevo, brócoli, queso fresco e incorpora la harina de avena.",
      "Forma pequeñas tortitas planas aptas para las manos de tu hijo.",
      "En un sartén con una gota de aceite de oliva, dóralas por ambos lados (3 minutos por lado)."
    ],
    nutrients: { carbs: "12g", proteins: "6g", fats: "4.5g", calories: "125 kcal" }
  },
  {
    id: "rec4",
    name: "Sopa Estrellita Arcoíris",
    stage: "1-3-anos",
    time: "25 min",
    imageColor: "bg-orange-50 text-orange-700 border-orange-200",
    ingredients: ["1/2 taza de pasta estrella de trigo", "1/2 taza de zanahoria picada en cubos muy pequeños", "1/2 taza de calabacín tierno en cubitos", "2 tazas de caldo de pollo desgrasado sin sal"],
    instructions: [
      "Hierve el caldo de pollo en una cacerola mediana.",
      "Añade los cubitos de zanahoria cociéndolos durante 8 minutos.",
      "Incorpora la pasta de estrellitas y el calabacín tierno cocinando 10 minutos más.",
      "Deja reposar y sirve templado. ¡Una delicia visual!"
    ],
    nutrients: { carbs: "25g", proteins: "5g", fats: "2g", calories: "140 kcal" }
  },
  {
    id: "rec5",
    name: "Muffins de Calabaza y Semillas de Girasol",
    stage: "3-5-anos",
    time: "30 min",
    imageColor: "bg-amber-50 text-amber-800 border-amber-200",
    ingredients: ["1 taza de puré de calabaza de castilla cocida", "2 Huevos medianos", "1 taza de harina integral de trigo", "1/4 taza de aceite de coco derretido", "Semillas de girasol trituradas"],
    instructions: [
      "Precalienta tu horno comercial o casero a 180°C.",
      "Mezcla el puré de calabaza con los huevos y el aceite de coco.",
      "Incorpora lentamente la harina tamizada con movimientos envolventes.",
      "Vierte en moldes para muffins medianos, añade semillas arriba y hornea por 20 minutos."
    ],
    nutrients: { carbs: "28g", proteins: "5.5g", fats: "6g", calories: "165 kcal" }
  },
  {
    id: "rec6",
    name: "Batido de Mamá Gestante Súper Hierro",
    stage: "embarazo",
    time: "5 min",
    imageColor: "bg-blue-50 text-blue-700 border-blue-200",
    ingredients: ["1 taza de hojas de espinaca lavadas", "1 taza de fresas frescas maduras", "1/2 plátano congelado", "1 taza de leche de almendras o yogur griego"],
    instructions: [
      "Asegúrate de desinfectar y escurrir perfectamente las hojas de espinaca.",
      "Introduce el plátano congelado, fresas amarillas y espinacas en la licuadora.",
      "Añade tu líquido de preferencia y licúa en potencia alta por 2 minutos.",
      "Consúmelo fresco para aprovechar al máximo sus nutrientes de absorción."
    ],
    nutrients: { carbs: "32g", proteins: "8g", fats: "3g", calories: "190 kcal" }
  }
];

export const MINI_LESSONS = [
  {
    id: "les1",
    title: "Mito: ¿El bebé necesita agua antes de los 6 meses?",
    category: "Mitos y Realidades",
    desc: "El estómago de un recién nacido es del tamaño de una cereza los primeros días. Darles agua desplaza tomas de leche materna preciosa, llenándolo de calorías vacías sin nutrirlo. La leche materna es 88% agua.",
    fact: "Realidad: La leche materna o fórmula contiene todo el agua e hidratación que necesita tu bebé de manera segura.",
    points: ["Estómago minúsculo", "Sobrecarga digestiva", "Pérdida de nutrientes valiosos"],
    illustrationColor: "from-blue-200 to-sky-100"
  },
  {
    id: "les2",
    title: "El ABC de la Introducción de Alérgenos",
    category: "Guía de Seguridad",
    desc: "Atrás quedó la idea de retrasar alérgenos comunes. Introducirlos a partir de los 6 meses reduce la probabilidad de alergias severas. El truco es darlos uno a uno para identificar fácilmente anomalías.",
    fact: "Método seguro: Introduce huevo revuelto bien cocido un lunes. No introduzcas otro sospechoso hasta el viernes.",
    points: ["Entre los 6 y 10 meses", "Porciones pequeñas", "Sin combinaciones previas"],
    illustrationColor: "from-green-200 to-emerald-100"
  },
  {
    id: "les3",
    title: "Preparando cortes BLW (Baby Led Weaning)",
    category: "Cortes Prácticos",
    desc: "Si eliges trozos en vez de papillas, el secreto radica en la forma de bastón o dedo: un corte largo para que el bebé pueda agarrar el trozo con su puño y sobresalga por arriba del mismo.",
    fact: "Texturas: Debes poder aplastar el alimento cocido entre tu dedo pulgar e índice de manera sencilla.",
    points: ["Cortes de 5 a 6 cm", "Grosor de un dedo adulto", "Zanahoria cocida al vapor, plátano pelado"],
    illustrationColor: "from-orange-200 to-amber-100"
  }
];

export const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "p1",
    author: "Karla Martínez",
    role: "Mamá de Mateo (8 meses)",
    content: "¡Hola a todas! Hoy Mateo probó el brócoli por tercera vez y finalmente no hizo caras feas. Al principio lo escupía, ¡no se desesperen! Es normal que necesiten hasta 10 intentos.",
    likes: 24,
    replies: 5,
    date: "Hace 2 horas",
    avatarColor: "bg-rose-100 text-rose-700"
  },
  {
    id: "p2",
    author: "Pediatra Alejandro",
    role: "Asesor Médico NutriComienzos",
    content: "Recuerden papás que la leche sigue siendo el alimento principal hasta el primer año de vida. La comida a los 6-9 meses es complementaria y busca que exploren texturas.",
    likes: 56,
    replies: 12,
    date: "Hace 5 horas",
    avatarColor: "bg-sky-100 text-sky-700"
  },
  {
    id: "p3",
    author: "Mamá Soltera Sofía",
    role: "Gestante (7 meses)",
    content: "Estoy preparando el planizador para cuando nazca mi nena. Los consejos de Nutrín sobre comidas congelables saludables para mamás han sido mi salvación de la semana. ¡Excelente app!",
    likes: 18,
    replies: 2,
    date: "Hace 1 día",
    avatarColor: "bg-amber-100 text-amber-700"
  }
];

// Beautiful representations of architectural requirements requested: Navigation, Wireframe, DB setup, Flutter code
export const APP_SPECS_NAV_FLOW = [
  { from: "Bienvenida", to: "Registro", triggeredBy: "Botón 'Comenzar mi aventura'", detail: "Acceso por primera vez a la información básica" },
  { from: "Registro", to: "Perfil del bebé", triggeredBy: "Botón 'Crear perfil'", detail: "Parámetros iniciales de edad, peso y talla" },
  { from: "Perfil del bebé", to: "Inicio", triggeredBy: "Botón 'Guardar y Explorar'", detail: "Inicio de la simulación del celular" },
  { from: "Navegación Móvil (TabBar)", to: "Nutrición, Recetas, Planificador, Comunidad", triggeredBy: "Iconos de barra inferior", detail: "Navegación instantánea fluida sin recargas" },
  { from: "Inicio", to: "Logros / Perfil", triggeredBy: "Click en barra de nivel o Nutrín", detail: "Visualiza la evolución de tu dinosaurio de compañía" }
];

export const FLUTTER_CODE_EXPORTS = {
  pubspec: `name: nutricomienzos
description: Aplicación Flutter de nutrición y bienestar infantil interactivo con Firebase.
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.5
  firebase_core: ^2.15.0
  cloud_firestore: ^4.8.3
  firebase_auth: ^4.7.3
  google_fonts: ^5.1.0
  provider: ^6.0.5
  shared_preferences: ^2.2.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.1

flutter:
  uses-material-design: true`,

  main: `import 'package:flutter/material';
import 'package:google_fonts/google_fonts.dart';
import 'package:firebase_core/firebase_core.dart';
import 'screens/welcome_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Se requiere inicialización previa en tus plataformas nativas
  // await Firebase.initializeApp();
  runApp(const NutriComienzosApp());
}

class NutriComienzosApp extends StatelessWidget {
  const NutriComienzosApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NutriComienzos',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: const Color(0xff0056A6), // Azul de la marca
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xff0056A6),
          primary: const Color(0xff0056A6),
          secondary: const Color(0xff8DC63F), // Verde de la marca
          tertiary: const Color(0xffF58220),  // Naranja de la marca
          background: const Color(0xffFFF8EE), // Crema cálido
        ),
        textTheme: GoogleFonts.interTextTheme(Theme.of(context).textTheme),
        cardTheme: CardTheme(
          color: Colors.white,
          elevation: 2,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        ),
      ),
      home: const WelcomeScreen(),
    );
  }
}`,

  firestoreService: `import 'package:cloud_firestore/cloud_firestore.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Registrar un nuevo perfil de bebé con su configuración de hábitos activa
  Future<void> saveBabyProfile({
    required String uid,
    required String name,
    required double weight,
    required double height,
    required int ageMonths,
    required String stage,
  }) async {
    await _db.collection('users').doc(uid).set({
      'babyName': name,
      'weight': weight,
      'height': height,
      'ageMonths': ageMonths,
      'stage': stage,
      'createdAt': FieldValue.serverTimestamp(),
    });

    // Crear subcolección de hábitos por defecto
    await _db.collection('users').doc(uid).collection('habits').doc('current').set({
      'waterGlasses': 0,
      'fruitsPortions': 0,
      'veggiesPortions': 0,
      'lastUpdated': FieldValue.serverTimestamp(),
    });
  }

  // Agregar tips compartidos en el muro de comunidad infantil
  Future<void> shareCommunityPost({
    required String author,
    required String role,
    required String content,
  }) async {
    await _db.collection('community').add({
      'author': author,
      'role': role,
      'content': content,
      'likes': 0,
      'replies': 0,
      'date': DateTime.now().toIso8601String(),
    });
  }

  // Actualizar hábitos diarios integrados
  Future<void> updateDailyHabit(String uid, String habitField, int newValue) async {
    await _db.collection('users').doc(uid).collection('habits').doc('current').update({
      habitField: newValue,
      'lastUpdated': FieldValue.serverTimestamp(),
    });
  }
}`,

  welcomeScreen: `import 'package:flutter/material';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: theme.colorScheme.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const SizedBox(height: 20),
              // Mascota y Marca
              Column(
                children: [
                  Container(
                    width: 140,
                    height: 140,
                    decoration: BoxDecoration(
                      color: const Color(0xff8DC63F).withOpacity(0.15),
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Text(
                        '🦖', // Nutrín en Flutter
                        style: const TextStyle(fontSize: 70),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'NutriComienzos',
                    style: theme.textTheme.headlineLarge?.copyWith(
                      color: const Color(0xff0056A6),
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Alimentación inteligente y amorosa para tu bebé',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 15, color: Colors.grey),
                  ),
                ],
              ),
              
              // Botones de acción directos
              Column(
                children: [
                  ElevatedButton(
                    onPressed: () {
                      // Simular navegación hacia el registro de usuario
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xff0056A6),
                      foregroundColor: Colors.white,
                      minimumSize: const Size(double.infinity, 56),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 0,
                    ),
                    child: const Text(
                      'Comenzar mi aventura',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Ya tengo una cuenta registrada',
                      style: TextStyle(color: Color(0xff0056A6), fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
};

export const FIRESTORE_BLUEPRINT = {
  collections: {
    users: {
      description: "Almacena la información de autenticación y perfiles generales de los padres.",
      fields: [
        { name: "userId", type: "string", desc: "UID único brindado por Firebase Auth." },
        { name: "email", type: "string", desc: "Clave de acceso y comunicación por correo." },
        { name: "babyName", type: "string", desc: "Nombre de cariño del bebé o hijo primario." },
        { name: "weight", type: "number", desc: "Registro del peso decimal más reciente (kg)." },
        { name: "height", type: "number", desc: "Registro de la altura decimal más reciente (cm)." },
        { name: "ageMonths", type: "number", desc: "Meses calculados del niño." },
        { name: "stage", type: "string", desc: "Etapa asignada ('embarazo', '6-12-meses', '1-3-anos'...) para filtrar las recomendaciones." }
      ]
    },
    community: {
      description: "Muro de apoyo educativo infantil donde los usuarios comentan vivencias alimenticias.",
      fields: [
        { name: "postId", type: "string", desc: "ID autogenerado por Firestore." },
        { name: "author", type: "string", desc: "Nombre del autor participante." },
        { name: "role", type: "string", desc: "Etiqueta protectora ('Mamá de Sofía', 'Pediatra')" },
        { name: "content", type: "string", desc: "Comentario compartido para visualización." },
        { name: "likes", type: "number", desc: "Contador de me gusta integrados por votación." },
        { name: "date", type: "string", desc: "ISOString de fecha en el servidor." }
      ]
    },
    weekly_plans: {
      description: "Estructura del planificador semanal por usuario.",
      fields: [
        { name: "userId", type: "string", desc: "Filtro primario por dueño del plan." },
        { name: "dayOfWeek", type: "string", desc: "Lunes, Martes, Miércoles, etc." },
        { name: "breakfast", type: "string", desc: "Texto descriptivo o ID de receta." },
        { name: "lunch", type: "string", desc: "Texto descriptivo o ID de receta para mediodía." },
        { name: "dinner", type: "string", desc: "Texto descriptivo o ID de receta de noche." },
        { name: "snack", type: "string", desc: "Bocado ligero de entretiempo." }
      ]
    }
  }
};
