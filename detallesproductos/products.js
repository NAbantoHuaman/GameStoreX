// Base de datos de productos
const productsData = {
    "the-witcher-3": {
        id: "the-witcher-3",
        name: "The Witcher 3: Wild Hunt",
        price: "S/. 129.00",
        image: "/img/juegos/1740506597-the-witcher-3-wild-hunt-ps5-0.webp",
        description: "The Witcher 3: Wild Hunt es una épica aventura de rol en un mundo abierto de fantasía oscura. Como Geralt de Rivia, un cazador de monstruos profesional, deberás encontrar a la Niña de la Profecía en un vasto mundo lleno de ciudades mercantiles, islas piratas, peligrosos pasos de montaña y cavernas olvidadas.",
        category: "rpg",
        features: [
            "Mundo abierto masivo con múltiples regiones únicas para explorar",
            "Sistema de combate dinámico con espadas, magia y alquimia",
            "Decisiones morales complejas que afectan el desarrollo de la historia",
            "Más de 100 horas de contenido con misiones principales y secundarias",
            "Cazas de monstruos épicas que requieren preparación y estrategia",
            "Gráficos y rendimiento mejorados para PS5"
        ],
        releaseDate: "28 de mayo de 2015",
        developer: "CD Projekt RED",
        publisher: "CD Projekt",
        rating: 4.9,
        thumbnails: [
            "/img/imgjuegos/witcher3/witcher3-screenshot-01.jpg",
            "/img/imgjuegos/witcher3/witcher3-screenshot-02.jpg",
            "/img/imgjuegos/witcher3/witcher3-screenshot-03.jpg",
            "/img/imgjuegos/witcher3/witcher3-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/1-l29HlKkXU",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "bloodborne": {
        id: "bloodborne",
        name: "Bloodborne",
        price: "S/. 119.00",
        image: "/img/juegos2/1646845135-bloodborne-game-of-the-year-edition-ps5.jpg",
        description: "Bloodborne es una obra maestra del terror gótico y la acción RPG. Adéntrate en la ciudad maldita de Yharnam, donde una enfermedad misteriosa transforma a sus habitantes en bestias. Como Cazador, deberás descubrir los secretos de la ciudad mientras luchas por tu supervivencia en un mundo de pesadilla.",
        category: "accion",
        features: [
            "Combate agresivo y estratégico que premia la audacia",
            "Diseño de niveles interconectado y complejo",
            "Sistema único de armas transformables",
            "Atmósfera gótica victoriana con elementos lovecraftianos",
            "Jefes desafiantes con diseños únicos",
            "Modo cooperativo y PvP integrado en la experiencia"
        ],
        releaseDate: "24 de marzo de 2015",
        developer: "FromSoftware",
        publisher: "Sony Interactive Entertainment",
        rating: 4.8,
        thumbnails: [
            "/img/imgjuegos/bloodborne/bloodborne-screenshot-01.jpg",
            "/img/imgjuegos/bloodborne/bloodborne-screenshot-02.jpg",
            "/img/imgjuegos/bloodborne/bloodborne-screenshot-03.jpg",
            "/img/imgjuegos/bloodborne/bloodborne-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/G203e1HhixY",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador (multijugador online)",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "dragon-age-veilguard": {
        id: "dragon-age-veilguard",
        name: "Dragon Age: The Veilguard",
        price: "S/. 169.00",
        image: "/img/juegos/1727472891-dragon-age-dreadwolf-ps5-pre-orden-0.webp",
        description: "Dragon Age: The Veilguard es la nueva entrega de la aclamada saga de rol. En un mundo donde el Velo entre el mundo mortal y el Reino de los Espíritus se desvanece, deberás liderar un grupo de héroes para prevenir una catástrofe que amenaza con destruir Thedas. Tus decisiones darán forma al destino del mundo.",
        category: "rpg",
        features: [
            "Sistema de combate táctico con pausas en tiempo real",
            "Narrativa ramificada con decisiones impactantes",
            "Compañeros únicos con historias personales profundas",
            "Mundo abierto con múltiples regiones para explorar",
            "Sistema de crafting y personalización de equipamiento",
            "Gráficos de nueva generación con efectos mágicos espectaculares"
        ],
        releaseDate: "2024",
        developer: "BioWare",
        publisher: "Electronic Arts",
        rating: 4.7,
        thumbnails: [
            "/img/imgjuegos/dragonage/dragonage-screenshot-01.jpg",
            "/img/imgjuegos/dragonage/dragonage-screenshot-02.jpg",
            "/img/imgjuegos/dragonage/dragonage-screenshot-03.jpg",
            "/img/imgjuegos/dragonage/dragonage-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/VxqBle_O6jI",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "horizon-zero-dawn-remastered": {
        id: "horizon-zero-dawn-remastered",
        name: "Horizon Zero Dawn Remastered",
        price: "S/. 149.00",
        image: "/img/juegos/1727997956-horizon-zero-dawn-remastered-ps5-pre-orden-0.webp",
        description: "Horizon Zero Dawn Remastered trae la aclamada aventura de Aloy a una nueva generación con gráficos mejorados y características exclusivas de PS5. En un mundo post-apocalíptico donde las máquinas dominan la tierra, deberás descubrir los secretos del pasado y luchar por la supervivencia de la humanidad.",
        category: "accion",
        features: [
            "Gráficos remasterizados con texturas en 4K y efectos mejorados",
            "Combate dinámico contra máquinas únicas y desafiantes",
            "Mundo abierto expansivo con diversos biomas para explorar",
            "Sistema de crafteo y modificación de armas profundo",
            "Historia emotiva con giros argumentales sorprendentes",
            "Características exclusivas de PS5 como retroalimentación háptica"
        ],
        releaseDate: "28 de febrero de 2024",
        developer: "Guerrilla Games",
        publisher: "Sony Interactive Entertainment",
        rating: 4.8,
        thumbnails: [
            "/img/imgjuegos/horizon/horizon-screenshot-01.jpg",
            "/img/imgjuegos/horizon/horizon-screenshot-02.jpg",
            "/img/imgjuegos/horizon/horizon-screenshot-03.jpg",
            "/img/imgjuegos/horizon/horizon-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/u4-FCsiF5x4",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "the-last-of-us-part-2-remastered": {
        id: "the-last-of-us-part-2-remastered",
        name: "The Last of Us Part II Remastered",
        price: "S/. 159.00",
        image: "/img/juegos/1701964990-the-last-of-us-part-ii-remastered-ps5-pre-orden-0.jpg",
        description: "The Last of Us Part II Remastered lleva la intensa historia de Ellie y Abby a PS5 con gráficos mejorados y contenido adicional. En un mundo devastado por una pandemia, la búsqueda de venganza te llevará a través de un viaje emocional que desafiará tu moral y humanidad.",
        category: "accion",
        features: [
            "Gráficos remasterizados con iluminación y texturas mejoradas",
            "Modo roguelike 'Sin Retorno' exclusivo",
            "Niveles perdidos con comentarios de los desarrolladores",
            "Combate y sigilo mejorados con características de PS5",
            "Modo foto expandido con nuevas características",
            "Contenido adicional y detrás de cámaras"
        ],
        releaseDate: "19 de enero de 2024",
        developer: "Naughty Dog",
        publisher: "Sony Interactive Entertainment",
        rating: 4.9,
        thumbnails: [
            "/img/imgjuegos/tlou2/tlou2-screenshot-01.jpg",
            "/img/imgjuegos/tlou2/tlou2-screenshot-02.jpg",
            "/img/imgjuegos/tlou2/tlou2-screenshot-03.jpg",
            "/img/imgjuegos/tlou2/tlou2-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/eOiUtRF8k28",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "final-fantasy-vii": {
        id: "final-fantasy-vii",
        name: "Final Fantasy VII Remake",
        price: "S/. 139.00",
        image: "/img/juegos/1674068125-final-fantasy-vii-rebirth-ps5-pre-orden-0.jpg",
        description: "Final Fantasy VII Remake reinventa el legendario RPG con gráficos modernos y un sistema de combate dinámico. Sigue la historia de Cloud Strife y el grupo eco-terrorista Avalanche en su lucha contra la corporación Shinra en la ciudad de Midgar. Una reimaginación que expande la narrativa original con nuevos elementos y profundidad.",
        category: "rpg",
        features: [
            "Sistema de combate que mezcla acción en tiempo real con elementos estratégicos",
            "Ciudad de Midgar recreada con un nivel de detalle impresionante",
            "Personajes icónicos rediseñados con fidelidad al original",
            "Banda sonora remasterizada con arreglos modernos",
            "Sistema de progresión y personalización profundo",
            "Nuevas subtramas y contenido expandido"
        ],
        releaseDate: "10 de abril de 2020",
        developer: "Square Enix",
        publisher: "Square Enix",
        rating: 4.8,
        thumbnails: [
            "/img/imgjuegos/ff7/ff7-screenshot-01.jpg",
            "/img/imgjuegos/ff7/ff7-screenshot-02.jpg",
            "/img/imgjuegos/ff7/ff7-screenshot-03.jpg",
            "/img/imgjuegos/ff7/ff7-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/ERgrFVhL-n4",
        languages: "Audio en inglés y japonés, textos en español y más idiomas",
        players: "1 jugador",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "black-myth-wukong": {
        id: "black-myth-wukong",
        name: "Black Myth: Wukong",
        price: "S/. 144.00",
        image: "/img/juegos/1718149460-black-myth-wukong-ps5-pre-orden-0.jpg",
        description: "Black Myth: Wukong es un impresionante juego de acción y aventura basado en la novela clásica china \"Viaje al Oeste\". Encarna al legendario Rey Mono, Sun Wukong, en una épica aventura a través de un mundo inspirado en la mitología china. Desarrollado por Game Science, este juego combina combate intenso, exploración detallada y una narrativa rica en un mundo visualmente impresionante.",
        category: "accion",
        features: [
            "Combate fluido y estratégico inspirado en las artes marciales chinas",
            "Más de 100 tipos de enemigos únicos basados en la mitología china",
            "Sistema de transformación que permite adoptar diferentes formas con habilidades únicas",
            "Mundo abierto con diversos biomas y localizaciones inspiradas en la antigua China",
            "Jefes épicos que requieren estrategia y habilidad para ser derrotados",
            "Gráficos de última generación con Unreal Engine 5"
        ],
        releaseDate: "20 de agosto de 2024",
        developer: "Game Science",
        publisher: "Game Science",
        rating: 4.7,
        thumbnails: [
            "/img/imgjuegos/wukong/black-myth-wukong-screenshot-01-en-24jan24.webp",
            "/img/imgjuegos/wukong/black-myth-wukong-screenshot-02-en-24jan24.webp",
            "/img/imgjuegos/wukong/black-myth-wukong-screenshot-05-en-24jan24.webp",
            "/img/imgjuegos/wukong/black-myth-wukong-screenshot-08-en-7Feb24.webp"
        ],
        trailer: "https://www.youtube.com/embed/u83VdXAVq08",
        languages: "Audio en chino, textos en español",
        players: "1 jugador",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "elden-ring": {
        id: "elden-ring",
        name: "Elden Ring",
        price: "S/. 59.99",
        image: "/img/juegos/1639687011-elden-ring-ps5-pre-orden.jpg",
        description: "Elden Ring es un juego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El juego es un proyecto colaborativo entre el director del juego Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin. Explora las Tierras Intermedias, un vasto mundo abierto lleno de misterios, peligros y recompensas, mientras te enfrentas a enemigos formidables y descubres la historia de un reino fragmentado.",
        category: "accion",
        features: [
            "Mundo abierto expansivo con libertad total de exploración",
            "Combate desafiante con múltiples estilos de juego",
            "Historia rica y profunda creada por George R. R. Martin",
            "Múltiples finales basados en tus decisiones",
            "Sistema de personalización de personaje con numerosas opciones",
            "Jefes épicos que ponen a prueba tus habilidades"
        ],
        releaseDate: "25 de febrero de 2022",
        developer: "FromSoftware",
        publisher: "Bandai Namco Entertainment",
        rating: 4.8,
        thumbnails: [
            "/img/imgjuegos/eldenring/elden-ring-newscreen01.webp",
            "/img/imgjuegos/eldenring/elden-ring-newscreen04.webp",
            "/img/imgjuegos/eldenring/elden-ring-newscreen06.webp",
            "/img/imgjuegos/eldenring/elden-ring-godfrey-vertical-art.webp"
        ],
        trailer: "https://www.youtube.com/embed/E3Huy2cdih0",
        languages: "Audio y textos en español, inglés, japonés y más",
        players: "1 jugador (multijugador online)",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "marvels-spider-man-2": {
        id: "marvels-spider-man-2",
        name: "MARVEL'S SPIDER MAN 2",
        price: "S/. 159.00",
        image: "/img/juegos/1697557602-marvels-spider-man-2-ps5-pre-orden-0.jpg",
        description: "Marvel's Spider-Man 2 es la secuela del aclamado juego de acción y aventuras de Insomniac Games. Peter Parker y Miles Morales regresan para una nueva y emocionante aventura en una Nueva York expandida. Enfréntate a nuevos villanos, incluido el temible Venom, mientras balanceas entre los rascacielos y proteges a los ciudadanos con nuevas habilidades y trajes.",
        category: "accion",
        features: [
            "Dos Spider-Man jugables con habilidades y estilos únicos",
            "Nueva York expandida con nuevos distritos para explorar",
            "Nuevos villanos icónicos del universo Spider-Man",
            "Mecánicas de balanceo mejoradas y sistema de combate refinado",
            "Historia emotiva que profundiza en los personajes",
            "Aprovecha al máximo las capacidades de PS5 con tiempos de carga casi instantáneos"
        ],
        releaseDate: "20 de octubre de 2023",
        developer: "Insomniac Games",
        publisher: "Sony Interactive Entertainment",
        rating: 4.9,
        thumbnails: [
            "/img/imgjuegos/spiderman/spider-man-2-screenshot-miles-enhanced-venom-en-25may23.webp",
            "/img/imgjuegos/spiderman/spider-man-2-screenshot-story-duo-4k-legal-13jul23.webp",
            "/img/imgjuegos/spiderman/spider-man-2-screenshot-symbiote-4k-legal-13jul23.webp",
            "/img/imgjuegos/spiderman/spider-man-2-screenshot-venom-4k-legal-13jul23.webp"
        ],
        trailer: "https://www.youtube.com/embed/9fVYKsEmuRo",
        languages: "Audio y textos en español latino e inglés",
        players: "1 jugador",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "dragon-ball-sparking-zero": {
        id: "dragon-ball-sparking-zero",
        name: "Dragon Ball: Sparking! ZERO",
        price: "S/. 174.00",
        image: "/img/juegos/1718034332-dragon-ball-sparking-zero-pre-orden-0.jpg",
        description: "Dragon Ball: Sparking! ZERO es el regreso de la legendaria serie Budokai Tenkaichi, con combates espectaculares y un amplio roster de personajes del universo Dragon Ball. Revive las batallas más icónicas de la serie y crea tus propios momentos épicos con un sistema de combate mejorado y gráficos de última generación que capturan la esencia del anime.",
        category: "lucha",
        features: [
            "Más de 100 personajes jugables de toda la saga Dragon Ball",
            "Escenarios destructibles que reaccionan a tus batallas",
            "Transformaciones en tiempo real durante los combates",
            "Modos historia que abarcan desde Dragon Ball Z hasta Super",
            "Batallas multijugador locales y online",
            "Recreación fiel de los movimientos y técnicas especiales de cada personaje"
        ],
        releaseDate: "11 de octubre de 2024",
        developer: "Spike Chunsoft",
        publisher: "Bandai Namco Entertainment",
        rating: 4.6,
        thumbnails: [
            "/img/imgjuegos/dbz/dragon-ball-sparking-zero-screenshot-02-en-15dec23.webp",
            "/img/imgjuegos/dbz/dragon-ball-sparking-zero-screenshot-03-en-15dec23.webp",
            "/img/imgjuegos/dbz/dragon-ball-sparking-zero-screenshot-04-en-15dec23.webp",
            "/img/imgjuegos/dbz/dragon-ball-sparking-zero-screenshot-05-en-15dec23.webp"
        ],
        trailer: "https://www.youtube.com/embed/qqMh9MIhO9k",
        languages: "Audio en japonés e inglés, textos en español",
        players: "1-2 jugadores (hasta 4 jugadores online)",
        classification: "PEGI 12",
        resolution: "4K a 60 FPS"
    },
    "doom-the-dark-ages": {
        id: "doom-the-dark-ages",
        name: "DOOM: The Dark Ages",
        price: "S/. 164.00",
        image: "/img/juegos/1737754002-doom-the-dark-ages-ps5-pre-orden-0.webp",
        description: "DOOM: The Dark Ages lleva la acción frenética de la saga a un entorno medieval, manteniendo la esencia de la serie con un nuevo giro histórico. Como un guerrero atrapado en un pasado corrupto por fuerzas demoníacas, deberás utilizar un arsenal de armas medievales infundidas con tecnología futurista para acabar con hordas de demonios y liberar este mundo de la oscuridad.",
        category: "accion",
        features: [
            "Ambientación medieval única con la esencia de DOOM",
            "Nuevas armas que combinan lo medieval con tecnología futurista",
            "Modo Glory Kills mejorado con ejecuciones brutales",
            "Campaña épica a través de castillos, mazmorras y catedrales corruptas",
            "Nuevos tipos de demonios inspirados en el folclore medieval",
            "Banda sonora metal que fusiona instrumentos medievales con guitarras pesadas"
        ],
        releaseDate: "2025",
        developer: "id Software",
        publisher: "Bethesda Softworks",
        rating: 4.5,
        thumbnails: [
            "/img/imgjuegos/doom/DOOM The Dark Ages_02_Siege.webp",
            "/img/imgjuegos/doom/DOOM The Dark Ages_06_Slayer.webp",
            "/img/imgjuegos/doom/media-screenshot-04.webp",
            "/img/imgjuegos/doom/media-screenshot-06.webp"
        ],
        trailer: "https://www.youtube.com/embed/4tk8lkmYGWQ",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador (multijugador online)",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "assassins-creed-shadows": {
        id: "assassins-creed-shadows",
        name: "Assassins Creed Shadows",
        price: "S/. 104.00",
        image: "/img/juegos/1715874649-assassins-creed-shadows-ps5-pre-orden-0.webp",
        description: "Assassin's Creed Shadows te lleva al Japón feudal, donde podrás jugar como un shinobi y una samurái en una aventura épica de sigilo y combate. Ambientado en el período Edo, el juego te permite explorar ciudades vibrantes como Edo (actual Tokio) y Kyoto, así como paisajes rurales, mientras te sumerges en una historia de honor, traición y la eterna lucha entre Asesinos y Templarios.",
        category: "aventura",
        features: [
            "Dos protagonistas jugables con estilos de juego únicos: Naoe (samurái) y Yasuke (shinobi)",
            "Japón feudal recreado con increíble detalle histórico",
            "Sistema de sigilo mejorado con nuevas mecánicas ninja",
            "Combate con katanas, kunais y otras armas tradicionales japonesas",
            "Ciclo día/noche dinámico que afecta las misiones y el mundo",
            "Exploración vertical mejorada con nuevas herramientas de movilidad"
        ],
        releaseDate: "15 de noviembre de 2024",
        developer: "Ubisoft Quebec",
        publisher: "Ubisoft",
        rating: 4.4,
        thumbnails: [
            "/img/imgjuegos/amirage/ac-shadows-screenshot-01.jpg",
            "/img/imgjuegos/amirage/ac-shadows-screenshot-02.jpg",
            "/img/imgjuegos/amirage/ac-shadows-screenshot-03.jpg",
            "/img/imgjuegos/amirage/ac-shadows-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/rIvMaQYTHUc",
        languages: "Audio y textos en español, inglés, japonés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "final-fantasy-vii-rebirth": {
        id: "final-fantasy-vii-rebirth",
        name: "Final Fantasy VII Rebirth",
        price: "S/. 189.00",
        image: "/img/juegos/1708532602-final-fantasy-vii-rebirth-ps5-0.jpg",
        description: "Final Fantasy VII Rebirth es la segunda entrega del proyecto de remake de Final Fantasy VII. Continúa la historia de Cloud Strife y sus compañeros mientras se aventuran más allá de la ciudad de Midgar, explorando un vasto mundo abierto lleno de maravillas, peligros y secretos. Con un sistema de combate refinado y una narrativa expandida, esta entrega profundiza en la historia clásica mientras añade nuevos elementos.",
        category: "rpg",
        features: [
            "Mundo abierto expansivo con múltiples regiones para explorar",
            "Sistema de combate que combina acción en tiempo real con elementos estratégicos",
            "Historia expandida que profundiza en los personajes y el mundo",
            "Minijuegos y actividades secundarias variadas",
            "Invocaciones espectaculares y límites devastadores",
            "Banda sonora remasterizada que honra la original"
        ],
        releaseDate: "29 de febrero de 2024",
        developer: "Square Enix",
        publisher: "Square Enix",
        rating: 4.8,
        thumbnails: [
            "/img/ff7-rebirth-screenshot-01.jpg",
            "/img/ff7-rebirth-screenshot-02.jpg",
            "/img/ff7-rebirth-screenshot-03.jpg",
            "/img/ff7-rebirth-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/iqFLp0jI8lY",
        languages: "Audio en inglés y japonés, textos en español y más idiomas",
        players: "1 jugador",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "silent-hill-2": {
        id: "silent-hill-2",
        name: "Silent Hill 2 Remake",
        price: "S/. 149.00",
        image: "/img/juegos/1716479402-silent-hill-2-ps5-pre-orden-0.jpg",
        description: "Silent Hill 2 Remake es una reimaginación del clásico juego de terror psicológico. Desarrollado por Bloober Team, este remake mantiene la esencia inquietante del original mientras actualiza los gráficos, el sistema de juego y el audio para una nueva generación. Sigue a James Sunderland mientras se adentra en el pueblo de Silent Hill tras recibir una carta de su esposa fallecida, enfrentándose a sus propios demonios internos y a las horribles criaturas que habitan en la niebla.",
        category: "terror",
        features: [
            "Experiencia de terror psicológico profundamente perturbadora",
            "Gráficos fotorrealistas que aprovechan al máximo el PS5",
            "Sistema de combate y exploración mejorados",
            "Audio 3D inmersivo que amplifica la atmósfera terrorífica",
            "Historia fiel al original con nuevas perspectivas",
            "Criaturas icónicas rediseñadas con un nivel de detalle escalofriante"
        ],
        releaseDate: "8 de octubre de 2024",
        developer: "Bloober Team",
        publisher: "Konami",
        rating: 4.7,
        thumbnails: [
            "/img/silenthill/sh2-remake-screenshot-01.jpg",
            "/img/silenthill/sh2-remake-screenshot-02.jpg",
            "/img/silenthill/sh2-remake-screenshot-03.jpg",
            "/img/silenthill/sh2-remake-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/pyC_qiW_4ZY",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "tekken-8": {
        id: "tekken-8",
        name: "Tekken 8",
        price: "S/. 139.00",
        image: "/principal/img/juegos/1705593602-tekken-8-ps5-0.jpg",
        description: "Tekken 8 es la última entrega de la legendaria saga de juegos de lucha. Con un nuevo motor gráfico, este título lleva los combates a un nuevo nivel de espectacularidad visual y mecánica. La historia continúa la saga de los Mishima, centrándose en la batalla entre Jin Kazama y Kazuya Mishima, mientras nuevos y veteranos luchadores se unen al King of Iron Fist Tournament con técnicas renovadas y devastadoras.",
        category: "lucha",
        features: [
            "32 luchadores con estilos de combate únicos y movimientos característicos",
            "Sistema de combate Heat que permite ataques agresivos y estratégicos",
            "Escenarios dinámicos con elementos destructibles",
            "Modo historia cinematográfico que continúa la saga Mishima",
            "Modos online mejorados con netcode rollback",
            "Personalización de personajes con cientos de opciones"
        ],
        releaseDate: "26 de enero de 2024",
        developer: "Bandai Namco Studios",
        publisher: "Bandai Namco Entertainment",
        rating: 4.6,
        thumbnails: [
            "/principal/pages/productos/tekken/tekken8-screenshot-01.jpg",
            "/principal/pages/productos/tekken/tekken8-screenshot-02.jpg",
            "/principal/pages/productos/tekken/tekken8-screenshot-03.jpg",
            "/principal/pages/productos/tekken/tekken8-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/07FdDRmH4wE",
        languages: "Audio en japonés e inglés, textos en español y más idiomas",
        players: "1-2 jugadores (multijugador online)",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "stellar-blade": {
        id: "stellar-blade",
        name: "Stellar Blade",
        price: "S/. 159.00",
        image: "/img/juegos/1707352092-stellar-blade-ps5-pre-orden-0.png",
        description: "Stellar Blade es un juego de acción y aventura futurista que sigue a Eve, una guerrera de élite enviada desde una colonia espacial para reclamar la Tierra de las garras de extrañas criaturas conocidas como NA:tives. Con un sistema de combate fluido y preciso, y un mundo post-apocalíptico visualmente impresionante, Stellar Blade ofrece una experiencia de juego intensa y cinematográfica.",
        category: "accion",
        features: [
            "Sistema de combate dinámico con combos, contraataques y habilidades especiales",
            "Mundo semi-abierto con múltiples localizaciones para explorar",
            "Sistema de progresión profundo con mejoras de habilidades y equipamiento",
            "Historia emotiva sobre la supervivencia de la humanidad",
            "Jefes desafiantes con mecánicas únicas",
            "Gráficos de última generación que aprovechan al máximo el PS5"
        ],
        releaseDate: "26 de abril de 2024",
        developer: "Shift Up",
        publisher: "Sony Interactive Entertainment",
        rating: 4.5,
        thumbnails: [
            "/img/imgjuegos/stellar/stellar-blade-screenshot-01-en-06feb23.webp",
            "/img/imgjuegos/stellar/stellar-blade-screenshot-03-en-06feb23.webp",
            "/img/imgjuegos/stellar/stellar-blade-screenshot-06-en-06feb23.webp",
            "/img/imgjuegos/stellar/stellar-blade-screenshot-11-en-06feb23.webp"
        ],
        trailer: "https://www.youtube.com/embed/UJv0uHIVNK0",
        languages: "Audio en inglés y coreano, textos en español y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "assassins-creed-mirage": {
        id: "assassins-creed-mirage",
        name: "Assassin's Creed Mirage",
        price: "S/. 129.00",
        image: "/img/imgjuegos/amirage/1689115719-assassins-creed-mirage-ps5-pre-orden-0.jpg",
        description: "Assassin's Creed Mirage te transporta al Bagdad del siglo IX, donde seguirás la historia de Basim Ibn Ishaq, un ladrón callejero que se convierte en un Maestro Asesino. Con un enfoque renovado en el sigilo y el parkour, Mirage regresa a las raíces de la saga, ofreciendo una experiencia más concentrada y narrativa en un entorno urbano densamente poblado y lleno de vida.",
        category: "aventura",
        features: [
            "Regreso a las mecánicas clásicas de sigilo y parkour de la saga",
            "Bagdad del siglo IX recreado con increíble detalle histórico",
            "Sistema de investigación y caza de objetivos mejorado",
            "Herramientas y gadgets variados para abordar misiones de diferentes maneras",
            "Historia de origen que profundiza en la Hermandad de los Asesinos",
            "Mundo vivo con NPCs que reaccionan a tus acciones"
        ],
        releaseDate: "5 de octubre de 2023",
        developer: "Ubisoft Bordeaux",
        publisher: "Ubisoft",
        rating: 4.3,
        thumbnails: [
            "/img/imgjuegos/amirage/photo-15a88543-7194-4274-915a-2883ede8ab89.jpg",
            "/img/imgjuegos/amirage/photo-3156193c-3df9-4fcf-8f3b-190035c99f9c.jpg",
            "/img/imgjuegos/amirage/photo-5f43b069-7699-4557-ab46-e5127ab070d7.jpg",
            "/img/imgjuegos/amirage/photo-b2570a2e-f3c2-405b-be3a-cad49b9593ee.jpg",
        ],
        trailer: "https://www.youtube.com/embed/x55lAlFtXmw",
        languages: "Audio y textos en español, inglés, árabe y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "monster-hunter-wilds": {
        id: "monster-hunter-wilds",
        name: "Monster Hunter Wilds",
        price: "S/. 169.00",
        image: "/img/juegos/1718238829-monster-hunter-wilds-ps5-pre-orden-0.jpg",
        description: "Monster Hunter Wilds es la nueva entrega de la aclamada serie de Capcom. Ambientado en un vasto mundo abierto con ecosistemas dinámicos, los cazadores se enfrentarán a monstruos más imponentes y realistas que nunca. Con un sistema de caza mejorado, nuevas armas y compañeros, y un ciclo día/noche y clima que afectan directamente al comportamiento de los monstruos, Wilds promete llevar la experiencia de caza a un nuevo nivel.",
        category: "accion",
        features: [
            "Mundo abierto expansivo con ecosistemas interconectados",
            "Nuevos monstruos con comportamientos y hábitats realistas",
            "14 tipos de armas con mecánicas renovadas y movimientos especiales",
            "Sistema de clima dinámico que afecta a la jugabilidad",
            "Modo cooperativo para hasta 4 jugadores",
            "Gráficos de nueva generación con monstruos y entornos detallados"
        ],
        releaseDate: "28 de febrero de 2025",
        developer: "Capcom",
        publisher: "Capcom",
        rating: 4.7,
        thumbnails: [
            "/img/imgjuegos/mhunter/Monster-Hunter-Wilds-Rey-Dau-Image-Block-01-17sep24.webp",
            "/img/imgjuegos/mhunter/monster-hunter-wilds-screenshot-07-ps5-en-08ap24.webp",
            "/img/imgjuegos/mhunter/monster-hunter-wilds-screenshot-09-ps5-en-08ap24.webp",
            "/img/imgjuegos/mhunter/Monster-Hunter-Wilds-Sword-and-Shield-Image-Block-01-17sep24.webp"
        ],
        trailer: "https://www.youtube.com/embed/a_wNFT4j6qI",
        languages: "Audio en japonés e inglés, textos en español y más idiomas",
        players: "1-4 jugadores (multijugador online)",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "hogwarts-legacy": {
        id: "hogwarts-legacy",
        name: "Hogwarts Legacy",
        price: "S/. 149.00",
        image: "/img/juegos/1675969170-hogwarts-legacy-digital-deluxe-edition-pre-orden-ps5-0.jpg",
        description: "Hogwarts Legacy es un RPG de mundo abierto ambientado en el universo mágico de Harry Potter, pero 100 años antes de los eventos de los libros. Como estudiante de Hogwarts con una conexión inusual con la magia antigua, explorarás el castillo, aprenderás hechizos, prepararás pociones, domarás bestias mágicas y te enfrentarás a magos oscuros mientras descubres un misterio que podría desgarrar el mundo mágico.",
        category: "rpg",
        features: [
            "Mundo abierto que incluye Hogwarts, Hogsmeade y los alrededores",
            "Sistema de magia inmersivo con más de 20 hechizos diferentes",
            "Personalización completa de tu personaje y su historia",
            "Decisiones morales que afectan al desarrollo de la historia",
            "Clases de magia, pociones, herbología y cuidado de criaturas mágicas",
            "Sala de los Menesteres personalizable como base de operaciones"
        ],
        releaseDate: "10 de febrero de 2023",
        developer: "Avalanche Software",
        publisher: "Warner Bros. Games",
        rating: 4.6,
        thumbnails: [
            "/img/imgjuegos/hogwarts/screen-06.jpg",
            "/img/imgjuegos/hogwarts/screen-08.jpg",
            "/img/imgjuegos/hogwarts/screen-10.jpg",
            "/img/imgjuegos/hogwarts/screen-14.jpg"
        ],
        trailer: "https://www.youtube.com/embed/1O6Qstncpnc",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 16",
        resolution: "4K a 60 FPS"
    },
    "final-fantasy-xvi": {
        id: "final-fantasy-xvi",
        name: "FINAL FANTASY XVI",
        price: "S/. 179.00",
        image: "/principal/img/juegos/1687536602-final-fantasy-xvi-ps5-0.jpg",
        description: "Final Fantasy XVI es un RPG de acción ambientado en el mundo de Valisthea, donde las poderosas Madrecristales otorgan magia a sus habitantes. Sigue la historia de Clive Rosfield, un guerrero marcado por el destino que busca venganza mientras se ve envuelto en un conflicto entre naciones que luchan por el control de los cristales. Con un sistema de combate dinámico y una narrativa madura, FFXVI reinventa la saga con un enfoque más oscuro y medieval.",
        category: "rpg",
        features: [
            "Sistema de combate en tiempo real con habilidades de Eikons (invocaciones)",
            "Historia épica con temas políticos y personales entrelazados",
            "Mundo inspirado en la Europa medieval con seis reinos distintos",
            "Batallas espectaculares entre Eikons que cambian la jugabilidad",
            "Banda sonora compuesta por Masayoshi Soken",
            "Sistema de progresión profundo con múltiples árboles de habilidades"
        ],
        releaseDate: "22 de junio de 2023",
        developer: "Square Enix",
        publisher: "Square Enix",
        rating: 4.7,
        thumbnails: [
            "/principal/pages/productos/ff16/ff16-screenshot-01.jpg",
            "/principal/pages/productos/ff16/ff16-screenshot-02.jpg",
            "/principal/pages/productos/ff16/ff16-screenshot-03.jpg",
            "/principal/pages/productos/ff16/ff16-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/gV5rIW1Qums",
        languages: "Audio en inglés y japonés, textos en español y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "plague-tale-requiem": {
        id: "plague-tale-requiem",
        name: "A Plague Tale: Requiem",
        price: "S/. 129.00",
        image: "/principal/img/juegos/1666099202-a-plague-tale-requiem-ps5-0.jpg",
        description: "A Plague Tale: Requiem es la secuela del aclamado A Plague Tale: Innocence. Continúa la desgarradora historia de Amicia y su hermano Hugo en un brutal mundo devastado por fuerzas sobrenaturales. Tras escapar de su hogar destruido, la pareja viaja al sur buscando un nuevo comienzo y una forma de controlar la maldición de Hugo, mientras son perseguidos por la Inquisición y enfrentan hordas de ratas que propagan la plaga.",
        category: "aventura",
        features: [
            "Narrativa emotiva y cinematográfica con personajes profundamente desarrollados",
            "Mecánicas de sigilo y supervivencia mejoradas",
            "Sistema de combate ampliado con nuevas armas y habilidades",
            "Entornos medievales detallados y visualmente impresionantes",
            "Tecnología de simulación de hordas de ratas sin precedentes",
            "Banda sonora atmosférica que refuerza la experiencia emocional"
        ],
        releaseDate: "18 de octubre de 2022",
        developer: "Asobo Studio",
        publisher: "Focus Entertainment",
        rating: 4.6,
        thumbnails: [
            "/principal/pages/productos/plague/plague-tale-requiem-screenshot-01.jpg",
            "/principal/pages/productos/plague/plague-tale-requiem-screenshot-02.jpg",
            "/principal/pages/productos/plague/plague-tale-requiem-screenshot-03.jpg",
            "/principal/pages/productos/plague/plague-tale-requiem-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/Y-Q5wHtguVU",
        languages: "Audio y textos en español, inglés, francés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 30 FPS"
    },
    "lies-of-p": {
        id: "lies-of-p",
        name: "Lies of P",
        price: "S/. 139.00",
        image: "/principal/img/juegos/1694703602-lies-of-p-ps5-0.jpg",
        description: "Lies of P es un soulslike que reimagina la historia de Pinocho en un oscuro mundo Belle Époque. Como P, una marioneta mecánica, deberás encontrar a tu creador Geppetto en la ciudad de Krat, una vez glamorosa pero ahora devastada por la locura y la sed de sangre. Con un sistema de combate desafiante y una narrativa que cambia según tus decisiones de mentir o decir la verdad, deberás sobrevivir en un mundo donde las marionetas se han rebelado contra la humanidad.",
        category: "accion",
        features: [
            "Combate exigente inspirado en los juegos soulslike con mecánicas únicas",
            "Sistema de armas modulares que permite personalizar tu estilo de lucha",
            "Mundo inspirado en la Belle Époque con estética retro-futurista",
            "Sistema de mentiras que afecta al desarrollo de la historia y los finales",
            "Jefes desafiantes con diseños inspirados en marionetas y autómatas",
            "Progresión de personaje profunda con múltiples builds posibles"
        ],
        releaseDate: "19 de septiembre de 2023",
        developer: "Round8 Studio",
        publisher: "Neowiz Games",
        rating: 4.5,
        thumbnails: [
            "/principal/pages/productos/liesp/lies-of-p-screenshot-01.jpg",
            "/principal/pages/productos/liesp/lies-of-p-screenshot-02.jpg",
            "/principal/pages/productos/liesp/lies-of-p-screenshot-03.jpg",
            "/principal/pages/productos/liesp/lies-of-p-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/eeW_MgCHvC8",
        languages: "Audio en inglés, textos en español y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "back-4-blood": {
        id: "back-4-blood",
        name: "Back 4 Blood Ultimate Edition",
        price: "S/. 119.00",
        image: "/principal/img/juegos/1634223602-back-4-blood-ultimate-edition-ps5-0.jpg",
        description: "Back 4 Blood es un emocionante shooter cooperativo en primera persona de los creadores de Left 4 Dead. Ambientado en un mundo post-apocalíptico infestado de infectados conocidos como 'Ridden', tú y tu equipo de 'Limpiadores' deberéis luchar para sobrevivir y reclamar el mundo. La Ultimate Edition incluye el juego base y todos los DLC, ofreciendo la experiencia completa con nuevos personajes, mapas y contenido adicional.",
        category: "accion",
        features: [
            "Campaña cooperativa para 4 jugadores con alta rejugabilidad",
            "Sistema de cartas único que modifica cada partida con diferentes desafíos y ventajas",
            "8 personajes jugables (Limpiadores) con habilidades y bonificaciones únicas",
            "Amplio arsenal de armas personalizables",
            "Modo PvP competitivo 'Enjambre' de 4v4",
            "Contenido adicional de la Ultimate Edition: expansiones, skins y objetos exclusivos"
        ],
        releaseDate: "12 de octubre de 2021",
        developer: "Turtle Rock Studios",
        publisher: "Warner Bros. Games",
        rating: 4.2,
        thumbnails: [
            "/principal/pages/productos/back4blood/back4blood-screenshot-01.jpg",
            "/principal/pages/productos/back4blood/back4blood-screenshot-02.jpg",
            "/principal/pages/productos/back4blood/back4blood-screenshot-03.jpg",
            "/principal/pages/productos/back4blood/back4blood-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/UMBgCcfJI_U",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1-4 jugadores (cooperativo online), 2-8 jugadores (PvP)",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "assassins-creed-valhalla": {
        id: "assassins-creed-valhalla",
        name: "Assassin's Creed Valhalla Deluxe",
        price: "S/. 109.00",
        image: "/principal/img/juegos/1605193202-assassins-creed-valhalla-gold-edition-ps5-0.jpg",
        description: "Assassin's Creed Valhalla te sumerge en la piel de Eivor, un feroz guerrero vikingo que lidera a su clan desde la gélida Noruega hasta un nuevo hogar en la Inglaterra del siglo IX. Deberás construir y expandir tu asentamiento, forjar alianzas, liderar incursiones y conquistar territorios en un mundo abierto ambientado en la época de los vikingos. La Edición Deluxe incluye el juego base y contenido adicional exclusivo.",
        category: "aventura",
        features: [
            "Mundo abierto masivo que abarca Noruega, Inglaterra y reinos mitológicos",
            "Sistema de combate brutal con doble empuñadura de armas",
            "Mecánicas de RPG profundas con múltiples árboles de habilidades",
            "Construcción y gestión de tu propio asentamiento vikingo",
            "Incursiones vikingos para obtener recursos y riquezas",
            "Contenido Deluxe: misión exclusiva, pack de asentamiento, conjunto de runas y más"
        ],
        releaseDate: "10 de noviembre de 2020",
        developer: "Ubisoft Montreal",
        publisher: "Ubisoft",
        rating: 4.4,
        thumbnails: [
            "/principal/pages/productos/acvalhalla/ac-valhalla-screenshot-01.jpg",
            "/principal/pages/productos/acvalhalla/ac-valhalla-screenshot-02.jpg",
            "/principal/pages/productos/acvalhalla/ac-valhalla-screenshot-03.jpg",
            "/principal/pages/productos/acvalhalla/ac-valhalla-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/ssrNcwxALS4",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS"
    },
    "assassins-creed-origins": {
        id: "assassins-creed-origins",
        name: "Assassin's Creed Origins Deluxe Edition",
        price: "S/. 99.00",
        image: "/principal/img/juegos/1509638402-assassins-creed-origins-deluxe-edition-ps4-0.jpg",
        description: "Assassin's Creed Origins te lleva al Antiguo Egipto, cuna de la civilización moderna y de la Hermandad de los Asesinos. Sigue la historia de Bayek, un protector de Egipto cuyo conflicto personal lo lleva a crear la organización que lucharía contra el poder y la opresión durante milenios. Explora un mundo abierto impresionante, desde desiertos hasta oasis exuberantes y las grandes ciudades del Egipto ptolemaico. La Edición Deluxe incluye contenido adicional exclusivo.",
        category: "aventura",
        features: [
            "Mundo abierto masivo que recrea el Antiguo Egipto con increíble detalle",
            "Sistema de combate renovado con mayor profundidad y estrategia",
            "Mecánicas de RPG con progresión de nivel y equipamiento",
            "Historia de origen de la Hermandad de los Asesinos",
            "Misiones secundarias con narrativas profundas y significativas",
            "Contenido Deluxe: misiones adicionales, atuendos, armas y monturas exclusivas"
        ],
        releaseDate: "27 de octubre de 2017",
        developer: "Ubisoft Montreal",
        publisher: "Ubisoft",
        rating: 4.5,
        thumbnails: [
            "/principal/pages/productos/acorigins/ac-origins-screenshot-01.jpg",
            "/principal/pages/productos/acorigins/ac-origins-screenshot-02.jpg",
            "/principal/pages/productos/acorigins/ac-origins-screenshot-03.jpg",
            "/principal/pages/productos/acorigins/ac-origins-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/cK4iAjzAoas",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS (PS5), 1080p a 30 FPS (PS4)"
    },
    "cyberpunk-2077": {
        id: "cyberpunk-2077",
        name: "Cyberpunk 2077",
        price: "S/. 119.00",
        image: "/principal/img/juegos/1607529602-cyberpunk-2077-ps4-0.jpg",
        description: "Cyberpunk 2077 es un RPG de acción en primera persona ambientado en Night City, una megalópolis obsesionada con el poder, el glamour y las modificaciones corporales. Juega como V, un mercenario fuera de la ley en busca de un implante único que permite alcanzar la inmortalidad. Personaliza el ciberequipo, habilidades y estilo de juego de tu personaje mientras exploras una ciudad inmensa donde las decisiones que tomes darán forma a la historia y al mundo que te rodea.",
        category: "rpg",
        features: [
            "Mundo abierto detallado y vivo con seis distritos distintos",
            "Historia ramificada con múltiples finales basados en tus decisiones",
            "Sistema de personalización profundo para tu personaje y estilo de juego",
            "Combate dinámico con armas convencionales y cibernéticas",
            "Implantes y mejoras corporales que desbloquean nuevas habilidades",
            "Vehículos conducibles para recorrer Night City"
        ],
        releaseDate: "10 de diciembre de 2020",
        developer: "CD Projekt RED",
        publisher: "CD Projekt",
        rating: 4.3,
        thumbnails: [
            "/principal/pages/productos/cyberpunk/cyberpunk-screenshot-01.jpg",
            "/principal/pages/productos/cyberpunk/cyberpunk-screenshot-02.jpg",
            "/principal/pages/productos/cyberpunk/cyberpunk-screenshot-03.jpg",
            "/principal/pages/productos/cyberpunk/cyberpunk-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/8X2kIfS6fb8",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS (PS5), 1080p (PS4)"
    },
    "witcher-3-wild": {
        id: "witcher-3",
        name: "The Witcher 3: Wild Hunt",
        price: "S/. 89.00",
        image: "/principal/img/juegos/1432220002-the-witcher-3-wild-hunt-ps4-0.jpg",
        description: "The Witcher 3: Wild Hunt es un RPG de mundo abierto ambientado en un universo de fantasía oscura. Encarna a Geralt de Rivia, un cazador de monstruos conocido como Witcher, y embárcate en una épica aventura para encontrar a Ciri, la hija adoptiva de Geralt perseguida por la temible Cacería Salvaje. Explora un mundo masivo lleno de ciudades, islas piratas, peligrosos pasos de montaña y cuevas olvidadas mientras tomas decisiones que tienen consecuencias significativas en el mundo y la historia.",
        category: "rpg",
        features: [
            "Mundo abierto masivo con regiones distintas y detalladas",
            "Sistema de combate táctico con espadas, signos (magia) y pociones",
            "Más de 100 horas de contenido con la historia principal y misiones secundarias",
            "Narrativa madura con decisiones morales complejas",
            "Caza de monstruos con investigación, preparación y estrategia",
            "Versión mejorada para PS5 con gráficos actualizados y tiempos de carga reducidos"
        ],
        releaseDate: "19 de mayo de 2015",
        developer: "CD Projekt RED",
        publisher: "CD Projekt",
        rating: 4.9,
        thumbnails: [
            "/principal/pages/productos/witcher3/witcher3-screenshot-01.jpg",
            "/principal/pages/productos/witcher3/witcher3-screenshot-02.jpg",
            "/principal/pages/productos/witcher3/witcher3-screenshot-03.jpg",
            "/principal/pages/productos/witcher3/witcher3-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/c0i88t0Kacs",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador",
        classification: "PEGI 18",
        resolution: "4K a 60 FPS (PS5), 1080p a 30 FPS (PS4)"
    },
    "red-dead-redemption-2": {
        id: "red-dead-redemption-2",
        name: "Red Dead Redemption 2",
        price: "S/. 129.00",
        image: "/principal/img/juegos/1540511602-red-dead-redemption-2-ps4-0.jpg",
        description: "Red Dead Redemption 2 es una épica historia del Salvaje Oeste americano. Ambientado en 1899, sigue a Arthur Morgan, un forajido y miembro de la banda de Dutch van der Linde, mientras intentan sobrevivir en los últimos días de la era del Oeste. Tras un atraco fallido, la banda debe huir y enfrentarse a agentes federales, cazarrecompensas y la presión de un mundo que cada vez deja menos espacio para los forajidos. Con un mundo abierto increíblemente detallado y una narrativa profunda, el juego ofrece una experiencia inmersiva sin precedentes.",
        category: "aventura",
        features: [
            "Mundo abierto masivo y vivo con ecosistemas y climas dinámicos",
            "Historia profunda y emotiva con personajes complejos",
            "Sistema de honor que afecta a cómo el mundo reacciona a tus acciones",
            "Actividades variadas: caza, pesca, póker, misiones secundarias y más",
            "Campamento de la banda que evoluciona según tus contribuciones",
            "Detalles realistas: desde el crecimiento de la barba hasta el mantenimiento de armas"
        ],
        releaseDate: "26 de octubre de 2018",
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        rating: 4.9,
        thumbnails: [
            "/principal/pages/productos/rdr2/rdr2-screenshot-01.jpg",
            "/principal/pages/productos/rdr2/rdr2-screenshot-02.jpg",
            "/principal/pages/productos/rdr2/rdr2-screenshot-03.jpg",
            "/principal/pages/productos/rdr2/rdr2-screenshot-04.jpg"
        ],
        trailer: "https://www.youtube.com/embed/eaW0tYpxyp0",
        languages: "Audio y textos en español, inglés y más idiomas",
        players: "1 jugador (multijugador online con Red Dead Online)",
        classification: "PEGI 18",
        resolution: "4K a 30 FPS (PS4 Pro), 1080p a 30 FPS (PS4)"
    }
}

// Exportar los datos para usarlos en otros archivos
if (typeof module !== 'undefined') {
    module.exports = { productsData };
} else {
    // Para uso en navegador
    window.productsData = productsData;
}