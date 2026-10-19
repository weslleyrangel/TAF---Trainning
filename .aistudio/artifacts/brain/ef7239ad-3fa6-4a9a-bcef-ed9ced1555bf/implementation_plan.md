# TAF - Training (Offline-First Fitness Preparation)

Aplicativo mobile minimalista, offline-first, para preparação diária progressiva voltada ao Teste de Aptidão Física (TAF) do Corpo de Bombeiros Militar e outras corporações, com arquitetura Bento Grid Obsidian Clean, execução em tempo real com descanso sonoro e armazenamento 100% local.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> As preferências do usuário confirmadas na Fase 1 foram integradas como diretrizes fundamentais do projeto:

- **Confirmed Decision 1 (Edital Padrão)**: Configurado com os parâmetros oficiais do **Corpo de Bombeiros Militar** (Barra fixa / Isometria, Flexão de braço, Abdominal remador, Corrida de 12 min e Natação/Isometria), permitindo também ajuste livre e personalização dos índices nas configurações.
- **Confirmed Decision 2 (Tema Visual)**: Estilo **Obsidian Clean** com inicialização em **Tema Claro** (`#F4F5F7` com cards flutuantes `#FFFFFF` e contornos refinados `#E5E7EB`) e alternância instantânea para **Dark Mode** (`#0D0E11` com cards `#17181D` e bordas `#2A2D35`) através de toggle no topo.
- **Confirmed Decision 3 (Timer & Áudio)**: Temporizador de descanso com **Web Audio API sintetizada** (bipes curtos aos 3s, 2s, 1s e bipe longo no término) somado à vibração háptica (`navigator.vibrate`) sem requisições de rede.

---

## 1. Overview & Core Concept

- **O que faz**: O **TAF - Training** acompanha a preparação de candidatos e atletas para exames de aptidão física. Oferece visualização diária com rotina horizontal dos dias da semana, tela imersiva de execução de séries com cronômetro de descanso neuromuscular, registro de comprovantes de treino (prints de esteira, Strava ou smartwatch), histórico de recordes pessoais (PR) e métricas consolidadas de prontidão para aprovação no edital.
- **Público-Alvo**: Candidatos do Corpo de Bombeiros Militar, Polícias Militares e Forças de Segurança, além de praticantes de calistenia e corrida que treinam com foco em metas rigorosas de tempo e repetições.
- **Valor Principal**: 100% offline, sem necessidade de login ou coleta de dados por terceiros, velocidade instantânea de carregamento e interface tátil focada no treino sob esforço intenso.

---

## 2. User Experience & Visual Design

### Fluxos Principais
1. **Dashboard Hoje (`/`)**:
   - Cabeçalho com data, status de segurança offline, botão de alternância de tema e perfil.
   - Carrossel horizontal dos dias da semana com status de conclusão de cada dia.
   - Hero Card: volume estimado em minutos, calorias, contagem de exercícios e barra de progresso da sessão.
   - Ações rápidas em pílula: *Iniciar Treino*, *Timer de Descanso*, *Histórico*.
   - Bento Grid de Metas: Meta Semanal com bolinhas táteis e Constância (streak de dias consecutivos).
   - Lista interativa de exercícios com reordenação, badges de séries x reps e botão de checkmark rápido.
   - Card de Comprovante: upload de imagem/print com validação estrita de tamanho (até 2MB), preview e remoção.
   - Barra de navegação inferior flutuante em pílula com 3 abas: *Hoje* (`home`), *Evolução* (`insert_chart`) e *Perfil* (`settings`).

2. **Tela de Execução de Treino**:
   - Cabeçalho com botão voltar, nome do exercício ativo, meta da série e histórico rápido.
   - Stepper numérico de repetições com botões de incremento/decremento táteis (+ / -) e chips de ajuste rápido (6 a 10 reps).
   - Seletor de Percepção de Esforço (RPE 6 a 10).
   - Card de descanso ativo: contagem regressiva digital com botões de 30s, 45s, 60s, 90s, +15s, play/pause e sinalização sonora/vibração.
   - Sumário em Bento rows: série atual (com dots visuais), carga utilizada, tempo acumulado e indicação do próximo exercício.
   - Botão flutuante inferior de alto contraste: "Concluir Série & Descansar" e atalho para "Pular Descanso".

3. **Tela de Evolução & Estatísticas**:
   - Card Hero de Prontidão Geral: porcentagem calculada com base nos critérios do edital dos Bombeiros.
   - Bento Cards lado a lado: Flexões e Corrida 12 min com % do índice oficial e pace médio.
   - Card detalhado para Abdominal Remador e Barra Fixa/Isometria.
   - Gráfico SVG interativo de Consistência Semanal com curva de adesão nas últimas 4 semanas.
   - Banner de lembrete com contagem regressiva para o próximo simulado oficial.

