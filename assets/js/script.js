const sobre = document.querySelector("#about");
const formulario = document.querySelector("#formulario");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para buscar dados do GitHub
async function getApiGithub() {
    try {
        const resposta = await fetch(`https://api.github.com/users/iankalps`);
        if (!resposta.ok) throw new Error("Erro ao buscar dados do GitHub");
        
        const perfil = await resposta.json();

        sobre.innerHTML = `
            <img src="${perfil.avatar_url}" alt="Foto do Perfil do GitHub - ${perfil.name}" />

            <article id="about_texto">
                <h2>Sobre mim</h2>
                <p>Olá! Meu nome é Ianka Lopes e sou uma desenvolvedora fullstack focada em tecnologia, design e soluções criativas. 
                    Com formação técnica em TI, venho aprimorando minhas habilidades em desenvolvimento web, especialmente com JavaScript, 
                    TypeScript, Node.js, Nest.js e React.js. Atualmente, estou me dedicando ao bootcamp da Generation Brasil para evoluir 
                    na carreira. Sou organizada, proativa e valorizo o trabalho em equipe. Meu objetivo é criar soluções digitais eficientes 
                    e impactantes, sempre buscando aprendizado e crescimento.</p>
            
                <div class="flex about_github">
                    <a class="botao" href="${perfil.html_url}" target="_blank">GitHub</a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
                </div>
            </article>
        `;
    } catch (error) {
        console.error("Erro:", error);
        sobre.innerHTML = "<p>Erro ao carregar perfil do GitHub.</p>";
    }
}

// Função para validar o formulário
function validarCampo(campo, mensagem, minLength = 3, regex = null) {
    const txtElemento = document.querySelector(`#txt${campo.id.charAt(0).toUpperCase() + campo.id.slice(1)}`);
    
    if (regex && !campo.value.match(regex)) {
        txtElemento.innerHTML = mensagem;
        campo.focus();
        return false;
    }

    if (campo.value.length < minLength) {
        txtElemento.innerHTML = mensagem;
        campo.focus();
        return false;
    }

    txtElemento.innerHTML = "";
    return true;
}

// Evento de envio do formulário
formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const campoNome = document.querySelector("#nome");
    const campoEmail = document.querySelector("#email");
    const campoAssunto = document.querySelector("#assunto");

    const nomeValido = validarCampo(campoNome, "O nome deve ter no mínimo 3 caracteres.");
    const emailValido = validarCampo(campoEmail, "Digite um e-mail válido.", 3, emailRegex);
    const assuntoValido = validarCampo(campoAssunto, "O assunto deve ter no mínimo 5 caracteres.", 5);

    if (nomeValido && emailValido && assuntoValido) {
        formulario.submit();
    }
});

getApiGithub();
