# FocusFlow — Productivity Dashboard

Sistema de produtividade pessoal com Dashboard, Calendário e gerenciador de Tarefas, construído com **Bootstrap 5.3**, **Sass (SCSS)** e **JavaScript** puro.

🔗 **Site publicado:** _[adicionar link do GitHub Pages aqui]_
🎥 **Vídeo demonstrativo:** _[adicionar link do YouTube (não listado) aqui]_

---

## 📋 Sobre o Projeto

O FocusFlow é um painel de produtividade inspirado no design **Material You**, com suporte a tema claro/escuro, totalmente responsivo (mobile-first), composto por três páginas:

- **Dashboard** (`index.html`) — visão geral com estatísticas, tarefas do dia, previsão do tempo e mapa de atividade.
- **Calendar** (`calendar.html`) — visualização mensal de eventos e compromissos.
- **Tasks** (`tasks.html`) — CRUD completo de tarefas com prioridade, data/horário e histórico de ações.

---

## 🗂️ Estrutura de Pastas

```
focusflow/
├── index.html              # Página Dashboard
├── calendar.html           # Página Calendário
├── tasks.html               # Página Tarefas
│
├── src/                     # Código-fonte (editável)
│   ├── scss/
│   │   ├── _variables.scss  # Design tokens (cores, fontes, breakpoints)
│   │   ├── _mixins.scss     # Mixins reutilizáveis (dark mode, cards, badges...)
│   │   ├── style.scss       # Estilos compartilhados entre páginas
│   │   ├── calendar.scss    # Estilos exclusivos do calendário
│   │   └── tasks.scss       # Estilos exclusivos de tarefas
│   └── js/
│       ├── script.js        # Lógica do Dashboard
│       ├── calendar.js      # Lógica do Calendário
│       └── tasks.js         # Lógica de Tarefas (CRUD, histórico, localStorage)
│
├── public/                  # Arquivos compilados/servidos no navegador
│   ├── css/                 # CSS gerado a partir de src/scss (via Sass)
│   └── js/                  # Cópia dos arquivos JS prontos para uso
│
├── assets/
│   └── images/               # Imagens do projeto
│
├── package.json              # Dependências e scripts NPM
├── .eslintrc.json             # Regras do ESLint
├── .prettierrc.json           # Regras do Prettier
├── .gitignore
└── README.md
```

---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior) e NPM instalados.

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/focusflow.git
cd focusflow

# 2. Instale as dependências
npm install

# 3. Compile o SCSS para CSS
npm run sass:build

# 4. Abra o index.html no navegador
# (ou use a extensão "Live Server" do VS Code)
```

### Scripts disponíveis

| Comando               | O que faz                                                        |
|------------------------|-------------------------------------------------------------------|
| `npm run sass:build`   | Compila todos os arquivos `.scss` de `src/scss` para `public/css` |
| `npm run sass:watch`   | Compila automaticamente sempre que um `.scss` é salvo             |
| `npm run lint`         | Verifica problemas no JavaScript com ESLint                       |
| `npm run lint:fix`     | Corrige automaticamente o que for possível                        |
| `npm run format`       | Formata JS, SCSS e HTML com Prettier                               |
| `npm run build`        | Roda build completo: Sass + Lint + Format                          |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico
- **Bootstrap 5.3.3** (grid, flexbox, componentes, modal)
- **Sass (SCSS)** — variáveis, mixins, partials (`@use`)
- **JavaScript (ES6+)** vanilla — sem frameworks
- **Material Symbols** (ícones)
- **LocalStorage** — persistência de tarefas e histórico no navegador
- **ESLint** + **Prettier** — padronização e qualidade de código

---

## ✅ Checklist da Avaliação

### RA1 — Frameworks CSS para estilização e layouts responsivos

- [x] **ID 02** — Layout responsivo com Bootstrap 5 usando Flexbox/Grid (`row`, `col-*`, `d-flex`, breakpoints `d-md-*`, `d-xl-*`).
- [x] **ID 03** — Layout responsivo com CSS puro (Flexbox e Grid) em `style.scss`, `calendar.scss` e `tasks.scss` (ex.: `.calendar-grid`, `.heatmap-grid`).
- [x] **ID 04** — Componentes prontos do Bootstrap: cards, badges, botões, e o componente JavaScript **Modal** (`bootstrap.Modal`) usado na criação/edição de tarefas.
- [x] **ID 05** — Unidades relativas (`rem`, `vh`, `%`, `vw`) usadas em todo o projeto no lugar de `px` fixos (ex.: `$sidebar-width: 17.5rem`, `height: calc((100vh - 280px) / 5)`).
- [x] **ID 07** — Sass (SCSS) com variáveis (`_variables.scss`), mixins (`_mixins.scss`) e módulos (`@use`) para modularizar o código.
- [x] **ID 08** — Tipografia responsiva com `clamp()` (ex.: `.page-title`, `.stat-number`, `.cal-header-title`) e media queries mobile-first (`@include from($bp-lg)`).
- [x] **ID 09** — Responsividade de imagens com `object-fit: cover` (avatar e banner) dentro de containers com unidades relativas (`aspect-ratio`, `rem`).
- [x] **ID 10** — Otimização de imagens com formato moderno **WebP** via `<picture>` + `<source type="image/webp">`, e carregamento adaptativo com `srcset`/`sizes`.

### RA3 — Ferramentas para otimização do processo de desenvolvimento

- [x] **ID 15** — Ambiente configurado com Node.js e NPM (`package.json`, `npm install`, scripts de build).
- [x] **ID 16** — Boas práticas de Git/GitHub: `.gitignore` configurado, commits organizados, branch `main`.
- [x] **ID 17** — README.md padronizado com checklist preenchido (este arquivo).
- [x] **ID 18** — Organização modular de arquivos (`src/`, `public/`, `assets/`, separação por tipo e por página).
- [x] **ID 19** — ESLint (`.eslintrc.json`) e Prettier (`.prettierrc.json`) configurados para padronização do código JS/SCSS/HTML.

---

## 👤 Autor

**José** — Projeto desenvolvido para a disciplina de Programação Web.
