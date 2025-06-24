const form = document.getElementById('admin-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const lista = document.getElementById('lista-usuarios');
const searchInput = document.getElementById('search');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function salvarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function renderizarUsuarios(filtro = '') {
  lista.innerHTML = '';
  usuarios
    .filter(u => u.nome.toLowerCase().includes(filtro) || u.email.toLowerCase().includes(filtro))
    .forEach((usuario, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${usuario.nome}</strong> (${usuario.email}) - ${usuario.data}
        <button onclick="excluirUsuario(${index})">Excluir</button>
      `;
      lista.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  if (nome && email) {
    const novoUsuario = {
      nome,
      email,
      data: new Date().toLocaleString()
    };
    usuarios.push(novoUsuario);
    salvarUsuarios();
    renderizarUsuarios();
    form.reset();
  }
});

function limparCampos() {
  nomeInput.value = '';
  emailInput.value = '';
}

function excluirUsuario(index) {
  usuarios.splice(index, 1);
  salvarUsuarios();
  renderizarUsuarios(searchInput.value.toLowerCase());
}

function excluirTodos() {
  if (confirm('Deseja excluir todos os cadastros?')) {
    usuarios = [];
    salvarUsuarios();
    renderizarUsuarios();
  }
}

function filtrarUsuarios() {
  const filtro = searchInput.value.toLowerCase();
  renderizarUsuarios(filtro);
}

renderizarUsuarios();
