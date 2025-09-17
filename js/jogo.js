// Estado do Jogo
let gameState = {
    lives: 5,
    score: 0,
    level: 1,
    currentChallenge: 0,
    selectedEpis: []
};

// Banco de EPIs
const epis = {
    'EPI_CAPACETE_B': { name: 'Capacete Classe B', icon: '⛑️' },
    'EPI_VISEIRA_FACIAL': { name: 'Viseira Facial', icon: '🥽' },
    'EPI_BOTINA_ISOLANTE': { name: 'Botina Isolante com Biqueira de Composite', icon: '👢' },
    'EPI_LUVA_ISOLANTE': { name: 'Luva de Malha Pigmentada', icon: '🧤' },
    'EPI_OCULOS': { name: 'Óculos de Segurança', icon: '👓' },
    'EPI_PROTETOR_AURICULAR': { name: 'Protetor Auricular', icon: '🎧' },
    'EPI_MASCARA': { name: 'Máscara Respiratória', icon: '😷' },
    'EPI_CINTO': { name: 'Cinto de Segurança', icon: '🦺' },
    'EPI_LUVA_CORTE': { name: 'Luva de Raspa de Couro', icon: '🧤🔪' },
    'EPI_TRAJE': { name: 'Traje Impermeável de PVC', icon: '🥼' },
    'EPI_PROTETOR_SOLDADOR': { name: 'Viseira de Solda', icon: '🔫😷' },
    'EPI_BOTINA_AÇO': { name: 'Botina com Biqueira de Aço', icon: '🪟' }
};

