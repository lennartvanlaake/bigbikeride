sudo docker login -u lennartvanlaake -p $(cat ../.dockerhub-pw)
sudo docker build -f Dockerfile-migrate . -t lennartvanlaake/bikeride-migrate:latest
sudo docker push -a lennartvanlaake/bikeride-migrate
kubectl delete -f kube/migrate.yml
kubectl apply -f kube/migrate.yml
