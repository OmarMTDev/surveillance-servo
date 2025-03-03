FROM denoland/deno:2.2.2


RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app


# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
RUN deno install --entrypoint deps.ts

# These steps will be re-run upon each file change in your working directory:
COPY . .
RUN ls
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts


CMD ["deno", "run",  "start"]