4. **Modal de Novo Exercício / Edição**:
   - Campo para nome com sugestões rápidas (Flexão, Barra Fixa, Abdominal, Corrida 12 min).
   - Tipo de medição: Repetições, Tempo/Isometria ou Distância.
   - Metas de séries, repetições e descanso sugerido.
   - Seleção de categoria oficial: Membros Superiores, Core / Abdômen, Resistência Aeróbica.

5. **Tela de Perfil & Configurações**:
   - Biometria: Peso com stepper de ajuste fino, Altura e cálculo dinâmico de IMC com badge de saúde.
   - Critérios de Avaliação (Metas do Edital / TAF): tabela de índices editável para o Corpo de Bombeiros.
   - Armazenamento Local: Exportar Backup (JSON), Importar Backup e opção de zerar histórico com confirmação.

### Identidade Visual & Tipografia
- **Paleta**: Obsidian Clean com contraste estrito 60-30-10. Fundo `#F4F5F7` no Light Mode e `#0D0E11` no Dark Mode; cards em `#FFFFFF` / `#17181D`; detalhes de validação e prontidão em esmeralda teal `#0D9488`.
- **Tipografia**: Família `Inter` com `tabular-nums` ativo em todos os contadores, repetições e cronômetros, garantindo estabilidade visual durante transições rápidas.
- **Micro-interações**: Feedback tátil com transições suaves de escala (`active:scale-95`), botões com área mínima de toque de 44px e layout responsivo que se adapta do container mobile a telas maiores.

---

## 3. Key Product Decisions & Trade-Offs

- **Persistência 100% Local (IndexedDB & LocalStorage)**:
  - *Decisão*: Manter todos os treinos, fotos de comprovantes e biometria no `localStorage` e `IndexedDB` do navegador do dispositivo.
  - *Motivo*: Atende estritamente à privacidade total exigida pelo usuário, permite funcionamento sem internet no quartel, pista de atletismo ou academia, e possibilita backup/restauração via arquivo JSON e base64.
- **Sintetizador de Áudio Nativo (Web Audio API)**:
  - *Decisão*: Gerar tons sonoros via `AudioContext` do navegador sem depender de arquivos MP3 externos.
  - *Motivo*: Garante funcionamento offline imediato, latência zero e independência de redes móveis.
- **Validação e Armazenamento de Comprovantes**:
  - *Decisão*: Restringir imagens a 2MB e armazenar de forma compactada em string base64 localmente, com preview imediato e badge de tamanho.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    TAF - TRAINING (APP)                     │
├──────────────────────────────┬──────────────────────────────┤
│  Top Navigation & Theme      │  ThemeContext (Light / Dark) │
├──────────────────────────────┴──────────────────────────────┤
│                     ACTIVE VIEW ROUTER                      │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│   │ Hoje (Treino)│   │  Evolução    │   │  Meu Perfil  │   │
│   │ [Bento Grid] │   │  [Analytics] │   │  [Biometria] │   │
│   └──────┬───────┘   └──────────────┘   └──────────────┘   │
│          │                                                  │
│   ┌──────▼──────────────────────────────────────────────┐   │
│   │ Fullscreen Modal: Execução de Série & Timer          │   │
│   │  - AudioBeep Engine (Web Audio API)                 │   │
│   │  - Stepper de Repetições e RPE                      │   │
│   └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    LOCAL STORAGE ENGINE                     │
│  - Treinos Diários e Histórico de Sessões                   │
│  - Metas do Edital (Corpo de Bombeiros Militar)             │
│  - Biometria & IMC do Candidato                             │
│  - Imagens de Comprovantes (Base64 < 2MB)                   │
│  - Exportador / Importador JSON de Backup                   │
└─────────────────────────────────────────────────────────────┘
```

### Entidades e Modelo de Dados
- `Exercise`: id, nome, categoria, tipo (`reps` | `time` | `distance`), séries alvo, repetições/tempo alvo, descanso padrão em segundos, PR pessoal.
- `WorkoutDay`: data (`YYYY-MM-DD`), concluído, minutos estimados, calorias, exercícios programados e comprovante (`fileName`, `fileSize`, `base64Data`).
- `WorkoutSessionExecution`: sessão ativa, exercício atual, índice da série, reps executadas, carga, RPE e tempo decorrido.
- `Biometrics`: peso (kg), altura (m), última atualização.
- `TAFEdital`: instituição (ex: "Corpo de Bombeiros Militar"), metas mínimas de aprovação por exercício.

### Mapeamento de Estados e Interações
- **Checkmark Rápido**: Alterna status de conclusão do exercício na lista com animação de escala e atualiza a barra de progresso do Hero Card.
- **Timer de Descanso**: Cronômetro regressivo com detecção de 3s/2s/1s emitindo oscilador sonoro em 880Hz e tom final em 1760Hz, acionando também `navigator.vibrate([100, 50, 200])`.
- **Upload de Comprovante**: `FileReader` com verificação de tipo de arquivo e limite de 2MB, gerando miniatura e metadados persistidos.
- **Backup e Restauração**: Download dinâmico de `taf-training-backup.json` e leitor de arquivo `input type="file"` com validação de integridade.
