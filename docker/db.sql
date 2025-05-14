-- Criação de usuários com senhas diferentes
CREATE USER sonar WITH PASSWORD 'sonar';
CREATE USER cohesion WITH PASSWORD 'cohesion';

-- Criação dos bancos de dados
CREATE DATABASE sonar_db OWNER sonar;
CREATE DATABASE cohesion_db OWNER cohesion;

-- Opcional: Conceder permissões extras (se necessário)
GRANT ALL PRIVILEGES ON DATABASE sonar_db TO sonar;
GRANT ALL PRIVILEGES ON DATABASE cohesion_db TO cohesion;
