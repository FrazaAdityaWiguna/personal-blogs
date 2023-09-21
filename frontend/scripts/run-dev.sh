echo "<<< husky setup"

cd ..  && npm run prepare

echo "### successfully husky setup"

cd frontend

while ! [ -f "$ENVFILE" ]; do
    read -p "Invalid ENV File directory, Please make sure your env project"
done

set -a
. $ENVFILE
set +a

echo "Runing the project..."
next dev