-- Base de datos para la Práctica 15: Bitácora de Calibración

CREATE DATABASE IF NOT EXISTS bitacora_calibracion;
USE bitacora_calibracion;

CREATE TABLE IF NOT EXISTS instrumentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_instrumento VARCHAR(100) NOT NULL,
    ultima_calibracion DATE NOT NULL,
    fecha_calibracion_actual DATE NOT NULL,
    estandar_referencia VARCHAR(100) NOT NULL,
    lectura_antes VARCHAR(50) NOT NULL,
    lectura_despues VARCHAR(50) NOT NULL,
    certificado_asociado VARCHAR(100) NOT NULL,
    proxima_calibracion DATE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo para pruebas
INSERT INTO instrumentos (id_instrumento, ultima_calibracion, fecha_calibracion_actual, estandar_referencia, lectura_antes, lectura_despues, certificado_asociado, proxima_calibracion) VALUES
('Termómetro PT-100', '2023-01-15', '2024-01-15', 'Patrón Nacional CENAM', '10.2°C', '10.0°C', 'CERT-2024-001', '2025-01-15'),
('Manómetro Digital MAN-500', '2023-06-20', '2024-06-20', 'Estándar ISO-9001', '99.8 PSI', '100.0 PSI', 'CERT-2024-045', '2025-06-20'),
('Balanza Analítica BA-200', '2023-03-10', '2024-03-10', 'Masa Patrón NIST', '199.98 g', '200.00 g', 'CERT-2024-023', '2025-03-10');
