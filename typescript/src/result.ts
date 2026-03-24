import { Result } from "./images/types";

export function render(values: Result): string {
    return `
<!DOCTYPE html>
<html>
<body>
    <h1>Utaaf 🐣</h1>
    <p>Image <strong>${values.name}</strong> traitée</p>
    <p>Fichier <strong>${values.name}.txt</strong> téléchargé</p>
    <p>Taille de l'image originale: ${values.originalSize.width} * ${values.originalSize.height}</p>
    <p>Taille de l'image ascii: ${values.asciiSize.width} * ${values.asciiSize.height}</p>
    <p>Résolution: ${values.resolution}</p>
    <p>Nombre de pixels traités: ${values.pixelsProcessed}</p>
    </body>
    <script>
        window.location.href = '/files/${values.name}/download';
      </script>

</html>`;
}
