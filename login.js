// Função para verificar login
async function entrar() {
  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  if (usuario && senha) {
    // Envia dados para o servidor
    let resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario, senha: senha })
    });

    let dados = await resposta.json();

    // Mostra mensagem de resultado
    document.getElementById("resultado").textContent = dados.mensagem;

    // Se login for válido, pode redirecionar para área protegida
    if (dados.sucesso) {
      window.location.href = "painel.html";
    }
  } else {
    alert("Preencha usuário e senha!");
  }
}
