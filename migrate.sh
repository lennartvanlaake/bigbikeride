sudo docker login ghcr.io -u lennartvanlaake -p $(cat ../.github-pat)
sudo docker build -f Dockerfile-migrate . -t ghcr.io/lennartvanlaake/migrate:latest
sudo docker push -a ghcr.io/lennartvanlaake/migrate
kubectl delete -f kube/migrate.yml
kubectl apply -f kube/migrate.yml
