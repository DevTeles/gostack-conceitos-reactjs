import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepo] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, []);

  function loadRepositories() {
    api.get('/repositories').then(response => {
      setRepo(response.data);
    });
  }

  async function handleAddRepository() {
    api.post('/repositories', { 
      title: 'Umbler',
      url: 'https://github.com/DevTeles/desafio-conceitos-nodejs',
      techs: ['React', 'Node.JS']
    }).then(response => {
      loadRepositories();
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(res => {
      setRepo(repos.filter(
        r => r.id !== id
      ));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">        
        {repos.map(repo =>  (           
          <li key={repo.id}>
            {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>              
         )            
        )}                  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
