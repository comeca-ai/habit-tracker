# 🚀 Configuração do GitHub - Habit Tracker

## Instruções para Conectar ao GitHub

Seu projeto está pronto para ser enviado ao GitHub! Siga os passos abaixo:

### Passo 1: Criar um novo repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique no ícone **+** no canto superior direito
3. Selecione **New repository**
4. Preencha os detalhes:
   - **Repository name**: `habit-tracker`
   - **Description**: `A modern habit tracking application built with Next.js, PostgreSQL, and shadcn/ui`
   - **Visibility**: Public (ou Private, conforme preferir)
   - **Initialize this repository with**: Deixe desmarcado (já temos commits locais)
5. Clique em **Create repository**

### Passo 2: Adicionar o remote e fazer push

Após criar o repositório, você verá instruções. Execute os comandos abaixo no terminal:

```bash
cd /home/code/habit-tracker

# Adicionar o remote (substitua USERNAME pelo seu usuário do GitHub)
git remote add origin https://github.com/USERNAME/habit-tracker.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push do código
git push -u origin main
```

### Passo 3: Verificar no GitHub

1. Acesse seu repositório em `https://github.com/USERNAME/habit-tracker`
2. Você deve ver todos os arquivos do projeto
3. O README.md será exibido automaticamente na página inicial

## 📊 Status do Projeto

### Commits Realizados:
- ✅ **Initial commit**: Aplicação completa com funcionalidades
- ✅ **Add README and .gitignore**: Documentação e configuração

### Arquivos Principais:
```
habit-tracker/
├── app/
│   ├── api/              # API REST endpoints
│   ├── layout.tsx        # Layout raiz
│   └── page.tsx          # Página inicial
├── components/
│   ├── habits/           # Componentes de hábitos
│   └── ui/               # Componentes shadcn/ui
├── lib/
│   ├── db.ts             # Cliente Prisma
│   └── habits.ts         # Funções utilitárias
├── prisma/
│   └── schema.prisma     # Schema do banco de dados
├── README.md             # Documentação
└── package.json          # Dependências
```

## 🔐 Autenticação no GitHub

Se você não tem autenticação configurada, use um dos métodos:

### Opção 1: HTTPS com Personal Access Token (Recomendado)
```bash
# Será solicitado seu username e token
git push -u origin main
```

### Opção 2: SSH (Se já configurado)
```bash
# Primeiro, altere o remote para SSH
git remote set-url origin git@github.com:USERNAME/habit-tracker.git
git push -u origin main
```

## 📝 Próximos Passos

Após fazer push para o GitHub:

1. **Adicionar Colaboradores** (opcional):
   - Vá para Settings > Collaborators
   - Adicione outros usuários do GitHub

2. **Configurar GitHub Pages** (opcional):
   - Para hospedar a documentação
   - Settings > Pages > Source: main branch

3. **Adicionar GitHub Actions** (opcional):
   - Para CI/CD automático
   - Criar workflows para testes e deploy

4. **Criar Issues e Pull Requests**:
   - Para rastrear bugs e features
   - Colaborar com outros desenvolvedores

## 🆘 Troubleshooting

### Erro: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/habit-tracker.git
```

### Erro: "Permission denied (publickey)"
- Configure SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Erro: "fatal: 'origin' does not appear to be a 'git' repository"
```bash
git remote -v  # Verificar remotes
git remote add origin https://github.com/USERNAME/habit-tracker.git
```

## 📚 Recursos Úteis

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI](https://cli.github.com/)

---

**Pronto para compartilhar seu projeto com o mundo! 🌍**
