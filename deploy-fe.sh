if [ -z "$1" ]
then
      echo "Version is not supplied, exiting"
      exit 1
fi

sudo docker login ghcr.io -u lennartvanlaake -p $(cat ../.github-pat)
cd frontend && vite build
cd ..
sudo docker build -f Dockerfile-fe . -t ghcr.io/lennartvanlaake/bikeride-fe:latest
sudo docker tag ghcr.io/lennartvanlaake/bikeride-fe:latest ghcr.io/lennartvanlaake/bikeride-fe:$1
sudo docker push -a ghcr.io/lennartvanlaake/bikeride-fe
kubectl set image deployment/fe-deployment fe=ghcr.io/lennartvanlaake/bikeride-fe:$1 --record