// Banco de Desafios
const challenges = [
    {
        id: 'ELET_001',
        text: 'Você foi encarregado de organizar um antigo almoxarifado que está fechado há meses. Ao mover as caixas, uma grande quantidade de poeira e mofo sobe no ar. Qual EPI é necessário para proteger suas vias respiratórias?',
        correctEpis: ['EPI_MASCARA'],
        successMessage: 'Parabéns! Com os EPIs corretos, a tarefa foi executada em total segurança.',
        failMessage: 'Cuidado! A proteção facial e isolamento são essenciais para trabalhos elétricos.',
        points: 100
    },
    {
        id: 'ELET_002',
        text: 'Você está lixando uma parede recém-emassada para prepará-la para a pintura. A atividade gera um pó fino que se espalha pelo ambiente e pode atingir seus olhos. Qual EPI é essencial para a proteção ocular nesta tarefa?',
        correctEpis: ['EPI_OCULOS'],
        successMessage: 'Ótimo! Você está protegido contra cortes, faíscas e ruídos.',
        failMessage: 'Atenção! Luvas anticorte e óculos são indispensáveis nesse tipo de atividade.',
        points: 120
    },
    {
        id: 'ELET_003',
        text: 'Após uma forte chuva, o pátio da fábrica está com muitas poças de água. Você precisa atravessar a área para chegar a outro setor, e há um risco de um cabo de energia energizado ter caído em uma das poças. Qual EPI oferece a proteção fundamental para seus pés?',
        correctEpis: ['EPI_BOTINA_ISOLANTE'],
        successMessage: 'Excelente! Você está totalmente protegido contra choques elétricos.',
        failMessage: 'Atenção! Luvas isolantes são fundamentais para trabalhos em circuitos energizados.',
        points: 180
    },
    {
        id: 'ELET_004',
        text: 'Você precisa organizar uma bancada e guardar ferramentas pontiagudas e cortantes (formões, chaves de fenda, estiletes) em uma caixa. Qual EPI é essencial para proteger suas mãos?',
        correctEpis: ['EPI_LUVA_CORTE'],
        successMessage: 'Muito bem! Mesmo em inspeções, a segurança é prioridade.',
        failMessage: 'Lembre-se: mesmo sem contato direto, a proteção básica é importante.',
        points: 150
    },
    {
        id: 'ELET_005',
        text: 'Você está fazendo uma inspeção a pé em uma área rural, passando por baixo de árvores com galhos secos que podem cair. O sol está forte. Qual EPI oferece a proteção básica para a sua cabeça?',
        correctEpis: ['EPI_CAPACETE_B'],
        successMessage: 'Excelente! Proteção garantida contra riscos elétricos de média tensão.',
        failMessage: 'Atenção! O tapete isolante é indispensável nesse cenário.',
        points: 120
    },
    {
        id: 'ELET_006',
        text: 'Você precisa trocar o rolamento de uma bomba de água industrial. O piso ao redor da bomba está sempre molhado e escorregadio, e a tarefa envolve manusear peças mecânicas pesadas. Quais dois EPIs são essenciais para evitar os principais riscos?',
        correctEpis: ['EPI_LUVA_CORTE', 'EPI_BOTINA_ISOLANTE'],
        successMessage: 'Perfeito! Proteção dupla: contra choques e quedas!',
        failMessage: 'Não esqueça: trabalho em altura exige cinto de segurança!',
        points: 220
    },
    {
        id: 'ELET_007',
        text: 'Sua tarefa é usar uma furadeira de impacto para fixar eletrodutos no alto de uma parede de concreto. A furação projeta pó e pequenos detritos para baixo. Qual a combinação de EPIs necessária para proteger sua cabeça e seus olhos?',
        correctEpis: ['EPI_OCULOS', 'EPI_CAPACETE_B'],
        successMessage: 'Perfeito! A exposição química foi controlada.',
        failMessage: 'Cuidado! Produtos químicos exigem respirador e avental de proteção.',
        points: 200
    },
    {
        id: 'ELET_008',
        text: 'Você vai realizar a limpeza interna de um painel elétrico (desenergizado) usando um spray solvente em aerossol para remover oxidação dos contatos. O produto é volátil e pode causar irritação nos olhos e no sistema respiratório. Quais EPIs são indispensáveis?',
        correctEpis: ['EPI_MASCARA', 'EPI_OCULOS'],
        successMessage: 'Excelente! Proteção contra faíscas, cortes e ruído garantida.',
        failMessage: 'Óculos e luvas anticorte são indispensáveis!',
        points: 220
    },
    {
        id: 'ELET_009',
        text: 'Sua tarefa é furar o teto de concreto para passar um eletroduto. A atividade gera muito ruído e projeta poeira e detritos diretamente para baixo, na sua direção. Quais são os dois EPIs indispensáveis?',
        correctEpis: ['EPI_PROTETOR_AURICULAR', 'EPI_OCULOS'],
        successMessage: 'Correto! A audição foi protegida em ambiente ruidoso.',
        failMessage: 'Sem protetor auricular, há risco de perda auditiva.',
        points: 200
    },
    {
        id: 'ELET_010',
        text: 'Você está realizando a troca de filtro em um gerador de energia. O piso ao redor da máquina está manchado de óleo, e as tampas de acesso ao motor são pesadas. Quais são os dois EPIs essenciais para esta manutenção mecânica?',
        correctEpis: ['EPI_BOTINA_AÇO', 'EPI_LUVA_CORTE'],
        successMessage: 'Muito bem! Você evitou cortes e esmagamentos.',
        failMessage: 'Luvas anticorte são indispensáveis ao manusear chapas.',
        points: 220
    },
    {
        id: 'ELET_011',
        text: 'Um painel elétrico industrial sofreu um curto-circuito, gerando um princípio de incêndio com fumaça densa. Como membro da equipe de manutenção e brigada, você precisa se aproximar para usar um extintor de CO2 e avaliar os danos. O painel ainda apresenta risco de arco elétrico. Qual o conjunto de EPIs para uma aproximação segura?',
        correctEpis: ['EPI_VISEIRA_FACIAL', 'EPI_CAPACETE_B', 'EPI_MASCARA', 'EPI_LUVA_CORTE'],
        successMessage: 'Muito bem! Você garantiu proteção química adequada.',
        failMessage: 'Sem respirador e avental, a exposição química é perigosa.',
        points: 250
    },
    {
        id: 'ELET_012',
        text: 'Você precisa puxar a fiação e instalar uma tomada industrial para uma betoneira em um canteiro de obras. O ambiente tem muito ruído de outras máquinas, o chão está lamacento e há operários trabalhando em andaimes acima de você. Selecione os EPIs necessários para todos os riscos envolvidos.',
        correctEpis: ['EPI_CAPACETE_B', 'EPI_PROTETOR_AURICULAR', 'EPI_BOTINA_ISOLANTE'],
        successMessage: 'Ótimo! Você se protegeu contra queda e objetos soltos.',
        failMessage: 'Nunca esqueça o cinto de segurança em altura!',
        points: 290
    },
    {
        id: 'ELET_013',
        text: 'Você vai subir em um poste de madeira, usando esporas, para realizar a substituição de um isolador em uma rede de distribuição de baixa tensão. A tarefa envolve risco de queda, choque elétrico e manuseio de materiais que podem causar perfurações. Qual o kit de EPIs completo para esta atividade?',
        correctEpis: ['EPI_CINTO', 'EPI_CAPACETE_B', 'EPI_BOTINA_ISOLANTE', 'EPI_LUVA_CORTE'],
        successMessage: 'Correto! Você se protegeu contra vapores e respingos químicos.',
        failMessage: 'Máscara e respirador são indispensáveis nesse tipo de atividade.',
        points: 300
    },
    {
        id: 'ELET_014',
        text: 'Você precisa entrar em um grande tanque metálico (espaço confinado) para realizar um pequeno reparo com solda. O ambiente tem ventilação limitada e a solda gera fumos, radiação e fagulhas. Qual o conjunto de EPIs para realizar a tarefa e garantir uma possível evacuação de emergência?',
        correctEpis: ['EPI_PROTETOR_SOLDADOR', 'EPI_CINTO', 'EPI_LUVA_CORTE', 'EPI_MASCARA'],
        successMessage: 'Correto! Você se protegeu contra vapores e respingos químicos.',
        failMessage: 'Máscara e respirador são indispensáveis nesse tipo de atividade.',
        points: 280
    },
    {
        id: 'ELET_015',
        text: 'Você faz parte da equipe que vai podar galhos de uma árvore grande que estão quase encostando na rede elétrica da rua. A tarefa envolve o uso de motosserra e o risco de um galho cair sobre a fiação energizada. Quais EPIs são necessários para se proteger dos múltiplos riscos?',
        correctEpis: ['EPI_CAPACETE_B', 'EPI_OCULOS', 'EPI_PROTETOR_AURICULAR', 'EPI_LUVA_CORTE'],
        successMessage: 'Correto! Você se protegeu contra vapores e respingos químicos.',
        failMessage: 'Máscara e respirador são indispensáveis nesse tipo de atividade.',
        points: 300
    },

];

