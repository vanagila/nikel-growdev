const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);

document.getElementById("transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  data.transactions.unshift({
    id: new Date().valueOf().toString(),
    value: value,
    type: type,
    description: description,
    date: date,
  });

  saveData(data);
  e.target.reset();
  myModal.hide();

  getTransactions();

  alert("Lançamento adicionado com sucesso");
});

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);

  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHTML = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = "Entrada";

      if (item.type === "2") {
        type = "Saída";
      }

      transactionsHTML += `<tr class="list-item">
      <th scope="row">${item.date}</th>
      <td>${item.value.toFixed(2)}</td>
      <td>${type}</td>
      <td>${item.description}</td>
      <td>
        <div class="fs-2 delete">
          <button class="btn button-delete transaction delete">
            <i class="bi bi-trash-fill delete"></i>
          </button>
        </div>
      </td>
    </tr>`;
    });
  }

  document.getElementById("transactions-list").innerHTML = transactionsHTML;
}

function removeTransaction() {
  const list = document.getElementById("transactions-list");

  let transactions = data.transactions;

  list.addEventListener("click", (e) => {
    if (!e.target.matches(".delete")) return;

    const parent = e.target.closest(".list-item");
    const transactionId = parent.dataset.transactionId;

    parent.remove();

    transactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
  });
}

removeTransaction();

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
