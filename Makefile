NAME = ft_transcendence

install:
		docker-compose -f docker-compose.yml up --force-recreate --build --no-start
		docker-compose -f docker-compose.yml start
		docker-compose logs -f backend frontend postgres

back:
		docker-compose -f docker-compose.yml up --force-recreate --build --no-start
		docker-compose -f docker-compose.yml start
		docker-compose logs -f backend postgres

front:
		docker-compose -f docker-compose.yml up --force-recreate --build --no-start
		docker-compose -f docker-compose.yml start
		docker-compose logs -f frontend

remove:
		docker-compose -f docker-compose.yml down -v --rmi all

reinstall:	remove install

start: $(NAME)

$(NAME):
		docker-compose -f docker-compose.yml start
		docker-compose logs -f backend postgres

stop:
		docker-compose -f docker-compose.yml stop

.PHONY:	reinstall install stop remove