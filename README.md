# Christina Schultz

The website for artist and performer Christina Schultz using 

[![Build Status](https://travis-ci.org/FctsFxns/schultzen-web.png)](https://travis-ci.org/FctsFxns/schultzen-web)



## Tech stack

The application backend is [Jekyll](http://jekyllrb.com/), an application written in the Ruby language using the Ruby on Rails framework. I've added Bundle to manage the dependencies if you need a development environment.

Frontend tools used include LESS over Bootstrap for the styles, [Bower](http://bower.io/) for the javascript dependencies and [Grunt](http://gruntjs.com/) for the tasks.

The testing and deployment of changes is made throught [Travis](http://travis-ci.org/) with our own recipe.

The site is currently hosted in [Hetzner](https://www.hetzner.de/) and their datacenter are located in Nuremberg and in Falkenstein/Vogtland.

## ¿Cómo gestionar el contenido del sitio web?

@todo 

- media
- _data
- _includes
- _works

### 01. Carpeta 'media'

En esta carpeta están los materiales media que vamos emplear en la web: imágenes, pdf's, …


### 02. Carpeta '_data'

En la carpeta '_data' se encuentran una serie de ficheros de tipo YML que nos permitirán gestionar algunos contenidos del website.

#### Parámetros generales

- **nav.yml**: con los enlaces de la navegación principal
- **global.yml**: con los valores y textos de algunas secciones del sitio web.

> Desde aquí puedes cambiar cosas como el texto al pie de la página o los enlaces a los PDF's.

#### Parametros de la sección Bio

Encontrarás una serie de ficheros para gestionar los contenidos de la [sección Bio](http://www.christinaschultz.com/bio) del sitio web.

- Awards, Grants & Residencies
- Performatic talks, Presentations & Conferences
- Solo Exhibitions
- Group Exhibitions
- Workshops & Directed Activities
- Art education
- Professional education
- People I owe a lot 

#### Parametros de la sección About

Encontrarás una serie de ficheros para gestionar los contenidos de la [sección About](http://www.christinaschultz.com/about) del sitio web.

- Publications & Catalogs
- Interviews & Articles
- More Press


### 03. Carpeta '_includes'

##### ¿Cómo cambiamos el texto del statement y de la bio?

Estos dos textos se encuentran en un sitio un poco especial.

Concretamente en la carpeta _includes/

Puedes usar un editor de Markdown para cambiar el contenido de estos textos.



## Instalación

### Dependencias

- Ruby y Bundle
- Bower
- Grunt


sh bin/setup

Then 

> grunt --help
> 
> grunt build
> 
> grunt theming


## Development varibles

Use this variables to take advantadge of livereload.

> export JEKYLL_ENV=development


