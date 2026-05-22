<p align="center">
  <img src="./logo.png" width="220" alt="Converter File" />
</p>

<h1 align="center">Converter File</h1>

<p align="center">
  API REST para conversão de áudio, vídeo, imagem e documentos — construída com Node.js, Express e TypeScript.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D16-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/typescript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/express-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" />
</p>

---

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando](#executando)
- [Documentação da API](#documentação-da-api)
- [Formatos suportados](#formatos-suportados)
- [Erros](#erros)
- [Docker](#docker)
- [Scripts](#scripts)
- [Licença](#licença)

---

## Sobre

**Converter File** é uma API HTTP que recebe arquivos via `multipart/form-data`, converte para o formato desejado e grava o resultado em pastas temporárias no servidor. O processamento utiliza:

| Tipo        | Biblioteca / ferramenta   |
| ----------- | ------------------------- |
| Áudio/Vídeo | [FFmpeg](https://ffmpeg.org/) (`fluent-ffmpeg`) |
| Imagem      | [Sharp](https://sharp.pixelplumbing.com/) |
| Documento   | [LibreOffice](https://www.libreoffice.org/) (`libreoffice-convert`) |

Todas as rotas de conversão estão sob o prefixo **`/v1`**.

---

## Funcionalidades

- Conversão de **áudio**, **vídeo**, **imagem** e **documento**
- Upload via Multer com validação de MIME type
- Documentação interativa com **Swagger UI**
- Logs estruturados com **Pino**
- Tratamento centralizado de erros
- Suporte a execução local e via **Docker**

---

## Stack

- **Runtime:** Node.js 16+
- **Framework:** Express 4
- **Linguagem:** TypeScript
- **Validação:** Yup
- **DI:** TSyringe
- **Testes:** Jest + Supertest

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 16 ou superior
- [Yarn](https://yarnpkg.com/) ou npm
- **LibreOffice** instalado no sistema (obrigatório para conversão de documentos)
- FFmpeg (incluído via `@ffmpeg-installer/ffmpeg` para áudio e vídeo)

---

## Instalação

```bash
git clone https://github.com/Ricardo-1976/Converter-File.git
cd Converter-File
yarn install
# ou: npm install
```

Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

---

## Configuração

| Variável            | Descrição              | Padrão  |
| ------------------- | ---------------------- | ------- |
| `PORT`              | Porta do servidor HTTP | `3331`  |
| `POSTGRES_*`        | Configuração PostgreSQL (reservado para evoluções futuras) | — |

Exemplo mínimo em `.env`:

```env
PORT=3331
```

---

## Executando

### Desenvolvimento

```bash
yarn dev
```

### Produção

```bash
yarn build
yarn start
```

A API ficará disponível em `http://localhost:3331` (ou na porta definida em `PORT`).

---

## Documentação da API

### Base URL

```
http://localhost:3331/v1
```

### Health check

Verifica se a API está em execução.

```http
GET /v1/
```

**Resposta (200)**

```json
{
  "summary": "Converter File",
  "version": "1.0.0",
  "status": "Running on Development",
  "origin": "RICARDO - Development"
}
```

### Swagger UI

Interface interativa da documentação OpenAPI:

```
http://localhost:3331/v1/api-docs
```

---

### Conversão de áudio

```http
POST /v1/music?to={formato}
Content-Type: multipart/form-data
```

| Campo  | Tipo | Obrigatório | Descrição        |
| ------ | ---- | ----------- | ---------------- |
| `music` | file | Sim         | Arquivo de áudio |

**Exemplo — cURL**

```bash
curl -X POST "http://localhost:3331/v1/music?to=mp3" \
  -F "music=@/caminho/para/audio.wav"
```

**Resposta:** `201 Created` (corpo vazio). O arquivo convertido é salvo em `./tmp/music/`.

---

### Conversão de vídeo

```http
POST /v1/video?to={formato}
Content-Type: multipart/form-data
```

| Campo  | Tipo | Obrigatório | Descrição        |
| ------ | ---- | ----------- | ---------------- |
| `video` | file | Sim         | Arquivo de vídeo |

**Exemplo — cURL**

```bash
curl -X POST "http://localhost:3331/v1/video?to=mp4" \
  -F "video=@/caminho/para/video.avi"
```

**Resposta:** `201 Created`. Arquivo de saída em `./tmp/video/`.

---

### Conversão de imagem

```http
POST /v1/image?to={formato}
Content-Type: multipart/form-data
```

| Campo  | Tipo | Obrigatório | Descrição        |
| ------ | ---- | ----------- | ---------------- |
| `image` | file | Sim         | Arquivo de imagem |

**Exemplo — cURL**

```bash
curl -X POST "http://localhost:3331/v1/image?to=png" \
  -F "image=@/caminho/para/foto.jpeg"
```

**Resposta:** `201 Created`. Arquivo de saída em `./tmp/image/`.

---

### Conversão de documento

```http
POST /v1/doc?to={formato}
Content-Type: multipart/form-data
```

| Campo | Tipo | Obrigatório | Descrição           |
| ----- | ---- | ----------- | ------------------- |
| `doc` | file | Sim         | Arquivo de documento |

**Exemplo — cURL**

```bash
curl -X POST "http://localhost:3331/v1/doc?to=pdf" \
  -F "doc=@/caminho/para/documento.docx"
```

**Resposta:** `201 Created`. Arquivo de saída em `./tmp/doc/`.

> **Nota:** A conversão de áudio e vídeo é assíncrona (FFmpeg). A resposta `201` indica que o processo foi iniciado; o arquivo final aparece na pasta `tmp` correspondente após a conclusão.

---

### Parâmetro `to`

Query string **obrigatória** em todas as rotas de conversão. Define o formato de saída (sem ponto). Valores inválidos retornam erro `400`.

---

## Formatos suportados

### Áudio (`POST /v1/music`)

| Saída (`to`) | MIME types de entrada aceitos |
| ------------ | ----------------------------- |
| `mp3`        | `audio/mpeg`, `audio/wave`, `audio/ogg`, `audio/x-flac`, `video/mp4` |
| `wav`        | idem |
| `ogg`        | idem |
| `flac`       | idem |

### Vídeo (`POST /v1/video`)

| Saída (`to`) | MIME types de entrada |
| ------------ | --------------------- |
| `mp4`        | `video/mp4`, `video/x-msvideo`, `video/x-matroska`, `video/quicktime`, `video/x-flv` |
| `avi`        | idem |
| `mkv`        | idem |
| `mov`        | idem |
| `flv`        | idem |

### Imagem (`POST /v1/image`)

| Saída (`to`) | MIME types de entrada |
| ------------ | --------------------- |
| `jpeg`       | `image/jpeg`, `image/png`, `image/bmp`, `image/gif`, `image/tiff`, `image/webp`, `image/svg+xml` |
| `png`        | idem |
| `gif`        | idem |
| `bmp`        | idem |
| `tiff`       | idem |
| `webp`       | idem |
| `svg`        | idem |

### Documento (`POST /v1/doc`)

| Saída (`to`) | MIME types de entrada |
| ------------ | --------------------- |
| `pdf`        | `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.oasis.opendocument.text`, `text/plain`, `application/rtf` |
| `doc`        | idem |
| `docx`       | idem |
| `odt`        | idem |
| `txt`        | idem |
| `rtf`        | idem |

---

## Erros

Respostas de erro seguem o formato:

```json
{
  "message": "Descrição do erro"
}
```

| Status | Mensagem | Causa |
| ------ | -------- | ----- |
| `400`  | `Format not supported!` | Valor de `to` não está na lista de formatos |
| `400`  | `The file is not compatible!` | MIME type do arquivo não é aceito |
| `500`  | `Internal server error - ...` | Falha inesperada no servidor |

---

## Docker

```bash
docker build -t converter-file .
docker run -p 3331:3331 converter-file
```

A imagem expõe a porta **3331** e executa `node ./build/shared/server.js`.

> Para conversão de documentos no container, instale o LibreOffice na imagem Docker conforme a necessidade do seu ambiente.

---

## Scripts

| Comando              | Descrição                          |
| -------------------- | ---------------------------------- |
| `yarn dev`           | Servidor em modo desenvolvimento   |
| `yarn build`         | Compila TypeScript via Babel       |
| `yarn start`         | Inicia servidor de produção        |
| `yarn test`          | Executa testes com Jest            |
| `yarn lint`          | Verifica código com ESLint         |
| `yarn lint-fix`      | Corrige problemas de lint          |
| `yarn prettier-format` | Formata arquivos `.ts`           |

---

## Estrutura do projeto

```
src/
├── config/          # Upload, logger, variáveis de ambiente
├── docs/            # Especificação OpenAPI / Swagger
├── modules/app/     # Rotas, controllers e use cases
├── shared/          # App Express, servidor e rotas base
└── utils/           # Helpers de arquivo e versão da API
```

---

## Licença

Este projeto está sob a licença [MIT](LICENSE). Copyright © 2023 Ricardo João António.
