const sobre = document.querySelector("#about");
const formulario = document.querySelector("#formulario");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function getApiGithub() {
    try{
        
        const dadosPerfil = await fetch(`http://api.github.com/users/iankalps`);
        const perfil = await dadosPerfil.json();

        let conteudo = `
            <img
            src="${perfil.avatar_url}"
            alt="Foto do Perfil do GitHub - ${perfil.name}"
            />

            <article id="about_texto">
            <h2>Sobre mim</h2>
                <p>Olá! Meu nome é Ianka Lopes e sou uma desenvolvedora fullstack focada em tecnologia, design e soluções criativas. 
                    Com formação técnica em TI, venho aprimorando minhas habilidades em desenvolvimento web, especialmente com JavaScript, 
                    TypeScript, Node.js, Nest.js e React.js. Atualmente, estou me dedicando ao bootcamp da Generation Brasil para evoluir 
                    na carreira. Sou organizada, proativa e valorizo o trabalho em equipe. Meu objetivo é criar soluções digitais eficientes 
                    e impactantes, sempre buscando aprendizado e crescimento.</p>
            
            <div class="flex about_github">

                <a 
                    class="botao" 
                    href="${perfil.html_url}" 
                    target="_blank"
                >
                    GitHub
                </a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
            </div>

            </article>
        `;

        sobre.innerHTML += conteudo;
    } catch(error) {
        console.error("Error:", error);
    }
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome")

    if(campoNome.value.length < 3){
        txtNome.innerHTML = "O nome deve ter no mínimo 3 caracteres.";
        campoNome.focus();
        return;
    } else {
        txtNome.innerHTML = "";
    }

    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail")

    if(!campoEmail.value.match(emailRegex)){
        txtEmail.innerHTML = "Digite um e-mail válido.";
        campoEmail.focus();
        return;
    } else {
        txtEmail.innerHTML = "";
    }

    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto")

    if(campoAssunto.value.length < 5){
        txtAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres.";
        campoAssunto.focus();
        return;
    } else {
        txtAssunto.innerHTML = "";
    }

    formulario.submit();
});

getApiGithub();
