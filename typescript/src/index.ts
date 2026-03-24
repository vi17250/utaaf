import { join } from "path";

const packagePath = join(process.cwd(), "package.json");
const packageInfo = require(packagePath);

export const html = `
<!DOCTYPE html>
<html>

<head>
    <title>Le titre de ma page HTML</title>
    <link rel="icon" type="image/x-icon" href="https://docs.nestjs.com/favicon.ico/">
    <style>
        h3 {
            margin-top: 50px;
        }
    </style>
</head>

<body>
    <h1>Utaaf 🐣</h1>
    <div>
        <h3>How to use me:</h3>
        <p>
            <ul>
                <li>
                    Paste a image url* (e.g. 
                    <a href="https://git-scm.com/images/logos/logomark-orange@2x.png" target="_blank">
                        https://git-scm.com/images/logos/logomark-orange@2x.png)
                    </a>
                </li>
                <li>
                    Choose a scale, from the most precise to the coarsest
                </li>
                <li>
                    Click on submit, it will download a text file containing the Ascii format of the image
                </li>
            </ul>
            <em>*Accepted formats: jpg | png | webp</em>
        </p>
    </div>
    <div>
    <h3>Fill out the form bellow to get started</h3>
        <form action="/" method="post">
            <p>
                <label for="url">URL:</label>
                <input type="text" id="url" name="url"/>
            </p>
            <p>
            <label for="resolution">Resolution (between 1 and 10)</label>
            <select name="resolution" id="resolution">
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    </div>
    <footer>
    <p>Version: <em>${packageInfo.version}</em> | <em>${packageInfo.license} License</em></p>
    </footer>
</body>

</html>`;
