import { join } from "path";

const packagePath = join(process.cwd(), "package.json");
const packageInfo = require(packagePath);

export const html = `
<!DOCTYPE html>
<html>

<head>
    <title>Le titre de ma page HTML</title>
    <link rel="icon" type="image/x-icon" href="https://docs.nestjs.com/favicon.ico/">
</head>

<body>
    <h1>utaaf 🐣</h1>
    <h2>Url To Ascii Art Format</h2>
    <form action="/" method="post">
        <p>
            <label for="url">Enter a image URL:</label>
            <input type="text" id="url" name="url"/>
        </p>
        <p>
            <label for="resolution">Resolution (between 1 and 10)</label>
            <input type="number" id="resolution" name="resolution" min="2" max="10" value="2"/>
        </p>
        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    <footer>
    <p>Version: <em>${packageInfo.version}</em></p>
    </footer>
</body>

</html>`;
