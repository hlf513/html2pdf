build:
	docker build . -t html2pdf:latest

run: 
	docker run --rm -d --name=html2pdf  -v /tmp:/data html2pdf:latest

stop:
	docker kill html2pdf
	docker image prune -f

exec:
	docker exec -it html2pdf bash