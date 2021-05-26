if [ -z "$1" ]
then
      echo "Version is not supplied, exiting"
      exit 1
fi

sudo docker login ghcr.io -u lennartvanlaake -p $(cat ../.github-pat)
tsc -b types
tsc -b backend
cp -r backend/public build/backend
sudo docker build -f Dockerfile-be . -t ghcr.io/lennartvanlaake/bikeride-be:latest
sudo docker tag ghcr.io/lennartvanlaake/bikeride-be:latest ghcr.io/lennartvanlaake/bikeride-be:$1
sudo docker push ghcr.io/lennartvanlaake/bikeride-be:$1
sudo docker push ghcr.io/lennartvanlaake/bikeride-be:latest
kubectl set image deployment/be-deployment be=ghcr.io/lennartvanlaake/bikeride-be:$1 --record
