# rope-data-sheet

This standalone application generates a PDF file based on the data provided in the related form.

[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)

## Demo and details

The single page app allows generating a quality declaration PDF document for selling goods with automatic calculation of dimensions and weight using a preloaded database of ropes specifications. It uses modern technologies such as the auto-completion for searching the good type, auto creation and preview of the PDF document, auto signature (if required), deploy pipeline for preview and production and a simple way to change the configuration in the production environment.

The non productive demo is available on [vercel](https://rope-data-sheet.vercel.app/) as a preview.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

In order to configure the company data, you have to include a json file named `company-profile.json` that contains the data of the issuer company like the following:

```json
{
  "name": "Sample company GmbH",
  "email": "info@example.com",
  "web": "www.example.com",
  "address": "Liberty Island, New York 10004, United States",
  "place": "New York",
  "phone": "(+1) 555 503 3265"
}
```

If you prefer to have the signature applied in automatic way, consider to include a file `signature.png` with transparent background in the same folder.

The configuration folder is `static/data/`.

