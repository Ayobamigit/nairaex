APPS     :=	sonic

all:	$(APPS)

$(APPS):
	go build --ldflags "-X main.Version=$$(cat VERSION)" -o bin/$@ app.go

test:
	go test ./...

asset:
	cd web && \
		rm -rf ../public/assets && \
		rm -rf ./build && \
		yarn install && \
		./scripts/build.sh && \
		cp -r build ../public/assets

run:
	KAIGARA_VAULT_TOKEN=changeme KAIGARA_DEPLOYMENT_ID=nairaex KAIGARA_VAULT_ADDR=http://localhost:8200 KAIGARA_APP_NAME=sonic KAIGARA_SCOPES=public,private,secret kaigara go run app.go serve

vault_setup:
	docker-compose exec -T vault sh -c 'vault login changeme'
	docker-compose exec -T vault sh -c 'vault secrets disable secret'
	docker-compose exec -T vault sh -c 'vault secrets enable -version=2 -path=secret kv'
	docker-compose exec -T vault sh -c 'vault secrets enable transit'

vault_write:
	KAIGARA_VAULT_TOKEN=changeme KAIGARA_DEPLOYMENT_ID=nairaex KAIGARA_VAULT_ADDR=http://localhost:8200 kaisave -filepath=config/secrets.yaml

vault_delete:
	docker-compose exec -T vault sh -c 'vault delete secret/data/nairaex/global/public'
	docker-compose exec -T vault sh -c 'vault delete secret/data/nairaex/global/private'
	docker-compose exec -T vault sh -c 'vault delete secret/data/nairaex/global/secret'
	docker-compose exec -T vault sh -c 'vault delete secret/data/nairaex/sonic/public'
	docker-compose exec -T vault sh -c 'vault delete secret/data/nairaex/sonic/private'
	docker-compose exec -T vault sh -c 'vault delete secret/data/nairaex/sonic/secret'

clean:
	rm -rf bin/*
