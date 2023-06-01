# App

GymPass style app

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve se cadastrar com um email duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode pode fazer check-in se não estiver perto(100m) da academia;
- [ ] O Check-in só pode ser validado até 20 minutos após criado;
- [ ] O Check-in só pode ser validado por administradores;
- [ ] A Academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados Postgres;
- [ ] Todas as listas de dados precisam estar páginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;