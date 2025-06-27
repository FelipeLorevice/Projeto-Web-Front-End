// Seletores dos elementos do DOM
const form = document.getElementById('admin-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const lista = document.getElementById('lista-usuarios');
const searchInput = document.getElementById('search');

// Carregar usuários do LocalStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Salva no LocalStorage
function salvarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Renderiza lista de usuários com filtro
function renderizarUsuarios(filtro = '') {
  lista.innerHTML = '';

  // Ordenar por nome (alfabética)
  const ordenados = [...usuarios].sort((a, b) => a.nome.localeCompare(b.nome));

  ordenados
    .filter(u => u.nome.toLowerCase().includes(filtro) || u.email.toLowerCase().includes(filtro))
    .forEach((usuario) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${usuario.nome}</strong>
          <span>${usuario.email} - ${usuario.data}</span>
        </div>
        <button class="btn-small" onclick="excluirUsuario('${usuario.email}')">Excluir</button>
      `;
      lista.appendChild(li);
    });
}

// Adiciona novo usuário
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();

  if (!nome || !email) {
    alert('Preencha todos os campos antes de cadastrar.');
    return;
  }

  // Verifica se e-mail já foi cadastrado
  const emailExistente = usuarios.some(u => u.email === email);
  if (emailExistente) {
    alert('Este e-mail já está cadastrado.');
    return;
  }

  const novoUsuario = {
    nome,
    email,
    data: new Date().toLocaleString()
  };
  usuarios.push(novoUsuario);
  salvarUsuarios();
  renderizarUsuarios();
  form.reset();
  alert('Usuário cadastrado com sucesso!');
});

// Limpa os campos do formulário
function limparCampos() {
  nomeInput.value = '';
  emailInput.value = '';
}

// Exclui usuário individual com base no e-mail
function excluirUsuario(email) {
  if (confirm('Deseja excluir este usuário?')) {
    usuarios = usuarios.filter(u => u.email !== email);
    salvarUsuarios();
    renderizarUsuarios(searchInput.value.toLowerCase());
  }
}

// Exclui todos os usuários
function excluirTodos() {
  if (confirm('Deseja excluir todos os cadastros?')) {
    usuarios = [];
    salvarUsuarios();
    renderizarUsuarios();
    alert('Todos os usuários foram excluídos.');
  }
}

// Filtro de pesquisa
function filtrarUsuarios() {
  const filtro = searchInput.value.toLowerCase();
  renderizarUsuarios(filtro);
}

// Inicializa a lista ao carregar a página
renderizarUsuarios();
