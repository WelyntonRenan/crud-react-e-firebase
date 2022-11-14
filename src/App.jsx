import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "key",
  authDomain: "key",
  projectId: "key",
});


function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userColletionRef = collection(db, "users")

  async function criarUser() {
    const user = await addDoc(userColletionRef, {
      name,
      email,
    });
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userColletionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Digite o nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Digite o email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={criarUser}>Criar Usuário</button>
      <ul>
        {users.map(user => {
          return (
            <div key={user.id}>
              <li>
                {user.name}
              </li>
              <li>
                {user.email}
              </li>
              <button onClick={() => deleteUser(user.id)}>Deletar Usuário</button>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
