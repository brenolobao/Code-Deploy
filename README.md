# Editor com Autocomplete

Este projeto é um editor de código HTML com autocomplete, visualização em tempo real e interface moderna. Ele utiliza CodeMirror para edição avançada e recursos de autocompletar, além de permitir o download e recarregamento do código.

## Funcionalidades
- **Editor de código HTML** com destaque de sintaxe, autocompletar e atalhos de teclado.
- **Preview em tempo real** do código editado.
- **Botões de ação** para baixar, recarregar, alternar para modo smartphone e tela cheia.
- **Interface responsiva** e moderna, com painel de edição e painel de visualização.
- **Persistência local**: o código é salvo automaticamente no navegador.

## Estrutura dos arquivos
- `index.html`: Estrutura principal da aplicação, inclui CodeMirror, painéis de editor e preview, botões de ação e integração com os arquivos de estilo e script.
- `script.js`: Lógica do editor, integração com CodeMirror, atualização do preview, persistência local e funcionalidades dos botões.
- `style.css`: Estilos visuais, temas, responsividade e layout dos painéis, botões e divisores.
- `favicon.png`: Ícone da aplicação.

## Como usar
1. Abra o `index.html` em um navegador moderno.
2. Edite o código HTML no painel do editor.
3. Veja o resultado instantaneamente no painel de preview.
4. Use os botões para baixar o código, recarregar, alternar visualização ou tela cheia.

## Tecnologias utilizadas
- [CodeMirror](https://codemirror.net/) (via CDN)
- HTML, CSS, JavaScript

## Observações
- O autocomplete funciona com atalhos como `Ctrl+Space` ou `Ctrl+I`.
- O código é salvo automaticamente no navegador (localStorage).
- O preview é atualizado em tempo real a cada alteração.

