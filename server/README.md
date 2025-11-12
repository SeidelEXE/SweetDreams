SweetDreams Server (MySQL)

Visão geral

- Pasta: `SweetDreams/server`
- Objetivo: Conexão MySQL (porta 3306), pooling e classes de mapeamento em JavaScript moderno (ESM).

Estrutura

- `package.json` — ESM (`type: module`), dependências `mysql2` e `dotenv`.
- `.env.example` — Template das variáveis de ambiente.
- `db/config.js` — Configuração de conexão via variáveis de ambiente.
- `db/pool.js` — Pool de conexões (`mysql2/promise`) e helper `ping()`.
- `models/BaseModel.js` — CRUD genérico: `findById`, `findAll`, `insert`, `update`, `delete`.
- Modelos (tabelas principais):
  - `models/User.js` — `users`
  - `models/UserSettings.js` — `user_settings`
  - `models/DimArea.js` — `dim_area` (com `findBySlug`)
  - `models/Device.js` — `devices`
  - `models/SleepSession.js` — `sleep_sessions`
  - `models/SleepStageEvent.js` — `sleep_stage_events`
  - `models/AwakeningEvent.js` — `awakening_events`
  - `models/HabitLog.js` — `habit_logs`
  - `models/EnvReading.js` — `environmental_readings`
  - `models/DailyScore.js` — `daily_scores`
  - `models/AreaScore.js` — `area_scores`
  - `models/DailyAggregates.js` — `daily_aggregates`
  - `models/WeeklyAggregates.js` — `weekly_aggregates`
  - `models/MonthlyAggregates.js` — `monthly_aggregates`

Setup

- Copie `.env.example` para `.env` e ajuste, se necessário:
  - `MYSQL_HOST=localhost`
  - `MYSQL_PORT=3306`
  - `MYSQL_USER=seidel`
  - `MYSQL_PASSWORD=1234`
  - `MYSQL_DATABASE=sweetdreams`
- Instale dependências:
  - `cd SweetDreams/server`
  - `npm install`

Testar conexão

- Execute o script de teste:
  - `node scripts/test-connection.js`
- Saída esperada: status OK com versão do MySQL.

Exemplos de uso

- Buscar usuário:
  - `import { User } from './models/User.js'`
  - `const u = await User.findById(1)`
- Inserir pontuação diária:
  - `import { DailyScore } from './models/DailyScore.js'`
  - `await DailyScore.insert({ user_id: 1, score_date: '2025-01-01', score: 82, labels: JSON.stringify({ sleep:'bom' }) })`
- Buscar área por slug:
  - `import { DimArea } from './models/DimArea.js'`
  - `const area = await DimArea.findBySlug('higiene-do-sono')`

Boas práticas

- Use pooling para todas as operações.
- Parametrize queries (já implementado nos modelos).
- Mantenha `.env` fora de controle de versão.