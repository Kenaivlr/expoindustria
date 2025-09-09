// Função para cadastrar novo usuário
async function cadastrar() {
  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  if (usuario && senha) {
    // Envia os dados para o servidor
    let resposta = await fetch("http://localhost:3000/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario, senha: senha })
    });

    let dados = await resposta.json();

    // Mostra na tela os usuários cadastrados
    document.getElementById("resultado").textContent = JSON.stringify(dados, null, 2);

    // Limpa campos
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    //entrar no jogo
  
  } else {
    alert("Preencha usuário e senha!");
  }
}
