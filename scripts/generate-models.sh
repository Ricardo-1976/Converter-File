host=lucky.db.elephantsql.com
db=lywcfoen
user=lywcfoen
pass=9Go1vjTO2mpV1m8Vt5kIm78pnsB5KEP5
engine=postgres
port=5432
output=./src/models

echo "Generating database entities"
yarn typeorm-model-generator -h $host -d $db -u $user -x $pass -e $engine -p $port -o $output

echo "Removing unnecessary files"
rm -rf $output/tsconfig.json $output/ormconfig.json

echo "Moving entities out directory"
mv $output/entities/*.ts $output/

echo "Removing entity directory"
rm -rf $output/entities