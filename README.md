# Habit Tracker 🎯

Uma aplicação web moderna para rastrear hábitos diários, construir streaks e alcançar seus objetivos pessoais.

## 🌟 Características

- **Dashboard Intuitivo**: Visualize todos os seus hábitos em um só lugar
- **Rastreamento Diário**: Marque seus hábitos como concluídos a cada dia
- **Contadores de Streak**: Acompanhe suas sequências de dias consecutivos
- **Gráficos de Progresso**: Visualize seu progresso ao longo de 30 dias
- **Sistema de Badges**: Ganhe badges por alcançar marcos importantes
- **Categorias**: Organize seus hábitos por categoria (Saúde, Fitness, Aprendizado, etc.)
- **Cores Personalizáveis**: Escolha cores para cada hábito
- **Motivação**: Mensagens motivacionais quando você completa todos os hábitos do dia

## 🚀 Tecnologias

- **Frontend**: Next.js 14 com App Router, TypeScript, shadcn/ui, Tailwind CSS
- **Backend**: API REST com Next.js
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Gráficos**: Recharts para visualizações
- **Notificações**: Sonner para toast notifications
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/habit-tracker.git
cd habit-tracker
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
# Crie um arquivo .env.local com:
DATABASE_URL="postgresql://user:password@localhost:5432/habit_tracker"
```

4. Execute as migrações:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📚 Estrutura do Projeto

```
habit-tracker/
├── app/
│   ├── api/
│   │   ├── habits/          # API de hábitos
│   │   ├── check-ins/       # API de check-ins diários
│   │   └── badges/          # API de badges
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Página inicial
├── components/
│   ├── habits/
│   │   ├── Dashboard.tsx    # Dashboard principal
│   │   ├── HabitCard.tsx    # Card de hábito
│   │   ├── CreateHabitDialog.tsx  # Diálogo de criação
│   │   └── ProgressChart.tsx      # Gráfico de progresso
│   └── ui/                  # Componentes shadcn/ui
├── lib/
│   ├── db.ts                # Cliente Prisma
│   └── habits.ts            # Funções utilitárias
├── prisma/
│   └── schema.prisma        # Schema do banco de dados
└── package.json
```

## 🎮 Como Usar

1. **Criar um Hábito**: Clique em "New Habit" e preencha os detalhes
2. **Fazer Check-in**: Clique em "Check In" para marcar o hábito como concluído hoje
3. **Visualizar Progresso**: Clique em um hábito para ver gráficos detalhados
4. **Filtrar por Categoria**: Use as abas para filtrar hábitos por categoria

## 📊 Badges Disponíveis

- 🚀 **Getting Started**: Primeiro check-in concluído
- 🔥 **7-Day Streak**: 7 dias consecutivos
- ⚡ **30-Day Streak**: 30 dias consecutivos
- ⭐ **Perfect Week**: 100% de conclusão em uma semana
- ❤️ **Dedicated**: 80% de conclusão em 30 dias

## 🔌 API Endpoints

### Hábitos
- `GET /api/habits` - Listar todos os hábitos
- `POST /api/habits` - Criar novo hábito
- `GET /api/habits/[id]` - Obter hábito específico
- `PUT /api/habits/[id]` - Atualizar hábito
- `DELETE /api/habits/[id]` - Deletar hábito

### Check-ins
- `GET /api/check-ins` - Listar check-ins
- `POST /api/check-ins` - Criar check-in

### Badges
- `GET /api/badges` - Listar badges
- `POST /api/badges` - Criar badge

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por Jhonata Emerick

## 📧 Contato

- Email: jer@datarisk.io
- GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

---

**Comece a construir seus hábitos hoje! 🚀**
