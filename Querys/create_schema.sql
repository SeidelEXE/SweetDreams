CREATE DATABASE IF NOT EXISTS sweetdreams
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE sweetdreams;

-- Dimensões / Cadastros
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(190) UNIQUE NOT NULL,
  display_name VARCHAR(120),
  tz VARCHAR(64) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_settings (
  user_id BIGINT PRIMARY KEY,
  theme ENUM('dark','light') DEFAULT 'dark',
  privacy_level ENUM('low','medium','high') DEFAULT 'medium',
  notifications_enabled TINYINT(1) DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS devices (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  vendor VARCHAR(100),
  model VARCHAR(100),
  kind ENUM('phone','watch','ring','other') NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (user_id, kind)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS device_payloads (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  device_id BIGINT NOT NULL,
  captured_at DATETIME NOT NULL,
  payload JSON NOT NULL,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
  INDEX (device_id, captured_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS dim_area (
  id TINYINT PRIMARY KEY,
  slug VARCHAR(64) UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT
) ENGINE=InnoDB;

-- Eventos / Fatos
CREATE TABLE IF NOT EXISTS sleep_sessions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  device_id BIGINT NULL,
  kind ENUM('night','nap') DEFAULT 'night',
  start_at DATETIME NOT NULL,
  end_at DATETIME NOT NULL,
  duration_min SMALLINT NOT NULL,
  latency_min SMALLINT NULL,
  awakenings_count SMALLINT DEFAULT 0,
  efficiency_pct DECIMAL(5,2) NULL,
  subjective_quality TINYINT NULL,
  source ENUM('manual','device','mixed') DEFAULT 'device',
  timezone VARCHAR(64) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE SET NULL,
  INDEX (user_id, start_at),
  INDEX (user_id, end_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sleep_stage_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  stage ENUM('N1','N2','N3','REM','WAKE') NOT NULL,
  start_at DATETIME NOT NULL,
  end_at DATETIME NOT NULL,
  duration_min SMALLINT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sleep_sessions(id) ON DELETE CASCADE,
  INDEX (session_id, start_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS awakening_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  at DATETIME NOT NULL,
  duration_min SMALLINT NULL,
  reason VARCHAR(120) NULL,
  FOREIGN KEY (session_id) REFERENCES sleep_sessions(id) ON DELETE CASCADE,
  INDEX (session_id, at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS habit_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  logged_at DATETIME NOT NULL,
  type ENUM('caffeine','alcohol','screen_end','exercise','hydration','pre_sleep_ritual','nap') NOT NULL,
  value_num DECIMAL(8,2) NULL,
  value_text VARCHAR(255) NULL,
  occur_at DATETIME NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (user_id, logged_at),
  INDEX (user_id, type, logged_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS env_readings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  captured_at DATETIME NOT NULL,
  room VARCHAR(64) DEFAULT 'bedroom',
  temperature_c DECIMAL(4,1) NULL,
  humidity_pct DECIMAL(4,1) NULL,
  noise_db DECIMAL(5,2) NULL,
  light_lux DECIMAL(8,2) NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (user_id, captured_at)
) ENGINE=InnoDB;

-- Scores e agregações
CREATE TABLE IF NOT EXISTS area_scores (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  session_id BIGINT NULL,
  area_id TINYINT NOT NULL,
  score_pct DECIMAL(5,2) NOT NULL,
  basis JSON NULL,
  computed_for DATE NULL,
  computed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES sleep_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (area_id) REFERENCES dim_area(id),
  INDEX (user_id, area_id, computed_for),
  INDEX (session_id, area_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS daily_scores (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  day DATE NOT NULL,
  overall_score DECIMAL(5,2) NOT NULL,
  latency_min SMALLINT NULL,
  efficiency_pct DECIMAL(5,2) NULL,
  total_sleep_min SMALLINT NULL,
  awakenings_count SMALLINT NULL,
  notes VARCHAR(255) NULL,
  computed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, day)
) ENGINE=InnoDB;

-- Planos / Assinaturas
CREATE TABLE IF NOT EXISTS plans (
  id SMALLINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  price_cents INT NOT NULL,
  period ENUM('monthly','yearly') NOT NULL,
  features JSON NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_plans (
  user_id BIGINT NOT NULL,
  plan_id SMALLINT NOT NULL,
  starts_at DATE NOT NULL,
  ends_at DATE NULL,
  status ENUM('active','canceled','past_due') DEFAULT 'active',
  PRIMARY KEY (user_id, plan_id, starts_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
) ENGINE=InnoDB;