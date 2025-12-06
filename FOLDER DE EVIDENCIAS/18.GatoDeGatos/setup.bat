@echo off
echo ====================================
echo Gato de Gatos - Setup de Base de Datos
echo ====================================
echo.
echo Por favor abre MySQL Workbench y ejecuta las siguientes sentencias SQL:
echo.
echo 1. CREATE DATABASE IF NOT EXISTS gato_de_gatos;
echo 2. USE gato_de_gatos;
echo 3. Copia y pega todo el contenido del archivo database.sql
echo.
echo Despues de crear la base de datos, presiona cualquier tecla...
pause
echo.
echo Iniciando servidor...
node app.js
