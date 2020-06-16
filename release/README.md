# Release Kubernetes Manifests

:warning:

- Ao aplicar o manifesto `2-istio-install.yaml`, aguardar até que o container `istiod` seja instanciado.

- Ao aplicar o manifesto `3-app-manifests.yaml`, alterar a variável `URL_API` do Deployment do Frontend e atribuir o endereço do Istio Ingress Gateway.
	> Para consultar o endereço, utilizar o comando: `kubectl get svc istio-ingressgateway -n istio-system`