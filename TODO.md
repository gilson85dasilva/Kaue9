# TODO - Correção: Música não toca automaticamente

## Etapas Concluídas
- [x] Plano aprovado pelo usuário
- [x] HTML: adicionar `preload="auto"` e `autoplay` na tag `<audio>`
- [x] JS: Proteger `AOS.init()` com `typeof` para não quebrar o restante do script
- [x] JS: Proteger inicialização do Swiper com `typeof`
- [x] JS: Reescrever lógica de música (remover `scroll` como interação, manter listeners até a música tocar)
- [x] Testar sintaxe do JS com `node --check`

## Etapas Pendentes
- Testar no navegador

