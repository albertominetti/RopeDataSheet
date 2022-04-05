# rope-data-sheet

This standalone application generates a PDF file based on the data provided in the related form.

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

