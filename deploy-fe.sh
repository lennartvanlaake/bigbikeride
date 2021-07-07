if [ -z "$1" ]
then
      echo "Version is not supplied, exiting"
      exit 1
fi
sudo docker login -u lennartvanlaake -p $(cat ../.dockerhub-pw)
cd frontend && vite build
cd ..
sudo docker build -f Dockerfile-fe . -t lennartvanlaake/bikeride-fe:latest
sudo docker tag lennartvanlaake/bikeride-fe:latest lennartvanlaake/bikeride-fe:$1
sudo docker push lennartvanlaake/bikeride-fe:latest
sudo docker push lennartvanlaake/bikeride-fe:$1
kubectl set image deployment/fe-deployment fe=lennartvanlaake/bikeride-fe:$1 --record
