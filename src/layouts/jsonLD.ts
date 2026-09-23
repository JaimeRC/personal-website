import { personal } from '../data/images.json'
import { getI18N } from "../i18n/utils.ts";
import type { JsonLD, Work, Company } from "../types";

export const getJsonLD = (lang: string, canonical: string, meta?: { title?: string; description?: string }) => {
    const { jsonLD, about, skills, experiences, educations } = getI18N(lang)
    const { webPage } = jsonLD as JsonLD
    const { location } = about

    const fullName = `${about.name} ${about.surname}`
    const personId = `${canonical}/#person`
    const websiteId = `${canonical}/#website`
    const pageUrl = lang === 'en' ? `${canonical}/en/` : `${canonical}/`
    const pageId = `${pageUrl}#webpage`
    const nowIso = new Date().toISOString()

    // Mapeo de los identificadores de skill (campo `image`, estable) a los
    // nombres canónicos de las tecnologías para el Knowledge Graph.
    const CANONICAL_SKILLS: Record<string, string> = {
        javascript: 'JavaScript',
        typescript: 'TypeScript',
        html: 'HTML',
        java: 'Java',
        go: 'Go',
        nodejs: 'Node.js',
        reactjs: 'React',
        docker: 'Docker',
        redisdb: 'Redis',
        mongodb: 'MongoDB',
        git: 'Git',
    }
    const knowsAbout = (skills as Array<{ skill: string; image: string }>)
        .map((s) => CANONICAL_SKILLS[s.image] ?? s.skill)

    // Empresa actual -> worksFor.
    const currentWork = (experiences.works as Work[]).find((w) => w.isActive)
    const worksFor = currentWork
        ? [{ '@type': 'Organization', name: currentWork.company }]
        : undefined

    // Formación -> alumniOf (con website cuando existe).
    const alumniOf = (Object.values(educations) as Company[]).map((c) => ({
        '@type': 'EducationalOrganization',
        name: c.name,
        ...(c.website ? { sameAs: c.website } : {}),
    }))

    const imageObject = {
        '@type': 'ImageObject',
        url: `${canonical}${personal}`,
        caption: fullName,
    }

    const person = {
        '@type': 'Person',
        '@id': personId,
        name: fullName,
        alternateName: 'Jaime RC',
        url: canonical,
        mainEntityOfPage: { '@id': pageId },
        image: imageObject,
        jobTitle: about.profession,
        description: about.description,
        knowsLanguage: ['es', 'en'],
        knowsAbout,
        address: {
            '@type': 'PostalAddress',
            addressLocality: location.locality,
            addressRegion: location.region,
            addressCountry: location.countryCode,
        },
        ...(worksFor ? { worksFor } : {}),
        alumniOf,
        sameAs: [
            'https://github.com/JaimeRC',
            'https://www.linkedin.com/in/jaimerubiocaballero/',
            'https://es.stackoverflow.com/users/100834/planta4',
        ],
    }

    const website = {
        '@type': 'WebSite',
        '@id': websiteId,
        url: canonical,
        name: fullName,
        inLanguage: ['es', 'en'],
        publisher: { '@id': personId },
        author: { '@id': personId },
    }

    const webpage = {
        '@type': 'WebPage',
        '@id': pageId,
        url: pageUrl,
        // Coherente con el <title>/meta description reales de la página;
        // fallback a los textos del i18n si no se pasan.
        name: meta?.title ?? webPage.name,
        description: meta?.description ?? webPage.description,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        primaryImageOfPage: imageObject,
        datePublished: nowIso,
        dateModified: nowIso,
    }

    // Grafo único enlazado por @id: Google entiende que las entidades se relacionan.
    return {
        graph: {
            '@context': 'https://schema.org',
            '@graph': [person, website, webpage],
        },
    }
}
