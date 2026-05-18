# Weiva — React + Vite

Projeto original convertido de HTML/CSS/JS vanilla para **React + Vite** com React Router DOM.

## Estrutura

```
src/
 ├── components/
 │   ├── Carousel.jsx / .css       → Carrossel hero animado
 │   ├── CepModal.jsx / .css       → Modal de CEP com ViaCEP API
 │   ├── Header.jsx / .css         → Header responsivo + menu mobile
 │   ├── NavMobileBottom.jsx       → Barra de navegação mobile inferior
 │   └── ProductCard.jsx / .css    → Card de produto reutilizável
 ├── contexts/
 │   ├── CartContext.jsx            → Estado global do carrinho
 │   └── CepContext.jsx             → Estado global do CEP
 ├── pages/
 │   ├── HomePage.jsx / .css       → Página inicial
 │   ├── LoginPage.jsx / .css      → Login / Cadastro
 │   ├── CartPage.jsx / .css       → Carrinho de compras
 │   ├── CategoriaPage.jsx / .css  → Listagem de produtos com filtros
 │   ├── ProductPage.jsx / .css    → Página de produto
 │   ├── CheckoutPage.jsx / .css   → Finalizar compra
 │   ├── UsuarioPage.jsx / .css    → Perfil do usuário
 │   ├── FarmaciaPage.jsx / .css   → Página da farmácia
 │   └── AdminPage.jsx / .css      → Painel administrativo
 ├── styles/
 │   └── global.css                → Estilos globais e variáveis CSS
 ├── assets/img/                   → Imagens do projeto
 ├── App.jsx                       → Rotas
 └── main.jsx                      → Entry point com providers
```

## Rotas

| Rota         | Página               |
|--------------|----------------------|
| `/`          | Home                 |
| `/login`     | Login / Cadastro     |
| `/carrinho`  | Carrinho             |
| `/categoria` | Categoria / Listagem |
| `/produto`   | Produto              |
| `/checkout`  | Finalizar compra     |
| `/perfil`    | Perfil do usuário    |
| `/farmacia`  | Farmácia parceira    |
| `/admin`     | Painel admin         |

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

## Dependências

- React 18
- React Router DOM 6
- Vite 5
- Font Awesome (CDN)
- Google Material Symbols (CDN)

## Melhorias feitas

- ✅ Todos os `onclick` → React state/hooks
- ✅ Toda manipulação de DOM → estado React
- ✅ Links HTML → `<Link>` do React Router
- ✅ Carrossel convertido para componente com hooks
- ✅ CEP modal com Context API global
- ✅ Carrinho com Context API global (add/remover/alterar qtd)
- ✅ Navegação corrigida em todas as páginas
- ✅ CSS organizado por componente/página
- ✅ Responsividade preservada
- ✅ Código limpo e sem duplicações
