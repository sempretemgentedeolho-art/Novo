// Sistema de "banco de dados" local usando localStorage
export const localDb = {
  // Salvar dados
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Erro ao salvar:', e);
      return false;
    }
  },

  // Carregar dados
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Erro ao carregar:', e);
      return defaultValue;
    }
  },

  // Remover dados
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Erro ao remover:', e);
      return false;
    }
  },

  // Limpar tudo
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Erro ao limpar:', e);
      return false;
    }
  }
};

// Sistema de entidades simulado
export const createMockEntities = () => {
  return {
    list: async () => [],
    filter: async () => [],
    create: async (data) => ({ id: Date.now(), ...data }),
    update: async (id, data) => ({ id, ...data }),
    delete: async (id) => true,
    schema: () => ({})
  };
};

// Mock do base44 client
export const mockBase44 = {
  entities: new Proxy({}, {
    get: (target, prop) => createMockEntities()
  }),
  
  auth: {
    me: async () => ({
      id: 'local-user',
      email: 'usuario@local.com',
      full_name: 'Usuário Local',
      role: 'admin'
    }),
    updateMe: async (data) => data,
    logout: () => window.location.reload(),
    redirectToLogin: () => alert('Sistema local - sem login necessário'),
    isAuthenticated: async () => true
  },

  users: {
    inviteUser: async (email, role) => {
      alert(`Convite enviado para ${email} como ${role}`);
      return true;
    }
  },

  integrations: {
    Core: {
      InvokeLLM: async () => ({ output: 'Mock response' }),
      SendEmail: async () => true,
      UploadFile: async () => ({ file_url: '' }),
      GenerateImage: async () => ({ url: '' })
    }
  }
};