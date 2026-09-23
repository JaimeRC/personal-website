import type { APIRoute } from 'astro';
import { getI18N } from '../i18n/utils';
import { LANG } from '../i18n';
import type { Work, Company } from '../types';

const SITE = import.meta.env.SITE ?? 'https://jaimerc.es';
const origin = new URL(SITE).origin;

/**
 * Fichero llms.txt siguiendo la propuesta de https://llmstxt.org
 *
 * Ofrece a los modelos de lenguaje y buscadores con IA un resumen
 * estructurado en Markdown del sitio. El contenido se genera de forma
 * dinámica a partir de los datos de i18n para mantenerse sincronizado.
 */
const buildLlmsTxt = (): string => {
    const { about, skills, experiences, educations, interests } = getI18N(LANG.SPANISH);

    const fullName = `${about.name} ${about.surname}`;
    const { locality, region, country } = about.location;
    const locationLabel = `${locality}, ${region} (${country})`;
    const skillList = (skills as Array<{ skill: string }>).map((s) => s.skill).join(', ');

    const works = experiences.works as Work[];
    const experienceLines = works
        .map((w) => `- ${w.title} — ${w.company} (${w.from} - ${w.to ?? 'actualidad'})`)
        .join('\n');

    const companies = Object.values(educations) as Company[];
    const educationLines = companies
        .map((c) => `- ${c.name} (${c.city})`)
        .join('\n');

    const interestList = (interests.hobbies as Array<{ title: string }>)
        .map((h) => h.title)
        .join(', ');

    return `# ${fullName} — ${about.profession}

> Sitio web personal de ${fullName}, ${about.profession} con base en ${locationLabel}, especializado en JavaScript, TypeScript, Node.js, React y AWS. El sitio recoge su perfil profesional, experiencia laboral, formación e intereses, disponible en español e inglés.

## Perfil

- **Nombre:** ${fullName}
- **Rol:** ${about.profession}
- **Ubicación:** ${locationLabel}
- **Tecnologías:** ${skillList}
- **Aficiones:** ${interestList}

${about.description}

## Páginas

- [Inicio (Español)](${origin}/): Perfil, experiencia, formación e intereses en español
- [Home (English)](${origin}/en/): Profile, work experience, education and interests in English

## Experiencia profesional

${experienceLines}

## Formación

${educationLines}

## Enlaces

- [GitHub](https://github.com/JaimeRC)
- [LinkedIn](https://www.linkedin.com/in/jaimerubiocaballero/)
- [Stack Overflow](https://es.stackoverflow.com/users/100834/planta4)
- [Sitemap](${origin}/sitemap-index.xml)
`;
};

export const GET: APIRoute = () => {
    return new Response(buildLlmsTxt(), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
