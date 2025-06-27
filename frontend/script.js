document.addEventListener('DOMContentLoaded', () => {

    const textToTranslateEl = document.getElementById("text-to-translate");
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    const subscriptionKey = "5DwA37m6XcE5UWirF6xQ0yIodtT0bDC5KJmWcwMjvesM1U86LRLlJQQJ99BFACYeBjFXJ3w3AAAbACOGer1l";
    const locationOrRegion = "eastus";
    const endpoint = "https://api.cognitive.microsofttranslator.com/";

    async function translateText() {

        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        // Verificação simples para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.

        let url = `${endpoint}translate?api-version=3.0&to=${toLanguage}`;
        if (fromLanguage) {
            url += `&from=${fromLanguage}`;
        }

         try {
            // A função 'fetch' faz a requisição para a API.
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Ocp-Apim-Subscription-Region': locationOrRegion,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify([{ 'Text': textToTranslate }])
            });
            
            // (Dentro da função translateText, dentro do bloco try)

            // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
            const data = await response.json();

            // Se a resposta da API contém um erro (ex: chave inválida), nós o mostramos.
            if (data.error) {
                throw new Error(data.error.message);
            }

            // Extraímos o texto traduzido do objeto de resposta.
            const translation = data[0].translations[0].text;
            
            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        }
    }

    translateBtn.addEventListener('click', translateText);
    
})