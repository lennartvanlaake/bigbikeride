if [ -z "$1" ]
then
      echo "Version is not supplied, exiting"
      exit 1
fi
sudo docker login -u lennartvanlaake -p $(cat ../.dockerhub-pw)
tsc -b types
tsc -b backend
cp -r backend/public build/backend
sudo docker build -f Dockerfile-be . -t lennartvanlaake/bikeride-be:latest
sudo docker tag lennartvanlaake/bikeride-be:latest lennartvanlaake/bikeride-be:$1
sudo docker push lennartvanlaake/bikeride-be:$1
sudo docker push lennartvanlaake/bikeride-be:latest
kubectl set image deployment/be-deployment be=lennartvanlaake/bikeride-be:$1 --record
