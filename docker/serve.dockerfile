FROM    alpine:latest  AS builder
RUN     apk --no-cache add yarn
WORKDIR /app/
COPY    . /app
RUN     yarn && yarn build

FROM    alpine:latest  
RUN     apk --no-cache add yarn
WORKDIR /app/
COPY    --from=builder /app/build /app
RUN     yarn global add serve
CMD     ['serve', '-s', '.']