let loggedInUser = null;

//nova função de LOGIN

async function handleLogin() {
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    if (!username || !password) {
        alert('Por favor, preencha usuário e senha.');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            loggedInUser = username;
  
            startGame();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

//nova funçao de CADASTRO

async function handleRegister() {
    requestFullscreen();
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;
    if (!username || !password) {
        alert('Por favor, preencha usuário e senha para se cadastrar.');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Erro ao tentar se cadastrar:', error);
        alert('Não foi possível conectar ao servidor.');
    }
}

//nova função para salvar pontuação

async function saveScore() {
    if (!loggedInUser) {
        console.log("Nenhum usuário logado para salvar a pontuação.");
        return;
    }
    try {
        await fetch('http://localhost:3000/save-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: loggedInUser,
                score: gameState.score
            }),
        });
        console.log('pontuação enviada para o servidor.');
    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
    }
}

// Nova função para MOSTRAR O RANKING
async function showRanking() {
    try {
        const response = await fetch("http://localhost:3000/ranking");
        const rankingData = await response.json();

        const rankingListDiv = document.getElementById("rankingList");
        rankingListDiv.innerHTML = ""; // Limpa a lista antiga

        if (rankingData.length === 0) {
            rankingListDiv.innerHTML = "Nenhum jogador no ranking ainda.";
        } else {
            rankingData.forEach((player, index) => {
                const rankEntry = document.createElement("div");
                rankEntry.innerHTML = `<strong>${index + 1}. ${player.username}</strong> - ${player.score} pontos <i>(${player.rank})</i>`;
                rankingListDiv.appendChild(rankEntry);
            });
        }

        // Esconde o menu e mostra a tela de ranking
        document.getElementById('menuScreen').style.display = 'none';
        document.getElementById('rankingScreen').style.display = 'flex';

    } catch (error) {
        console.error("Erro ao buscar o ranking:", error);
        alert("Não foi possível carregar o ranking.");
    }
}

//função tela cheia
function requestFullscreen() {
    const elem = document.documentElement; // pega <html>

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari e Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}


