# Curso intermedio/avanzado de modelación de la amenaza sísmica

[![Publicar sitio estático en GitHub Pages](https://github.com/julgp70/curso-amenaza-sismica/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/julgp70/curso-amenaza-sismica/actions/workflows/deploy-pages.yml)

Repositorio público del sitio web informativo del curso **Modelación de la amenaza sísmica con herramientas de código abierto**, de nivel intermedio/avanzado y con caso de estudio centrado en La Española.

**Sitio web:** https://julgp70.github.io/curso-amenaza-sismica/

## Finalidad

El sitio presenta una propuesta de formación aplicada orientada a fortalecer capacidades para diseñar, construir, implementar, calcular, revisar e interpretar modelos de amenaza sísmica utilizando principalmente OQ-MBTK, OpenQuake Engine, Python, QGIS e IRMT.

El formulario enlazado desde el sitio recoge únicamente manifestaciones de interés. No constituye matrícula, reserva, oferta contractual ni obligación de pago.

## Alcance de este repositorio

Este repositorio contiene **exclusivamente los archivos estáticos necesarios para publicar el sitio mediante GitHub Pages**.

No contiene fuentes de construcción, plantillas, datos internos, scripts de desarrollo, documentación operativa privada, listas de contactos, respuestas del formulario, credenciales, claves ni secretos.

## Estructura

```text
.github/workflows/deploy-pages.yml   Publicación automática en GitHub Pages
css/styles.css                       Estilos del sitio
icons/favicon.svg                    Favicon
images/                              Imágenes públicas
js/script.js                         Interacciones del sitio
index.html                           Página principal
aviso-legal.html                     Aviso legal
privacidad-y-cookies.html            Política de privacidad y cookies
propiedad-intelectual-y-licencias.html
.nojekyll                            Desactiva el procesamiento de Jekyll
```

## Publicación

La publicación se realiza automáticamente mediante GitHub Actions cuando se hace `push` a la rama `main`. El workflow comprueba los archivos requeridos, bloquea elementos propios del repositorio de desarrollo, prepara el artefacto estático y publica el sitio en GitHub Pages.

Este repositorio no requiere instalación de dependencias ni proceso de compilación.

## Procedimiento de actualización

Las modificaciones se preparan y validan en el entorno privado de desarrollo. Después se genera la versión estática final, se revisan las diferencias, se sincronizan únicamente los archivos públicos y se realiza el `commit` y el `push` a `main`.

No deben incorporarse datos personales, archivos de trabajo, documentación interna ni materiales que no estén destinados a publicación.

## Privacidad y aspectos legales

El código propio del sitio no utiliza cookies de analítica, publicidad o perfilado. El formulario de interés se gestiona mediante Google Forms, un servicio externo sujeto a sus propias políticas.

- [Privacidad y cookies](https://julgp70.github.io/curso-amenaza-sismica/privacidad-y-cookies.html)
- [Aviso legal](https://julgp70.github.io/curso-amenaza-sismica/aviso-legal.html)
- [Propiedad intelectual y licencias](https://julgp70.github.io/curso-amenaza-sismica/propiedad-intelectual-y-licencias.html)

## Propiedad intelectual

Salvo indicación expresa, la publicación de este repositorio no concede una licencia general para reutilizar, redistribuir o explotar sus contenidos.

OQ OpenQuake y GEM Global Earthquake Model son marcas registradas de GEM Foundation. Las herramientas, marcas y recursos de terceros conservan sus respectivas titularidades y licencias. Este curso es una iniciativa independiente y no está organizado, patrocinado, avalado ni certificado por GEM Foundation.

## Responsable

**Dr. Julio Antonio García Peláez**  
Consultor internacional  
Especialista senior en amenaza y riesgo sísmico
