import { LANG } from "./index.ts";

export const showDefaultLang = false;

export const ui = {
    [LANG.SPANISH]: {
        'lang.es':'Español',
        'lang.en':'Inglés',
        'meta.title': 'Jaime Rubio — Desarrollador Full Stack | JavaScript, Node.js, React y AWS',
        'meta.description': 'Jaime Rubio, desarrollador Full Stack en Málaga especializado en JavaScript, TypeScript, Node.js, React y AWS. Descubre mi experiencia, formación y proyectos.',
        'nav.brand': 'Jaime Rubio',
        'footer.brand': 'Jaime Rubio',
        'welcome.title':'Hola, soy',
        'welcome.subtitle':'Desarrollador Full Stack. Construyo productos web de principio a fin.',
        'about.me': 'Sobre mí',
        'about.profession':'Full Stack Developer',
        'about.description': 'Desarrollador curioso al que le apasionan los retos y el aprendizaje continuo. Me interesan especialmente la arquitectura de software, el rendimiento, los patrones de diseño y la calidad del código, siempre guiado por las buenas prácticas. Soy una persona proactiva, dinámica y cercana, que disfruta trabajando en equipo.'
    },
    [LANG.ENGLISH]: {
        'lang.es':'Spanish',
        'lang.en':'English',
        'meta.title': 'Jaime Rubio — Full Stack Developer | JavaScript, Node.js, React & AWS',
        'meta.description': 'Jaime Rubio, Full Stack developer based in Málaga specialized in JavaScript, TypeScript, Node.js, React and AWS. Explore my experience, education and projects.',
        'nav.brand': 'Jaime Rubio',
        'footer.brand': 'Jaime Rubio',
        'welcome.title':"Hi, I'm",
        'welcome.subtitle':"Full Stack Developer. I build web products from start to finish.",
        'about.me': 'About me',
        'about.profession':'Full Stack Developer',
        'about.description': "A curious developer who loves challenges and continuous learning. I'm especially interested in software architecture, performance, design patterns and code quality, always driven by best practices. I'm a proactive, dynamic and approachable person who enjoys working as part of a team."
    },
} as const;