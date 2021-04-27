# Remote Cookie Example

La idea de este repositorio es mostrar como generar un API que nos permita establecer desde un dominio A una cookie en un dominio B, llamando a una URL un subdominio de dicho dominio.

El problema general surge cuando, en uno de nuestros productos queremos establecer una Cookie para dar acceso a un usuario a los contenidos de un CDN de CloudFront situados en otro dominio (digamos cdn.sample.com) para lo que crearemos un api (api.sample.com) al que invocaremos desde el site (main.com).

El proyecto actual contiene el servidor Web que estará alojado en cdn.sample.com para permitir esto.
