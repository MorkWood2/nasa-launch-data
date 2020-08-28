
FROM hayd/deno:alpine-1.3.1
# working directory
WORKDIR / app
# Copy source code from working directory on local machine to working directory of docker container
# . = current working directory - source on machine
# . = destination is our image -  /app folder
COPY .  .
# set user (deno) for our application
# deno user set up in the deno base image
# so we aren't running app as root admin user
USER deno
# command into entry point into deno 
# entry point id "deno"
CMD ["run", "--allow-net", "--allow-read", "src/mod.ts"]
# our api is running on port 8000, we expose port so exposed outside container
EXPOSE 8000