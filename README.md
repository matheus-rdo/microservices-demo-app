# Credit score
Aplicação demo para microsserviços

## Arquitetura



### Tecnologias adotadas
**Docker**
**Google Cloud Platform** - provedor de nuvem
**Terraform** - ferramenta de provisionamento de infraestrutura
**Kubernetes** - orquestrador de contêineres
**Istio** - Service Mesh
**Skaffold** - Automação de build/push/deployment em ambiente de desenvolvimento


### Serviços

A aplicação foi desenvolvida com 3 serviços que se comunicam entre si

| Serviço   | Linguagem | Descrição
| --------- | ----------| ---------
[account-service](./src/account-service) |Java|Responsável por armazenar e orquestrar a criação do usuário.
[balance-sheet-service](./src/balance-sheet-service) |Node.js|Responsável por manter as informaçoes do balanço patrimonial dos usuarios, além de fazer caching dos dados da ultima compra e ultima consulta do CPF. Para acelerar o desenvolvimento, os bens e as dívidas do usuário são auto-gerados de forma aleatória.
[frontend](./src/frontend) |Angular 9|Expõe web server com as páginas da aplicação.

### Deploy

Pré-requisitos:
- [Google Cloud SDK](https://cloud.google.com/sdk/install)
- [Terraform](https://www.terraform.io/)

1. Realizar autenticação  
`gcloud auth login`  
2. Provisionar a infraestrutura via código. No diretório [terraform](./terraform), aplicar os seguintes comandos:
`terraform plan` - revise as alterações que serão feitas
`terraform apply` - confirmação
3. Com o ambiente provisionado, autentique no Cluster e aplique sequencialmente os manifestos kubernetes do diretório [release](./release)
    > Ao aplicar o manifesto `2-istio-install.yaml`, aguardar até que o container `istiod` seja instanciado.
4. Pronto! ;) - acesse a aplicação através do endereço público do Istio Ingress Gateway  
`kubectl get svc istio-ingressgateway -n istio-system`

### Desenvolvimento

#### Pré-requisitos

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Minikube](https://kubernetes.io/docs/setup/minikube/)
- [Skaffold]( https://skaffold.dev/docs/install/)

#### Desenvolver localmente (Minikube)
1. Instanciar o cluster c/ as configurações recomendadas  
`minikube start --cpus=4 --memory 6GiB --disk-size 32g`
2. Habilitar o NGINX Ingress controller (Minikube Addon)  
`minikube addons enable ingress`
3. Implantar com `skaffold dev`  
    >O Skaffold observará as alterações no código-fonte, para  reconstruir e reimplantar com o container atualizado.
4. Acessar a aplicação através do endpoint fornecido por `minikube ip`
