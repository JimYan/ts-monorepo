#!bash


# 生成m1模块的pt文件
./node_modules/.bin/ts-node bin/gen.ts --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=interface proto/wp/m1/*.proto

