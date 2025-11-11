USE sweetdreams;

-- Dimensões das áreas exibidas na Home
INSERT INTO dim_area (id, slug, name) VALUES
  (1,'rotina','Rotina de horário'),
  (2,'higiene_digital','Higiene digital'),
  (3,'cafeina','Cafeína'),
  (4,'exercicio','Exercício'),
  (5,'ambiente','Ambiente'),
  (6,'hidratacao','Hidratação'),
  (7,'alcool','Álcool'),
  (8,'cochilos','Cochilos'),
  (9,'rotina_pre_sono','Rotina pré-sono');

-- Usuário Seidel
INSERT INTO users (email, display_name, tz)
VALUES ('seidel@example.com','Seidel','America/Sao_Paulo');
SET @user_id := LAST_INSERT_ID();

INSERT INTO user_settings (user_id, theme, privacy_level, notifications_enabled)
VALUES (@user_id, 'dark', 'medium', 1);

-- Score geral do dia mostrado na Home
INSERT INTO daily_scores (user_id, day, overall_score, latency_min, efficiency_pct, total_sleep_min, awakenings_count, notes)
VALUES (@user_id, CURDATE(), 78.00, NULL, NULL, NULL, NULL, 'Dados iniciais da Home');

-- Scores por área (valores conforme os cards da Home)
INSERT INTO area_scores (user_id, session_id, area_id, score_pct, basis, computed_for)
VALUES
  (@user_id, NULL, 1, 18.00, JSON_OBJECT('desc','horário consistente'), CURDATE()),
  (@user_id, NULL, 2, 12.00, JSON_OBJECT('desc','higiene digital'), CURDATE()),
  (@user_id, NULL, 3, 11.00, JSON_OBJECT('desc','cafeína reduzida'), CURDATE()),
  (@user_id, NULL, 4, 10.00, JSON_OBJECT('desc','exercício adequado'), CURDATE()),
  (@user_id, NULL, 5,  9.00, JSON_OBJECT('desc','ambiente otimizado'), CURDATE()),
  (@user_id, NULL, 6,  8.00, JSON_OBJECT('desc','hidratação adequada'), CURDATE()),
  (@user_id, NULL, 7, 14.00, JSON_OBJECT('desc','álcool reduzido'), CURDATE()),
  (@user_id, NULL, 8, 10.00, JSON_OBJECT('desc','cochilos regulados'), CURDATE()),
  (@user_id, NULL, 9,  8.00, JSON_OBJECT('desc','ritual pré-sono'), CURDATE());