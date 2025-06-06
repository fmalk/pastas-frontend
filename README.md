# Pastas - Frontend

Demonstração de funcionalidades e técnicas.

## LIMITAÇÕES ATUAIS

- Pode ordenar arquivos mas não via drag n' drop
- Nenhum nome repetido, independente do lugar
- Sem busca até o momento
- Não apaga pastas, apenas arquivos
- Sessões não se mantêm, para que Usuários testers diferentes vejam diferentes pastas
- Bug: barra de progresso pode ficar travada, por pequena incompatibilidade de libs

## Informações

Projeto feito com [Next.js](https://nextjs.org) e [Ant.Design](https://ant.design/components/overview/).

Você pode rodar localmente usando `npm run dev`.

**Projeto está no ar em https://pastas-frontend.vercel.app**  

## Considerações

- Código usando expressões em inglês, e português onde for mostrado ao Usuário.
- Ant.D foi escolhido para facilitar criação de componentes de UI.
- Não foi utilizado Saga* para manutenção de estado em React, apenas Context/Providers e boa separação de responsabilidades.
- Usa Vercel Blobs, não foi necessário backend para armazenamento.
- Drag n' Drop não foi implementado; ordem pode ser definida pelo Card.
- "Metadata" é o único lugar em que o backend precisa ser plugado.
- Arquivos de Componentes acompanham seus tipos.
- Nomes de pastas são sempre ordenados primeiro; arquivos são exibidos por ordem de criação e podem ter ordem modificada por numeração.
- Manter o arquivo de metadados íntegro é vital para aplicação. Existem técnicas mais elaboradas para garantir isso, como o uso de versões incrementais (deltas).

## Estrutura

- Layout/Page: ínicio, abriga os componentes Providers para disponibilização de métodos
- Grid: monta o caminho, botões "Novo X" e o painel de Cards
  - Path: exibe o caminho atual
  - Modal: exibe as modais de inputs para criação de novos itens e exibição de arquivos
  - Cards:
    - Geral: exibe nome, e clique leva a modal de metadados e edição
    - Pasta
    - Arquivo
  - Api/Upload: conexão com o Vercel Blob para upload
- Metadados: é mantido um objeto "universal" com todos os metadados de todas as pastas, em array genérico (JSONable), feito para ser mantido pelo backend.
- Arquivos: serão guardados por ID e referenciado via metadados (url/downloadUrl).
