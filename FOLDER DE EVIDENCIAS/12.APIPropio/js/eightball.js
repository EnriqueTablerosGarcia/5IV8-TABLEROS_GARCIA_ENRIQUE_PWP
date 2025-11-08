// Esta es una API REST de la bola 8 mágica que nos permite obtener respuestas a preguntas
// puedes ver la documentación en https://eightballapi.com/
// Usando CORS Anywhere proxy para evitar problemas de CORS
const corsProxy = "https://cors-anywhere.herokuapp.com/";
const eightBallApiUrl = corsProxy + "https://eightballapi.com/api";

const eightBallApp = () => {
    // Referencias a los elementos del DOM
    const elements = {
        questionInput: document.getElementById("questionInput"),
        answerDisplay: document.getElementById("answerDisplay"),
        historyContainer: document.getElementById("historyContainer"),
        localeSelect: document.getElementById("localeSelect"),
        ballContainer: document.getElementById("ballContainer"),
    };

    // Referencias a los botones
    const buttons = {
        ask: document.getElementById("btnAsk"),
        clearHistory: document.getElementById("btnClearHistory"),
    };

    // Array para guardar el historial de preguntas y respuestas
    let history = [];

    // Plantilla HTML para mostrar la respuesta
    const answerTemplate = "<span class='answer-text'>{answer}</span>";
    const numberTemplate = "<span class='number'>8</span>";

    /***********************************************************************************************************/
    // Esta función consulta la API de la bola 8 para obtener una respuesta
    // fetch nos sirve para hacer solicitudes a otros sitios
    // fetch devuelve una promesa, por eso tiene un then y un catch
    const getEightBallAnswer = async (locale = 'en') => {
        try {
            console.log(`Fetching from: ${eightBallApiUrl}?locale=${locale}`);
            
            const response = await fetch(`${eightBallApiUrl}?locale=${locale}`);
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (!response.ok) {
                console.error('Response not OK:', response.status, response.statusText);
                return { requestFailed: true };
            }
            
            const data = await response.json();
            console.log('API Response data:', data);
            return data;
        } catch (error) {
            console.error('Fetch error details:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            return { requestFailed: true };
        }
    };
    /***********************************************************************************************************/

    // Función para mostrar estado de carga
    const setLoading = () => {
        elements.answerDisplay.innerHTML = "<span class='loading'>🔮</span>";
        elements.ballContainer.classList.add('shaking');
        buttons.ask.disabled = true;
        buttons.ask.textContent = "Pensando...";
    };

    // Función para quitar el estado de carga
    const setLoadingComplete = () => {
        elements.ballContainer.classList.remove('shaking');
        buttons.ask.disabled = false;
        buttons.ask.textContent = "Obtener Tu Fortuna";
    };

    // Función para animar la bola
    const shakeBall = () => {
        elements.ballContainer.classList.add('shake-animation');
        setTimeout(() => {
            elements.ballContainer.classList.remove('shake-animation');
        }, 600);
    };

    // Función para agregar al historial
    const addToHistory = (question, answer, locale) => {
        const timestamp = new Date().toLocaleString();
        history.unshift({
            question,
            answer,
            locale,
            timestamp
        });

        // Limitar el historial a 15 elementos
        if (history.length > 15) {
            history.pop();
        }

        updateHistoryDisplay();
    };

    // Función para actualizar la visualización del historial
    const updateHistoryDisplay = () => {
        if (history.length === 0) {
            elements.historyContainer.innerHTML = "<p class='no-history'>Aún no hay fortunas. ¡Hazle una pregunta a la bola 8 mágica!</p>";
            return;
        }

        let historyHTML = "";
        history.forEach((item, index) => {
            historyHTML += `
                <div class="history-item">
                    <div class="history-number">${history.length - index}</div>
                    <div class="history-content">
                        <div class="history-question"><strong>P:</strong> ${item.question}</div>
                        <div class="history-answer"><strong>R:</strong> ${item.answer}</div>
                        <div class="history-timestamp">${item.timestamp} • ${item.locale.toUpperCase()}</div>
                    </div>
                </div>
            `;
        });

        elements.historyContainer.innerHTML = historyHTML;
    };

    // Función para limpiar el historial
    const clearHistory = () => {
        Swal.fire({
            title: "¿Limpiar Historial?",
            text: "Esto eliminará todo tu historial de fortunas",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, limpiar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280"
        }).then((result) => {
            if (result.isConfirmed) {
                history = [];
                updateHistoryDisplay();
                Swal.fire({
                    title: "¡Limpiado!",
                    text: "Tu historial de fortunas ha sido limpiado",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    // Función principal para hacer una pregunta a la bola 8
    const askQuestion = async () => {
        const question = elements.questionInput.value.trim();
        const locale = elements.localeSelect.value;

        if (!question) {
            Swal.fire({
                title: "¡Sin Pregunta!",
                text: "Por favor escribe una pregunta primero",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#6366f1"
            });
            return;
        }

        // Mostrar animación de carga
        setLoading();
        shakeBall();

        // Esperar un poco para dar efecto de "pensando"
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Obtener la respuesta de la API
        const response = await getEightBallAnswer(locale);
        
        console.log('Response received:', response);

        if (response.requestFailed || !response.reading) {
            // Si hubo un error en la petición
            elements.answerDisplay.innerHTML = "<span class='error'>❌</span>";
            Swal.fire({
                title: "¡Error de Conexión!",
                html: "No se pudo conectar a la API Bola 8.<br><br>Por favor verifica:<br>• Tu conexión a internet<br>• Activar acceso CORS en el enlace de arriba<br>• Intenta de nuevo en un momento",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#6366f1"
            });
        } else {
            // Mostrar la respuesta
            elements.answerDisplay.innerHTML = answerTemplate.replace("{answer}", response.reading);
            
            // Agregar al historial
            addToHistory(question, response.reading, locale);
            
            // Limpiar el campo de pregunta
            elements.questionInput.value = "";
            
            // Scroll suave al historial
            setTimeout(() => {
                const historySection = document.querySelector('.history-section');
                if (historySection) {
                    historySection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 300);
        }

        setLoadingComplete();
    };

    // Función para resetear la bola al estado inicial
    const resetBall = () => {
        setTimeout(() => {
            if (!elements.ballContainer.classList.contains('shaking')) {
                elements.answerDisplay.innerHTML = numberTemplate;
            }
        }, 8000);
    };

    // Configurar los event listeners
    const setupEventListeners = () => {
        // Botón de preguntar
        buttons.ask.onclick = () => {
            askQuestion();
            resetBall();
        };

        // Presionar Enter en el input
        elements.questionInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                askQuestion();
                resetBall();
            }
        };

        // Botón de limpiar historial
        buttons.clearHistory.onclick = clearHistory;

        // Cambiar idioma
        elements.localeSelect.onchange = () => {
            const languageNames = {
                'en': 'Inglés',
                'es': 'Español',
                'fr': 'Francés',
                'de': 'Alemán',
                'it': 'Italiano'
            };
            
            Swal.fire({
                title: "Idioma Cambiado",
                text: `Las respuestas ahora serán en ${languageNames[elements.localeSelect.value]}`,
                icon: "info",
                timer: 1500,
                showConfirmButton: false
            });
        };
    };

    // Inicializar la aplicación
    setupEventListeners();
    updateHistoryDisplay();
};

// Ejecutar cuando la página se cargue
window.onload = eightBallApp;

// CORS Proxy para las demostraciones
const corsProxyDemo = "https://cors-anywhere.herokuapp.com/";

// Funciones para los botones "Pruébalo" del Inicio Rápido
async function tryStep1() {
    const resultDiv = document.getElementById('result1');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Cargando...';
    resultDiv.className = 'step-result loading show';
    resultDiv.innerHTML = '⏳ Haciendo llamada a la API...';
    
    try {
        const response = await fetch(corsProxyDemo + 'https://eightballapi.com/api');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        resultDiv.className = 'step-result success show';
        resultDiv.innerHTML = `
            ✅ <strong>¡Éxito!</strong> La API devolvió:<br>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        
        // Actualizar el paso 2 con la respuesta real
        document.getElementById('fortune2').textContent = `"${data.reading}"`;
        
    } catch (error) {
        resultDiv.className = 'step-result error show';
        resultDiv.innerHTML = `❌ <strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Pruébalo ➜';
    }
}

async function tryStep2() {
    const resultDiv = document.getElementById('result2');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Cargando...';
    resultDiv.className = 'step-result loading show';
    resultDiv.innerHTML = '⏳ Obteniendo fortuna...';
    
    try {
        const response = await fetch(corsProxyDemo + 'https://eightballapi.com/api');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        resultDiv.className = 'step-result success show';
        resultDiv.innerHTML = `
            ✅ <strong>Tu fortuna:</strong><br>
            <div style="font-size: 1.2rem; font-weight: 600; color: #10b981; margin-top: 8px;">
                "${data.reading}"
            </div>
            <pre style="margin-top: 8px;">${JSON.stringify(data, null, 2)}</pre>
        `;
        
    } catch (error) {
        resultDiv.className = 'step-result error show';
        resultDiv.innerHTML = `❌ <strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Pruébalo ➜';
    }
}

async function tryStep3() {
    const resultDiv = document.getElementById('result3');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Cargando...';
    resultDiv.className = 'step-result loading show';
    resultDiv.innerHTML = '⏳ Haciendo llamada a la API con locale=es...';
    
    try {
        const response = await fetch(corsProxyDemo + 'https://eightballapi.com/api?locale=es');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        resultDiv.className = 'step-result success show';
        resultDiv.innerHTML = `
            ✅ <strong>¡Éxito!</strong> La API respondió en español:<br>
            <div style="font-size: 1.2rem; font-weight: 600; color: #10b981; margin-top: 8px;">
                "${data.reading}"
            </div>
            <pre style="margin-top: 8px;">${JSON.stringify(data, null, 2)}</pre>
            <div style="margin-top: 8px; font-size: 0.9rem; color: #6b7280;">
                💡 Nota: la respuesta ahora está en español (locale: es)
            </div>
        `;
        
    } catch (error) {
        resultDiv.className = 'step-result error show';
        resultDiv.innerHTML = `❌ <strong>Error:</strong> ${error.message}`;
    } finally {
        btn.disabled = false;
        btn.textContent = 'Pruébalo ➜';
    }
}