// Funções do Jogo
function startGame() {
    //tela cheia 
    requestFullscreen();

    document.getElementById('menuScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    resetGame();
    loadChallenge();
}

function resetGame() {
    gameState = {
        lives: 5.,
        score: 0,
        level: 1,
        currentChallenge: 0,
        selectedEpis: []
    };
    updateStats();
}

function loadChallenge() {
    const challenge = challenges[gameState.currentChallenge % challenges.length];
    document.getElementById('challengeText').textContent = challenge.text;

    // Limpar seleção anterior
    gameState.selectedEpis = [];

    // Criar cards de EPI
    const epiContainer = document.getElementById('epiCards');
    epiContainer.innerHTML = '';

    // Embaralhar EPIs para mostrar
    const allEpiKeys = Object.keys(epis);
    const shuffled = allEpiKeys.sort(() => Math.random() - 0.5);

    shuffled.forEach(epiKey => {
        const epi = epis[epiKey];
        const card = document.createElement('div');
        card.className = 'epi-card';
        card.dataset.epiId = epiKey;
        card.innerHTML = `
                    <div class="epi-icon">${epi.icon}</div>
                    <div class="epi-name">${epi.name}</div>
                `;
        card.onclick = () => toggleEpi(epiKey);
        epiContainer.appendChild(card);
    });
}

function toggleEpi(epiId) {
    const card = document.querySelector(`[data-epi-id="${epiId}"]`);
    const index = gameState.selectedEpis.indexOf(epiId);

    if (index === -1) {
        gameState.selectedEpis.push(epiId);
        card.classList.add('selected');
    } else {
        gameState.selectedEpis.splice(index, 1);
        card.classList.remove('selected');
    }

    // Habilitar/desabilitar botão confirmar
    const confirmButton = document.getElementById('confirmButton');
    confirmButton.disabled = gameState.selectedEpis.length === 0;
}

function checkAnswer() {
    const challenge = challenges[gameState.currentChallenge % challenges.length];
    const correct = arraysEqual(gameState.selectedEpis.sort(), challenge.correctEpis.sort());

    if (correct) {
        showSuccess(challenge);
    } else {
        showFailure(challenge);
    }
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function showSuccess(challenge) {
    gameState.score += challenge.points;
    updateStats();

    const overlay = document.getElementById('resultOverlay');
    const content = document.getElementById('resultContent');

    content.innerHTML = `
                <div class="success-animation">
                    <div class="success-worker">👷‍♂️👍</div>
                    <div class="success-text">SUCESSO!</div>
                    <div class="success-points">+${challenge.points} PONTOS</div>
                    <p style="color: #fff; font-size: 10px; margin: 20px 0; line-height: 1.6;">
                        ${challenge.successMessage}
                    </p>
                    <button class="continue-button" onclick="nextChallenge()">CONTINUAR</button>
                </div>
            `;

    overlay.classList.add('show');
    playSound('success');
}

function showFailure(challenge) {
    gameState.lives--;
    updateStats();

    const overlay = document.getElementById('resultOverlay');
    const content = document.getElementById('resultContent');

    // EPIs corretos para mostrar
    const correctEpisList = challenge.correctEpis.map(id => epis[id].name).join(', ');

    content.innerHTML = `
                <div class="fail-animation">
                    <div class="shocked-worker">
                        <span style="position: relative;">😵</span>
                        <span class="skeleton-flash">💀</span>
                        <span class="lightning-bolt" style="top: -30px; left: -40px;">⚡</span>
                        <span class="lightning-bolt" style="top: -30px; right: -40px;">⚡</span>
                    </div>
                    <div class="fail-text">CHOQUE!</div>
                    <div class="fail-explanation">
                        ${challenge.failMessage}<br><br>
                        EPIs corretos: ${correctEpisList}
                    </div>
                    <button class="continue-button" onclick="nextChallenge()">
                        ${gameState.lives > 0 ? 'TENTAR NOVAMENTE' : 'REINICIAR JOGO'}
                    </button>
                </div>
            `;

    overlay.classList.add('show');
    playSound('shock');

    if (gameState.lives === 0) {
        saveScore(); // <-- foi add apenas essa linha

        setTimeout(() => {
            alert(`Game Over! Pontuação final: ${gameState.score}`);
            showMenu();
        }, 2000);
    }
}

function nextChallenge() {
    document.getElementById('resultOverlay').classList.remove('show');

    if (gameState.lives > 0) {
        gameState.currentChallenge++;
        if (gameState.currentChallenge % 1 === 0) {
            gameState.level++;
            updateStats();
        }
        loadChallenge();
    } else {
        showMenu();
    }
}

function showMenu() {
    document.getElementById('menuScreen').style.display = 'flex';
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('rankingScreen').style.display = 'none';
    document.getElementById('resultOverlay').classList.remove('show');
}

function updateStats() {
    document.getElementById('lives').textContent = gameState.lives;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
}

function showInstructions() {
    alert(`
INSTRUÇÕES DO JOGO:

1. Leia atentamente a situação apresentada
2. Selecione os EPIs necessários clicando nos cards
3. Clique em CONFIRMAR quando tiver certeza
4. Ganhe pontos por respostas corretas
5. Você tem 3 vidas - use com sabedoria!

DICA: Pense sempre na segurança primeiro!
            `);
}

function playSound(type) {
    // Simulação de sons com Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'success') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    } else if (type === 'shock') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
}

//audio
function openOptions() {
    document.getElementById('optionsModal').style.display = 'flex';
}

function closeOptions() {
    document.getElementById('optionsModal').style.display = 'none';
}

function saveOptions() {
    const volumeSlider = document.getElementById('volumeRange');
    if (bgMusic && volumeSlider) {
        bgMusic.volume = volumeSlider.value / 100;
    }
    closeOptions();
}

let bgMusic = null;
// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    updateStats();

    bgMusic = document.getElementById('bgMusic');
    const volumeSlider = document.getElementById('volumeRange');

    if (volumeSlider && bgMusic) {
        bgMusic.volume = volumeSlider.value / 100; // inicia no valor do slider
        volumeSlider.addEventListener('input', (e) => {
            bgMusic.volume = e.target.value / 100;
        });
    }
});

//entrar em tela cheia 


