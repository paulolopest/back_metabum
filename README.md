# E-Commerce Metabum

### Documentação API:
https://documenter.getpostman.com/view/19301541/UzXNTH1N

## Sobre:
- Metabum é um clone da Kabum e Amazon. Quis fazer o mais próximo de um e-commerce real, com sistema de autenticação e segurança para o usuário.

## Explicação:
- Irei descrever detalhadamente o que fiz durante o projeto, o porque de algumas escolhas e o passo a passo da escrita do código.

### User

##### CreateUser
- Fiz toda a validação de dados, como: se algum input está vazio, se está sendo passado @ no email, se a senha e CPF tem X números.
- Verifiquei se já existe uma conta cadastrada naquele email e CPF.
- Depois faço a geração de ID com o ID Generator.
- Uso o hash para criptografar a senha.
- Faço a inserção de dados e termino o endpoint enviando um token (JsonWebToken) para fazer o login automaticamente

##### Login
- No login também faço a validação dos dados.
- Vejo se aquele email está cadastrado no BD, se não, notifico o usuário que aquela conta não existe.
- Faço a verificação de senha com o Hash
- Por fim, mando um token de autorização (JWT) para o usuário fazer o login

##### GetProfile
- Verifico se o usuário está logado
- Pego o id dele pelo token, com o método verify do JWT e entrego o perfil relacionado ao id dele.
- Como o site é um e-commerce, não houve a necessidade de fazer um endpoint para pesquisar um outro usuário.

##### DeleteUser
- Verifico se o usuário está logado
- Pego o id dele pelo o token e executo o método delete usando o id do usuário como parâmetro


### Card

##### CreateCard
- Verifico se o usuário está logado antes de criar o cartão
- Faço a verifiçação de dados, como: quantidade de números do cartão, cvv e CPF e nome.
- Faço uma validação da data de vencimento do cartão
- Pego o ID do usuário e relaciono com o cartão.
- Verifico se o cartão já foi cadastrado naquela conta.
- Gero um id aleatório pro cartão.
- Fiz uma criptografia do CVV com o hash, para segurança dos dados.
- Faço a inserção de dados e termino o endpoint

##### GetAllCards
- Esse é um endpoint para pegar todos os cartões cadastrados.

##### DeleteCard
- Verifico se o usuário está logado
- Imaginei o front fazendo uma pagina onde mostrasse os cartões cadastrados naquela conta e quando clicasse em um dos cartões puxasse o id daquele cartão.
- O cartão é excluído através do id fornecido.


### Product

##### InsertProduct
- Esse endpoint só pode ser executado por um ADMIN. (Login no final do ReadMe)
- Verifico se o usuário está logado e se é um administrador, caso contrário não terá acesso ao endpoint
- Faço a verificação de dados, como: nome, preço, etc.
- Gero um ID aleatório para o produto e faço a inserção dele no BD.

##### GetProduct
- Esse é um denpoint para buscar o produto.
- Fiz uma lógica onde passo uma palavra chave por query e pesquiso o produto no BD.
- Faço o esquema de "%*query*%" para o usuário poder pesquisar com uma palavra-chave "quebrada".
- Se nada for passado na query, ele me retorna todos os produtos.

##### EditPrice
- Esse endpoint so pode ser executado por um ADMIN. (Login no final do ReadMe)
- Verifico se o usuário e um admin e está logado.
- Faço a edição de preço usando o ID do produto como base para a busca no BD.

##### DeleteProduct
- Esse endpoint so pode ser executado por um ADMIN. (Login no final do ReadMe)
- Verifico se o usuário e um admin e está logado.
- Faço a edição de preço usando o ID do produto como base para a busca no BD.

### Payment

- Resolvi dividir o pagamento em 2 endpoints separados, um só pra cartão de crédito e outro para boleto. Cheguei a fazer uma lógica pra os 2 juntos, mas achei muita lógica em 1 endpoint só, o que faz ele ser quebrado muito fácil.

##### CreditPayment 
- Verifico se o usuário está logado.
- Faço a verificação de dados, como: nome, numero, etc.
- Verifico se a data de validade do cartão é válida.
- Gero um ID para a compra.
- Faço o registro da compra no BD, enviando o id da compra, do usuário e do cartão, data, mais os dados do cartão

##### BoletoPayment
- Verifico se o usuário está logado.
- Gero um ID pra compra.
- Pego a data de hoje para enviar junto com o registro da compra.
- Gero outro ID, mas dessa vez como se fosse um código de barras.
- Faço o registro da compra no BD, enviando o id da compra, do usuário e do boleto.

##### GetCardPayment e GetBoletoPayment
- Aqui eu faço dois endpoint para pegar as compras feitas no cartão e boleto (1 endpoint para cada). O intuito é que quando o usuário acesse o seu perfil, esse endpoint seja chamado (com o boleto tambem) e ele possa ver as compras efetuadas naquela conta.
- Verifico se o usuário está logado.
- Pego as compras daquele id extraido do JWT (authenticator) e envio.

