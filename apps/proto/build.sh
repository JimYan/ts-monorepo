#!bash


# 生成m1模块的pt文件
./node_modules/.bin/ts-node bin/gen.ts --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=interface proto/mwp/m1/*.proto

./node_modules/.bin/ts-node bin/gen.ts --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=interface proto/mwp/m2/*.proto

./node_modules/.bin/tsc -p tsconfig.json